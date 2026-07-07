"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { sfx } from "@/lib/sfx";
import { inkBurst, inkRain } from "@/lib/confetti";

/** Pen nib that rides the red margin rule with scroll progress */
function MarginPen() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const top = useTransform(smooth, [0, 1], ["8vh", "88vh"]);

  return (
    <motion.div
      aria-hidden
      style={{ top }}
      className="pointer-events-none fixed left-10 z-[60] hidden -translate-x-1/2 text-xl text-red xl:block"
    >
      ✎
    </motion.div>
  );
}

export default function Effects() {
  const [toast, setToast] = useState<string | null>(null);
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
      `%c✎ Hey, fellow developer! %c\n\nPoking around? Nice. A few secrets are inked in:\n  · type "blue"  → blueprint mode\n  · type "party" → don't ask, just type it\n  · type "sujal" → summons me\n  · the * in the logo is clickable. repeatedly.\n\nSource-minded? Say hi: https://sujal.info/github${nightShift}`,
      "font-size:16px; font-weight:bold; color:#2547f4;",
      "font-size:12px; color:#50545f;"
    );
  }, []);

  // Typed-word easter eggs (ignored while typing in form fields)
  useEffect(() => {
    const eggs: Record<string, () => void> = {
      blue: () => {
        const on = document.documentElement.classList.toggle("blueprint");
        sfx.unlock();
        inkBurst(window.innerWidth / 2, window.innerHeight / 2, 36);
        showToast(
          on
            ? "◫ Blueprint mode — type \"blue\" again to flip back."
            : "✓ Back to paper. The blueprint is safe with me."
        );
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

  return (
    <>
      <MarginPen />
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
