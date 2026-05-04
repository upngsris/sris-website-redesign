// app/not-found.tsx
// ─── 404 Not Found ────────────────────────────────────────────────────────────
// Rendered automatically by Next.js when notFound() is called or a route
// doesn't exist. No props required.

import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#0A1628] flex flex-col items-center justify-center px-6"
      aria-labelledby="not-found-heading"
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

      {/* ── Top accent line ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, rgba(24,95,165,0.6), rgba(232,98,26,0.8), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Blue glow top-left ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, rgba(24,95,165,0.5) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Orange glow bottom-right ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(232,98,26,0.7) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* Logo */}
        <div className="mb-8 relative h-14 w-14 opacity-90">
          <Image
            src="/assets/Logo.webp"
            alt="UPNG SRIS"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 404 numeral */}
        <p
          className="text-[120px] font-black leading-none tracking-tighter select-none"
          style={{
            background: "#e22641",
            //background: "linear-gradient(135deg, #185FA5 0%, #E8621A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-24 bg-gradient-to-r from-transparent via-[#E8621A]/60 to-transparent" />

        {/* Heading */}
        <h1
          id="not-found-heading"
          className="mb-3 text-2xl font-bold text-white md:text-3xl"
        >
          Page Not Found
        </h1>

        {/* Subtext */}
        <p className="mb-10 text-base leading-relaxed text-blue-200/60 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              bg-[#E8621A] px-6 py-2.5
              text-sm font-semibold text-white
              transition-all duration-150
              hover:bg-[#cf5516] hover:shadow-lg hover:shadow-[#E8621A]/20
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

          <Link
            href="/contact"
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
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { label: "About", href: "/about" },
            { label: "Events", href: "/events" },
            { label: "Research", href: "/research" },
            { label: "Join SRIS", href: "/join" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-blue-300/50 transition-colors hover:text-blue-200 uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
