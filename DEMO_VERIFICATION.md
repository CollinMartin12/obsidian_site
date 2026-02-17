# Local demo & verification

## Run the demo

1. **Build** (from repo root):
   ```bash
   npm run build
   ```

2. **Serve** the built site:
   ```bash
   cd main-site/dist && python3 -m http.server 3987
   ```

3. **Open in a browser:**
   - **Main site (portfolio):** [http://localhost:3987/](http://localhost:3987/)
   - **Notes index (centered dark blog list):** [http://localhost:3987/content/](http://localhost:3987/content/) or [http://localhost:3987/content/index.html](http://localhost:3987/content/index.html)
   - **Blog (same layout):** [http://localhost:3987/content/blog.html](http://localhost:3987/content/blog.html)

## What to verify

- **Main site:** Nav has Collin Martin, About, Projects, Skills, Connect, Notes. Notes link goes to `/content/notes.html`. Sections and styling load.
- **Notes/Blog page:** Dark background (#1a1b26), centered content (~720px), nav matches main site (Collin Martin → main site, About/Projects/Skills/Connect/Notes). “X blog articles written,” then years/months in gold, article titles with dates on the right. “Browse all notes” at bottom.
- **Navigation:** From the notes page, “Collin Martin” returns to the main site; section links (e.g. About) go to main site with the right hash.

## Build verification (automated)

- Build completes: `npm run build` exits 0.
- Output: `main-site/dist/index.html` (main site), `main-site/dist/content/index.html` and `content/blog.html` (notes/blog).
- Notes index HTML contains `data-slug="index"`, `blog-index-page`, nav with “Collin Martin” and “blog articles written”.
- Dark theme: built CSS includes `#1a1b26` for the notes/blog body background.
