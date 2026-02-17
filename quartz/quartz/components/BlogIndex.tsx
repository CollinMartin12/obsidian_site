import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"
import { i18n } from "../i18n"

/** Base URL for the main portfolio site (for "Collin Martin" and section links). Use full URL if notes are on a subdomain. */
const MAIN_SITE_HOME = "/"

/** Append .html so links work on static hosting (e.g. Netlify) when served from /content/blog.html */
function toStaticHref(url: string): string {
  return url.endsWith("/") ? url : url + ".html"
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const BlogIndex: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const sort = byDateAndAlphabetical(cfg)
  const notesHref = toStaticHref(resolveRelative(fileData.slug!, "notes"))

  const posts = allFiles
    .filter((page) => {
      const slug = (page.slug as string | undefined) ?? ""
      if (!slug) return false
      if (slug === "index" || slug === "notes") return false
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

      <div class="blog-index-top-line"></div>

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
                      const href = toStaticHref(resolveRelative(fileData.slug!, page.slug!))
                      const date = getDate(cfg, page)
                      const d = date ? new Date(date) : null
                      const dateStr = d
                        ? `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
                        : ""

                      return (
                        <li class="blog-post-item">
                          <a href={href} class="blog-post-card">
                            <span class="blog-post-link">{title}</span>
                            {dateStr && (
                              <div class="blog-post-date-bar">{dateStr}</div>
                            )}
                          </a>
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
              const href = toStaticHref(resolveRelative(fileData.slug!, page.slug!))
              return (
                <li class="blog-post-item">
                  <a href={href} class="blog-post-card">
                    <span class="blog-post-link">{title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}

BlogIndex.css = `
/* Blog index – uses main site palette (--color-* set in custom.scss for these pages) */
.blog-index {
  width: 100%;
  margin: 0 auto 2.5rem auto;
  padding: 0.5rem 0 0;
}

.blog-index-top-line {
  width: 100%;
  height: 1px;
  background: var(--color-border);
  margin: 0 0 2rem 0;
}

.blog-index-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
  text-align: center;
}

.blog-index-count {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.blog-year-group {
  width: 100%;
  margin: 0 auto 2rem auto;
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
  gap: 0.5rem;
}

.blog-post-item {
  line-height: 1.4;
  border-radius: 10px;
  overflow: hidden;
}

/* Rectangle card – whole item selects on hover and glows */
.blog-post-card {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.1));
  text-decoration: none !important;
  background: var(--color-bg, #fff);
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.blog-post-card:hover {
  background-color: rgba(235, 92, 121, 0.08);
  border-color: rgba(235, 92, 121, 0.5);
  box-shadow: 0 4px 24px rgba(235, 92, 121, 0.3);
}

.blog-post-link {
  color: var(--color-text) !important;
  font-weight: 400;
  font-size: 0.95rem;
  flex: 1;
  min-width: 0;
  transition: color 0.15s ease;
}

.blog-post-card:hover .blog-post-link {
  color: #eb5c79 !important;
}

/* Date in its own text bar, positioned at end of card */
.blog-post-date-bar {
  flex-shrink: 0;
  margin-left: auto;
  padding: 0.25rem 0.6rem;
  background: var(--color-border, rgba(0, 0, 0, 0.08));
  border-radius: 4px;
  color: var(--color-muted);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

@media (max-width: 800px) {
  .blog-post-card {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .blog-post-link {
    flex: 1;
    min-width: 0;
  }

  .blog-post-date-bar {
    margin-left: auto;
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }
}
`

export default (() => BlogIndex) satisfies QuartzComponentConstructor

