// lib/heroConfig.ts
//
// Static hero config. The carouselSlides field is intentionally omitted here —
// those slides are fetched server-side from Sanity and merged in at the
// page level (see usage example below).

import { HeroProps } from "@/components/ui/Hero";

export const homeHero: Omit<HeroProps, "carouselSlides"> = {
  backgroundImage: "/assets/banner-image.jpg",
  variant: "home",
  badge: { label: "Science, Research & Innovation Society" },
  headline: "Where Science Meets Innovation",
  accentText: "Innovation",
  subheading:
    "A student-led society dedicated to fostering scientific inquiry, cutting-edge research, and a culture of innovation across all disciplines.",
  ctas: [
    { label: "Join SRIS",        href: "/join",     variant: "primary"   },
    { label: "Explore Research", href: "/research", variant: "secondary" },
  ],
  stats: [
    { value: "6",    label: "Divisions"   },
    { value: "200+", label: "Members"     },
    { value: "2024", label: "Established" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN YOUR HOME PAGE  (app/page.tsx)
// ─────────────────────────────────────────────────────────────────────────────
//
//  import { client }     from "@/sanity/lib/client"
//  import { urlFor }     from "@/sanity/lib/image"
//  import Hero           from "@/components/ui/Hero"
//  import { homeHero }   from "@/lib/heroConfig"
//  import { CarouselSlide } from "@/components/ui/HeroCarousel"
//
//  // GROQ query — fetches the single heroCarousel document
//  const CAROUSEL_QUERY = `
//    *[_type == "heroCarousel"][0] {
//      autoplayInterval,
//      slides[] {
//        "imageUrl": image.asset->url,
//        "imageAlt": imageAlt,
//        category,
//        "slideTitle": slideTitle,
//        date,
//        href
//      }
//    }
//  `
//
//  export default async function HomePage() {
//    const carousel = await client.fetch(CAROUSEL_QUERY)
//
//    const carouselSlides: CarouselSlide[] = (carousel?.slides ?? []).map(
//      (s: any) => ({
//        imageUrl:   s.imageUrl,
//        imageAlt:   s.imageAlt ?? "",
//        category:   s.category,
//        slideTitle: s.slideTitle,
//        date:       s.date,
//        href:       s.href,
//      })
//    )
//
//    return (
//      <main>
//        <Hero
//          {...homeHero}
//          carouselSlides={carouselSlides}
//          carouselInterval={(carousel?.autoplayInterval ?? 4) * 1000}
//        />
//        {/* rest of page */}
//      </main>
//    )
//  }