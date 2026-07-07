"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { sfx } from "@/lib/sfx";
import { inkBurst } from "@/lib/confetti";

interface Skill {
  _id: string;
  name: string;
  image: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch(api + "/api/portfolio/skills");
        const data = await response.json();
        setSkills(data.data ?? []);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchSkills();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-red">
          Couldn&apos;t load skills right now — try refreshing.
        </p>
      )}

      <ul className="flex flex-wrap gap-4">
        {status === "loading" &&
          Array.from({ length: 10 }).map((_, i) => (
            <li
              key={i}
              className="h-12 w-36 animate-pulse border-2 border-ink/15 bg-ink/5"
            />
          ))}

        {skills.map((skill, i) => (
          <Reveal
            as="li"
            key={skill._id}
            delay={Math.min(i * 0.03, 0.35)}
            y={12}
          >
            <motion.span
              whileHover={{ y: -4, rotate: -1.5 }}
              whileTap={{ scale: 0.9, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onTap={(e) => {
                const { clientX = 0, clientY = 0 } = e as PointerEvent;
                sfx.pop();
                inkBurst(clientX, clientY, 8);
              }}
              className="flex cursor-pointer select-none items-center gap-3 border-2 border-ink bg-paper px-4 py-2.5 shadow-print-sm transition-shadow duration-200 hover:shadow-print-blue"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.image}
                alt=""
                loading="lazy"
                className="h-6 w-6 object-contain"
              />
              <span className="font-medium">{skill.name}</span>
            </motion.span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
