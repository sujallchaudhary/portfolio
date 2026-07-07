"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Marquee from "./ui/marquee";
import { sfx } from "@/lib/sfx";

const FIG_CAPTIONS = [
  "the developer",
  "probably debugging",
  "works on my machine",
  "one more commit, promise",
  "console.log('why')",
  "it's not a bug, it's a feature",
];

const TICKER_WORDS = [
  "Next.js",
  "MERN Stack",
  "PHP",
  "DevOps",
  "Curious",
  "Techie",
  "Innovative",
  "Problem Solver",
];

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Hand-drawn pen circle that draws itself around the wrapped phrase */
function PenCircled({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 90"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+32px)]"
      >
        <motion.path
          d="M150,6 C240,2 293,22 294,45 C295,70 226,86 148,84 C70,82 8,68 6,44 C4,20 74,4 170,7"
          fill="none"
          className="stroke-blue"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.1, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  const [captionIndex, setCaptionIndex] = useState(0);

  const cycleCaption = () => {
    sfx.pop();
    setCaptionIndex((i) => (i + 1) % FIG_CAPTIONS.length);
  };

  return (
    <section className="relative flex min-h-screen flex-col justify-between pt-16">
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-14 px-6 py-14 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            Full-stack developer · NSUT, New Delhi
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-6xl lg:text-7xl"
          >
            Sujal Chaudhary builds <PenCircled>useful things</PenCircled> for
            the web.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted"
          >
            Tools that thousands of students actually use — built end to end,
            from database to deploy.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              href="#projects"
              data-sfx="stamp"
              className="inline-flex items-center gap-3 border-2 border-ink bg-blue px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-paper shadow-print transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              See the work →
            </Link>
            <Link
              href="#contact"
              className="link-pen font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        <motion.figure
          className="relative mx-auto w-full max-w-sm lg:col-span-5"
          initial={{ opacity: 0, rotate: 0, y: 24 }}
          animate={{ opacity: 1, rotate: 2, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hand-drawn margin annotation */}
          <motion.div
            aria-hidden
            className="absolute -left-36 top-6 hidden w-32 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <p className="-rotate-6 font-mono text-[11px] uppercase tracking-[0.15em] text-blue">
              that&apos;s me
            </p>
            <svg viewBox="0 0 100 48" className="mt-1 w-24">
              <motion.path
                d="M6,8 C18,38 55,44 88,30 M78,26 L90,29 L84,39"
                fill="none"
                className="stroke-blue"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 0.7, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
          <div className="border-2 border-ink bg-paper p-3 shadow-print">
            <Image
              src="/hero.jpg"
              alt="Portrait of Sujal Chaudhary"
              width={900}
              height={1100}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-2 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              <button
                type="button"
                data-sfx="none"
                onClick={cycleCaption}
                title="click for the truth"
                className="cursor-pointer text-left transition-colors hover:text-blue"
              >
                fig. 01 — {FIG_CAPTIONS[captionIndex]}
              </button>
              <span className="shrink-0 text-blue">open to work</span>
            </figcaption>
          </div>
          {/* Tape strips */}
          <span
            aria-hidden
            className="absolute -top-3 left-8 h-6 w-20 -rotate-6 border border-ink/10 bg-ink/10 backdrop-blur-[1px]"
          />
          <span
            aria-hidden
            className="absolute -top-3 right-8 h-6 w-20 rotate-6 border border-ink/10 bg-ink/10 backdrop-blur-[1px]"
          />
        </motion.figure>
      </div>

      <div className="border-y-2 border-ink bg-paper py-3">
        <Marquee className="[--duration:32s] [--gap:2.5rem] p-0">
          {TICKER_WORDS.map((word) => (
            <span
              key={word}
              className="flex items-center gap-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink"
            >
              {word}
              <span className="text-blue" aria-hidden>
                ✳
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
