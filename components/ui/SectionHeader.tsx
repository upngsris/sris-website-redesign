import React from "react";
import { RightArrowIcon } from "../icons/Icons";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  divider?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  align = "left",
  action,
  divider = false,
  className = "",
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div
      className={[
        "flex flex-col gap-2",
        alignClass,
        divider ? "pb-6 border-b border-slate-200" : "",
        className,
      ].join(" ")}
    >
      {/* Badge */}
      {badge && (
        <span className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#c9a84c]/15 text-[#8a6a1a] border border-[#c9a84c]/30">
          {badge}
        </span>
      )}

      {/* Title + inline action */}
      <div
        className={`flex items-end gap-4 w-full ${
          align === "center" ? "justify-center" : "justify-between"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2342] tracking-tight leading-tight">
          {title}
        </h2>

        {action && align !== "center" && (
          <div className="flex-shrink-0 mb-0.5">
            {action.href ? (
              <a
                href={action.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2342]/60 hover:text-[#0a2342] transition-colors group"
              >
                {action.label}
                <RightArrowIcon
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2342]/60 hover:text-[#0a2342] transition-colors group"
              >
                {action.label}
                <RightArrowIcon
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Center action */}
      {action && align === "center" && (
        <div className="mt-1">
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2342]/60 hover:text-[#0a2342] transition-colors group"
            >
              {action.label}
              <RightArrowIcon size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2342]/60 hover:text-[#0a2342] transition-colors group"
            >
              {action.label}
              <RightArrowIcon size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
