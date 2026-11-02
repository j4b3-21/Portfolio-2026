# The Archive — Bhuvan M. Acharya

Personal portfolio: Next.js App Router + TypeScript, statically generated, deployed to Vercel.

## Stack
- Next.js 15 (App Router, static generation for every route)
- TypeScript, Tailwind CSS 3, Framer Motion, Lenis
- Three.js + React Three Fiber (lazy-loaded orbital sculpture with static fallback)
- Content as markdown files (`content/`) with Zod-validated frontmatter (gray-matter)
- next/font (self-hosted Instrument Serif, Geist, Geist Mono), next/image, next/og OG images

## Develop
```bash
yarn install
yarn dev        # http://localhost:3000
```
Draft journal entries (frontmatter `status: draft`) are visible only in development.

## Deploy to Vercel
1. Push this folder to a Git repository.
2. In Vercel: **New Project → import the repo** (framework auto-detected as Next.js).
3. Set environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` — your production domain, e.g. `https://yourdomain.com` (used for every canonical URL, og:url, og:image and the sitemap; required in production).
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — *(optional)* your domain to enable privacy-friendly Plausible analytics; leave unset to disable.
4. Deploy. Then point your custom domain at the Vercel project (Domains → Add).

## Content
Add a markdown/MDX file and it appears automatically — no component changes:

- `content/projects/<slug>.mdx` → case study at `/work/<slug>`, work index, sitemap, OG image
- `content/journal/<date>-<slug>.mdx` → journal entry at `/journey/<slug>` (timeline + sitemap + OG image) — set `status: published` to show in production
- `content/research/<slug>.mdx` → research thread on `/research`
- `content/leadership/<id>.mdx` → leadership story on `/` and `/about`

Frontmatter is validated with Zod at build time; invalid files fail loudly in the console.

## Update the domain
The single source of truth is `NEXT_PUBLIC_SITE_URL` (see `lib/site.ts`). Every canonical, og:url, og:image and sitemap URL is built from it as an absolute URL.
