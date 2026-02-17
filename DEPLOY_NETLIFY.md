# Deploy with Netlify

This repo is set up to deploy as **one site** on Netlify: your portfolio plus your Quartz notes at `/content/`.

## One-time setup

1. **Push your code** to GitHub (e.g. `https://github.com/CollinMartin12/obsidian_site`).

2. **Log in to Netlify**: [https://app.netlify.com](https://app.netlify.com)

3. **Add a new site** → **Import an existing project** → **GitHub** → choose **obsidian_site**.

4. Netlify will read the root **netlify.toml** and use:
   - **Build command:** `npm run build`  
     (builds Quartz, copies it into the main site, then builds the main site)
   - **Publish directory:** `main-site/dist`
   - **Node version:** 22

5. Click **Deploy site**. No extra env vars needed.

## What gets built

1. Quartz notes are built from `quartz/`.
2. The built notes are copied into `main-site/public/content/`.
3. The Astro main site is built; its output is `main-site/dist/`.
4. Netlify serves `main-site/dist/`, so you get:
   - **/** → portfolio
   - **/content/notes.html** → all notes
   - **/content/blog.html** → blog

## Custom domain

In Netlify: **Site settings** → **Domain management** → **Add custom domain** (e.g. `cmmdoes.com`).

## Future updates

Push to `main` on GitHub; Netlify will run the same build and deploy automatically.
