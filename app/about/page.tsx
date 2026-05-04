import Hero from "@/components/ui/Hero";
import Link  from "next/link";


// Generic page (e.g. About, Events, Leaders)
<Hero
  backgroundImage="/assets/banner-image.jpg"
  badge={{ label: "About SRIS" }}
  headline="Who We Are"
  accentText="We Are"
  subheading="A student-led society at the University of Papua New Guinea dedicated to scientific inquiry and innovation."
  ctas={[
    { label: "Meet the Team", href: "/leaders", variant: "primary" },
    { label: "Our Mission", href: "/about#mission", variant: "secondary" },
  ]}
/>



// ─── ISR — rebuild at most once per hour ─────────────────────────────────────
export const revalidate = 3600;

// ─── Hardcoded editorial content (not people) ────────────────────────────────

const CORE_VALUES = [
  { emoji: "🔬", title: "Scientific Excellence",   description: "We strive for the highest standards in scientific inquiry, research methodology, and academic integrity."           },
  { emoji: "💡", title: "Innovation",              description: "We encourage creative thinking and novel solutions to address local and global challenges."                       },
  { emoji: "🤝", title: "Collaboration",           description: "We believe in the power of teamwork and interdisciplinary approaches to solving complex problems."                },
  { emoji: "🌱", title: "Sustainable Development", description: "We are committed to projects and research that contribute to the sustainable development of Papua New Guinea."    },
  { emoji: "📚", title: "Peer Learning",           description: "We foster an environment where students can learn from each other and grow together academically."                },
  { emoji: "🌍", title: "Community Impact",        description: "We aim to apply our scientific knowledge to create positive change in our communities and beyond."                },
];

const TIMELINE = [
  { period: "2023 — Foundation",              title: "SRIS Established",           description: "SRIS was established by a group of passionate science students and faculty advisors who recognised the need for a dedicated platform for scientific research and innovation at UPNG." },
  { period: "Early 2024 — First Initiatives", title: "Laboratory Sessions Launch", description: "Launched the first laboratory practical sessions and workshops, focusing on bridging theoretical knowledge with hands-on experience."                                              },
  { period: "Mid 2024 — Expansion",           title: "Growing Across Departments", description: "Expanded our membership across multiple science departments and initiated the first collaborative research projects."                                                               },
  { period: "Late 2024 — Professional Dev",   title: "Coaching & Networking",      description: "Introduced professional coaching sessions and networking events to prepare students for scientific careers."                                                                        },
  { period: "2025 — Ambitious Projects",      title: "Rocketry & Smart Farming",   description: "Launched the first amateur rocket project and began development of the Smart Farm initiative, marking SRIS's transition to larger-scale innovative projects."                      },
];




// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-[#E8621A]" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}



// ─── Page ─────────────────────────────────────────────────────────────────────



export default async function AboutPage() {

  return (
    <main>

      {/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "About SRIS" }}
            headline="Who We Are"
            accentText="We Are"
            subheading="A student-led society at the University of Papua New Guinea dedicated to scientific inquiry and innovation."
            ctas={[
                { label: "Meet the Team", href: "/leaders", variant: "primary" },
                { label: "Our Mission", href: "/about#mission", variant: "secondary" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
            ]}
        />

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. WHO WE ARE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#EDE9E6] py-20 md:py-28" aria-labelledby="who-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">Our Story</p>
              <h2 id="who-heading" className="mb-6 text-3xl font-bold leading-snug text-[#1B3A6B] md:text-4xl">
                A Student-Led Society at UPNG
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600">
                <p>The University of Papua New Guinea Science, Research and Innovation Society (SRIS) is a student-run organisation dedicated to fostering a culture of scientific inquiry, research excellence, and innovation within our academic community.</p>
                <p>Founded by passionate students and faculty members, SRIS serves as a platform for students to explore scientific concepts beyond the classroom, engage in hands-on research, and develop innovative solutions to real-world challenges.</p>
                <p>Located at the UPNG Waigani Main Campus, we bring together students from various scientific disciplines to collaborate, learn, and grow together as the next generation of Papua New Guinea&apos;s scientific leaders.</p>
              </div>
              <div className="mt-8">
                <Link href="/join" className="flex w-fit items-center gap-2 bg-[#E8621A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d05515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A]">
                  Join the Community <ArrowRightIcon />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full border-2 border-[#3AADD4]/30" aria-hidden="true" />
              <div className="relative bg-[#1B3A6B] p-8 shadow-xl">
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">SRIS at a Glance</p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "2023", label: "Year Founded"        },
                    { value: "200+", label: "Active Members"      },
                    { value: "12",   label: "Research Projects"   },
                    { value: "5",    label: "Departments Reached" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-white/5 p-4">
                      <p className="text-2xl font-bold text-[#E8621A]">{value}</p>
                      <p className="mt-1 text-xs text-blue-300">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-blue-200">
                  Based at UPNG Waigani Main Campus, Port Moresby, Papua New Guinea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. VISION & MISSION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-28" aria-labelledby="vm-heading" id="mission">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">Purpose &amp; Direction</p>
            <h2 id="vm-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">Our Vision &amp; Mission</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-[#3AADD4]" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#1B3A6B]">Our Vision</h3>
              </div>
              <p className="text-base leading-relaxed text-gray-600">
                To become the leading student society at UPNG that cultivates scientific excellence, fosters innovation, and produces graduates who can drive scientific and technological advancement in Papua New Guinea.
              </p>
            </div>
            <div className="border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-[#E8621A]" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#1B3A6B]">Our Mission</h3>
              </div>
              <p className="text-base leading-relaxed text-gray-600">
                To bridge theoretical knowledge with practical application through laboratory sessions, research projects, and innovative initiatives that empower students to become problem-solvers and innovators in their respective fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. CORE VALUES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">What We Stand For</p>
            <h2 id="values-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              These six values are the foundation of everything we do at SRIS.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ emoji, title, description }) => (
              <article key={title} className="group border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#3AADD4] hover:shadow-md">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#1B3A6B]/5 text-2xl">{emoji}</div>
                <h3 className="mb-2 text-base font-semibold text-[#1B3A6B]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. OUR JOURNEY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-28" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">How We Got Here</p>
            <h2 id="journey-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">Our Journey</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-5 top-0 h-full w-0.5 bg-[#1B3A6B]/15 md:left-1/2 md:-translate-x-px" aria-hidden="true" />
            <ol className="space-y-12">
              {TIMELINE.map(({ period, title, description }, index) => (
                <li key={period} className="relative flex items-start gap-6 md:gap-0">
                  <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : ""}`}>
                    {index % 2 === 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">{period}</p>
                        <h3 className="mt-1 text-lg font-bold text-[#1B3A6B]">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#1B3A6B] shadow md:absolute md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <div className={`flex-1 md:w-1/2 ${index % 2 !== 0 ? "md:pl-12" : "md:hidden"}`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">{period}</p>
                    <h3 className="mt-1 text-lg font-bold text-[#1B3A6B]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          9. CTA BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B] py-20 md:py-24" aria-labelledby="about-cta-heading">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-16 top-0 size-72 rounded-full bg-[#E8621A]/10" />
          <div className="absolute -left-16 bottom-0 size-72 rounded-full bg-[#2A7A8C]/20" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">Shape the Future of SRIS</p>
          <h2 id="about-cta-heading" className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Join Our Scientific Community</h2>
          <p className="mb-10 text-base leading-relaxed text-blue-200">
            Become part of a dynamic community of student scientists, researchers, and innovators at UPNG. Together, we can push the boundaries of knowledge and create impactful solutions for Papua New Guinea.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/join" className="flex items-center gap-2 bg-[#E8621A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#d05515] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]">
              Get Involved Today <ArrowRightIcon />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 border border-blue-400/40 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]">
              Express Interest in Leadership
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}