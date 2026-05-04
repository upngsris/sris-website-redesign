import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "navy" | "gold";
  className?: string;
}

const variantStyles = {
  default: {
    card:  "bg-white border border-slate-200 shadow-sm",
    label: "text-slate-500",
    value: "text-[#0a2342]",
    desc:  "text-slate-400",
    icon:  "bg-[#0a2342]/8 text-[#0a2342]",
  },
  navy: {
    card:  "bg-[#0a2342] border border-[#0a2342]",
    label: "text-white/60",
    value: "text-white",
    desc:  "text-white/40",
    icon:  "bg-white/10 text-white",
  },
  gold: {
    card:  "bg-[#c9a84c]/10 border border-[#c9a84c]/30",
    label: "text-[#8a6a1a]",
    value: "text-[#0a2342]",
    desc:  "text-[#8a6a1a]/70",
    icon:  "bg-[#c9a84c]/20 text-[#8a6a1a]",
  },
};

const trendStyles = {
  up:      "text-emerald-500 bg-emerald-50",
  down:    "text-red-500 bg-red-50",
  neutral: "text-slate-400 bg-slate-50",
};

const trendSymbols = {
  up:      "↑",
  down:    "↓",
  neutral: "→",
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className = "",
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={[
        "rounded-xl p-6 flex flex-col gap-3",
        styles.card,
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div className={`p-2.5 rounded-lg ${styles.icon}`}>{icon}</div>
        )}
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${trendStyles[trend.direction]}`}
          >
            {trendSymbols[trend.direction]} {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className={`text-3xl font-extrabold tracking-tight ${styles.value}`}>
          {value}
        </p>
        <p className={`text-xs font-semibold tracking-wider uppercase mt-1 ${styles.label}`}>
          {label}
        </p>
        {description && (
          <p className={`text-xs mt-1 ${styles.desc}`}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
