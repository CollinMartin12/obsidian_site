import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"
import { i18n } from "../i18n"

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

BlogIndex.css = ``

export default (() => BlogIndex) satisfies QuartzComponentConstructor

