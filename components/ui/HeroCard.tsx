import React from "react";
import { RightArrowIcon } from "../icons/Icons";

interface HeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

interface HeroCardProps {
  headline: string;
  subheadline?: string;
  description?: string;
  actions?: HeroAction[];
  backgroundVariant?: "navy" | "light" | "gradient" | "image";
  backgroundImageUrl?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  pattern?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ── Background Overlays ──────────────────────────────────────

const backgrounds: Record<string, string> = {
  navy:
    "bg-[#0a2342] text-white",
  light:
    "bg-slate-50 text-[#0a2342] border border-slate-200",
  gradient:
    "bg-gradient-to-br from-[#0a2342] via-[#0f2f54] to-[#1a3a5c] text-white",
  image:
    "text-white",
};

const actionVariantStyles = {
  primary:
    "bg-[#c9a84c] text-[#0a2342] hover:bg-[#b8972e] font-bold",
  secondary:
    "bg-white/15 text-white border border-white/25 hover:bg-white/25",
  outline:
    "bg-transparent text-[#c9a84c] border border-[#c9a84c]/50 hover:bg-[#c9a84c]/10 font-semibold",
};

const lightActionVariantStyles = {
  primary:
    "bg-[#0a2342] text-white hover:bg-[#1a3a5c] font-bold",
  secondary:
    "bg-white text-[#0a2342] border border-slate-300 hover:bg-slate-50",
  outline:
    "bg-transparent text-[#0a2342] border border-[#0a2342]/30 hover:bg-[#0a2342]/5",
};

// ── Decorative Pattern ───────────────────────────────────────

const DecorativePattern: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="hero-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-grid)" />
  </svg>
);

// ── Main Export ──────────────────────────────────────────────

export const HeroCard: React.FC<HeroCardProps> = ({
  headline,
  subheadline,
  description,
  actions = [],
  backgroundVariant = "navy",
  backgroundImageUrl,
  badge,
  stats = [],
  pattern = true,
  className = "",
  children,
}) => {
  const isDark =
    backgroundVariant === "navy" ||
    backgroundVariant === "gradient" ||
    backgroundVariant === "image";

  const actionStyles = isDark ? actionVariantStyles : lightActionVariantStyles;

  return (
    <section
      className={[
        "relative rounded-2xl overflow-hidden",
        backgrounds[backgroundVariant],
        className,
      ].join(" ")}
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Dark overlay for image variant */}
      {backgroundVariant === "image" && (
        <div className="absolute inset-0 bg-[#0a2342]/70" />
      )}

      {/* Grid pattern */}
      {pattern && <DecorativePattern />}

      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#c9a84c]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
        {/* Badge */}
        {badge && (
          <span
            className={[
              "inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5",
              isDark
                ? "bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30"
                : "bg-[#0a2342]/10 text-[#0a2342] border border-[#0a2342]/15",
            ].join(" ")}
          >
            {badge}
          </span>
        )}

        {/* Headline */}
        <h1
          className={[
            "text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl",
            isDark ? "text-white" : "text-[#0a2342]",
          ].join(" ")}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p
            className={[
              "text-lg md:text-xl font-medium mt-3",
              isDark ? "text-[#c9a84c]" : "text-[#c9a84c]",
            ].join(" ")}
          >
            {subheadline}
          </p>
        )}

        {/* Description */}
        {description && (
          <p
            className={[
              "text-sm md:text-base leading-relaxed mt-4 max-w-2xl",
              isDark ? "text-white/70" : "text-slate-600",
            ].join(" ")}
          >
            {description}
          </p>
        )}

        {/* Custom children slot */}
        {children && <div className="mt-6">{children}</div>}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {actions.map((action, i) => {
              const cls = [
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold",
                "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                actionStyles[action.variant ?? "primary"],
              ].join(" ");

              return action.href ? (
                <a key={i} href={action.href} className={cls}>
                  {action.icon}
                  {action.label}
                  {!action.icon && <RightArrowIcon size={14} />}
                </a>
              ) : (
                <button key={i} onClick={action.onClick} className={cls}>
                  {action.icon}
                  {action.label}
                  {!action.icon && <RightArrowIcon size={14} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Stats row */}
        {stats.length > 0 && (
          <div
            className={[
              "flex flex-wrap gap-6 mt-10 pt-8",
              isDark ? "border-t border-white/10" : "border-t border-slate-200",
            ].join(" ")}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <p
                  className={[
                    "text-2xl md:text-3xl font-extrabold",
                    isDark ? "text-white" : "text-[#0a2342]",
                  ].join(" ")}
                >
                  {stat.value}
                </p>
                <p
                  className={[
                    "text-xs font-semibold tracking-wider uppercase mt-0.5",
                    isDark ? "text-white/50" : "text-slate-400",
                  ].join(" ")}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCard;
