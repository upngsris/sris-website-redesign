// app/loading.tsx
// ─── Loading Screen ───────────────────────────────────────────────────────────
// Shown automatically by Next.js during page transitions and suspense boundaries.
// Uses the SRIS logo with a CSS spin animation — no JS required.

import Image from "next/image"

export default function Loading() {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        bg-[#0A1628]
      "
      aria-label="Loading"
      role="status"
    >
      {/* Background grid */}
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

      {/* Blue glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(24,95,165,0.8) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Spinning logo */}
      <div className="relative flex items-center justify-center">

        {/* Outer ring pulse */}
        <div
          className="absolute h-28 w-28 rounded-full border border-[#185FA5]/30 animate-ping"
          style={{ animationDuration: "2s" }}
          aria-hidden="true"
        />

        {/* Mid ring */}
        <div
          className="absolute h-24 w-24 rounded-full border border-[#E8621A]/20"
          aria-hidden="true"
        />

        {/* Logo — spins */}
        <div
          className="relative h-16 w-16"
          style={{
            animation: "sris-spin 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        >
          <Image
            src="/assets/Logo.webp"
            alt="SRIS loading"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Label */}
      <div className="mt-8 flex flex-col items-center gap-1">
        <p className="text-sm font-semibold tracking-widest text-white uppercase">
          UPNG SRIS
        </p>
        <p className="text-xs text-blue-300/60 tracking-wider">
          Science, Research &amp; Innovation Society
        </p>
      </div>

      {/* Animated dots */}
      <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#E8621A]"
            style={{
              animation: "sris-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes sris-spin {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes sris-bounce {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
