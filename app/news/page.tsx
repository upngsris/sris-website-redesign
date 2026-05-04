import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { ArrowRight, CalendarDays } from "lucide-react"
import Hero from "@/components/ui/Hero"

const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    coverImage,
    excerpt,
    publishedAt,
    isFeatured,
    tags,
    author-> { _id, name, role, profileImage }
  }
`

async function getNews() {
  return client.fetch(newsQuery)
}

const CATEGORY_STYLES: Record<string, string> = {
  announcement: "bg-[#E8620A]/10 text-[#E8620A]",
  research:     "bg-blue-50 text-blue-700",
  events:       "bg-emerald-50 text-emerald-700",
  awards:       "bg-yellow-50 text-yellow-700",
  partnerships: "bg-purple-50 text-purple-700",
  general:      "bg-slate-100 text-slate-600",
}

const CATEGORY_LABELS: Record<string, string> = {
  announcement: "Announcement",
  research:     "Research",
  events:       "Events",
  awards:       "Awards",
  partnerships: "Partnerships",
  general:      "General",
}

const ROLE_LABELS: Record<string, string> = {
  president: "President", "vice-president": "Vice-President",
  secretary: "Secretary", treasurer: "Treasurer",
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-AU", {
    year: "numeric", month: "long", day: "numeric",
  })
}

export default async function NewsPage() {
  const articles: any[] = await getNews()
  const featured = articles.filter((a) => a.isFeatured)
  const rest     = articles.filter((a) => !a.isFeatured)

  return (
    <main className="min-h-screen bg-white">

{/* ══════════════════════════════════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B3A6B]" aria-label="About page hero">
        <Hero
            backgroundImage="/assets/banner-image.jpg"
            badge={{ label: "From The Society" }}
            headline="Latest News"
            accentText="News"
            subheading="Announcements, research highlights, and updates from UPNG SRIS and the wider scientific community in Papua New Guinea."
            /*ctas={[
                { label: "Meet the Team", href: "/leaders", variant: "primary" },
                { label: "Our Mission", href: "/about#mission", variant: "secondary" },
            ]}*/
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
            ]}
        />

      </section>

      {/* ── Featured Articles ── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-4">
          <p className="text-[#E8620A] text-xs font-semibold tracking-[0.15em] uppercase mb-1">Featured</p>
          <h2 className="text-[#0B1F3A] text-3xl font-bold mb-8">Top Stories</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((article, i) => {
              const imgSrc = article.coverImage
                ? urlFor(article.coverImage).width(i === 0 ? 900 : 600).height(400).url()
                : null
              return (
                <Link
                  key={article._id}
                  href={`/news/${article.slug.current}`}
                  className="group relative rounded-xl overflow-hidden bg-[#0B1F3A] aspect-video flex flex-col justify-end"
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />
                  <div className="relative p-6">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full mb-2 inline-block ${CATEGORY_STYLES[article.category] ?? CATEGORY_STYLES.general}`}>
                      {CATEGORY_LABELS[article.category] ?? article.category}
                    </span>
                    <h3 className="text-white font-bold text-xl leading-snug mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-300 text-xs flex items-center gap-1.5">
                      <CalendarDays size={11} />{fmtDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── All Articles ── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        {rest.length > 0 && (
          <>
            <div className="mb-8">
              <p className="text-slate-400 text-xs font-semibold tracking-[0.15em] uppercase mb-1">All Articles</p>
              <h2 className="text-[#0B1F3A] text-3xl font-bold">More News</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => {
                const imgSrc = article.coverImage
                  ? urlFor(article.coverImage).width(600).height(360).url()
                  : null
                const authorImg = article.author?.profileImage
                  ? urlFor(article.author.profileImage).width(60).height(60).url()
                  : null
                return (
                  <Link
                    key={article._id}
                    href={`/news/${article.slug.current}`}
                    className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 bg-[#0B1F3A] overflow-hidden">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={article.title}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-4xl font-bold">SRIS</span>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${CATEGORY_STYLES[article.category] ?? CATEGORY_STYLES.general}`}>
                        {CATEGORY_LABELS[article.category] ?? article.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                        <CalendarDays size={11} />{fmtDate(article.publishedAt)}
                      </p>
                      <h3 className="text-[#0B1F3A] font-semibold text-sm leading-snug group-hover:text-[#E8620A] transition-colors mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                      )}

                      {/* Author & read more */}
                      <div className="flex items-center justify-between mt-4">
                        {article.author ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#0B1F3A] overflow-hidden flex-shrink-0">
                              {authorImg ? (
                                <img src={authorImg} alt={article.author.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/60 text-[9px] font-bold">
                                  {article.author.name[0]}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">{article.author.name}</span>
                          </div>
                        ) : <span />}

                        <span className="text-[#E8620A] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {articles.length === 0 && (
          <p className="text-slate-400 text-center py-20">No news articles published yet.</p>
        )}
      </section>
    </main>
  )
}
