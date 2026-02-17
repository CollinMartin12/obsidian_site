import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"
import { i18n } from "../i18n"

/** Base URL for the main portfolio site (for "Collin Martin" and section links). Use full URL if notes are on a subdomain. */
const MAIN_SITE_HOME = "/"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const BlogIndex: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const sort = byDateAndAlphabetical(cfg)
  const notesHref = resolveRelative(fileData.slug!, "notes")

  const posts = allFiles
    .filter((page) => {
      const slug = (page.slug as string | undefined) ?? ""
      if (!slug) return false
      if (slug === "index" || slug === "blog" || slug === "notes") return false
      if (slug === "projects" || slug.startsWith("projects/")) return false
      if (slug.startsWith("tags/")) return false
      if (slug.endsWith("/index")) return false
      return true
    })
    .sort(sort)

  const t = i18n(cfg.locale)

  // Group posts by year then month
  const grouped: Map<number, Map<number, typeof posts>> = new Map()
  const undated: typeof posts = []
  for (const page of posts) {
    const date = getDate(cfg, page)
    if (!date) {
      undated.push(page)
      continue
    }
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth()
    if (!grouped.has(year)) grouped.set(year, new Map())
    const yearMap = grouped.get(year)!
    if (!yearMap.has(month)) yearMap.set(month, [])
    yearMap.get(month)!.push(page)
  }

  const sortedYears = [...grouped.keys()].sort((a, b) => b - a)

  return (
    <section class="blog-index">
      <header class="site-header">
        <nav class="nav" aria-label="Main">
          <a href={MAIN_SITE_HOME} class="nav__name">Collin Martin</a>
          <div class="nav__links">
            <a href={`${MAIN_SITE_HOME}#about`}>About</a>
            <a href={`${MAIN_SITE_HOME}#projects`}>Projects</a>
            <a href={`${MAIN_SITE_HOME}#skills`}>Skills</a>
            <a href={`${MAIN_SITE_HOME}#connect`}>Connect</a>
            <a href={notesHref}>Notes</a>
          </div>
        </nav>
      </header>

      <div class="blog-index-header">
        <p class="blog-index-count">{posts.length} blog articles written</p>
      </div>

      {sortedYears.map((year) => {
        const yearMap = grouped.get(year)!
        const sortedMonths = [...yearMap.keys()].sort((a, b) => b - a)

        return (
          <div class="blog-year-group">
            <h3 class="blog-year-heading">{year}</h3>
            {sortedMonths.map((month) => {
              const monthPosts = yearMap.get(month)!
              return (
                <div class="blog-month-group">
                  <h4 class="blog-month-heading">{MONTHS[month]}</h4>
                  <ul class="blog-month-list">
                    {monthPosts.map((page) => {
                      const title = page.frontmatter?.title ?? t.propertyDefaults.title
                      const href = resolveRelative(fileData.slug!, page.slug!)
                      const date = getDate(cfg, page)
                      const d = date ? new Date(date) : null
                      const dateStr = d
                        ? `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
                        : ""

                      return (
                        <li class="blog-post-item">
                          <a href={href} class="blog-post-link">
                            {title}
                          </a>
                          <span class="blog-post-date">{dateStr}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        )
      })}

      {undated.length > 0 && (
        <div class="blog-year-group">
          <h3 class="blog-year-heading">Other</h3>
          <ul class="blog-month-list">
            {undated.map((page) => {
              const title = page.frontmatter?.title ?? t.propertyDefaults.title
              const href = resolveRelative(fileData.slug!, page.slug!)
              return (
                <li class="blog-post-item">
                  <a href={href} class="blog-post-link">{title}</a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div class="blog-index-footer">
        <a href={resolveRelative(fileData.slug!, "notes")} class="blog-browse-link">
          Browse all notes
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

BlogIndex.css = `
/* Blog index – uses main site palette (--color-* set in custom.scss for these pages) */
.blog-index {
  max-width: 100%;
  margin: 0 auto 2rem auto;
  padding: 2rem 0 0;
}

.blog-index-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.blog-index-count {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.blog-year-group {
  margin-bottom: 2rem;
}

.blog-year-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hero-name);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border);
  display: inline-block;
}

.blog-month-group {
  margin-bottom: 1.5rem;
  margin-left: 0.25rem;
}

.blog-month-heading {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.6rem 0;
}

.blog-month-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.blog-post-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.3rem 0;
  line-height: 1.4;
}

.blog-post-link {
  color: var(--color-text) !important;
  text-decoration: none !important;
  font-weight: 400;
  font-size: 0.95rem;
  background: none !important;
  transition: color 0.15s ease;
}

.blog-post-link:hover {
  color: var(--hero-name) !important;
}

.blog-post-date {
  color: var(--color-muted);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
}

.blog-index-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.blog-browse-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--hero-name) !important;
  text-decoration: none !important;
  background: none !important;
  font-size: 0.9rem;
  font-weight: 500;
  transition: gap 0.2s ease, color 0.15s ease;
}

.blog-browse-link:hover {
  gap: 0.7rem;
  color: var(--color-text) !important;
}

.blog-browse-link svg {
  transition: transform 0.2s ease;
}

.blog-browse-link:hover svg {
  transform: translateX(2px);
}

@media (max-width: 800px) {
  .blog-post-item {
    flex-direction: column;
    gap: 0.1rem;
  }

  .blog-post-date {
    font-size: 0.8rem;
  }
}
`

export default (() => BlogIndex) satisfies QuartzComponentConstructor

