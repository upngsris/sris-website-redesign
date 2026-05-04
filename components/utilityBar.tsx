"use client";

/**
 * UtilityBar.tsx
 *
 * A slim top-of-page utility bar for the UPNG SRIS website.
 * Sits ABOVE the Navbar in layout.tsx.
 *
 * Left side  — contextual info: social links + tagline
 * Right side — Member Portal link + "Join SRIS" CTA button
 *
 * Uses the SRIS brand palette defined in globals.css:
 *   --color-primary    #1B3A6B  Deep Navy
 *   --color-secondary  #E8621A  Burnt Orange
 *   --color-accent     #C5293E  Crimson Red
 *
 * Stack: Next.js 15 (App Router) · Tailwind CSS v4 · TypeScript
 */

import Link from "next/link";
import { Button } from "./ui/Button";
import { RightArrowIcon } from "./icons/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ─── Inline SVG icons (no external library needed) ───────────────────────────

/** Facebook "f" mark */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Instagram camera outline */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-3.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Simple "X" / Twitter bird replacement */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** LinkedIn "in" mark */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** LinkedIn "t" mark */
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" ria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-1.894V15.3a5.69 5.69 0 1 1-4.923-5.633v2.906a2.79 2.79 0 1 0 1.923 2.667V2h3.002a4.8 4.8 0 0 0 3.768 1.814v2.872z"/>
    </svg>
  );
}

/** Person / user icon for the portal link */
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/** Right-arrow for the CTA */
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Social media links — update hrefs to your actual SRIS profiles.
 */
const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook",  href: "https://facebook.com/UPNGSRIS",  icon: <FacebookIcon />  },
  { label: "Instagram", href: "https://www.instagram.com/upng.sris/", icon: <InstagramIcon /> },
  { label: "X",         href: "https://x.com/UPNG_SRIS",         icon: <XIcon />         },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/upng-science-research-and-innovation-society/",  icon: <LinkedInIcon />  },
  { label: "TikTok",    href: "https://tiktok.com/@upng_sris",    icon: <TikTokIcon />  },
];

// ─── UtilityBar ───────────────────────────────────────────────────────────────

/**
 * UtilityBar
 *
 * Placement in layout.tsx:
 *
 *   <UtilityBar />   ← this component
 *   <Navbar />
 *   <main>{children}</main>
 */
export default function UtilityBar() {
  return (
    <div
      className="sticky w-full bg-[#104476] text-white"   // Primary navy background
      role="complementary"
      aria-label="Utility bar"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        {/* ── Left: tagline + social icons ── */}
        <div className="flex items-center gap-4">

          {/* Tagline — hidden on very small screens to save space */}
          <p className="hidden text-xs font-medium tracking-wide text-blue-200 sm:block">
            University of Papua New Guinea - Science, Research &amp; Innovation
          </p>

          {/* Divider (desktop only) */}
          <span className="hidden h-3.5 w-px bg-blue-400/40 sm:block" aria-hidden="true" />

          {/* Social icons */}
          <nav aria-label="SRIS social media links">
            <ul className="flex items-center gap-3" role="list">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SRIS on ${label}`}
                    className="text-blue-200 transition-colors duration-150 hover:text-white"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Right: Member Portal + Join CTA ── */}
        <div className="flex items-center gap-3">

          {/*
           * Member Portal link
           * Update href to your actual portal URL (e.g. Supabase auth page).
           */}
          <Link
            href="/portal"
            className="flex items-center gap-1.5 text-xs font-medium text-blue-200 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <UserIcon />
            <span>Member Portal</span>
          </Link>

          {/* Divider */}
          <span className="h-3.5 w-px bg-blue-400/40" aria-hidden="true" />

          {/*
           * "Join SRIS" CTA button
           * Uses --color-secondary (Burnt Orange) as the action colour.
           * Update href to your membership registration page.
           */}

          <Button
              //variant="primary"
              size="sm"
              //rightIcon={<RightArrowIcon size={14} />}
              className="whitespace-nowrap flex-shrink-0 !bg-[#E8621A] !border-[#E8621A] hover:!bg-[#cf5516] hover:!border-[#cf5516] text-white"
            >
              Join SRIS
          </Button>

        </div>
      </div>
    </div>
  );
}
