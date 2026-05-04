"use client";

import React, { useState } from "react";
import { ChevronRightIcon } from "../icons/Icons";

// ════════════════════════════════════════════════════════════
// BREADCRUMBS
// ════════════════════════════════════════════════════════════

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
}) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex items-center flex-wrap gap-1">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRightIcon
                size={12}
                className="text-slate-300 flex-shrink-0"
              />
            )}
            {isLast || !item.href ? (
              <span
                className={`text-xs font-medium ${
                  isLast ? "text-[#0a2342] font-semibold" : "text-slate-400"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-xs font-medium text-slate-400 hover:text-[#0a2342] transition-colors duration-150"
              >
                {item.label}
              </a>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

// ════════════════════════════════════════════════════════════
// TABS
// ════════════════════════════════════════════════════════════

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "pills" | "boxed";
  className?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = "underline",
  className = "",
  contentClassName = "",
}) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const activeContent = tabs.find((t) => t.id === active)?.content;

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        role="tablist"
        className={[
          "flex items-center gap-0",
          variant === "underline"
            ? "border-b border-slate-200"
            : variant === "pills"
            ? "gap-1 bg-slate-100 p-1 rounded-xl w-fit"
            : "border border-slate-200 rounded-xl p-1 gap-1 bg-slate-50",
        ].join(" ")}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;

          const baseClass =
            "inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a2342]/30 whitespace-nowrap";

          const variantClass =
            variant === "underline"
              ? isActive
                ? "text-[#0a2342] border-b-2 border-[#0a2342] -mb-px"
                : "text-slate-400 border-b-2 border-transparent -mb-px hover:text-[#0a2342]/70"
              : variant === "pills"
              ? isActive
                ? "bg-white text-[#0a2342] shadow-sm rounded-lg"
                : "text-slate-500 hover:text-[#0a2342] rounded-lg"
              : isActive
              ? "bg-white text-[#0a2342] shadow-sm rounded-lg"
              : "text-slate-500 hover:text-[#0a2342] rounded-lg";

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => handleSelect(tab.id)}
              className={`${baseClass} ${variantClass}`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    isActive
                      ? "bg-[#0a2342] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      {activeContent !== undefined && (
        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={active}
          className={`mt-5 ${contentClassName}`}
        >
          {activeContent}
        </div>
      )}
    </div>
  );
};

export default Tabs;
