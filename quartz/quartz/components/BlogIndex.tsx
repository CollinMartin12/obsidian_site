import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import { resolveRelative } from "../util/path"
import { Date, getDate } from "./Date"
import { i18n } from "../i18n"

const MAX_PREVIEW_WORDS = 30

const getPreview = (text: string | undefined): string => {
  if (!text) return ""
  const words = text.split(/\s+/)
  if (words.length <= MAX_PREVIEW_WORDS) return text
  return words.slice(0, MAX_PREVIEW_WORDS).join(" ") + "…"
}

const BlogIndex: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const sort = byDateAndAlphabetical(cfg)
  const isNotesHome = fileData.slug === "index" || fileData.slug === "notes"

  const posts = allFiles
    .filter((page) => {
      const slug = (page.slug as string | undefined) ?? ""

      if (!slug) return false
      if (slug === "index" || slug === "blog" || slug === "notes") return false
      if (slug === "projects" || slug.startsWith("projects/")) return false
      if (slug.startsWith("tags/")) return false
      if (slug.endsWith("/index")) return false

      // Everything else under content is treated as a blog-style entry
      return true
    })
    .sort(sort)

  const t = i18n(cfg.locale)

  return (
    <section class="blog-index">
      <div class="blog-index-header">
        <h1>{isNotesHome ? "Notes" : "Blog"}</h1>
        <p class="blog-index-subtitle">{isNotesHome ? "Recent notes" : "Recent writing and notes"}</p>
      </div>

      <div class="blog-index-list">
        {posts.map((page) => {
          const title =
            page.frontmatter?.title ?? t.propertyDefaults.title
          const href = resolveRelative(fileData.slug!, page.slug!)
          const description = (page.description as string | undefined) ?? ""

          return (
            <article class="blog-card">
              <header class="blog-card-header">
                <h2 class="blog-card-title">
                  <a href={href} class="internal">
                    {title}
                  </a>
                </h2>
                {page.dates && (
                  <p class="blog-card-meta">
                    <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                  </p>
                )}
              </header>
              {description && (
                <p class="blog-card-excerpt">{getPreview(description)}</p>
              )}
            </article>
          )
        })}
      </div>

      <div class="blog-index-footer">
        <a href={resolveRelative(fileData.slug!, "Welcome")} class="blog-see-more-button">
          See more notes
        </a>
      </div>
    </section>
  )
}

BlogIndex.css = `
.blog-index {
  max-width: 900px;
  margin: 0 auto 4rem auto;
  padding: 1rem 0 0 0;
}

.blog-index-header {
  margin-bottom: 1.5rem;
}

.blog-index-header h1 {
  margin: 0;
  font-size: 2rem;
  color: var(--dark);
}

.blog-index-subtitle {
  margin-top: 0.4rem;
  color: var(--darkgray);
  font-size: 0.95rem;
}

.blog-index-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-card {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--lightgray);
}

.blog-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.blog-card-title {
  margin: 0;
  font-size: 1.2rem;
}

.blog-card-title a {
  color: var(--dark);
}

.blog-card-meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--gray);
  white-space: nowrap;
}

.blog-card-excerpt {
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  color: var(--darkgray);
}

.blog-index-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
}

.blog-see-more-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--dark);
  background: var(--light);
  color: var(--dark);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.blog-see-more-button:hover {
  background: var(--lightgray);
}
`

export default (() => BlogIndex) satisfies QuartzComponentConstructor

