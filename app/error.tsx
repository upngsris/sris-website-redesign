"use client"
// app/error.tsx
// ─── Error Boundary ───────────────────────────────────────────────────────────
// Next.js requires this to be a Client Component ("use client").
// Receives `error` and `reset` props automatically — reset() re-renders the
// segment, error.message shows the underlying error in dev.

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error tracking service here (e.g. Sentry)
    console.error("[SRIS Error]", error)
  }, [error])

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#0A1628] flex flex-col items-center justify-center px-6"
      aria-labelledby="error-heading"
      role="alert"
    >
      {/* ── Background grid ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* ── Top accent line — red tint for error state ────────────────── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, rgba(197,41,62,0.8), rgba(232,98,26,0.6), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Red glow top-left ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(197,41,62,0.6) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Orange glow bottom-right ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(232,98,26,0.5) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* Logo — slightly desaturated for error state */}
        <div className="mb-8 relative h-14 w-14 opacity-70">
          <Image
            src="/assets/Logo.webp"
            alt="UPNG SRIS"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Warning icon */}
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#C5293E" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" className="size-8">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          id="error-heading"
          className="mb-3 text-2xl font-bold text-white md:text-3xl"
        >
          Something Went Wrong
        </h1>

        {/* Subtext */}
        <p className="mb-3 text-base leading-relaxed text-blue-200/60 max-w-sm">
          An unexpected error occurred. You can try again or return to the homepage.
        </p>

        {/* Error digest — shown in both dev and prod for support reference */}
        {error.digest && (
          <p className="mb-8 font-mono text-[11px] text-blue-300/30">
            Error ID: {error.digest}
          </p>
        )}

        {!error.digest && <div className="mb-8" />}

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Try again — calls Next.js reset() to re-render the segment */}
          <button
            onClick={reset}
            className="
              inline-flex items-center gap-2
              bg-[#E8621A] px-6 py-2.5
              text-sm font-semibold text-white
              transition-all duration-150
              hover:bg-[#cf5516] hover:shadow-lg hover:shadow-[#E8621A]/20
              active:scale-95
              cursor-pointer
            "
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              border border-blue-500/40
              px-6 py-2.5
              text-sm font-semibold text-blue-200
              transition-all duration-150
              hover:border-blue-400 hover:bg-blue-500/10 hover:text-white
              active:scale-95
            "
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Support link */}
        <p className="mt-10 text-xs text-blue-300/40">
          Issue persisting?{" "}
          <Link
            href="/contact"
            className="text-blue-300/60 underline underline-offset-2 hover:text-blue-200 transition-colors"
          >
            Contact the SRIS team
          </Link>
        </p>

      </div>
    </div>
  )
}
