import { QuartzFilterPlugin } from "../types"

export const PublishFilter: QuartzFilterPlugin = () => ({
  name: "PublishFilter",
  shouldPublish(_ctx, [_tree, vfile]) {
    const content = vfile.value?.toString() || ""
    const slug = (vfile.data as any)?.slug as string | undefined

    // Always allow special pages: index (home) and notes (all-notes list)
    if (slug === "notes") {
      return true
    }

    // Only publish notes that explicitly contain the #publish tag
    return content.includes("#publish")
  },
})
