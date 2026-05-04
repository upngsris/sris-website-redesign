import { notFound } from "next/navigation"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { PortableText } from "@portabletext/react"
import {
  CalendarDays, MapPin, Monitor, ArrowLeft,
  Clock, ExternalLink, Tag, Users,
} from "lucide-react"

const eventQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    category,
    coverImage,
    description,
    body,
    startDate,
    endDate,
    location,
    isOnline,
    registrationLink,
    tags,
    gallery,
    organizers[]-> {
      _id,
      name,
      role,
      profileImage,
    }
  }
`

const relatedQuery = groq`
  *[_type == "event" && slug.current != $slug && status in ["upcoming","ongoing"]] | order(startDate asc) [0..2] {
    _id, title, slug, status, category, startDate, location, coverImage
  }
`

async function getEvent(slug: string) {
  return client.fetch(eventQuery, { slug })
}
async function getRelated(slug: string) {
  return client.fetch(relatedQuery, { slug })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "event"]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

const STATUS_STYLES: Record<string, string> = {
  upcoming:  "bg-[#E8620A]/10 text-[#E8620A] border border-[#E8620A]/30",
  ongoing:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed: "bg-slate-100 text-slate-500 border border-slate-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
}

const CATEGORY_LABELS: Record<string, string> = {
  workshop: "Workshop", seminar: "Seminar", conference: "Conference",
  "field-trip": "Field Trip", competition: "Competition", social: "Social Event",
  "general-meeting": "General Meeting", other: "Other",
}

const ROLE_LABELS: Record<string, string> = {
  president: "President", "vice-president": "Vice-President",
  secretary: "Secretary", treasurer: "Treasurer",
}

function fmt(dateStr: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(dateStr).toLocaleString("en-AU", opts)
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-[#0B1F3A] text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-[#0B1F3A] text-xl font-semibold mt-6 mb-2">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#E8620A] pl-4 my-5 text-slate-500 italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-[#0B1F3A]">{children}</strong>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-[#E8620A] underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-1 mb-4 text-slate-600">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-600">{children}</ol>,
  },
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const [event, related] = await Promise.all([getEvent(params.slug), getRelated(params.slug)])
  if (!event) notFound()

  const coverSrc = event.coverImage ? urlFor(event.coverImage).width(1400).height(600).url() : null

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-[#0B1F3A] overflow-hidden">
        {coverSrc && (
          <img src={coverSrc} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Events
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${STATUS_STYLES[event.status]}`}>
              {event.status}
            </span>
            {event.category && (
              <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                {CATEGORY_LABELS[event.category] ?? event.category}
              </span>
            )}
          </div>

          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            {event.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-5 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-[#E8620A]" />
              {fmt(event.startDate, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#E8620A]" />
              {fmt(event.startDate, { hour: "2-digit", minute: "2-digit" })}
              {event.endDate && ` – ${fmt(event.endDate, { hour: "2-digit", minute: "2-digit" })}`}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#E8620A]" />
                {event.location}
              </span>
            )}
            {event.isOnline && (
              <span className="flex items-center gap-1.5">
                <Monitor size={14} className="text-[#E8620A]" />
                Online
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main content */}
        <article className="lg:col-span-2">
          {event.description && (
            <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-[#E8620A] pl-5 mb-8">
              {event.description}
            </p>
          )}

          {event.body && (
            <div className="prose-sm max-w-none">
              <PortableText value={event.body} components={ptComponents} />
            </div>
          )}

          {/* Gallery */}
          {event.gallery?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-[#0B1F3A] text-xl font-bold mb-5">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.gallery.map((img: any, i: number) => (
                  <img
                    key={i}
                    src={urlFor(img).width(400).height(280).url()}
                    alt={`Gallery image ${i + 1}`}
                    className="rounded-lg w-full h-40 object-cover hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">

          {/* Registration CTA */}
          {event.registrationLink && event.status === "upcoming" && (
            <div className="bg-[#0B1F3A] rounded-xl p-6 text-center">
              <p className="text-white font-semibold mb-1">Ready to join?</p>
              <p className="text-slate-400 text-sm mb-4">Register now to secure your spot.</p>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E8620A] hover:bg-[#d05508] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors w-full justify-center"
              >
                Register Now <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Date & Venue card */}
          <div className="border border-slate-100 rounded-xl p-5 space-y-3">
            <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide">Event Details</h3>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-start gap-2">
                <CalendarDays size={14} className="text-[#E8620A] mt-0.5 flex-shrink-0" />
                <span>{fmt(event.startDate, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#E8620A] mt-0.5 flex-shrink-0" />
                <span>
                  {fmt(event.startDate, { hour: "2-digit", minute: "2-digit" })}
                  {event.endDate && ` – ${fmt(event.endDate, { hour: "2-digit", minute: "2-digit" })}`}
                </span>
              </div>
              {event.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#E8620A] mt-0.5 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.isOnline && (
                <div className="flex items-start gap-2">
                  <Monitor size={14} className="text-[#E8620A] mt-0.5 flex-shrink-0" />
                  <span>Online Event</span>
                </div>
              )}
            </div>
          </div>

          {/* Organizers */}
          {event.organizers?.length > 0 && (
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Users size={13} /> Organizers
              </h3>
              <div className="space-y-3">
                {event.organizers.map((org: any) => {
                  const orgImg = org.profileImage ? urlFor(org.profileImage).width(80).height(80).url() : null
                  return (
                    <div key={org._id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0B1F3A] overflow-hidden flex-shrink-0">
                        {orgImg ? (
                          <img src={orgImg} alt={org.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/60 text-xs font-bold">
                            {org.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0B1F3A] leading-none">{org.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{ROLE_LABELS[org.role] ?? org.role}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Tag size={13} /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag: string) => (
                  <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ── Related Events ── */}
      {related.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-[#0B1F3A] text-2xl font-bold">More Upcoming Events</h2>
              <Link href="/events" className="text-[#E8620A] text-sm font-medium hover:underline flex items-center gap-1">
                Full calendar <ArrowLeft size={13} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((ev: any) => {
                const d = new Date(ev.startDate)
                return (
                  <Link
                    key={ev._id}
                    href={`/events/${ev.slug.current}`}
                    className="group bg-white rounded-xl border border-slate-100 hover:border-[#E8620A]/30 hover:shadow-md p-5 transition-all flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-14 bg-[#0B1F3A] rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-xl font-bold leading-none">{String(d.getDate()).padStart(2, "0")}</span>
                      <span className="text-[9px] font-bold tracking-widest text-[#E8620A]">
                        {d.toLocaleString("en-AU", { month: "short" }).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
                        {CATEGORY_LABELS[ev.category] ?? ev.category}
                      </p>
                      <h4 className="text-[#0B1F3A] text-sm font-semibold leading-snug group-hover:text-[#E8620A] transition-colors line-clamp-2">
                        {ev.title}
                      </h4>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
