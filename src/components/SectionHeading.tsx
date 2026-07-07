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
  return (
    <div id={id} className="mx-auto max-w-6xl scroll-mt-28 px-6 pt-20 lg:px-8">
      <Reveal>
        <span className="inline-block bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-paper">
          {label}
        </span>
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
          <span
            aria-hidden
            className="hidden flex-1 border-t-2 border-dashed border-ink/20 sm:block"
          />
        </div>
      </Reveal>
    </div>
  );
}
