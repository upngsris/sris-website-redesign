"use client";

/**
 * NewsletterForm.tsx
 *
 * Isolated Client Component for the newsletter subscription form in Footer.tsx.
 * Kept separate so Footer.tsx can remain a Server Component, which is better
 * for performance — only this small piece ships interactive JS to the browser.
 *
 * Wiring up: replace the console.log inside handleSubmit with your actual
 * subscription logic, e.g. a Supabase insert or a Mailchimp API call.
 */

import { useState } from "react";

// ─── Icon ─────────────────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── NewsletterForm ───────────────────────────────────────────────────────────

export default function NewsLetterForm() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");

  /** Replace this with your real subscription logic. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return;

    try {
      // TODO: call your API / Supabase / Mailchimp here
      // e.g. await supabase.from("subscribers").insert({ email });
      console.log("Subscribing:", email);
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <p className="text-sm font-medium text-[#3AADD4]">
        ✓ You&apos;re subscribed! We&apos;ll be in touch soon.
      </p>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
      aria-label="Newsletter subscription"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>

      <input
        id="footer-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="
          w-full border border-blue-500/40 bg-white/5
          px-4 py-2 text-sm text-white placeholder-blue-400
          focus:border-[#3AADD4] focus:outline-none focus:ring-1 focus:ring-[#3AADD4]
        "
      />

      <button
        type="submit"
        className="
          flex shrink-0 items-center justify-center gap-1.5
          bg-[#E8621A] px-4 py-2
          text-sm font-semibold text-white
          transition-colors duration-150 hover:bg-[#d05515]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[#E8621A] focus-visible:ring-offset-2
          focus-visible:ring-offset-[#1B3A6B]
        "
      >
        Subscribe <ArrowRightIcon />
      </button>

      {/* Inline error message */}
      {error && (
        <p className="mt-1 text-xs text-[#C5293E]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
