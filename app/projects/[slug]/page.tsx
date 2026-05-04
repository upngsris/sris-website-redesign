import { notFound } from "next/navigation"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { PortableText } from "@portabletext/react"
import {
  ArrowLeft, ArrowRight, CalendarDays, ExternalLink,
  Tag, Users, CheckCircle2, FlaskConical,
} from "lucide-react"

const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    division,
    coverImage,
    summary,
    body,
    startDate,
    endDate,
    outcomes,
    externalLink,
    tags,
    isFeatured,
    gallery,
    teamMembers[]-> {
      _id, name, role, division, profileImage, bio, socialLinks
    }
  }
`

const relatedQuery = groq`
  *[_type == "project" && slug.current != $slug && division == $division] | order(_createdAt desc) [0..2] {
    _id, title, slug, status, division, coverImage, summary, startDate
  }
`

async function getProject(slug: string) {
  return client.fetch(projectQuery, { slug })
}
async function getRelated(slug: string, division: string) {
  return client.fetch(relatedQuery, { slug, division })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "project"]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

const STATUS_STYLES: Record<string, string> = {
  active:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed: "bg-[#E8620A]/10 text-[#E8620A] border border-[#E8620A]/20",
  "on-hold": "bg-yellow-50 text-yellow-700 border border-yellow-200",
  archived:  "bg-slate-100 text-slate-500 border border-slate-200",
}

const DIVISION_LABELS: Record<string, string> = {
  physics: "Physics", chemistry: "Chemistry", biology: "Biology",
  esg: "Earth Science & Geology", mscs: "Maths, Stats & CS",
  "esg-geo": "Environmental Science & Geography",
  "cross-divisional": "Cross-Divisional",
}

const DIVISION_COLORS: Record<string, string> = {
  physics: "bg-blue-50 text-blue-700", chemistry: "bg-green-50 text-green-700",
  biology: "bg-lime-50 text-lime-700", esg: "bg-amber-50 text-amber-700",
  mscs: "bg-purple-50 text-purple-700", "esg-geo": "bg-teal-50 text-teal-700",
  "cross-divisional": "bg-slate-100 text-slate-600",
}

const ROLE_LABELS: Record<string, string> = {
  president: "President", "vice-president": "Vice-President",
  secretary: "Secretary", treasurer: "Treasurer",
}

function fmtYear(d?: string) {
  return d ? new Date(d).getFullYear() : null
}
function fmtDate(d: string) {
  return new Date(d).toLocaleString("en-AU", { year: "numeric", month: "long", day: "numeric" })
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-slate-600 leading-relaxed mb-5 text-[15px]">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-[#0B1F3A] text-2xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-[#0B1F3A] text-xl font-semibold mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#E8620A] pl-5 my-6 text-slate-500 italic text-base">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-[#0B1F3A]">{children}</strong>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-[#E8620A] underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-1.5 mb-5 text-slate-600">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-1.5 mb-5 text-slate-600">{children}</ol>,
  },
  types: {
    image: ({ value }: any) => {
      const src = urlFor(value).width(900).url()
      return <img src={src} alt="" className="rounded-xl my-8 w-full object-cover" />
    },
  },
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  const related = await getRelated(params.slug, project.division ?? "")
  const coverSrc = project.coverImage ? urlFor(project.coverImage).width(1400).height(600).url() : null
  const startYear = fmtYear(project.startDate)
  const endYear   = fmtYear(project.endDate)

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-[#0B1F3A] overflow-hidden">
        {coverSrc && (
          <img src={coverSrc} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-16">
          <Link href="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.status && (
              <span className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${STATUS_STYLES[project.status]}`}>
                {project.status}
              </span>
            )}
            {project.division && (
              <span className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${DIVISION_COLORS[project.division] ?? "bg-slate-100 text-slate-600"}`}>
                {DIVISION_LABELS[project.division] ?? project.division}
              </span>
            )}
          </div>

          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            {project.title}
          </h1>

          {(startYear || endYear) && (
            <p className="text-slate-300 text-sm flex items-center gap-1.5">
              <CalendarDays size={13} className="text-[#E8620A]" />
              {startYear}
              {endYear && startYear !== endYear ? ` – ${endYear}` : project.status === "active" ? " – Present" : ""}
            </p>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main */}
        <article className="lg:col-span-2">
          {project.summary && (
            <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-[#E8620A] pl-5 mb-8 font-medium">
              {project.summary}
            </p>
          )}

          {project.body && (
            <PortableText value={project.body} components={ptComponents} />
          )}

          {/* Outcomes */}
          {project.outcomes?.length > 0 && (
            <div className="mt-10 bg-[#f7f7f5] rounded-xl p-6">
              <h2 className="text-[#0B1F3A] font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#E8620A]" /> Key Outcomes
              </h2>
              <ul className="space-y-2">
                {project.outcomes.map((outcome: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-[#0B1F3A] text-xl font-bold mb-5">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.gallery.map((img: any, i: number) => (
                  <img
                    key={i}
                    src={urlFor(img).width(400).height(280).url()}
                    alt={`Gallery ${i + 1}`}
                    className="rounded-lg w-full h-40 object-cover hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag size={13} className="text-slate-400" />
              {project.tags.map((tag: string) => (
                <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">

          {/* External link CTA */}
          {project.externalLink && (
            <div className="bg-[#0B1F3A] rounded-xl p-6 text-center">
              <p className="text-white font-semibold mb-1">Explore Further</p>
              <p className="text-slate-400 text-sm mb-4">View the project repository, paper, or resource.</p>
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E8620A] hover:bg-[#d05508] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors w-full justify-center"
              >
                Open Link <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Project info */}
          <div className="border border-slate-100 rounded-xl p-5 space-y-3">
            <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide">Project Info</h3>
            <div className="space-y-2 text-sm text-slate-500">
              {project.status && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Status</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_STYLES[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              )}
              {project.division && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Division</span>
                  <span className="text-xs font-medium text-[#0B1F3A]">{DIVISION_LABELS[project.division] ?? project.division}</span>
                </div>
              )}
              {startYear && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Period</span>
                  <span className="text-xs text-[#0B1F3A]">
                    {startYear}{endYear && startYear !== endYear ? ` – ${endYear}` : project.status === "active" ? " – Present" : ""}
                  </span>
                </div>
              )}
              {project.teamMembers?.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Team size</span>
                  <span className="text-xs text-[#0B1F3A]">{project.teamMembers.length} member{project.teamMembers.length !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
          </div>

          {/* Team members */}
          {project.teamMembers?.length > 0 && (
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <Users size={13} /> Team
              </h3>
              <div className="space-y-3">
                {project.teamMembers.map((member: any) => {
                  const mImg = member.profileImage ? urlFor(member.profileImage).width(80).height(80).url() : null
                  return (
                    <div key={member._id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0B1F3A] overflow-hidden flex-shrink-0">
                        {mImg ? (
                          <img src={mImg} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/60 text-xs font-bold">
                            {member.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0B1F3A] leading-none">{member.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{ROLE_LABELS[member.role] ?? member.role}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-[#0B1F3A] text-2xl font-bold">Related Projects</h2>
              <Link href="/projects" className="text-[#E8620A] text-sm font-medium hover:underline flex items-center gap-1">
                All projects <ArrowLeft size={13} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel: any) => {
                const relImg = rel.coverImage ? urlFor(rel.coverImage).width(600).height(360).url() : null
                return (
                  <Link
                    key={rel._id}
                    href={`/projects/${rel.slug.current}`}
                    className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-36 bg-[#0B1F3A] overflow-hidden">
                      {relImg ? (
                        <img src={relImg} alt={rel.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FlaskConical size={28} className="text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex gap-2 mb-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_STYLES[rel.status]}`}>
                          {rel.status}
                        </span>
                      </div>
                      <h4 className="text-[#0B1F3A] text-sm font-semibold leading-snug group-hover:text-[#E8620A] transition-colors line-clamp-2">
                        {rel.title}
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
