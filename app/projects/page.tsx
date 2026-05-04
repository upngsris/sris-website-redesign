import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { ArrowRight, FlaskConical, Star } from "lucide-react"
import Hero from "@/components/ui/Hero"

const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    status,
    division,
    coverImage,
    summary,
    startDate,
    endDate,
    isFeatured,
    tags,
    outcomes,
    teamMembers[]-> { _id, name, profileImage }
  }
`

async function getProjects() {
  return client.fetch(projectsQuery)
}

const STATUS_STYLES: Record<string, string> = {
  active:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed: "bg-[#E8620A]/10 text-[#E8620A] border border-[#E8620A]/20",
  "on-hold": "bg-yellow-50 text-yellow-700 border border-yellow-200",
  archived:  "bg-slate-100 text-slate-500 border border-slate-200",
}

const DIVISION_LABELS: Record<string, string> = {
  physics:           "Physics",
  chemistry:         "Chemistry",
  biology:           "Biology",
  esg:               "Earth Science & Geology",
  mscs:              "Maths, Stats & CS",
  "esg-geo":         "Environmental Science & Geography",
  "cross-divisional":"Cross-Divisional",
}

const DIVISION_COLORS: Record<string, string> = {
  physics:           "bg-blue-50 text-blue-700",
  chemistry:         "bg-green-50 text-green-700",
  biology:           "bg-lime-50 text-lime-700",
  esg:               "bg-amber-50 text-amber-700",
  mscs:              "bg-purple-50 text-purple-700",
  "esg-geo":         "bg-teal-50 text-teal-700",
  "cross-divisional":"bg-slate-100 text-slate-600",
}

function fmtYear(dateStr?: string) {
  return dateStr ? new Date(dateStr).getFullYear() : null
}

export default async function ProjectsPage() {
  const projects: any[] = await getProjects()

  const featured = projects.filter((p) => p.isFeatured)
  const active   = projects.filter((p) => !p.isFeatured && p.status === "active")
  const others   = projects.filter((p) => !p.isFeatured && p.status !== "active")

  return (
    <main className="min-h-screen bg-white">

{/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "Our Work" }}
            headline="Research & Projects"
            accentText="Projects"
            subheading="Innovative projects and research initiatives led by UPNG SRIS members across all scientific disciplines."
            /*ctas={[
                { label: "Meet the Team", href: "/leaders", variant: "primary" },
                { label: "Our Mission", href: "/about#mission", variant: "secondary" },
            ]}*/
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
            ]}
        />

      </section>

      {/* ── Featured Projects ── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} className="text-[#E8620A]" />
            <p className="text-[#E8620A] text-xs font-semibold tracking-[0.15em] uppercase">Featured</p>
          </div>
          <h2 className="text-[#0B1F3A] text-3xl font-bold mb-8">Spotlight Projects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((project) => {
              const imgSrc = project.coverImage ? urlFor(project.coverImage).width(800).height(460).url() : null
              const startYear = fmtYear(project.startDate)
              const endYear   = fmtYear(project.endDate)
              return (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group relative rounded-xl overflow-hidden bg-[#0B1F3A] min-h-[280px] flex flex-col justify-end"
                >
                  {imgSrc && (
                    <img src={imgSrc} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/50 to-transparent" />
                  <div className="relative p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.status && (
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status]}`}>
                          {project.status}
                        </span>
                      )}
                      {project.division && (
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${DIVISION_COLORS[project.division] ?? "bg-slate-100 text-slate-600"}`}>
                          {DIVISION_LABELS[project.division] ?? project.division}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-xl leading-snug mb-1 line-clamp-2">{project.title}</h3>
                    {(startYear || endYear) && (
                      <p className="text-slate-400 text-xs">{startYear}{endYear && startYear !== endYear ? ` – ${endYear}` : ""}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Active Projects ── */}
      {active.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-8">
            <p className="text-emerald-600 text-xs font-semibold tracking-[0.15em] uppercase mb-1">In Progress</p>
            <h2 className="text-[#0B1F3A] text-3xl font-bold">Active Projects</h2>
          </div>
          <ProjectGrid projects={active} />
        </section>
      )}

      {/* ── Completed / Archived ── */}
      {others.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="mb-8">
              <p className="text-slate-400 text-xs font-semibold tracking-[0.15em] uppercase mb-1">Archive</p>
              <h2 className="text-[#0B1F3A] text-3xl font-bold">Past Projects</h2>
            </div>
            <ProjectGrid projects={others} />
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <div className="max-w-6xl mx-auto px-6 py-24 text-center text-slate-400">
          No projects have been published yet.
        </div>
      )}
    </main>
  )
}

function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const imgSrc = project.coverImage ? urlFor(project.coverImage).width(600).height(360).url() : null
        const startYear = fmtYear(project.startDate)
        const endYear   = fmtYear(project.endDate)

        return (
          <Link
            key={project._id}
            href={`/projects/${project.slug.current}`}
            className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-44 bg-[#0B1F3A] overflow-hidden">
              {imgSrc ? (
                <img src={imgSrc} alt={project.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FlaskConical size={36} className="text-white/20" />
                </div>
              )}
              {project.division && (
                <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded ${DIVISION_COLORS[project.division] ?? "bg-white/90 text-slate-600"}`}>
                  {DIVISION_LABELS[project.division] ?? project.division}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_STYLES[project.status]}`}>
                  {project.status}
                </span>
                {(startYear || endYear) && (
                  <span className="text-xs text-slate-400">
                    {startYear}{endYear && startYear !== endYear ? ` – ${endYear}` : ""}
                  </span>
                )}
              </div>
              <h3 className="text-[#0B1F3A] font-semibold text-sm leading-snug group-hover:text-[#E8620A] transition-colors mb-2 line-clamp-2">
                {project.title}
              </h3>
              {project.summary && (
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{project.summary}</p>
              )}

              {/* Team avatars + read more */}
              <div className="flex items-center justify-between mt-4">
                {project.teamMembers?.length > 0 && (
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 4).map((m: any) => {
                      const mImg = m.profileImage ? urlFor(m.profileImage).width(48).height(48).url() : null
                      return (
                        <div key={m._id} className="w-6 h-6 rounded-full border-2 border-white bg-[#0B1F3A] overflow-hidden">
                          {mImg ? (
                            <img src={mImg} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/60 text-[9px] font-bold">{m.name[0]}</div>
                          )}
                        </div>
                      )
                    })}
                    {project.teamMembers.length > 4 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[9px] text-slate-500 font-bold">
                        +{project.teamMembers.length - 4}
                      </div>
                    )}
                  </div>
                )}
                <span className="text-[#E8620A] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                  View project <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
