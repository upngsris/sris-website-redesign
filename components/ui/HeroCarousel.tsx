"use client";

// components/ui/HeroCarousel.tsx
//
// A polished image carousel for the Hero section right panel.
// Receives pre-fetched slide data (from Sanity via the parent Hero component).
// Features:
//  - Auto-play with pause-on-hover
//  - Dot + arrow navigation
//  - Smooth CSS transitions (no external animation library needed)
//  - Fully accessible (aria-live, keyboard arrows)
//  - Category badge + title + date overlay on each slide

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselSlide = {
  /** Resolved image URL (use Sanity's urlFor().url() before passing in) */
  imageUrl: string;
  imageAlt: string;
  category: string;
  slideTitle: string;
  date?: string;
  href?: string;
};

export type HeroCarouselProps = {
  slides: CarouselSlide[];
  autoplay?: boolean;
  /** Interval in milliseconds. Default: 4000 */
  autoplayInterval?: number;
  className?: string;
};

// ─── Category badge colours ───────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Event:    "bg-[#E8621A]   text-white",
  Project:  "bg-[#185FA5]   text-white",
  Workshop: "bg-emerald-600 text-white",
  Research: "bg-violet-600  text-white",
  News:     "bg-slate-600   text-white",
  Seminar:  "bg-amber-500   text-white",
};

const categoryColor = (cat: string) =>
  CATEGORY_COLORS[cat] ?? "bg-slate-700 text-white";

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="
        flex h-7 w-7 items-center justify-center rounded-full
        bg-white/10 text-white backdrop-blur-sm
        border border-white/20
        transition-all duration-150
        hover:bg-white/25 hover:border-white/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
      "
    >
      {direction === "prev" ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

// ─── HeroCarousel ─────────────────────────────────────────────────────────────

export default function HeroCarousel({
  slides,
  autoplay = true,
  autoplayInterval = 4000,
  className = "",
}: HeroCarouselProps) {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("left");
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  // ── Navigation ─────────────────────────────────────────────────────

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "left") => {
      setAnimDir(dir);
      setActive((index + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(active + 1, "left"),  [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, "right"), [active, goTo]);

  // ── Auto-play ───────────────────────────────────────────────────────

  useEffect(() => {
    if (!autoplay || paused) return;
    timerRef.current = setInterval(next, autoplayInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay, paused, next, autoplayInterval]);

  // ── Keyboard navigation ─────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
  };

  if (!slides || count === 0) return null;

  const slide = slides[active];

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div
      className={`relative flex flex-col gap-3 h-full w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Recent activities"
    >

      {/* ── Main card ─────────────────────────────────────────────── */}
      <div
        className="
          relative w-full flex-1 overflow-hidden rounded
          shadow-[0_8px_40px_rgba(0,0,0,0.45)]
          border border-white/10
          bg-[#0A1628]
        "
        style={{ minHeight: "320px" }}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Image */}
        <Image
          key={active}                     // remount = instant swap, CSS handles fade
          src={slide.imageUrl}
          alt={slide.imageAlt}
          fill
          className="object-cover object-center transition-opacity duration-500"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority={active === 0}
        />

        {/* Dark gradient overlay — bottom-up so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.4) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Slide counter — top right */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-white/70 backdrop-blur-sm">
          {active + 1} / {count}
        </div>

        {/* Content overlay — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Category badge */}
          <span
            className={`
              mb-2 inline-block rounded-full px-2.5 py-0.5
              text-[10px] font-bold uppercase tracking-wider
              ${categoryColor(slide.category)}
            `}
          >
            {slide.category}
          </span>

          {/* Title */}
          {slide.href ? (
            <Link
              href={slide.href}
              className="block text-sm font-bold leading-snug text-white hover:text-[#E8621A] transition-colors duration-150 line-clamp-2"
              tabIndex={-1}
            >
              {slide.slideTitle}
            </Link>
          ) : (
            <p className="text-sm font-bold leading-snug text-white line-clamp-2">
              {slide.slideTitle}
            </p>
          )}

          {/* Date */}
          {slide.date && (
            <p className="mt-1 text-[11px] font-medium text-white/50">
              {slide.date}
            </p>
          )}
        </div>
      </div>

      {/* ── Controls row: arrows + dots ───────────────────────────── */}
      <div className="flex items-center justify-between px-1">

        {/* Arrows */}
        <div className="flex items-center gap-1.5">
          <ArrowButton direction="prev" onClick={prev} />
          <ArrowButton direction="next" onClick={next} />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > active ? "left" : "right")}
              className={`
                rounded-full transition-all duration-300 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white/60
                ${i === active
                  ? "w-5 h-1.5 bg-[#E8621A]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }
              `}
            />
          ))}
        </div>

        {/* Auto-play pause indicator */}
        <div className={`text-[10px] font-medium transition-opacity duration-200 ${paused ? "opacity-60 text-white/60" : "opacity-0"}`}>
          paused
        </div>
      </div>

      {/* ── Thumbnail strip (shows all slides at a glance) ─────────── 
      <div className="flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? "left" : "right")}
            aria-label={`Preview: ${s.slideTitle}`}
            className={`
              relative flex-1 overflow-hidden rounded-lg
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A]
              ${i === active
                ? "ring-2 ring-[#E8621A] opacity-100"
                : "opacity-40 hover:opacity-70"
              }
            `}
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={s.imageUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="80px"
              aria-hidden="true"
            />
          </button>
        ))}
      </div> */}

    </div>
  );
}
