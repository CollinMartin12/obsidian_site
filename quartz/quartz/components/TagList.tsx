import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (tags && tags.length > 0) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags.map((tag) => {
          const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag}
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.5rem;
  margin: 0.5rem 0 1.5rem 0;
  flex-wrap: wrap;
  border-top: 1px solid var(--lightgray);
  padding-top: 1rem;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 4px;
  background-color: var(--lightgray) !important;
  padding: 0.2rem 0.6rem;
  margin: 0;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--darkgray) !important;
  text-decoration: none !important;
  transition: background-color 0.15s ease;
}

a.internal.tag-link:hover {
  background-color: var(--gray) !important;
  color: var(--dark) !important;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
