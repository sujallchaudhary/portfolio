"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { sfx, isMuted, setMuted } from "@/lib/sfx";
import { inkBurst } from "@/lib/confetti";

const NAV_LINKS = [
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
  { label: "Blog", href: "https://blog.sujal.info", id: "blog", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const splatCount = useState(() => ({ count: 0 }))[0];

  useEffect(() => {
    setSoundOn(!isMuted());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
    if (next) sfx.pop();
  };

  // Easter egg: the asterisk splats ink; the fifth splat earns a fanfare
  const splat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    splatCount.count += 1;
    if (splatCount.count % 5 === 0) {
      sfx.unlock();
      inkBurst(e.clientX, e.clientY, 40);
    } else {
      sfx.pop();
      inkBurst(e.clientX, e.clientY, 14);
    }
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the nav item whose section is in view
  useEffect(() => {
    const sections = NAV_LINKS.filter((l) => !l.external)
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] bg-paper transition-[border-color,box-shadow] duration-300",
          scrolled && !menuOpen
            ? "border-b-2 border-ink"
            : "border-b-2 border-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
          aria-label="Primary"
        >
          <Link
            href="#"
            className="font-display text-2xl font-bold tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            Sujal
            <span
              className="inline-block cursor-pointer text-blue transition-transform duration-200 hover:rotate-45 hover:scale-125"
              onClick={splat}
              aria-hidden
            >
              *
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <button
              type="button"
              onClick={toggleSound}
              data-sfx="none"
              aria-label={soundOn ? "Mute sound effects" : "Unmute sound effects"}
              aria-pressed={soundOn}
              title={soundOn ? "Sound on" : "Sound off"}
              className={cn(
                "flex h-8 w-8 items-center justify-center border-2 border-ink transition-colors",
                soundOn ? "bg-blue text-paper" : "bg-paper text-ink"
              )}
            >
              {soundOn ? <IconVolume size={16} /> : <IconVolumeOff size={16} />}
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className={cn(
                  "highlight-hover px-1 font-mono text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                  activeSection === link.id ? "text-blue" : "text-ink"
                )}
              >
                {link.label}
                {link.external && <span aria-hidden> ↗</span>}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper shadow-print-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(
                "absolute h-[2px] w-5 bg-ink transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute h-[2px] w-5 bg-ink transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-paper px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b-2 border-ink/10 py-5"
                  >
                    <span className="font-display text-4xl font-bold tracking-tight transition-colors group-hover:text-blue">
                      {link.label}
                    </span>
                    <span className="font-mono text-lg text-blue" aria-hidden>
                      {link.external ? "↗" : "→"}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-10 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Full-stack developer — NSUT, New Delhi
              </p>
              <button
                type="button"
                onClick={toggleSound}
              data-sfx="none"
                aria-label={soundOn ? "Mute sound effects" : "Unmute sound effects"}
                aria-pressed={soundOn}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink transition-colors",
                  soundOn ? "bg-blue text-paper" : "bg-paper text-ink"
                )}
              >
                {soundOn ? <IconVolume size={16} /> : <IconVolumeOff size={16} />}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
