import Image from "next/image"
import { Fragment } from "react"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import Hero from "@/components/ui/Hero"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExecutiveMember {
  _id: string
  name: string
  role: string
  imageUrl?: string
  bio?: string
  division?: string
  socialLinks?: Array<{ platform: string; url: string }>
  socials?: {
    email?: string
    linkedin?: string
    whatsapp?: string
    twitter?: string
    instagram?: string
  }
}

interface HardcodedFounder {
  _id: string
  name: string
  role: string
  tagline: string
  quote: string
  bio: string
  contributions: string[]
  photo?: { url: string; alt?: string }
}

interface HardcodedCoordinator {
  _id: string
  name: string
  role: string
  bio: string
  skills: string[]
  photo?: { url: string; alt?: string }
}

// ─── Hardcoded founders data ──────────────────────────────────────────────────

const HARDCODED_FOUNDERS: HardcodedFounder[] = [
  {
    _id: "founder-1",
    name: "Ipipa'e Arinaso Balome",
    role: "Founder",
    tagline: "Visionary Leader & Strategic Planner",
    quote:
      "Science has the power to transform our nation. By empowering students with research skills and innovative thinking, we can build a brighter future for Papua New Guinea.",
    bio: "Ipi Balome is the visionary founder who conceptualised and established the University of Papua New Guinea Science, Research and Innovation Society. With a background in scientific research and a passion for student development, Ipi recognised the need for a platform that would bridge theoretical knowledge with practical application. His dedication to fostering scientific excellence and innovation led to the creation of SRIS, which has since become a thriving community of student scientists and researchers.",
    photo: { url: "/assets/ipi-balome.jpg", alt: "Ipipa'e Arinaso Balome – Founder" },
    contributions: [
      "Conceptualised and established SRIS in 2023",
      "Developed the society's core mission and values",
      "Built foundational partnerships with faculty and departments",
      "Established the first laboratory practical sessions",
      "Mentored the initial cohort of coordinators",
    ],
  },
  {
    _id: "founder-2",
    name: "Jessy Apenda",
    role: "Co-Founder",
    tagline: "Community Builder & Operations Lead",
    quote:
      "True innovation happens when brilliant minds come together. Our mission is to create that collaborative space where students can transform ideas into impactful solutions.",
    bio: "Jessy Apenda played a pivotal role as co-founder in establishing SRIS, bringing exceptional organisational skills and a passion for community building. His ability to connect with students and understand their needs was instrumental in shaping the society's structure and activities. With a background in communications and event management, Jessy developed the operational framework that allows SRIS to function efficiently while maintaining its student-centred approach.",
    photo: { url: "/assets/jessy-apenda.png", alt: "Jessy Apenda – Co-Founder" },
    contributions: [
      "Co-developed the SRIS operational framework",
      "Established the society's communication channels",
      "Organised the first SRIS networking events",
      "Developed the membership recruitment strategy",
      "Created the events and workshop planning system",
    ],
  },
]

// ─── Hardcoded coordinators data ─────────────────────────────────────────────

const HARDCODED_COORDINATORS: HardcodedCoordinator[] = [
  {
    _id: "coord-1",
    name: "Ipipa'e Arinaso Balome",
    role: "Strategic Development Coordinator",
    bio: "As both founder and coordinator, Ipi provides strategic direction for SRIS while actively participating in coordination activities. His dual role ensures the society stays true to its founding principles while continuing to innovate and grow.",
    photo: { url: "/assets/ipi-balome.jpg", alt: "Ipipa'e Arinaso Balome" },
    skills: ["Strategic Planning", "Research Leadership", "Mentorship"],
  },
  {
    _id: "coord-2",
    name: "Steven Kaupa",
    role: "Head Coordinator & Research Lead",
    bio: "Steven oversees the overall operations of SRIS and leads our research initiatives. With expertise in laboratory techniques and project management, he ensures our activities align with our scientific mission.",
    photo: { url: "/assets/steven-kaupa.jpg", alt: "Steven Kaupa" },
    skills: ["Research Methodology", "Project Management", "Laboratory Techniques"],
  },
  {
    _id: "coord-3",
    name: "Fizo Kuks",
    role: "Innovation & Technology Coordinator",
    bio: "Fizo drives our technology initiatives and innovation projects. His background in computer science and engineering brings a technical edge to our society's activities and projects.",
    photo: { url: "", alt: "" },
    skills: ["Technology", "Innovation", "Engineering"],
  },
  {
    _id: "coord-4",
    name: "Frederick Kerry Enaso",
    role: "Academic Programs Coordinator",
    bio: "Frederick focuses on developing and coordinating our academic programs, workshops, and learning sessions. He ensures our activities complement and enhance the university's curriculum.",
    photo: { url: "", alt: "" },
    skills: ["Academic Programs", "Workshop Development", "Curriculum Design"],
  },
  {
    _id: "coord-5",
    name: "Desmond Alben",
    role: "Membership & Outreach Coordinator",
    bio: "Desmond manages our membership programs and outreach activities. He works to expand our community and ensure all science students have access to SRIS opportunities.",
    photo: { url: "", alt: "" },
    skills: ["Community Building", "Outreach", "Membership Management"],
  },
]

// ─── Utility helpers ──────────────────────────────────────────────────────────

const AVATAR_COLOURS = ["bg-[#1B3A6B]", "bg-[#2A7A8C]", "bg-[#E8621A]", "bg-[#C5293E]"]

function avatarColour(name: string) {
  return AVATAR_COLOURS[name.charCodeAt(0) % AVATAR_COLOURS.length]
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("")
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getData(): Promise<ExecutiveMember[]> {
  const query = groq`
    *[_type == "executive"] | order(
      select(
        role == "president"      => 1,
        role == "vice-president" => 2,
        role == "secretary"      => 3,
        role == "treasurer"      => 4,
        99
      ) asc
    ) {
      _id,
      name,
      role,
      "imageUrl": profileImage.asset->url,
      bio,
      division,
      socialLinks[] {
        platform,
        url
      }
    }
  `

  const raw: ExecutiveMember[] = await client.fetch(query)

  // Map socialLinks array → flat socials object
  return raw.map((m) => {
    const socials: ExecutiveMember["socials"] = {}
    for (const link of m.socialLinks ?? []) {
      if (link.platform === "email")     socials.email     = link.url
      if (link.platform === "linkedin")  socials.linkedin  = link.url
      if (link.platform === "whatsapp")  socials.whatsapp  = link.url
      if (link.platform === "twitter")   socials.twitter   = link.url
      if (link.platform === "instagram") socials.instagram = link.url
    }
    return { ...m, socials }
  })
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round"
      className="size-4 shrink-0 text-[#E8621A]" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" className="size-3.5" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L0 24l6.335-1.51A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.577-.504-5.062-1.38l-.361-.214-3.762.897.944-3.653-.235-.375A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      className="size-3.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PersonAvatar({
  photo, name, colourClass, sizeClass, textClass,
}: {
  photo?: { url: string; alt?: string }
  name: string
  colourClass: string
  sizeClass: string
  textClass: string
}) {
  if (photo?.url) {
    return (
        <div className="relative shrink-0 overflow-hidden rounded w-[160px] h-[160px]"> {/* Replaced sizeClass, removed rounded-full */}
            <Image
              src={photo.url}
              alt={photo.alt ?? `Photo of ${name}`}
              fill
              className="object-cover"
              sizes="160px" // Updated for performance
            />
        </div>
    )
  }
  return (
    <div className={`${sizeClass} ${colourClass} flex shrink-0 items-center justify-center rounded-full`}>
      <span className={`${textClass} font-bold text-white`}>{initials(name)}</span>
    </div>
  )
}

function SocialLinks({
  socials, name,
}: {
  socials: ExecutiveMember["socials"]
  name: string
}) {
  if (!socials) return null

  const links = [
    { href: socials.email     ? `mailto:${socials.email}` : null, icon: <MailIcon />,      label: "Email"     },
    { href: socials.linkedin  ?? null,                             icon: <LinkedInIcon />,  label: "LinkedIn"  },
    { href: socials.whatsapp  ?? null,                             icon: <WhatsAppIcon />,  label: "WhatsApp"  },
    { href: socials.twitter   ?? null,                             icon: <TwitterXIcon />,  label: "Twitter/X" },
    { href: socials.instagram ?? null,                             icon: <InstagramIcon />, label: "Instagram" },
  ].filter((l) => l.href !== null)

  if (links.length === 0) return null

  return (
    <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
      {links.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href!}
          target={href!.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={`${name} on ${label}`}
          className="flex size-7 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#E8621A] hover:bg-[#E8621A]/5 hover:text-[#E8621A]"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
      <p className="text-sm text-gray-400">{message}</p>
      <p className="text-xs text-gray-300">
        Add content in Sanity Studio to populate this section.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LeadersPage() {
  const executive = await getData()

  return (
    <main className="min-h-screen bg-white">

{/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "The People Behind SRIS" }}
            headline="Our Leaders"
            accentText="Leaders"
            subheading="Meet the founders who built SRIS from the ground up, the elected executives steering our direction today, and the pioneer coordinators who keep our programmes running."
            ctas={[
                { label:"Executive Committes", href: "/leaders", variant: "primary" },
                { label: "Founders", href: "/about#mission", variant: "secondary" },
            ]}
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Leaders", href: "/leaders" },
            ]}
        />

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. COMMITTEE MEMBERS — Live from Sanity CMS
          Document type : executive  (executive.ts schema)
          Studio path   : /studio → Executive
          Fields shown  : profileImage, name, role, division, socialLinks
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="committee"
        className="bg-white py-20 md:py-28"
        aria-labelledby="committee-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
              Current Committee
            </p>
            <h2
              id="committee-heading"
              className="text-3xl font-bold text-[#1B3A6B] md:text-4xl"
            >
              Our Leadership Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
              Meet the elected executive members and appointed committee members driving SRIS
              in {new Date().getFullYear()}. A dedicated group of student scientists and innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executive.length === 0 ? (
              <EmptyState message="No committee members found. Add them in Sanity Studio → Executive." />
            ) : (
              executive.map((member) => {
                const colour = avatarColour(member.name)
                const photo  = member.imageUrl
                ? { url: member.imageUrl, alt: member.name }
                : undefined

                return (
                  <Fragment key={member._id}>
                    <article className="flex flex-col overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

                      {/* Photo / avatar header */}
                      <div className={`${colour} flex h-40 rounded items-center justify-center`}>
                        <PersonAvatar
                          photo={photo}
                          name={member.name}
                          colourClass="bg-white/20"
                          sizeClass="size-12"
                          textClass="text-3xl"
                        />
                      </div>

                      {/* Info body */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-base font-bold text-[#1B3A6B]">{member.name}</h3>
                        <p className="text-sm font-semibold capitalize text-[#E8621A]">
                          {member.role.replace("-", " ")}
                        </p>
                        {member.division && (
                          <p className="mt-0.5 text-xs text-[#2A7A8C]">{member.division}</p>
                        )}

                        {/* Social links rendered from the socials object */}
                        <div className="mt-auto">
                          <SocialLinks socials={member.socials} name={member.name} />
                        </div>
                      </div>

                    </article>
                  </Fragment>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. FOUNDERS — Hardcoded data
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="founders"
        className="bg-gray-50 py-20 md:py-28"
        aria-labelledby="founders-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
              The People Who Started It All
            </p>
            <h2
              id="founders-heading"
              className="text-3xl font-bold text-[#1B3A6B] md:text-4xl"
            >
              Our Founders
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
              SRIS was born from the vision and dedication of these two individuals who saw
              what a student science society could be for UPNG and Papua New Guinea.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {HARDCODED_FOUNDERS.map((founder) => {
              const colour = avatarColour(founder.name)
              return (
                <article
                  key={founder._id}
                  className="overflow-hidden border border-gray-200 bg-white shadow-lg"
                >
                  <div className="flex items-center gap-5 bg-[#1B3A6B] px-8 py-6">
                    <PersonAvatar
                      photo={founder.photo}
                      name={founder.name}
                      colourClass={colour}
                      sizeClass="size-20"
                      textClass="text-2xl"
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
                        {founder.role}
                      </p>
                      <h3 className="text-lg font-bold text-white">{founder.name}</h3>
                      {founder.tagline && (
                        <p className="text-sm text-blue-300">{founder.tagline}</p>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    {founder.quote && (
                      <blockquote className="mb-6 border-l-4 border-[#E8621A] pl-5">
                        <p className="text-sm italic leading-relaxed text-gray-600">
                          &ldquo;{founder.quote}&rdquo;
                        </p>
                      </blockquote>
                    )}
                    {founder.bio && (
                      <p className="mb-6 text-sm leading-relaxed text-gray-600">{founder.bio}</p>
                    )}
                    {founder.contributions && founder.contributions.length > 0 && (
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1B3A6B]">
                          Key Contributions
                        </p>
                        <ul className="space-y-2">
                          {founder.contributions.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckIcon />
                              <span className="text-sm text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          8. PIONEER COORDINATORS — Hardcoded data
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="coordinators"
        className="bg-white py-20 md:py-28"
        aria-labelledby="coordinators-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2A7A8C]">
              The Backbone of SRIS
            </p>
            <h2
              id="coordinators-heading"
              className="text-3xl font-bold text-[#1B3A6B] md:text-4xl"
            >
              Pioneer Coordinators
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
              These dedicated students form the backbone of SRIS, driving our initiatives and
              ensuring the society&apos;s continued success and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HARDCODED_COORDINATORS.map((coord) => {
              const colour = avatarColour(coord.name)
              return (
                <article
                  key={coord._id}
                  className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`${colour} flex items-center gap-4 px-6 py-5`}>
                    <PersonAvatar
                      photo={coord.photo?.url ? coord.photo : undefined}
                      name={coord.name}
                      colourClass="bg-white/20"
                      sizeClass="size-12"
                      textClass="text-sm"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{coord.name}</h3>
                      <p className="text-xs text-white/80">{coord.role}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    {coord.bio && (
                      <p className="mb-4 text-sm leading-relaxed text-gray-500">{coord.bio}</p>
                    )}
                    {coord.skills && coord.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {coord.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#1B3A6B]/[0.08] px-3 py-1 text-xs font-medium text-[#1B3A6B]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1B3A6B] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#3AADD4]">
            Get Involved
          </p>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Want to join the leadership?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-blue-200">
            SRIS welcomes passionate science students. Whether you want to join as a member
            or take on a coordination role, there&apos;s a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-[#E8621A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d05510]"
            >
              Get in Touch
            </a>
            <a
              href="/about"
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Learn About SRIS
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
