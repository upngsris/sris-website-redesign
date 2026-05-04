import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import Hero from "@/components/ui/Hero";
import CampusMap from "@/components/campusMap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How can I become a member of SRIS?",
    answer:
      "Any UPNG student with an interest in science, research, or innovation can join SRIS. Simply attend one of our meetings or events, or contact our membership coordinator through the form above. There are no membership fees.",
  },
  {
    question: "Do I need to be a science student to join?",
    answer:
      "While SRIS focuses on scientific research and innovation, we welcome students from all disciplines. Interdisciplinary collaboration is key to innovation, and we value diverse perspectives in our projects.",
  },
  {
    question: "How often does SRIS hold laboratory sessions?",
    answer:
      "We typically hold laboratory practical sessions twice a month. The schedule varies by semester and is announced through our social media channels and campus notices. Some specialised sessions may be offered periodically based on member interest.",
  },
  {
    question: "Can I propose my own research project?",
    answer:
      "Absolutely! We encourage members to propose and lead their own research projects. SRIS provides guidance, resources, and potential collaboration opportunities. Contact our research coordinator to discuss your idea.",
  },
  {
    question: "How can faculty members get involved with SRIS?",
    answer:
      "Faculty members can participate as advisors, mentors, or workshop facilitators. We welcome collaborations on research projects and appreciate guidance in developing our programs. Please contact us to discuss potential involvement.",
  },
];

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-5 shrink-0 text-[#E8621A]" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-5 shrink-0 text-[#E8621A]" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-5 shrink-0 text-[#E8621A]" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-5 shrink-0 text-[#E8621A]" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main>

      {/* ════════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ════════════════════════════════════════════════════════════════════ */}
      <Hero
        backgroundImage="/assets/banner-image.jpg"
        badge={{ label: "Contact Us" }}
        headline="Get in Touch With Us"
        accentText="in Touch"
        subheading="Have a question, idea, or want to collaborate? We'd love to hear from you."
        ctas={[
          { label: "Send a Message", href: "#contact-form", variant: "primary" },
          { label: "Find Us on Campus", href: "#location", variant: "secondary" },
        ]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      {/* ════════════════════════════════════════════════════════════════════
          2. CONTACT GRID
          Left (wider): ContactForm  |  Right: info cards + social links
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        className="bg-[#EDE9E6] py-20 md:py-28"
        aria-label="Contact details"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

            {/* ── Left: Contact Form (3/5 width on desktop) ── */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* ── Right: Info cards (2/5 width on desktop) ── */}
            <div className="flex flex-col gap-6 lg:col-span-2">

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
                  Contact Information
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#1B3A6B]">
                  Find Us
                </h2>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mt-0.5"><LocationIcon /></div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Our Location
                  </p>
                  <p className="text-sm font-medium text-[#1B3A6B]">University of Papua New Guinea</p>
                  <p className="text-sm text-gray-500">Waigani Campus</p>
                  <p className="text-sm text-gray-500">Port Moresby, Papua New Guinea</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mt-0.5"><MailIcon /></div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Email Us
                  </p>
                  <a
                    href="mailto:upng.sris@gmail.com"
                    className="text-sm font-medium text-[#1B3A6B] transition-colors hover:text-[#E8621A]"
                  >
                    upng.sris@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mt-0.5"><PhoneIcon /></div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Call Us
                  </p>
                  <a
                    href="tel:+67573577718"
                    className="text-sm font-medium text-[#1B3A6B] transition-colors hover:text-[#E8621A]"
                  >
                    +675 7357 7718
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="flex items-start gap-4 border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mt-0.5"><ClockIcon /></div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Office Hours
                  </p>
                  <p className="text-sm font-medium text-[#1B3A6B]">Monday – Friday</p>
                  <p className="text-sm text-gray-500">8:00 AM – 4:00 PM</p>
                </div>
              </div>

              {/* Social links */}
              <div className="border border-gray-200 bg-[#1B3A6B] p-6 shadow-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
                  Follow SRIS
                </p>
                <p className="mb-4 text-sm text-blue-200">
                  Stay updated with our latest projects, events, and research initiatives.
                </p>
                <div className="flex gap-3">
                  {[
                    { label: "Facebook",  href: "https://facebook.com/UPNGSRIS",                    Icon: FacebookIcon  },
                    { label: "Instagram", href: "https://www.instagram.com/upng.sris/",             Icon: InstagramIcon },
                    { label: "X",         href: "https://x.com/UPNG_SRIS",                          Icon: XIcon         },
                    { label: "LinkedIn",  href: "https://www.linkedin.com/company/upng-science-research-and-innovation-society/", Icon: LinkedInIcon  },
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SRIS on ${label}`}
                      className="flex size-9 items-center justify-center rounded-full border border-blue-500/40 text-blue-300 transition-all hover:border-[#E8621A] hover:bg-[#E8621A]/10 hover:text-white"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. CAMPUS MAP
          Full-width map section anchored to #location CTA from the hero.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="location"
        className="bg-white py-20 md:py-24"
        aria-labelledby="map-heading"
      >
        <div className="mx-auto max-w-7xl px-6">

          {/* Section header */}
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
              Find Us on Campus
            </p>
            <h2
              id="map-heading"
              className="text-2xl font-bold text-[#1B3A6B] md:text-3xl"
            >
              We&apos;re at UPNG Waigani Campus
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">
              Located in the Science &amp; Technology Building on Waigani Drive,
              National Capital District. Drop by during office hours or get
              directions below.
            </p>
          </div>

          {/* Map component */}
          <CampusMap height={420} />

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. FAQ ACCORDION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#EDE9E6] py-20 md:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6">

          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
              Common Questions
            </p>
            <h2 id="faq-heading" className="text-3xl font-bold text-[#1B3A6B] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
              Can&apos;t find what you&apos;re looking for? Send us a message using the form above.
            </p>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. CTA BANNER
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#1B3A6B] py-20 md:py-24"
        aria-labelledby="contact-cta-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-16 top-0 size-72 rounded-full bg-[#E8621A]/10" />
          <div className="absolute -left-16 bottom-0 size-72 rounded-full bg-[#2A7A8C]/20" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
            Be Part of Something Bigger
          </p>
          <h2 id="contact-cta-heading" className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to join SRIS?
          </h2>
          <p className="mb-10 text-base leading-relaxed text-blue-200">
            Whether you&apos;re curious about our research projects, want to attend an event,
            or are ready to become a full member — we&apos;d love to have you involved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="flex items-center gap-2 bg-[#E8621A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#d05515] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8621A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]"
            >
              Join SRIS Today <ArrowRightIcon />
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 border border-blue-400/40 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
