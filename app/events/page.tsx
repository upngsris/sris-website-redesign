import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { CalendarDays, MapPin, Monitor, ArrowRight, Clock } from "lucide-react"
import Hero from "@/components/ui/Hero"

const eventsQuery = groq`
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    status,
    category,
    coverImage,
    description,
    startDate,
    endDate,
    location,
    isOnline,
    tags
  }
`

async function getEvents() {
  return client.fetch(eventsQuery)
}

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-[#E8620A]/10 text-[#E8620A] border border-[#E8620A]/20",
  ongoing:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed:"bg-slate-100 text-slate-500 border border-slate-200",
  cancelled:"bg-red-50 text-red-600 border border-red-200",
}

const CATEGORY_LABELS: Record<string, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  conference: "Conference",
  "field-trip": "Field Trip",
  competition: "Competition",
  social: "Social Event",
  "general-meeting": "General Meeting",
  other: "Other",
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day:   d.toLocaleString("en-AU", { day: "2-digit" }),
    month: d.toLocaleString("en-AU", { month: "short" }).toUpperCase(),
    full:  d.toLocaleString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    time:  d.toLocaleString("en-AU", { hour: "2-digit", minute: "2-digit" }),
  }
}

export default async function EventsPage() {
  const events: any[] = await getEvents()

  const upcoming = events.filter((e) => e.status === "upcoming" || e.status === "ongoing")
  const past     = events.filter((e) => e.status === "completed" || e.status === "cancelled")

  return (
    <main className="min-h-screen bg-white">

{/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "What's On" }}
            headline="Events & Activities"
            accentText="Activities"
            subheading="Stay connected with workshops, seminars, field trips, and networking events organised by UPNG SRIS."
           
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Events", href: "/events" },
            ]}
        />

      </section>

      {/* ── Upcoming Events ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-[#E8620A] text-xs font-semibold tracking-[0.15em] uppercase mb-1">Coming Up</p>
          <h2 className="text-[#0B1F3A] text-3xl font-bold">Upcoming Events</h2>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-slate-400 py-16 text-center">No upcoming events scheduled. Check back soon.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((event) => {
              const d = formatDate(event.startDate)
              return (
                <Link
                  key={event._id}
                  href={`/events/${event.slug.current}`}
                  className="group flex items-center gap-5 bg-white border border-slate-100 hover:border-[#E8620A]/30 hover:shadow-md rounded-xl p-5 transition-all duration-200"
                >
                  {/* Date box */}
                  <div className="flex-shrink-0 w-14 h-16 bg-[#0B1F3A] rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold leading-none">{d.day}</span>
                    <span className="text-[10px] font-bold tracking-widest mt-0.5 text-[#E8620A]">{d.month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${STATUS_STYLES[event.status]}`}>
                        {event.status}
                      </span>
                      {event.category && (
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                          {CATEGORY_LABELS[event.category] ?? event.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[#0B1F3A] font-semibold text-base leading-snug group-hover:text-[#E8620A] transition-colors truncate">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={11} />{d.time}</span>
                      {event.location && <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>}
                      {event.isOnline && <span className="flex items-center gap-1"><Monitor size={11} />Online</span>}
                    </div>
                  </div>

                  <ArrowRight size={16} className="flex-shrink-0 text-slate-300 group-hover:text-[#E8620A] group-hover:translate-x-1 transition-all" />
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Past Events ── */}
      {past.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-10">
              <p className="text-slate-400 text-xs font-semibold tracking-[0.15em] uppercase mb-1">Archive</p>
              <h2 className="text-[#0B1F3A] text-3xl font-bold">Past Events</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => {
                const d = formatDate(event.startDate)
                const imgSrc = event.coverImage ? urlFor(event.coverImage).width(600).height(360).url() : null
                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-44 bg-[#0B1F3A] overflow-hidden">
                      {imgSrc ? (
                        <img src={imgSrc} alt={event.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <CalendarDays size={36} className="text-white/20" />
                        </div>
                      )}
                      {event.category && (
                        <span className="absolute top-3 left-3 bg-white/90 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded text-slate-600">
                          {CATEGORY_LABELS[event.category] ?? event.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><CalendarDays size={11} />{d.full}</p>
                      <h3 className="text-[#0B1F3A] font-semibold text-sm leading-snug group-hover:text-[#E8620A] transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin size={11} />{event.location}</p>
                      )}
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
