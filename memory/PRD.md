# PRD — The Archive: Bhuvan M. Acharya

## Original Problem Statement
Build a production-quality, interactive digital identity for Bhuvan M. Acharya, CS undergraduate at IIIT Tiruchirappalli (class of 2028) — "The Archive". An immersive, editorial, interactive portfolio (Swiss Editorial Minimalism × Futuristic Digital Architecture × Creative Brutalism) communicating three dimensions: BUILD, EXPLORE, CONNECT. Built for the Wispr Flow Challenge. No invented achievements; content honest and verifiable.

## User Choices (confirmed via ask_human)
- React SPA on the Emergent platform (Next.js not servable here) with client-side routes and MDX-style markdown content files.
- Contact: real GitHub (github.com/j4b3-21); email/LinkedIn/resume are clearly-marked placeholders until supplied.
- Journal seeded with honest, draft-marked entries; 2027/2028 remain "upcoming chapters".
- Project visuals: real GitHub Open Graph cards + typographic fallbacks (rate-limit safe).

## Architecture
- Frontend: React 19 (CRA + craco), react-router-dom 7, Tailwind 3, framer-motion 11, lenis smooth scroll, three 0.178 + @react-three/fiber 9 (lazy-loaded orbital sculpture, RoomEnvironment PMREM reflections, WebGL/reduced-motion fallback SVG), marked + js-yaml + zod content pipeline, sonner toasts.
- Content engine: `src/content/{projects,journal,research}/*.md` with YAML frontmatter, discovered via webpack require.context + raw-loader, validated with Zod schemas. Drop a .md file → timeline/index/case study update automatically.
- Backend: untouched FastAPI template (health route only); no database needed.
- Fonts: Instrument Serif (display), Geist (body), Geist Mono (metadata) via Google Fonts.
- Palette: Paper #F1EEE7 / Ink #25251F / Electric #536BFA / Stone #B9B5AA / Sage #82968A; dark: Void #111318 / Surface #1B202A / Cream #DCDDD9 / Accent #7189FF.

## Routes
/ (sections A–H: hero+3D, marquee, intro, selected work, capabilities, research teaser (dark), leadership, journal, contact) · /work · /work/[slug] (dark case studies ×6) · /journey · /journey/[slug] · /research (dark) · /about · /contact · /resume (print-ready) · 404.

## Implemented (2026-10-31)
- Design system, tokens, grain, 12-col hairline grid, floating compacting nav with active states + mobile overlay menu.
- Hero with masked line-by-line reveal, meta grid, dual CTAs; signature 3D orbital sculpture (mouse parallax, scroll-linked transform, particles, lazy chunk, fallbacks).
- Slow editorial marquee; intro dimension rows; 3 featured editorial project rows + /work index (6 projects from real repo research: NeuroWeave, CampusHire, BM4A, OFFLINE, Atrang, PTFS).
- Dark case studies with ASCII blueprint architecture diagrams, sectioned markdown, next-project navigation.
- Capabilities grid with shipped-vs-exploring dot legend; dark research lab (3 threads); leadership section (Quantum Club founding, T&P Cell incl. ₹11,000 Nextwave sponsorship + Acer talks, Web Dev Club).
- Journal engine: 5 draft-marked entries, expandable timeline, year groups, upcoming chapters, article pages.
- Contact channels (copy-to-clipboard, placeholder chips), About with honest "still figuring out", print-ready resume.
- SEO: per-page titles/descriptions/OG/canonical, JSON-LD Person, robots.txt, sitemap.xml, data-testids throughout, reduced-motion support.

## Verified
Desktop + mobile screenshots of every route; journal expand interaction; mobile menu open/close/navigate; backend /api health 200; robots/sitemap 200; no overflow-x; webpack compiles clean.


## v2 Revision (2026-10-31, final)
- Migrated to Next.js 15 App Router + TypeScript; every route statically generated (24 pages), incl. /work/[slug] + /journey/[slug] via generateStaticParams; unknown routes return real HTTP 404.
- Content pipeline: content/*.mdx with gray-matter frontmatter + Zod validation; drafts render only in development (only "Co-founded the Quantum Club" published).
- Accuracy: Atrang credited as team of 4 (Yogesh DB / Shreyash backend / Madhav admin frontend; my role = marked slot), demo atrang.vercel.app; PTFS credits madhav-kartikeya (25 commits) + upstream-xv6 note; solo projects drop "Everything"; "built with AI-assisted tooling" noted; dates fixed (NeuroWeave May 2026, BM4A Aug 2026, OFFLINE/CampusHire Oct 2026, PTFS Apr 2026); CampusHire numbers verified against README (Java 25, Spring Boot 4.1, PostgreSQL 18, Keycloak 26, Next.js 16, 244 tests, 2 replicas) and kept; BM4A 17 field types verified; chronology fixed (BM4A built alongside CampusHire; NeuroWeave postdates Oct 2025 notes).
- Voice: invented first-person anecdotes removed or replaced with [slots]; defensive/disclaimer copy removed; footer = "(c) 2026 Bhuvan M. Acharya".
- Visuals: GitHub OG cards removed; CampusHire real screenshots (+ "Demo data" captions), NeuroWeave Studio screenshot, designed SVG covers for BM4A/PTFS/OFFLINE/Atrang; ASCII diagrams replaced by responsive SVG diagrams with hover tooltips; dark nav variant on /work/* + /research; hero headline up to 140px with sculpture secondary (roughness 0.25, blue rim); marquee removed; reveals fire earlier; journal newest-first with 2028/2027 upcoming chapters on top; Outcome block at the end of every case study.
- Perf/SEO: first-load 103-168 kB per page (was 4.5-7.7 MB), three.js lazy after first paint, next/font self-hosted, next/image, absolute canonical/og from SITE_URL (placeholder https://the-archive-bhuvan.vercel.app - TODO in lib/site.ts), next/og images for home/journey/case studies/articles, sitemap.xml (all 7 pages + 6 case studies + published entries), robots.txt, icon.svg + apple icon, JSON-LD Person/SoftwareSourceCode/Article, Plausible analytics via env, Vercel deploy README, skip link + AA contrast + aria-live copy buttons, print-optimized one-page resume + public/resume.pdf.
- Slots pending user input: Atrang "my part", PTFS "my part", quantum co-founder name + photos, T&P sponsorship/Acer details (unpublished), WDC events, portrait /images/bhuvan.jpg, real domain for SITE_URL.

## Backlog
- P0: Add founding photographs + workshop records to the Quantum Club story (founding date 26 Oct 2026 verified; co-founder credit pending).
- P1: CampusHire live demo when deployed; NeuroWeave PyPI publication (only when real). Atrang demo live at atrang.iiitt.ac.in.
- P2: Journal tag filtering; OG-image generation per article; deploy to production domain.
