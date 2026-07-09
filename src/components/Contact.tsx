"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import { sfx } from "@/lib/sfx";

const CONTACT_DETAILS = [
  { label: "Location", value: "India", href: null, copy: null },
  {
    label: "Email",
    value: "me@sujal.info",
    href: "https://sujal.info/email",
    copy: "me@sujal.info",
  },
  {
    label: "Phone",
    value: "+91 96678 35044",
    href: "https://sujal.info/phone",
    copy: "+91 96678 35044",
  },
];

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "phoneNo", label: "Phone", type: "tel", placeholder: "Your phone number" },
  { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
] as const;

const inputClasses =
  "w-full border-2 border-ink bg-paper px-3.5 py-3 text-ink placeholder:text-faint transition-all duration-200 focus:outline-none focus:border-blue focus:shadow-print-blue-sm";

function isFieldDone(id: string, value: string) {
  const v = value.trim();
  if (!v) return false;
  if (id === "email") return /^\S+@\S+\.\S+$/.test(v);
  if (id === "phoneNo") return v.replace(/\D/g, "").length >= 7;
  return true;
}

/** Hand-drawn checkmark that inks itself in when a field is filled */
function DrawnCheck() {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
      <motion.path
        d="M4 13 L10 19 L20 5"
        fill="none"
        className="stroke-blue"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}

/** Copies a value to the clipboard with a pencil scratch and a brief "copied" note */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    sfx.scratch();
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      data-sfx="none"
      onClick={copy}
      aria-label={`Copy ${label.toLowerCase()}`}
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
        copied ? "text-blue" : "text-faint hover:text-blue"
      )}
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const ticked = useRef(new Set<string>());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Soft pen tick the first time a field is completed (re-arms if emptied)
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (isFieldDone(id, value)) {
      if (!ticked.current.has(id)) {
        ticked.current.add(id);
        sfx.tick();
      }
    } else {
      ticked.current.delete(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phoneNo === "" ||
      formData.subject === "" ||
      formData.message === ""
    ) {
      setSubmissionMessage("Please fill all the fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const response = await fetch("https://api.sujal.info/api/portfolio/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        sfx.ding();
        setSubmissionMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          subject: "",
          message: "",
        });
        ticked.current.clear();
      } else {
        sfx.buzz();
        setSubmissionMessage("Failed to send the message. Please try again.");
      }
    } catch {
      sfx.buzz();
      setSubmissionMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const succeeded = submissionMessage.includes("successfully");
  const wordCount = formData.message.trim()
    ? formData.message.trim().split(/\s+/).length
    : 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Always open to discussing product work, collaborations, or
            partnership opportunities. Drop a line — I usually reply within a
            day.
          </p>

          <dl className="mt-10 space-y-6">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className="flex items-baseline gap-4">
                <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-blue">
                  {item.label}
                </dt>
                <dd className="flex items-baseline gap-3 text-lg font-medium">
                  {item.href ? (
                    <Link href={item.href} className="link-pen">
                      {item.value}
                    </Link>
                  ) : (
                    item.value
                  )}
                  {item.copy && (
                    <CopyButton value={item.copy} label={item.label} />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="border-2 border-ink bg-paper p-6 shadow-print sm:p-8"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink"
                  >
                    {field.label}
                    {isFieldDone(field.id, formData[field.id]) && <DrawnCheck />}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <div className="mb-2 flex items-baseline justify-between">
                  <label
                    htmlFor="message"
                    className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink"
                  >
                    Message
                    {isFieldDone("message", formData.message) && <DrawnCheck />}
                  </label>
                  {wordCount > 0 && (
                    <span
                      aria-hidden
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint"
                    >
                      ≈ {wordCount} {wordCount === 1 ? "word" : "words"} ✎
                    </span>
                  )}
                </div>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(inputClasses, "resize-none")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 border-2 border-ink bg-blue px-8 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-paper shadow-print-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send message →"}
            </button>

            <p role="status" aria-live="polite" className="mt-5 min-h-5">
              {submissionMessage && (
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.15em]",
                    succeeded ? "text-blue" : "text-red"
                  )}
                >
                  {succeeded ? "✓ " : "✗ "}
                  {submissionMessage}
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
