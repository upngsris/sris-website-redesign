"use client"

// ─── CampusMap ────────────────────────────────────────────────────────────────
// Embeds Google Maps for UPNG Waigani Campus using a free iframe embed.
// No API key required — uses the public embed URL.
//
// Usage:
//   import CampusMap from "@/components/CampusMap"
//   <CampusMap />
//
// Props:
//   height     — iframe height in px (default: 360)
//   className  — optional wrapper className
// ─────────────────────────────────────────────────────────────────────────────

interface CampusMapProps {
  height?: number
  className?: string
}

export default function CampusMap({ height = 360, className = "" }: CampusMapProps) {
  // UPNG Waigani Campus coordinates
  const lat = -9.4438
  const lng = 147.1803
  const zoom = 16
  const label = encodeURIComponent("UPNG Waigani Campus")

  // Google Maps embed URL — no API key needed
  const embedUrl =
    `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`

  // External directions link
  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=University+of+Papua+New+Guinea`

  return (
    <div
      className={`relative overflow-hidden rounded-none border border-gray-200 bg-white shadow-sm ${className}`}
      aria-label="Map showing UPNG Waigani Campus location"
    >
      {/* ── Map header bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#0A1628] px-5 py-3">
        <div className="flex items-center gap-2.5">
          {/* Pin icon */}
          <svg
            viewBox="0 0 24 24" fill="none" stroke="#E8621A"
            strokeWidth={2} strokeLinecap="round"
            className="size-4 shrink-0" aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-white">UPNG Waigani Campus</p>
            <p className="text-[11px] text-blue-300/70">Port Moresby, Papua New Guinea</p>
          </div>
        </div>

        {/* Directions button */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-1.5 rounded-sm
            border border-[#E8621A]/60 bg-[#E8621A]/10
            px-3 py-1.5
            text-[11px] font-semibold text-[#E8621A]
            transition-all duration-150
            hover:bg-[#E8621A] hover:text-white hover:border-[#E8621A]
          "
          aria-label="Get directions to UPNG Waigani Campus in Google Maps"
        >
          {/* Arrow icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            className="size-3" aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          Get Directions
        </a>
      </div>

      {/* ── Map iframe ─────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="UPNG Waigani Campus on Google Maps"
        />
      </div>

      {/* ── Footer bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 border-t border-gray-100 bg-gray-50 px-5 py-2.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={1.8} strokeLinecap="round"
          className="size-3.5 shrink-0 text-gray-400" aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-[11px] text-gray-400">
          Science &amp; Technology Building, Waigani Drive, NCD
        </p>
      </div>
    </div>
  )
}
