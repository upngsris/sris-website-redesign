"use client";

/**
 * ContactForm.tsx
 *
 * Isolated Client Component for the contact form on the Contact page.
 * Kept separate so app/contact/page.tsx can remain a Server Component.
 *
 * Wire up: replace the TODO inside handleSubmit with your actual
 * backend call — e.g. a Supabase insert, a Next.js API route, or
 * an email service like Resend / Nodemailer.
 *
 * Stack: Next.js 15 · Tailwind CSS v4 · TypeScript
 */

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const SUBJECTS = [
  "General Inquiry",
  "Membership Information",
  "Research Collaboration",
  "Events & Workshops",
  "Partnership Opportunities",
  "Other",
] as const;

// ─── Icon ─────────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="size-10 text-[#E8621A]" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ─── Shared input class ───────────────────────────────────────────────────────

const inputClass = `
  w-full border border-gray-300 bg-white px-4 py-2.5
  text-sm text-gray-900 placeholder-gray-400
  transition-colors duration-150
  focus:border-[#1B3A6B] focus:outline-none focus:ring-1 focus:ring-[#1B3A6B]
`.trim();

// ─── ContactForm ──────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  // Generic change handler for all inputs / selects / textareas
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: replace with your actual submission logic, e.g.:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      // or: await supabase.from("contact_messages").insert(form);

      // Simulate network delay for demo purposes
      await new Promise((res) => setTimeout(res, 1000));

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white px-8 py-16 text-center shadow-sm">
        <CheckCircleIcon />
        <h3 className="text-xl font-bold text-[#1B3A6B]">Message Sent!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-gray-500">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible -
          usually within one to two business days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-semibold text-[#E8621A] transition-colors hover:text-[#d05515] focus-visible:outline-none focus-visible:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 bg-white p-8 shadow-sm"
      noValidate
      aria-label="Contact form"
    >
      <h2 className="mb-6 text-xl font-bold text-[#1B3A6B]">Send Us a Message</h2>

      {/* Name row */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold text-gray-700">
            First Name <span className="text-[#C5293E]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold text-gray-700">
            Last Name <span className="text-[#C5293E]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-700">
          Email Address <span className="text-[#C5293E]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Subject */}
      <div className="mb-5">
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-gray-700">
          Subject <span className="text-[#C5293E]">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled>Select a topic</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-gray-700">
          Message <span className="text-[#C5293E]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind…"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mb-4 border border-[#C5293E]/30 bg-[#C5293E]/5 px-4 py-2.5 text-sm text-[#C5293E]" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex w-full items-center justify-center gap-2
          bg-[#E8621A] px-6 py-3
          text-sm font-bold text-white
          transition-all duration-150
          hover:bg-[#d05515] hover:shadow-md
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A] focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message <SendIcon />
          </>
        )}
      </button>
    </form>
  );
}
