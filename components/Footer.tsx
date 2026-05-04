/**
 * Footer.tsx
 *
 * Full-width site footer for the UPNG SRIS website.
 *
 * Layout (3-column on desktop, stacked on mobile):
 *  Col 1 — Logo + organisation description + social icons
 *  Col 2 — Quick links (mirrors Navbar primary links)
 *  Col 3 — Get Involved links (portal, join, events, contact)
 *
 * Bottom bar — copyright + legal links
 *
 * Brand palette (from globals.css):
 *   Primary    #1B3A6B  Deep Navy   → background
 *   Secondary  #E8621A  Burnt Orange → CTA button, hover accents
 *   Accent     #C5293E  Crimson Red  → decorative top border
 *   Teal       #2A7A8C  Steel Teal   → subtle divider tints
 *
 * Stack: Next.js 15 (App Router) · Tailwind CSS v4 · TypeScript
 */

import Image from "next/image";
import Link from "next/link";
//import NewsletterForm from "@/app/components/NewsLetterForm";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Quick Links — mirrors the Navbar PRIMARY_LINKS array.
 * Keep these in sync whenever you add new top-level pages.
 */
const QUICK_LINKS: FooterLink[] = [
  { label: "About SRIS",  href: "/about"      },
  { label: "Leaders",   href: "/leaders"   },
  { label: "Education",   href: "/education"  },
  { label: "Innovation",  href: "/innovation" },
  { label: "News",        href: "/news"       },
  { label: "Events",      href: "/events"     },
];

/**
 * Get Involved — action-oriented links for students and visitors.
 */
const GET_INVOLVED_LINKS: FooterLink[] = [
  { label: "Join SRIS",         href: "/join"        },
  { label: "Member Portal",     href: "/portal"      },
  { label: "Upcoming Events",   href: "/events"      },
  { label: "Submit Research",   href: "/submit"      },
  { label: "Partnerships",      href: "/partners"    },
  { label: "Contact Us",        href: "/contact"     },
];

/**
 * Legal / bottom-bar links.
 */
const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy",    href: "/privacy"     },
  { label: "Terms of Use",      href: "/terms"       },
  { label: "Accessibility",     href: "/accessibility"},
];

// ─── Inline SVG Social Icons ──────────────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-1.894V15.3a5.69 5.69 0 1 1-4.923-5.633v2.906a2.79 2.79 0 1 0 1.923 2.667V2h3.002a4.8 4.8 0 0 0 3.768 1.814v2.872z"/>
    </svg>
  );
}

// ─── Sub-component: Footer link column ───────────────────────────────────────

/**
 * FooterLinkGroup
 * Renders a labelled column of footer links.
 */
function FooterLinkGroup({ heading, links }: FooterColumn) {
  return (
    <div>
      {/* Column heading */}
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
        {heading}
      </h3>

      <ul className="flex flex-col gap-2.5" role="list">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-blue-200 transition-colors duration-150 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

/**
 * Footer
 *
 * Placement in layout.tsx (after <main>):
 *
 *   <UtilityBar />
 *   <Navbar />
 *   <main>{children}</main>
 *   <Footer />          ← this component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0D1B2A]" aria-label="Site footer">

      {/* ── Crimson accent line at the very top of the footer ── */}
      <div className="h-1 bg-[#C5293E]" aria-hidden="true" />

      {/* ── Main footer body ── */}
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/*
         * 3-column grid:
         *   - Col 1 (wider): branding
         *   - Col 2: Quick Links
         *   - Col 3: Get Involved
         */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

          {/* ── Column 1: Branding ── */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">

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
                <span className="text-lg font-bold tracking-tight text-white">
                  <span>UPNG </span>SRIS
                </span>
                <span className="text-xs font-normal text-blue-300">
                  Science, Research &amp; Innovation Society
                </span>
              </div>
            </Link>

            {/* Short description */}
            <p className="max-w-sm text-sm leading-relaxed text-blue-200">
              A student-led society at the University of Papua New Guinea dedicated
              to fostering scientific inquiry, cutting-edge research, and a culture
              of innovation across all disciplines.
            </p>

            {/* Social icons */}
            <nav aria-label="SRIS social media links">
              <ul className="flex items-center gap-4" role="list">
                {[
                    { label: "Facebook",  href: "https://facebook.com/UPNGSRIS",          Icon: FacebookIcon  },
                    { label: "Instagram", href: "https://www.instagram.com/upng.sris/",   Icon: InstagramIcon },
                    { label: "X",         href: "https://x.com/UPNG_SRIS",                Icon: XIcon         },
                    { label: "LinkedIn",  href: "https://www.linkedin.com/company/upng-science-research-and-innovation-society/", Icon: LinkedInIcon  },
                    { label: "TikTok",    href: "https://tiktok.com/@upng_sris",           Icon: TikTokIcon    },
                    ].map(({ label, href, Icon }) => (
                    <li key={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`SRIS on ${label}`}
                        className="
                            flex size-8 items-center justify-center rounded-full
                            border border-blue-500/40 text-blue-300
                            transition-all duration-150
                            hover:border-[#E8621A] hover:bg-[#E8621A]/10 hover:text-white
                        "
                        >
                        <Icon />
                        </a>
                    </li>
                ))}
              </ul>
            </nav>

          </div>

          {/* ── Column 2: Quick Links ── */}
          <FooterLinkGroup heading="Quick Links" links={QUICK_LINKS} />

          {/* ── Column 3: Get Involved ── */}
          <FooterLinkGroup heading="Get Involved" links={GET_INVOLVED_LINKS} />

        </div>

        {/* ── Divider ── */}
        <div className="my-10 h-px bg-blue-500/20" aria-hidden="true" />

        {/* ── Newsletter strip ── */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-semibold text-white">
              Stay in the loop
            </p>
            <p className="mt-0.5 text-xs text-blue-300">
              Get updates on research, events, and opportunities at SRIS.
            </p>
          </div>

          {/*
           * NewsletterForm is a Client Component (it owns the onSubmit handler
           * and controlled input state). Importing it here keeps Footer.tsx
           * itself a Server Component for better performance.
           
          <NewsletterForm />
          */}

        </div>

      </div>

      {/* ── Bottom bar: copyright + legal links ── */}
      <div className="border-t border-blue-500/20 bg-[#152f58]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">

          {/* Copyright */}
          <p className="text-xs text-blue-400">
            &copy; {currentYear} <span> </span> SRIS - University of Papua New Guinea.
            All rights reserved.
          </p>

          {/* Legal links */}
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-4" role="list">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-blue-400 transition-colors duration-150 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

    </footer>
  );
}
