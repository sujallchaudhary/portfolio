"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { sfx } from "@/lib/sfx";
import { inkBurst, inkRain } from "@/lib/confetti";

/** Pen nib that rides the red margin rule; clicking it toggles doodle mode */
function MarginPen({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["8vh", "88vh"]);

  return (
    <motion.button
      type="button"
      data-sfx="none"
      style={{ top }}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? "Exit doodle mode" : "Doodle on the page"}
      title={active ? "Stop doodling" : "Click to doodle on the page"}
      className={cn(
        "fixed left-10 z-[250] hidden h-9 w-9 -translate-x-1/2 items-center justify-center text-xl transition-all duration-300 xl:flex",
        active
          ? "rotate-[-15deg] scale-125 border-2 border-ink bg-blue text-paper shadow-print-sm"
          : "text-red hover:scale-125"
      )}
    >
      ✎
    </motion.button>
  );
}

/** Full-page canvas users draw on; strokes stick to the page and persist */
function DoodleLayer({
  active,
  onExit,
}: {
  active: boolean;
  onExit: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  // Size the canvas to the whole document, preserving strokes on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.scrollHeight;
      if (canvas.width === w && canvas.height === h) return;
      const copy = document.createElement("canvas");
      copy.width = canvas.width;
      copy.height = canvas.height;
      copy.getContext("2d")?.drawImage(canvas, 0, 0);
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")?.drawImage(copy, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [active]);

  // Escape exits doodle mode
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onExit]);

  const strokeTo = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !last.current) return;
    const ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--blue")
      .trim();
    ctx.strokeStyle = `rgb(${ink} / 0.9)`;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    sfx.pop();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "absolute left-0 top-0 z-[240]",
          active ? "cursor-crosshair" : "pointer-events-none"
        )}
        style={{ touchAction: active ? "none" : undefined }}
        onPointerDown={(e) => {
          isDrawing.current = true;
          last.current = { x: e.pageX, y: e.pageY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDrawing.current) strokeTo(e.pageX, e.pageY);
        }}
        onPointerUp={() => {
          isDrawing.current = false;
          last.current = null;
        }}
        onPointerCancel={() => {
          isDrawing.current = false;
          last.current = null;
        }}
      />
      {active && (
        <div className="fixed bottom-6 right-6 z-[250] flex gap-2">
          <button
            type="button"
            onClick={clear}
            data-sfx="none"
            className="border-2 border-ink bg-paper px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink shadow-print-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            ✕ Clear
          </button>
          <button
            type="button"
            onClick={onExit}
            className="border-2 border-ink bg-blue px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-paper shadow-print-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            ✓ Done
          </button>
        </div>
      )}
    </>
  );
}

export default function Effects() {
  const [toast, setToast] = useState<string | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const typed = useRef("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

  // Console greeting for fellow developers
  useEffect(() => {
    const nightShift =
      new Date().getHours() < 5 ? "\n(also — it's late. hydrate. ☕)" : "";
    console.log(
      `%c✎ Hey, fellow developer! %c\n\nPoking around? Nice. A few secrets are inked in:\n  · type a color — "blue", "red", "green", "purple"… → that print mode\n  · type "reset" → back to paper\n  · type "party" → don't ask, just type it\n  · type "sujal" → summons me\n  · the * in the logo is clickable. repeatedly.\n  · click the ✎ on the margin rule → draw on the page\n\nSource-minded? Say hi: https://sujal.info/github${nightShift}`,
      "font-size:16px; font-weight:bold; color:#2547f4;",
      "font-size:12px; color:#50545f;"
    );
  }, []);

  // Typed-word easter eggs (ignored while typing in form fields)
  useEffect(() => {
    const THEME_VARS = ["--paper", "--ink", "--blue", "--red", "--muted", "--faint", "--grid"];

    // hsl → "r g b" triplet, matching the format the CSS variables expect
    const hsl = (h: number, s: number, l: number) => {
      const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        return Math.round(
          255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))
        );
      };
      return `${f(0)} ${f(8)} ${f(4)}`;
    };

    /** Build a full blueprint-style palette from a hue: dark colored paper, light ink */
    const buildPrint = (hue: number, sat = 72, paperL = 22) => {
      const ink = hsl(hue, 100, 96);
      return {
        "--paper": hsl(hue, sat, paperL),
        "--ink": ink,
        "--blue": hsl(hue, 100, 76),
        "--red": hsl((hue + 160) % 360, 100, 71),
        "--muted": hsl(hue, 43, 79),
        "--faint": hsl(hue, 29, 59),
        "--grid": `rgba(${ink.split(" ").join(", ")}, 0.09)`,
      };
    };

    // hue/sat/lightness per color; blue stays the original blueprint exactly
    const PRINTS: Record<string, Record<string, string>> = {
      blue: {
        "--paper": "16 30 96",
        "--ink": "236 240 255",
        "--blue": "132 176 255",
        "--red": "255 179 107",
        "--muted": "178 188 224",
        "--faint": "120 132 180",
        "--grid": "rgba(236, 240, 255, 0.09)",
      },
      red: buildPrint(2, 70),
      orange: buildPrint(24, 78),
      yellow: buildPrint(46, 80, 20),
      gold: buildPrint(46, 80, 20),
      green: buildPrint(145, 60),
      teal: buildPrint(172, 65),
      cyan: buildPrint(194, 70),
      purple: buildPrint(268, 60),
      violet: buildPrint(268, 60),
      pink: buildPrint(325, 65),
      magenta: buildPrint(325, 65),
      brown: buildPrint(22, 45),
      gray: buildPrint(230, 8),
      grey: buildPrint(230, 8),
      black: buildPrint(230, 6, 12),
    };

    let currentPrint: string | null = null;

    const clearPrint = () => {
      const style = document.documentElement.style;
      THEME_VARS.forEach((v) => style.removeProperty(v));
      currentPrint = null;
    };

    const applyPrint = (name: string) => {
      const style = document.documentElement.style;
      Object.entries(PRINTS[name]).forEach(([v, value]) =>
        style.setProperty(v, value)
      );
      currentPrint = name;
    };

    const eggs: Record<string, () => void> = {
      reset: () => {
        clearPrint();
        sfx.pop();
        showToast("✓ Back to paper.");
      },
      party: () => {
        sfx.unlock();
        inkRain(48);
        showToast("✳ Ink everywhere. Worth it.");
      },
      sujal: () => {
        sfx.pop();
        inkBurst(window.innerWidth / 2, 100, 20);
        showToast("👋 You called? — Sujal");
      },
    };

    for (const name of Object.keys(PRINTS)) {
      eggs[name] = () => {
        sfx.unlock();
        inkBurst(window.innerWidth / 2, window.innerHeight / 2, 36);
        if (currentPrint === name) {
          clearPrint();
          showToast("✓ Back to paper.");
        } else {
          applyPrint(name);
          showToast(
            `◫ ${name.charAt(0).toUpperCase() + name.slice(1)}print mode — type "${name}" again to flip back.`
          );
        }
      };
    }
    const maxLen = Math.max(...Object.keys(eggs).map((w) => w.length));

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        typed.current = "";
        return;
      }
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      typed.current = (typed.current + e.key.toLowerCase()).slice(-maxLen);
      for (const [word, run] of Object.entries(eggs)) {
        if (typed.current.endsWith(word)) {
          typed.current = "";
          run();
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click sounds: stamp for button-like elements, soft tick for plain links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest("[data-sfx='none']")) return;
      if (target.closest("button, [data-sfx='stamp']")) sfx.stamp();
      else if (target.closest("a")) sfx.tick();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const toggleDrawMode = () => {
    setDrawMode((on) => {
      const next = !on;
      if (next) {
        sfx.pop();
        showToast("✎ Doodle mode — draw anywhere. Esc or ✓ Done to stop.");
      } else {
        sfx.tick();
        showToast("✓ Doodles saved to the page. The pencil awaits.");
      }
      return next;
    });
  };

  return (
    <>
      <DoodleLayer active={drawMode} onExit={toggleDrawMode} />
      <MarginPen active={drawMode} onToggle={toggleDrawMode} />
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-6 z-[300] max-w-xs border-2 border-ink bg-paper px-4 py-3 font-mono text-xs leading-relaxed text-ink shadow-print"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
