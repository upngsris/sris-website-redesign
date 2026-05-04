import { notFound } from "next/navigation"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { groq } from "next-sanity"
import { PortableText } from "@portabletext/react"
import { CalendarDays, ArrowLeft, Tag, ArrowRight } from "lucide-react"

const newsQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    coverImage,
    excerpt,
    body,
    publishedAt,
    isFeatured,
    tags,
    author-> { _id, name, role, division, profileImage, bio, socialLinks },
    relatedEvent-> { _id, title, slug, startDate, status, location }
  }
`

const relatedNewsQuery = groq`
  *[_type == "news" && slug.current != $slug && category == $category] | order(publishedAt desc) [0..2] {
    _id, title, slug, category, coverImage, publishedAt, excerpt
  }
`

async function getArticle(slug: string) {
  return client.fetch(newsQuery, { slug })
}
async function getRelated(slug: string, category: string) {
  return client.fetch(relatedNewsQuery, { slug, category })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "news"]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
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
  announcement: "Announcement", research: "Research", events: "Events",
  awards: "Awards", partnerships: "Partnerships", general: "General",
}

const ROLE_LABELS: Record<string, string> = {
  president: "President", "vice-president": "Vice-President",
  secretary: "Secretary", treasurer: "Treasurer",
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

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(params.slug, article.category)
  const coverSrc = article.coverImage ? urlFor(article.coverImage).width(1400).height(560).url() : null
  const authorImg = article.author?.profileImage
    ? urlFor(article.author.profileImage).width(120).height(120).url()
    : null

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-[#0B1F3A] overflow-hidden">
        {coverSrc && (
          <img src={coverSrc} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-16">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to News
          </Link>
          <span className={`text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full inline-block mb-4 ${CATEGORY_STYLES[article.category] ?? CATEGORY_STYLES.general}`}>
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-slate-300 text-xs flex items-center gap-2">
            <CalendarDays size={12} className="text-[#E8620A]" />
            {fmtDate(article.publishedAt)}
            {article.author && <><span className="text-slate-600">·</span> {article.author.name}</>}
          </p>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main */}
        <article className="lg:col-span-2">
          {article.excerpt && (
            <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-[#E8620A] pl-5 mb-8 font-medium">
              {article.excerpt}
            </p>
          )}

          {article.body && (
            <PortableText value={article.body} components={ptComponents} />
          )}

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag size={13} className="text-slate-400" />
              {article.tags.map((tag: string) => (
                <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">

          {/* Author card */}
          {article.author && (
            <div className="border border-slate-100 rounded-xl p-5">
              <h3 className="text-[#0B1F3A] font-semibold text-sm uppercase tracking-wide mb-4">Written by</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A] overflow-hidden flex-shrink-0">
                  {authorImg ? (
                    <img src={authorImg} alt={article.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/60 font-bold">
                      {article.author.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#0B1F3A] text-sm">{article.author.name}</p>
                  <p className="text-xs text-slate-400 mb-2">{ROLE_LABELS[article.author.role] ?? article.author.role}</p>
                  {article.author.bio && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{article.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related event */}
          {article.relatedEvent && (
            <div className="bg-[#0B1F3A] rounded-xl p-5">
              <p className="text-[#E8620A] text-[10px] font-semibold uppercase tracking-wide mb-2">Related Event</p>
              <h4 className="text-white font-semibold text-sm leading-snug mb-3">
                {article.relatedEvent.title}
              </h4>
              {article.relatedEvent.startDate && (
                <p className="text-slate-400 text-xs flex items-center gap-1 mb-3">
                  <CalendarDays size={11} />
                  {fmtDate(article.relatedEvent.startDate)}
                </p>
              )}
              <Link
                href={`/events/${article.relatedEvent.slug.current}`}
                className="text-[#E8620A] text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View event <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="bg-[#f7f7f5] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-[#0B1F3A] text-2xl font-bold">More in {CATEGORY_LABELS[article.category] ?? "News"}</h2>
              <Link href="/news" className="text-[#E8620A] text-sm font-medium hover:underline flex items-center gap-1">
                All news <ArrowLeft size={13} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel: any) => {
                const relImg = rel.coverImage ? urlFor(rel.coverImage).width(600).height(360).url() : null
                return (
                  <Link
                    key={rel._id}
                    href={`/news/${rel.slug.current}`}
                    className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-36 bg-[#0B1F3A] overflow-hidden">
                      {relImg ? (
                        <img src={relImg} alt={rel.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-2xl font-bold">SRIS</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><CalendarDays size={11} />{fmtDate(rel.publishedAt)}</p>
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
