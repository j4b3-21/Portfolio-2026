# The Archive — Bhuvan M. Acharya

Personal portfolio for Bhuvan M. Acharya: an editorial archive of software,
research interests, leadership and community work.

The production app lives in [`frontend/`](./frontend). It is a static Next.js
App Router site with content-driven project, journal, research and leadership
pages.

## Run locally

```bash
cd frontend
corepack yarn install
corepack yarn dev
```

Open <http://localhost:3000>. Create a production build with:

```bash
corepack yarn build
```

`corepack` is used because this repository pins Yarn 1.22.22 but does not
assume that `yarn` is already on your PATH.

## Configuration

Copy `frontend/.env.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Optional:
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.example
```

Before deploying, set `NEXT_PUBLIC_SITE_URL` to the real public URL. It is the
source for canonical URLs, sitemap entries, Open Graph URLs and JSON-LD.

## Add content

No page component needs to be edited for normal content updates:

| Content | Location | Result |
| --- | --- | --- |
| Project case study | `frontend/content/projects/<slug>.mdx` | `/work/<slug>` and Work index |
| Journal entry | `frontend/content/journal/<date>-<slug>.mdx` | `/journey/<slug>` and timeline |
| Research thread | `frontend/content/research/<slug>.mdx` | Research page |
| Leadership story | `frontend/content/leadership/<id>.mdx` | Home, About and résumé |

Frontmatter is validated with Zod during the build. Journal entries with
`status: draft` appear locally but are excluded from production.

## Assets you can add

The current site is usable without additional files: project covers and
screenshots already have designed fallbacks, and the résumé is at
`frontend/public/resume.pdf`. When you are ready to supply real assets, add
them here:

| Asset | Add it at | How to use it |
| --- | --- | --- |
| Portrait | `frontend/public/images/bhuvan.jpg` | Reference as `/images/bhuvan.jpg` in content or a component |
| Quantum Club photographs | `frontend/public/images/quantum-club/` | Add the image path to the Quantum Club journal/leadership content |
| Project screenshots | `frontend/public/images/projects/<slug>/` | Reference with Markdown image syntax in that project's `.mdx` file |
| Architecture diagrams | `frontend/public/images/diagrams/` | Reference from a project `.mdx` file when an SVG is preferable to the built-in diagram |
| Resume replacement | `frontend/public/resume.pdf` | Replace the existing file; the résumé route already links to it |
| Social preview | `frontend/app/opengraph-image.tsx` or `frontend/public/` | Only needed if the generated OG image should be replaced |

Use descriptive filenames, keep images optimized, and include useful alt text.
Do not add stock photography; project screenshots, event photographs and
original diagrams are the right fit for this site.

## Routes

`/`, `/work`, `/work/[slug]`, `/journey`, `/journey/[slug]`, `/research`,
`/about`, `/contact`, `/resume`, `/robots.txt` and `/sitemap.xml` are
implemented. The orbital Three.js sculpture is lazy-loaded and falls back to a
static SVG for reduced-motion, low-power and unsupported-WebGL environments.

## Deployment

Deploy `frontend/` as the Next.js project (Vercel works without additional
configuration). The app does not require a database or API server.
