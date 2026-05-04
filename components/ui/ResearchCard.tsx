import React from "react";
import { CalendarIcon, TagIcon, ExternalLinkIcon, BookmarkIcon, DocumentIcon } from "../icons/Icons";

export interface ResearchCardProps {
  title: string;
  abstract?: string;
  authors: string[];
  publishedDate?: string;
  journal?: string;
  volume?: string;
  tags?: string[];
  doi?: string;
  pdfUrl?: string;
  citationCount?: number;
  variant?: "default" | "compact" | "featured";
  bookmarked?: boolean;
  onBookmark?: () => void;
  onClick?: () => void;
  className?: string;
}

// ── Default / Full Layout ────────────────────────────────────

const DefaultLayout: React.FC<ResearchCardProps> = ({
  title,
  abstract,
  authors,
  publishedDate,
  journal,
  volume,
  tags = [],
  doi,
  pdfUrl,
  citationCount,
  bookmarked,
  onBookmark,
  onClick,
}) => (
  <div className="flex flex-col h-full">
    {/* Header row: type icon + bookmark */}
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 text-[#c9a84c]">
        <DocumentIcon size={16} />
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
          Research Article
        </span>
      </div>
      {onBookmark && (
        <button
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`p-1.5 rounded-md transition-colors duration-150 flex-shrink-0 ${
            bookmarked
              ? "text-[#c9a84c] bg-[#c9a84c]/10"
              : "text-slate-300 hover:text-[#c9a84c] hover:bg-[#c9a84c]/10"
          }`}
        >
          <BookmarkIcon size={15} />
        </button>
      )}
    </div>

    {/* Title */}
    <h3
      className={`text-base font-bold text-[#0a2342] leading-snug mb-2 ${
        onClick ? "hover:text-[#1a3a5c] cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </h3>

    {/* Authors */}
    <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">
      {authors.join(", ")}
    </p>

    {/* Abstract */}
    {abstract && (
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1 mb-4">
        {abstract}
      </p>
    )}

    {/* Tags */}
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0a2342]/8 text-[#0a2342] border border-[#0a2342]/15"
          >
            <TagIcon size={9} />
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* Footer */}
    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
      <div className="flex items-center gap-3 text-xs text-slate-400">
        {publishedDate && (
          <span className="flex items-center gap-1">
            <CalendarIcon size={12} />
            {publishedDate}
          </span>
        )}
        {journal && (
          <span className="font-medium text-slate-500 truncate max-w-[140px]">
            {journal}{volume ? `, ${volume}` : ""}
          </span>
        )}
        {citationCount !== undefined && (
          <span className="font-semibold text-[#0a2342]">
            {citationCount} citations
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded bg-[#c9a84c]/15 text-[#8a6a1a] hover:bg-[#c9a84c]/25 transition-colors duration-150 flex items-center gap-1"
          >
            PDF
            <ExternalLinkIcon size={10} />
          </a>
        )}
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors duration-150 flex items-center gap-1"
          >
            DOI
            <ExternalLinkIcon size={10} />
          </a>
        )}
      </div>
    </div>
  </div>
);

// ── Compact Layout ───────────────────────────────────────────

const CompactLayout: React.FC<ResearchCardProps> = ({
  title,
  authors,
  publishedDate,
  journal,
  doi,
  onClick,
}) => (
  <div
    className={`flex items-start gap-3 ${onClick ? "cursor-pointer" : ""}`}
    onClick={onClick}
  >
    <div className="mt-0.5 text-[#c9a84c] flex-shrink-0">
      <DocumentIcon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-[#0a2342] leading-snug line-clamp-2 hover:text-[#1a3a5c] transition-colors">
        {title}
      </h4>
      <p className="text-xs text-slate-500 mt-0.5 truncate">{authors.slice(0, 3).join(", ")}{authors.length > 3 ? " et al." : ""}</p>
      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
        {publishedDate && <span>{publishedDate}</span>}
        {journal && <span className="truncate">{journal}</span>}
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.5 text-[#0a2342]/60 hover:text-[#0a2342] transition-colors"
          >
            DOI <ExternalLinkIcon size={10} />
          </a>
        )}
      </div>
    </div>
  </div>
);

// ── Featured Layout ──────────────────────────────────────────

const FeaturedLayout: React.FC<ResearchCardProps> = ({
  title,
  abstract,
  authors,
  publishedDate,
  journal,
  tags = [],
  doi,
  pdfUrl,
  citationCount,
  bookmarked,
  onBookmark,
  onClick,
}) => (
  <div>
    <div className="flex items-start justify-between gap-3 mb-4">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#c9a84c]/20 text-[#8a6a1a] border border-[#c9a84c]/30">
        Featured Research
      </span>
      {onBookmark && (
        <button
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`p-1.5 rounded-md transition-colors duration-150 ${
            bookmarked ? "text-[#c9a84c]" : "text-slate-300 hover:text-[#c9a84c]"
          }`}
        >
          <BookmarkIcon size={16} />
        </button>
      )}
    </div>

    <h2
      className={`text-xl font-extrabold text-[#0a2342] leading-snug mb-3 ${onClick ? "cursor-pointer hover:text-[#1a3a5c]" : ""}`}
      onClick={onClick}
    >
      {title}
    </h2>

    <p className="text-sm font-semibold text-[#c9a84c] mb-2">
      {authors.join(", ")}
    </p>

    {abstract && (
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4">{abstract}</p>
    )}

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0a2342]/8 text-[#0a2342] border border-[#0a2342]/15"
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-2">
      <div className="flex items-center gap-3 text-xs text-slate-400">
        {publishedDate && (
          <span className="flex items-center gap-1">
            <CalendarIcon size={11} />
            {publishedDate}
          </span>
        )}
        {journal && <span className="font-medium text-slate-500">{journal}</span>}
        {citationCount !== undefined && (
          <span className="font-bold text-[#0a2342]">{citationCount} citations</span>
        )}
      </div>
      <div className="flex gap-2">
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#c9a84c] text-[#0a2342] hover:bg-[#b8972e] transition-colors flex items-center gap-1">
            PDF <ExternalLinkIcon size={11} />
          </a>
        )}
        {doi && (
          <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#0a2342]/20 text-[#0a2342] hover:bg-[#0a2342]/5 transition-colors flex items-center gap-1">
            View DOI <ExternalLinkIcon size={11} />
          </a>
        )}
      </div>
    </div>
  </div>
);

// ── Main Export ──────────────────────────────────────────────

export const ResearchCard: React.FC<ResearchCardProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const padding = variant === "compact" ? "p-4" : variant === "featured" ? "p-7" : "p-6";
  const border = variant === "featured"
    ? "border-2 border-[#c9a84c]/30"
    : "border border-slate-200";

  return (
    <article
      className={[
        "bg-white rounded-xl shadow-sm overflow-hidden h-full",
        border,
        padding,
        props.onClick
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {variant === "compact"  && <CompactLayout  variant={variant} {...props} />}
      {variant === "featured" && <FeaturedLayout variant={variant} {...props} />}
      {variant === "default"  && <DefaultLayout  variant={variant} {...props} />}
    </article>
  );
};

export default ResearchCard;
