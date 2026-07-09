"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  /** Section anchor id used by the navbar (e.g. "projects") */
  id: string;
  /** Ink-tab label in the margin, e.g. "Build log" */
  label: string;
  /** Headline text before the highlighted word */
  title: string;
  /** Word rendered with a permanent marker highlight */
  accent?: string;
}

export default function SectionHeading({
  id,
  label,
  title,
  accent,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div id={id} className="mx-auto max-w-6xl scroll-mt-28 px-6 pt-20 lg:px-8">
      <Reveal>
        {/* Ink tab presses in like a rubber stamp */}
        <motion.span
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.6, rotate: -6 }
          }
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-paper"
        >
          {label}
        </motion.span>
        <div className="mt-5 flex items-baseline gap-6">
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
            {accent && (
              <>
                {" "}
                <span className="marker whitespace-nowrap">{accent}</span>
              </>
            )}
          </h2>
          {/* Dashed margin rule rules itself across the page */}
          <motion.span
            aria-hidden
            className="hidden flex-1 origin-left border-t-2 border-dashed border-ink/20 sm:block"
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </Reveal>
    </div>
  );
}
