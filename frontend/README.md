# The Archive frontend

Next.js 15 App Router portfolio for Bhuvan M. Acharya.

## Commands

```bash
corepack yarn install
corepack yarn dev
corepack yarn build
```

The app is static-first: content is read from `content/`, validated with Zod,
and rendered into routes at build time.

## Content locations

- `content/projects/*.mdx` → project case studies
- `content/journal/*.mdx` → chronological journal entries
- `content/research/*.mdx` → research interests and notes
- `content/leadership/*.mdx` → leadership stories

Use `status: draft` for journal work that should remain local. The loader
prints invalid frontmatter errors during the build instead of silently
rendering malformed content.

## Asset locations

- `public/images/bhuvan.jpg` — optional portrait
- `public/images/quantum-club/` — supplied club photographs
- `public/images/projects/<slug>/` — supplied project screenshots
- `public/images/diagrams/` — optional custom diagrams
- `public/resume.pdf` — downloadable résumé

Reference public files with root-relative URLs such as
`/images/projects/campushire/dashboard.png`. Existing project covers and SVG
architecture diagrams are intentional fallbacks, so no asset is required to
run or deploy the site.

## Environment

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` or the deployment environment. It
drives canonical URLs, Open Graph metadata and the sitemap. Set
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` only when analytics should be enabled.
