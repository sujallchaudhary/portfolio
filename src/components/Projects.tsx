"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  demoLink: string;
  sourceCodeLink: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(api + "/api/portfolio/projects");
        const data = await response.json();
        setProjects(data.data ?? []);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-red">
          Couldn&apos;t load projects right now — try refreshing.
        </p>
      )}

      {status === "loading" && (
        <div className="space-y-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-2"
            >
              <div className="space-y-4">
                <div className="h-8 w-2/3 border-2 border-ink/15 bg-ink/5" />
                <div className="h-24 w-full border-2 border-ink/15 bg-ink/5" />
              </div>
              <div className="aspect-video w-full border-2 border-ink/15 bg-ink/5" />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-20">
        {projects.map((project, i) => {
          const reversed = i % 2 === 1;
          const host = hostnameOf(project.demoLink);
          return (
            <Reveal
              key={project._id}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className={cn("lg:col-span-5", reversed && "lg:order-2")}>
                <h3 className="font-display text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-6">
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      data-sfx="stamp"
                      className="inline-flex items-center gap-2 border-2 border-ink bg-blue px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-paper shadow-print-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      Try it live ↗
                    </Link>
                  )}
                  {project.sourceCodeLink && (
                    <Link
                      href={project.sourceCodeLink}
                      target="_blank"
                      className="link-pen font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink"
                    >
                      Source code
                    </Link>
                  )}
                </div>
              </div>

              <div className={cn("lg:col-span-7", reversed && "lg:order-1")}>
                <Link
                  href={project.demoLink || project.sourceCodeLink || "#"}
                  target="_blank"
                  aria-label={`Open ${project.name}`}
                  className="group block border-2 border-ink bg-paper shadow-print transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-2.5">
                    <span className="flex gap-1.5" aria-hidden>
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-blue" />
                    </span>
                    {host && (
                      <span className="truncate font-mono text-[11px] text-muted">
                        {host}
                      </span>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.name} screenshot`}
                      width={1280}
                      height={720}
                      className="aspect-video w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
