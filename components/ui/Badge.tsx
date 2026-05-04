import React from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "gold"
  | "success"
  | "warning"
  | "danger"
  | "muted";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:   "bg-[#0a2342]/8 text-[#0a2342] border border-[#0a2342]/15",
  primary:   "bg-[#0a2342] text-white border border-[#0a2342]",
  gold:      "bg-[#c9a84c]/15 text-[#8a6a1a] border border-[#c9a84c]/40",
  success:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning:   "bg-amber-50 text-amber-700 border border-amber-200",
  danger:    "bg-red-50 text-red-700 border border-red-200",
  muted:     "bg-slate-100 text-slate-500 border border-slate-200",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#0a2342]",
  primary: "bg-white",
  gold:    "bg-[#c9a84c]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger:  "bg-red-500",
  muted:   "bg-slate-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[10px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className = "",
  dot = false,
}) => {
  return (
    <span
      className={[
        "inline-flex items-center font-semibold tracking-wider uppercase rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
