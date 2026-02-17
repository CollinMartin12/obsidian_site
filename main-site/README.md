# Main site (Astro) – allisonkrinsky.com replica

Single-page portfolio built with Astro + JavaScript, replicating the structure and content of [allisonkrinsky.com](https://allisonkrinsky.com). The nav includes a **Notes** link to `/notes/`, where your Quartz site can be served.

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

Pre-rendered output goes to `dist/`.

## Linking Quartz at `/notes/` (Option A)

To serve your Quartz site under the same domain at `/notes/`:

1. Build Quartz (from your Quartz repo):
   ```bash
   cd ../quartz && npx quartz build
   ```
2. Copy the Quartz build output into this app’s public folder:
   ```bash
   cp -r ../quartz/public/* ./public/notes/
   ```
   (If Quartz writes to a different output dir, e.g. `build/`, use that path instead of `public`.)
3. Build this Astro site:
   ```bash
   npm run build
   ```

The Astro app will serve the contents of `public/notes/` at `/notes/`. Quartz uses relative URLs, so no Quartz config change is required.

## Project structure

- `src/components/` – Hero, About, Projects, Skills, Connect, Layout
- `src/data/site.js` – Site copy (hero, about, projects, skills, connect)
- `src/pages/index.astro` – Single page that composes all sections
- `src/styles/global.css` – Global styles and section layout
