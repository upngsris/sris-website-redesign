
import { client }     from "@/sanity/lib/client"
import { urlFor }     from "@/sanity/lib/image"
import { CarouselSlide } from "@/components/ui/HeroCarousel"
import Hero from "@/components/ui/Hero";
import { homeHero } from "@/lib/heroConfig";
import Link from "next/link";
import React from "react"


// GROQ query — fetches the single heroCarousel document
  const CAROUSEL_QUERY = `
    *[_type == "heroCarousel"][0] {
      autoplayInterval,
      slides[] {
       "imageUrl": image.asset->url,
        "imageAlt": imageAlt,
        category,
        "slideTitle": slideTitle,
        date,
       href
      }
    }
  `
//----------Type------------------
  type OfferingCard = {
  icon: React.ReactNode
  title: string
  description: string
};

type NewsArticle = {
  date: string
  category: string
  title: string 
  excerpt: string
  href: string
};

type UpcomingEvent = {
      day: string,
    month: string,
    title: string,
    time: string,
    location: string,
    href: string,
};

type RawSlide = {
  imageUrl: string;
  imageAlt: string;
  slideTitle: string;
  category: string;
  date: string;
  href: string;
};
// ─── Data ─────────────────────────────────────────────────────────────────────

const OFFERINGS: OfferingCard[] = [
  { icon: <MicroscopeIcon />, title: "Lab Practicals",        description: "Hands-on laboratory sessions that bridge theoretical knowledge with practical application across scientific disciplines." },
  { icon: <LightbulbIcon />,  title: "Research Projects",     description: "Participate in innovative projects that tackle real-world challenges facing Papua New Guinea and the Pacific." },
  { icon: <UsersIcon />,      title: "Professional Coaching", description: "Mentorship and coaching to develop the academic and professional skills needed to thrive in science careers." },
  { icon: <RocketIcon />,     title: "Innovation Initiatives",description: "Support for student-led ideas — from amateur rocketry to smart farming solutions powered by technology." },
  { icon: <NetworkIcon />,    title: "Networking Events",     description: "Regular events connecting students with industry professionals, researchers, and potential collaborators." },
  { icon: <BookOpenIcon />,   title: "Peer Learning",         description: "A collaborative environment where students learn from each other and grow together academically." },
];

const NEWS_ARTICLES: NewsArticle[] = [
  {
    date: "July 27, 2025",
    category: "Innovation",
    title: "SRIS Launches Amateur Rocket Project",
    excerpt:
      "SRIS kicks off its first amateur rocketry initiative, empowering UPNG students to explore ideas, build prototypes, and grow as future innovators.",
    href: "/news/rocket-project",
  },
  {
    date: "July 27, 2025",
    category: "Research",
    title: "SRIS Developing Smart Farm Initiative",
    excerpt:
      "Blending agriculture with technology, students are exploring sustainable solutions using sensors, automation, and data to improve PNG farming practices.",
    href: "/news/smart-farm",
  },
  {
    date: "August 17, 2025",
    category: "Events",
    title: "Networking Night for Science Students",
    excerpt:
      "SRIS is hosting a Networking Night connecting students with industry guests, mentors, and professionals to inspire future careers and collaborations.",
    href: "/news/networking-night",
  },
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    day: "14",
    month: "Sep",
    title: "Research Methodology Workshop",
    time: "10:00 AM – 1:00 PM",
    location: "UPNG Science Block, Room 204",
    href: "/events/research-workshop",
  },
  {
    day: "21",
    month: "Sep",
    title: "Smart Farming Prototype Demo",
    time: "2:00 PM – 4:30 PM",
    location: "UPNG Engineering Lab",
    href: "/events/smart-farm-demo",
  },
  {
    day: "05",
    month: "Oct",
    title: "SRIS Annual Networking Night",
    time: "6:00 PM – 9:00 PM",
    location: "UPNG Main Hall",
    href: "/events/networking-night",
  },
  {
    day: "19",
    month: "Oct",
    title: "Rocketry Build Session #3",
    time: "9:00 AM – 12:00 PM",
    location: "UPNG Open Grounds",
    href: "/events/rocket-build-3",
  },
];

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function ArrowRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-4 shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MicroscopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M6 18h8M3 22h18M14 22v-4M9.5 8.5l5-5M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
      <path d="m10 9 4-4"/>
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.3 18 9.2 18 8A6 6 0 0 0 6 8c0 1.2.3 2.3 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6M10 22h4"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

export default async function Home() {
   const carousel = await client.fetch(CAROUSEL_QUERY)

   const carouselSlides: CarouselSlide[] = (carousel?.slides ?? []).map(
      (s: RawSlide) => ({
       imageUrl:   s.imageUrl,
        imageAlt:   s.imageAlt ?? "",
        category:   s.category,
        slideTitle: s.slideTitle,
        date:       s.date,
        href:       s.href,
      })
    )
  return (
    <div>
        <Hero {...homeHero}
          carouselSlides={carouselSlides}
          carouselInterval={(carousel?.autoplayInterval ?? 4) * 1000}
         />
        {/* ════════════════════════════════════════════════════════════════════
              3. MISSION
              Two-column layout: editorial text left, pull-quote / image right.
          ════════════════════════════════════════════════════════════════════ */}
          <section className="bg-[#EDE9E6] py-20 md:py-28" aria-labelledby="mission-heading">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

                {/* Left: text */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
                    Who We Are
                  </p>
                  <h2 id="mission-heading" className="mb-6 text-3xl font-bold leading-snug text-[#1B3A6B] md:text-4xl">
                    Welcome to UPNG SRIS
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-gray-600">
                    <p>
                      We are a student-run society based at the University of Papua New Guinea,
                      Waigani Main Campus. Our mission is to bridge the gap between theoretical
                      knowledge and real-world scientific practice.
                    </p>
                    <p>
                      Through lab practicals, research projects, professional coaching, and
                      networking, we create an environment where scientific curiosity thrives
                      and innovative ideas can become reality.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/about"
                      className="flex items-center gap-2 text-sm font-semibold text-[#E8621A] transition-colors hover:text-[#d05515]"
                    >
                      Read our full story <ArrowRightIcon />
                    </Link>
                    <Link
                      href="/leaders#founders"
                      className="flex items-center gap-2 text-sm font-semibold text-[#1B3A6B] transition-colors hover:text-[#2A7A8C]"
                    >
                      Meet our founders <ArrowRightIcon />
                    </Link>
                  </div>
                </div>

                {/* Right: pull-quote card */}
                <div className="relative">
                  {/* Decorative offset border */}
                  <div className="absolute -left-3 -top-3 h-full w-full border-2 border-[#3AADD4]/30" aria-hidden="true" />
                  <blockquote className="relative bg-[#1B3A6B] p-8 text-white shadow-xl">
                    <p className="mb-6 text-4xl font-bold leading-none text-[#E8621A]"></p>
                    <p className="text-lg font-medium leading-relaxed">
                      Our purpose is to create an environment where scientific curiosity
                      thrives and innovative ideas become reality - right here in Papua
                      New Guinea.
                    </p>
                    <footer className="mt-6 border-t border-blue-500/30 pt-4 text-sm text-blue-300">
                      - SRIS Pioneer Coordinators, UPNG
                    </footer>
                  </blockquote>
                </div>

              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════
              4. WHAT WE DO
              6-card grid — one card per programme / offering.
          ════════════════════════════════════════════════════════════════════ */}
          <section className="py-20 bg-[#E8EDF2] md:py-28" aria-labelledby="offerings-heading">
            <div className="mx-auto max-w-7xl px-6">

              {/* Section header */}
              <div className="mb-14 max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
                  Programmes &amp; Opportunities
                </p>
                <h2 id="offerings-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">
                  What We Do
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-500">
                  From bench to boardroom, SRIS provides the tools, community, and
                  experiences to help you grow as a scientist and innovator.
                </p>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {OFFERINGS.map(({ icon, title, description }) => (
                  <article
                    key={title}
                    className="
                      group border border-none bg-white p-6
                      shadow-lg transition-all duration-200
                      hover:-translate-y-1 hover:border-[#3AADD4] hover:shadow-md
                    "
                  >
                    {/* Icon */}
                    <div className="mb-4 flex h-20 w-20 items-center justify-center mx-auto text-4xl rounded-xl">
                      {icon}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-[#1B3A6B]">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                  </article>
                ))}
              </div>

            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════
              5. LATEST NEWS
              MIT-style editorial 3-column news grid.
          ════════════════════════════════════════════════════════════════════ */}
          <section className="border-t border-gray-200 bg-gray-50 py-20 md:py-28" aria-labelledby="news-heading">
            <div className="mx-auto max-w-7xl px-6">

              {/* Section header row */}
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
                    From the Society
                  </p>
                  <h2 id="news-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">
                    Latest News
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="hidden items-center gap-1.5 text-sm font-semibold text-[#E8621A] transition-colors hover:text-[#d05515] sm:flex"
                >
                  All news <ArrowRightIcon />
                </Link>
              </div>

              {/* News cards */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {NEWS_ARTICLES.map((article, index) => (
                  <article
                    key={article.href}
                    className="group flex flex-col"
                  >
                    {/*
                    * Placeholder image block — replace with real <Image> once
                    * article thumbnails are available in Sanity CMS.
                    * The first card gets the accent colour for visual hierarchy.
                    */}
                    <div
                      className={`mb-4 h-44 w-full ${
                        index === 0
                          ? "bg-[#1B3A6B]"
                          : index === 1
                          ? "bg-[#2A7A8C]"
                          : "bg-[#C5293E]/80"
                      } flex items-center justify-center text-4xl`}
                      aria-hidden="true"
                    >
                      {index === 0 ? "🚀" : index === 1 ? "🌾" : "🤝"}
                    </div>

                    {/* Meta */}
                    <div className="mb-2 flex items-center gap-3">
                      <span className="rounded-full bg-[#E8621A]/10 px-2.5 py-0.5 text-xs font-semibold text-[#E8621A]">
                        {article.category}
                      </span>
                      <time className="text-xs text-gray-400">{article.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-base font-bold leading-snug text-[#1B3A6B] group-hover:text-[#E8621A] transition-colors">
                      <Link href={article.href}>{article.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <Link
                      href={article.href}
                      className="flex items-center gap-1.5 text-sm font-semibold text-[#1B3A6B] transition-colors hover:text-[#E8621A]"
                    >
                      Read more <ArrowRightIcon />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Mobile "All news" link */}
              <div className="mt-10 sm:hidden">
                <Link
                  href="/news"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#E8621A]"
                >
                  All news <ArrowRightIcon />
                </Link>
              </div>

            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════
              6. UPCOMING EVENTS
              Stacked list with date badges — MIT calendar style.
          ════════════════════════════════════════════════════════════════════ */}
          <section className="py-20 md:py-28" aria-labelledby="events-heading">
            <div className="mx-auto max-w-7xl px-6">

              {/* Section header row */}
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
                    What&apos;s On
                  </p>
                  <h2 id="events-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">
                    Upcoming Events
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="hidden items-center gap-1.5 text-sm font-semibold text-[#E8621A] transition-colors hover:text-[#d05515] sm:flex"
                >
                  Full calendar <ArrowRightIcon />
                </Link>
              </div>

              {/* Events list */}
              <div className="divide-y divide-gray-200 border border-gray-200 bg-white shadow-sm">
                {UPCOMING_EVENTS.map((event) => (
                  <Link
                    key={event.href}
                    href={event.href}
                    className="
                      group flex items-start gap-6 p-6
                      transition-colors duration-150 hover:bg-[#1B3A6B]/[0.03]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B3A6B]
                    "
                  >
                    {/* Date badge */}
                    <div className="flex w-14 shrink-0 flex-col items-center bg-[#1B3A6B] py-2 text-white">
                      <span className="text-xl font-bold leading-none">{event.day}</span>
                      <span className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
                        {event.month}
                      </span>
                    </div>

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 text-base font-semibold text-[#1B3A6B] group-hover:text-[#E8621A] transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarIcon /> {event.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPinIcon /> {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRightIcon className="size-4 shrink-0 text-gray-300 transition-colors group-hover:text-[#E8621A]" />
                  </Link>
                ))}
              </div>

              {/* Mobile "Full calendar" link */}
              <div className="mt-8 sm:hidden">
                <Link
                  href="/events"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#E8621A]"
                >
                  Full calendar <ArrowRightIcon />
                </Link>
              </div>

            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════
              7. CTA BANNER
              Full-width navy join prompt at the bottom of the page.
          ════════════════════════════════════════════════════════════════════ */}
          <section
            className="relative overflow-hidden bg-[#1B3A6B] py-20 md:py-24"
            aria-labelledby="cta-heading"
          >
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-16 top-0 size-72 rounded-full bg-[#E8621A]/10" />
              <div className="absolute -left-16 bottom-0 size-72 rounded-full bg-[#2A7A8C]/20" />
            </div>

            <div className="relative mx-auto max-w-3xl px-6 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
                Become Part of the Community
              </p>
              <h2 id="cta-heading" className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Ready to explore science with us?
              </h2>
              <p className="mb-10 text-base leading-relaxed text-blue-200">
                Join hundreds of UPNG students pushing the boundaries of knowledge.
                Whether you&apos;re in science, engineering, or any discipline — there&apos;s a
                place for you at SRIS.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/join"
                  className="
                    flex items-center gap-2
                    bg-[#E8621A] px-8 py-3.5
                    text-sm font-bold text-white
                    transition-all duration-150 hover:bg-[#d05515] hover:shadow-xl
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]
                  "
                >
                  Join SRIS Today <ArrowRightIcon />
                </Link>
                <Link
                  href="/contact"
                  className="
                    flex items-center gap-2
                    border border-blue-400/40 bg-white/5 px-8 py-3.5
                    text-sm font-semibold text-white
                    transition-all duration-150 hover:border-white hover:bg-white/10
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]
                  "
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </section>
    </div>
  );
}

