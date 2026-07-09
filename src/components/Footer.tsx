import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandWhatsapp,
  IconBrandTelegram,
} from "@tabler/icons-react";

const SOCIALS = [
  { label: "LinkedIn", href: "https://sujal.info/linkedin", Icon: IconBrandLinkedin },
  { label: "Instagram", href: "https://sujal.info/instagram", Icon: IconBrandInstagram },
  { label: "GitHub", href: "https://sujal.info/github", Icon: IconBrandGithub },
  { label: "WhatsApp", href: "https://sujal.info/whatsapp", Icon: IconBrandWhatsapp },
  { label: "Telegram", href: "https://sujal.info/telegram", Icon: IconBrandTelegram },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 py-12 sm:flex-row sm:items-center">
          <p className="max-w-sm font-display text-3xl font-bold leading-snug tracking-tight [text-wrap:balance]">
            Got a problem worth solving? Write it down.
          </p>
          <Link
            href="#"
            data-sfx="stamp"
            className="border-2 border-paper px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-paper hover:text-ink"
          >
            Back to top ↑
          </Link>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-paper/20 py-8 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            © {year} Sujal Chaudhary · New Delhi, India
          </p>
          <div className="flex gap-4">
            {SOCIALS.map(({ label, href, Icon }, i) => (
              <Link
                key={label}
                target="_blank"
                href={href}
                aria-label={label}
                className={cn(
                  "flex h-9 w-9 items-center justify-center border border-paper/30 text-paper/80 transition-all duration-200 hover:-translate-y-1 hover:border-blue hover:bg-blue hover:text-paper",
                  // Each sticker peels off at its own angle
                  ["hover:-rotate-6", "hover:rotate-6", "hover:-rotate-3", "hover:rotate-[8deg]", "hover:rotate-3"][i % 5]
                )}
              >
                <Icon className="h-4.5 w-4.5" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
