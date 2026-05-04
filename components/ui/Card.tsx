import React from "react";

// ── Base Card ────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles = {
  default:  "bg-white border border-slate-200 shadow-sm",
  bordered: "bg-white border-2 border-[#0a2342]/20",
  elevated: "bg-white shadow-md hover:shadow-lg transition-shadow duration-300",
  flat:     "bg-slate-50 border border-slate-100",
};

const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
  as: Tag = "div",
}) => {
  return (
    <Tag
      onClick={onClick}
      className={[
        "rounded-xl overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        hover
          ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          : "",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
};

// ── Card Sub-components ──────────────────────────────────────

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardBody: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => (
  <div className={className}>{children}</div>
);

export const CardFooter: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`mt-4 pt-4 border-t border-slate-100 flex items-center justify-between ${className}`}
  >
    {children}
  </div>
);

export const CardDivider: React.FC<{ className?: string }> = ({
  className = "",
}) => <hr className={`border-slate-100 my-4 ${className}`} />;

export default Card;
