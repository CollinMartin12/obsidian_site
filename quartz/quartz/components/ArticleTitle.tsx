import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const subtitle =
    (fileData.frontmatter as Record<string, unknown>)?.subtitle as string | undefined
  const description = fileData.description

  if (title) {
    return (
      <div class={classNames(displayClass, "article-title-block")}>
        <h1 class="article-title">{title}</h1>
        {subtitle && <p class="article-subtitle">{subtitle}</p>}
        {!subtitle && description && <p class="article-subtitle">{description}</p>}
      </div>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title-block {
  margin: 0.5rem 0 0 0;
}

.article-title {
  margin: 0 0 0.15rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--dark);
}

.article-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--gray);
  line-height: 1.5;
  font-weight: 400;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
