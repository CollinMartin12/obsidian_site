import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.NavBar()],
  afterBody: [
    Component.TagList(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/collinmartin",
      LinkedIn: "https://linkedin.com/in/collinmartin",
      Email: "mailto:hello@cmmdoes.com",
    },
  }),
}

// Layout for notes index (and blog) – clean centered list, no sidebars
export const blogIndexLayout: PageLayout = {
  beforeBody: [Component.BlogIndex()],
  left: [],
  right: [],
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
