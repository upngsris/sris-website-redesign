// components/ui/Hero.tsx

import Image from "next/image"
import Link from "next/link"
import HeroCarousel, { CarouselSlide } from "./HeroCarousel"

// ─── Types ────────────────────────────────────────────────────────────────────

export type BreadcrumbItem = {
  label: string
  href: string
}

export type HeroBadge = {
  label: string
}

export type HeroCTA = {
  label: string
  href: string
  variant: "primary" | "secondary"
}

export type HeroProps = {
  /** Background image path */
  backgroundImage: string
  /** Breadcrumb shown above the hero badge */
  breadcrumb?: BreadcrumbItem[]
  /** Small badge/pill shown above the headline */
  badge?: HeroBadge
  /** Main headline */
  headline: string
  /** Highlighted/accented portion of the headline (must appear in headline string) */
  accentText?: string
  /** Subheading paragraph */
  subheading?: string
  /** Up to 2 CTA buttons */
  ctas?: HeroCTA[]
  /** Optional stat row */
  stats?: { value: string; label: string }[]
  /** Decorative background variant */
  variant?: "default" | "minimal" | "home"
  /** Custom className for the outer section */
  className?: string
  /**
   * Carousel slides fetched from Sanity CMS.
   * Pass resolved CarouselSlide[] — use urlFor(slide.image).url()
   * before passing imageUrl in.
   * Only rendered when variant === "home" and at least 3 slides provided.
   */
  carouselSlides?: CarouselSlide[]
  /** Override carousel auto-play interval in ms. Default: 4000 */
  carouselInterval?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero({
  backgroundImage,
  breadcrumb,
  badge,
  headline,
  accentText,
  subheading,
  ctas = [],
  stats = [],
  variant = "default",
  className = "",
  carouselSlides = [],
  carouselInterval = 4000,
}: HeroProps) {

  const isHome      = variant === "home"
  const showCarousel = isHome && carouselSlides.length >= 3

  // Split headline to inject accent colour span
  const renderHeadline = () => {
    if (!accentText || !headline.includes(accentText)) {
      return <>{headline}</>
    }
    const parts = headline.split(accentText)
    return (
      <>
        {parts[0]}
        <span className="text-[#E8621A]">{accentText}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      className={`
        relative w-full overflow-hidden
        bg-[#0A1628]
        ${isHome ? "min-h-[80vh] flex flex-col justify-center" : "md:py-28"}
        ${className}
      `}
      aria-label="Page hero"
    >

      {/* ── Background image ────────────────────────────────────────── */}
      {backgroundImage && (
        <>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover object-right"
              priority
              quality={85}
            />
          </div>

          {/*
            Gradient fade:
            – Left half: solid navy (content readable)
            – Right half: transparent (image visible)
            When the carousel is shown we push the fade further left so the
            right panel area stays dark enough for the carousel card.
          */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: showCarousel
                ? "linear-gradient(90deg, #0A1628 0%, #0A1628 35%, rgba(10,22,40,0.88) 55%, rgba(10,22,40,0.55) 75%, rgba(10,22,40,0.3) 100%)"
                : "linear-gradient(90deg, #0A1628 0%, #0A1628 40%, rgba(10,22,40,0.85) 60%, rgba(10,22,40,0.3) 80%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Background decorations ───────────────────────────────────── */}
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

      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(24,95,165,0.5) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div
        className={`pointer-events-none absolute -bottom-24 -right-24 rounded-full ${
          isHome ? "h-[500px] w-[500px] opacity-20" : "h-[320px] w-[320px] opacity-10"
        }`}
        style={{ background: "radial-gradient(circle, rgba(232,98,26,0.7) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Horizontal accent line at top */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#185FA5]/60 via-[#E8621A]/80 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">

        {/*
          Two-column layout on home variant when carousel has slides:
            Left  → headline, subheading, CTAs, stats  (flex-1, min-w-0)
            Right → HeroCarousel                        (fixed width)

          On non-home variants (or no carousel) it collapses to single column.
        */}
        <div className={`flex gap-10 lg:gap-16 ${showCarousel ? "flex-col lg:flex-row lg:items-stretch" : "items-center"}`}>

          {/* ── LEFT: text content ────────────────────────────────── */}
          <div className={`${showCarousel ? "flex-1 min-w-0 lg:max-w-[52%]" : isHome ? "max-w-3xl" : "max-w-2xl"}`}>

            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-1.5 text-xs text-blue-300/60">
                  {breadcrumb.map((item, i) => {
                    const isLast = i === breadcrumb.length - 1
                    return (
                      <li key={item.href} className="flex items-center gap-1.5">
                        {isLast ? (
                          <span className="text-blue-200/90" aria-current="page">
                            {item.label}
                          </span>
                        ) : (
                          <>
                            <Link href={item.href} className="transition-colors hover:text-blue-200">
                              {item.label}
                            </Link>
                            <span aria-hidden="true">/</span>
                          </>
                        )}
                      </li>
                    )
                  })}
                </ol>
              </nav>
            )}

            {/* Badge */}
            {badge && (
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#185FA5]/50 bg-[#185FA5]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-blue-300">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8621A]" aria-hidden="true" />
                  {badge.label}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1
              className={`
                font-bold leading-[1.1] tracking-tight text-white
                ${isHome ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl"}
                mb-5
              `}
            >
              {renderHeadline()}
            </h1>

            {/* Subheading */}
            {subheading && (
              <p
                className={`
                  leading-relaxed text-blue-200/70
                  ${isHome ? "text-lg md:text-xl" : "text-base md:text-lg"}
                  mb-8 max-w-xl
                `}
              >
                {subheading}
              </p>
            )}

            {/* CTAs */}
            {ctas.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-10">
                {ctas.map((cta) =>
                  cta.variant === "primary" ? (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className="
                        inline-flex items-center gap-2
                        bg-[#E8621A] px-5 py-2.5
                        text-sm font-semibold text-white
                        transition-all duration-150
                        hover:bg-[#cf5516] hover:shadow-lg hover:shadow-[#E8621A]/20
                        active:scale-95
                      "
                    >
                      {cta.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className="
                        inline-flex items-center gap-2
                        border border-blue-500/40
                        px-5 py-2.5
                        text-sm font-semibold text-blue-200
                        transition-all duration-150
                        hover:border-blue-400 hover:bg-blue-500/10 hover:text-white
                        active:scale-95
                      "
                    >
                      {cta.label}
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Stats row */}
            {stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wider text-blue-300/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Carousel ───────────────────────────────────── */}
          {showCarousel && (
            <div className="w-full lg:w-[42%] xl:w-[40%] flex-shrink-0 self-stretch flex flex-col">
              {/*
                Label above the carousel — mirrors the Stellar "Editor's choice"
                treatment: a small eyebrow line that frames the panel.
              */}
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                Recent Activities
              </p>

              <HeroCarousel
                slides={carouselSlides}
                autoplay
                autoplayInterval={carouselInterval}
                className="flex-1"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
