"use client";

/**
 * Navbar.tsx
 *
 * A top-level navigation bar inspired by the MIT (web.mit.edu) editorial style.
 * Features:
 *  - Wordmark / logo on the left
 *  - Primary nav links (horizontal, desktop)
 *  - Search toggle button
 *  - Collapsible mobile menu (hamburger)
 *  - Active-link highlighting via Next.js `usePathname`
 *
 * Stack: Next.js 15 (App Router) · Tailwind CSS v4 · TypeScript
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Primary navigation links — edit this array to add, remove, or reorder items.
 * Mirrors the top-level sections on web.mit.edu.
 */
const PRIMARY_LINKS: NavLink[] = [
  { label: "About",      href: "/about"      },
  { label: "Leaders",   href: "/leaders"   },
  { label: "Education",  href: "/education"  },
  { label: "Projects", href: "/projects" },
  { label: "News",       href: "/news"       },
  { label: "Events",     href: "/events"     },
  { label: "Contact",    href: "/contact"    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * SearchIcon — a simple inline SVG magnifying glass.
 * Using inline SVG avoids an extra icon-library dependency.
 */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/**
 * HamburgerIcon / CloseIcon — toggled based on menu open state.
 */
function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    /* Close (×) icon */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-6"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    /* Hamburger (≡) icon */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-6"
      aria-hidden="true"
    >
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

/**
 * Navbar
 *
 * Renders:
 *  1. A thin red top-accent bar (signature MIT detail)
 *  2. The main nav row: wordmark | links | search | hamburger
 *  3. An expandable search bar (below the nav row)
 *  4. A full-width mobile drawer (below the nav row)
 *
 * Place this component inside your root `layout.tsx` above `{children}`.
 */
export default function Navbar() {
  const pathname = usePathname();

  // Controls the mobile slide-out menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Controls the inline search bar
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Returns true when the current route matches a link's href. */
  const isActive = (href: string): boolean => pathname === href;

  /** Closes the mobile menu; useful when a link is tapped. */
  const closeMobileMenu = () => setMobileMenuOpen(false);

  /** Handles search form submission. */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Replace with your own search route / logic
      console.log("Searching for:", searchQuery);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <header className="sticky w-full bg-[#EDE9E6] shadow-sm">

      {/* ── 1. Red accent bar (MIT signature detail) ── */}
      <div className="h-1 bg-red-700" aria-hidden="true" />

      {/* ── 2. Main navigation row ── */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary navigation"
      >

        {/* Logo + wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="SRIS — go to homepage"
            >
                <Image
                  src="/assets/Logo.webp"
                  alt="SRIS logo"
                  width={75}
                  height={75}
                  className="object-contain"
                  style={{ width: 75, height: 75 }}
                />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight text-[var(--color-secodary)]">
                  <span>UPNG </span>SRIS
                </span>
                <span className="text-xs font-normal text-[var(--color-primary)]">
                  Science, Research &amp; Innovation Society
                </span>
              </div>
            </Link>

        {/* ── Desktop links (hidden on mobile) ── */}
        <ul
          className="hidden items-center gap-1 lg:flex"
          role="list"
        >
          {PRIMARY_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "px-3 py-2 text-m font-medium transition-colors duration-150",
                  isActive(href)
                    ? "bg-red-700 text-white"                         // active state
                    : "text-[#124475] hover:bg-gray-100 hover:text-gray-900", // idle state
                ].join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right-side action buttons ── */}
        <div className="flex items-center gap-2">

          {/* Search toggle */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setMobileMenuOpen(false); // close menu if open
            }}
            className="p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
          >
            <SearchIcon className="size-5" />
          </button>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setSearchOpen(false); // close search if open
            }}
            className="p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <MenuToggleIcon isOpen={mobileMenuOpen} />
          </button>

        </div>
      </nav>

      {/* ── 3. Expandable search bar ── */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-2xl gap-3"
            role="search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search
            </label>
            <input
              id="site-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people, pages, research…"
              autoFocus
              className="w-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-m focus:border-[#E8621A] focus:outline-none focus:ring-1 focus:ring-[#E8621A]"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center gap-1.5 bg-[#E8621A] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#d05515]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#E8621A] focus-visible:ring-offset-2
                focus-visible:ring-offset-[#1B3A6B]"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* ── 4. Mobile menu drawer ── */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white px-6 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {PRIMARY_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobileMenu}
                  className={[
                    "block rounded px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive(href)
                      ? "bg-red-700 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  ].join(" ")}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </header>
  );
}
