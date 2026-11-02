# EXPORT REPORT — the-archive-16

- **Source:** Emergent (app.emergent.sh), project `the-archive-16`, Code view
- **Extraction date:** 1 Nov 2026 (IST, UTC+5:30)
- **Method:** opened each file in the Emergent editor, copied it to the clipboard, and wrote it to disk. Clips were matched to paths by order, so every file was spot-checked to make sure its contents match its name and path.

## Counts
- Files in Emergent inventory: **82**
- Extracted to disk: **80** (97.6%), including the recreated empty `test_reports/pytest/.gitkeep`
- Missing: **2**: `frontend/app/icon.svg`, `frontend/public/favicon.svg`
- Added after extraction (not in the Emergent project): `EXPORT_REPORT.md`, `EXTRACTION_LOG.md`, `backend/.env.example`, `frontend/.env.example`

## Failed or inaccessible
- `frontend/app/icon.svg`: copying was disabled in the Emergent editor
- `frontend/public/favicon.svg`: copying was disabled in the Emergent editor

## Needs manual intervention
1. **`frontend/public/resume.pdf`** (3973 B): binary data copied as text. The PDF header and trailer (`%%EOF`) are present, but the binary bytes in it (for example in the header comment) were mangled by the clipboard, so the file is **probably corrupt**. Download the original from Emergent or the live site.
2. **`frontend/app/icon.svg`** and **`frontend/public/favicon.svg`**: download them manually.
3. **`frontend/assets/fonts/InstrumentSerif-Regular.ttf`** and **`frontend/assets/fonts/IBMPlexMono-Regular.ttf`**: `lib/og.tsx` reads these, but they **did not appear in the Emergent file explorer inventory**. Without them `next build` fails. They are the open-source Google Fonts (OFL) files and can be fetched from github.com/google/fonts. They are not included here so that nothing outside the original project is added.
4. `test_reports/pytest/.gitkeep` was recreated as an empty file.

## Content verification
- I checked every text file's imports, component names, exports and front-matter against its path. **No mismatches were found** (for example, `components/Hero.tsx` imports framer-motion and renders the hero, `content/projects/atrang.mdx` has `slug: "atrang"`, and `lib/og.tsx` exports `makeOg`, which the opengraph-image routes use).
- Line endings and whitespace: see the table below. The "Ends with newline" column shows whether the file ends in `\n`. Clipboard copying may have dropped or added a final newline, so compare against the original if exact byte-for-byte identity matters.
- Size comparison against Emergent wasn't possible because the editor doesn't show file sizes. The hashes below are for the local files.

| File | Bytes | SHA-256 | Ends with newline | Trailing whitespace on a line |
|---|---|---|---|---|
| `backend/pytest.ini` | 646 | `6cb1fc884360a028c18965b664932f7caef56074ed2db617ae356876521b15b3` | yes | no |
| `backend/requirements.txt` | 469 | `b6ea2378cf265d1d44b8c638a0fbbe92a507de63273f9bdc21334fbdcba194cb` | yes | no |
| `backend/server.py` | 2589 | `9aea2a00a0f2e9db4685b689e9684d42012e038ee5d9d14d059115c7767725cb` | no | yes |
| `frontend/app/about/page.tsx` | 8308 | `ed446b23960661909f1330a34fa1c12667d6c82b8f96bcf0b59291d7bf15e1d0` | yes | no |
| `frontend/app/contact/page.tsx` | 3782 | `d957e0cacfc402e0dbdbb1589ffb245a2760704ab919a154ace4db7858ac5e7a` | yes | no |
| `frontend/app/journey/[slug]/opengraph-image.tsx` | 547 | `3056dc9f69c0f3b90212861ccbaf3ceb4656976ab55a5afe89ed6ca6bf85c85d` | yes | no |
| `frontend/app/journey/[slug]/page.tsx` | 4974 | `cd726a818b2403d0ca0b1cb921d450ad59c94e1ebec9b44fa29277f1c9dd1063` | yes | no |
| `frontend/app/journey/opengraph-image.tsx` | 331 | `fc1aaa23e5fe87fadac01faddf92d2b12b34f7426dcacddde151bcbfa8334510` | yes | no |
| `frontend/app/journey/page.tsx` | 1793 | `f010433a9fd0ed424df1ae85e828f8b59d388783c240636aac0452c2f9dd80ca` | yes | no |
| `frontend/app/research/page.tsx` | 5060 | `b49301f2c4470a30d26e6ab141135a4fdea3503e98f61f48b8f323ebcbe4c920` | yes | no |
| `frontend/app/resume/page.tsx` | 7287 | `08ab16754447433b81f3e545956a0361cd6cd3c52882b3f2969af01dfaf37d27` | yes | no |
| `frontend/app/work/[slug]/opengraph-image.tsx` | 493 | `67b6048b58fe267bf9824efdc0029692287d5a747f2614216ac08692b87a9714` | yes | no |
| `frontend/app/work/[slug]/page.tsx` | 9490 | `e3b35aa6e082390120a0a4f32946ef745252631d96e69973a2764ead8e9b2fce` | yes | no |
| `frontend/app/work/opengraph-image.tsx` | 367 | `9110da40e1e5bca86acc35549385790d9ef9b791e2e4e8933189b838bdb9054e` | yes | no |
| `frontend/app/work/page.tsx` | 1862 | `205981a058e1980a0c98e6dbd345e5255879e64c6adabbf8f29de008eddd524c` | yes | no |
| `frontend/app/apple-icon.tsx` | 990 | `16b251f4c0e74ea21994f83f971f0d9d46dd838c3aa7091fff8f09a9fd71c23d` | yes | no |
| `frontend/app/globals.css` | 7223 | `98f708c6227efa5bf83946485d8349bb31bf66d58336036e0444cd7d25067070` | yes | no |
| `frontend/app/icon.svg` | — | MISSING | | |
| `frontend/app/layout.tsx` | 1753 | `bff43985a801f353fab150d4a744b9a9f21bac2416ffef9fa4a7a8813ed0df90` | yes | no |
| `frontend/app/not-found.tsx` | 1218 | `6a8dd1ba3e6b6cb4644c4078a615903eba794e7b1c68244d79ffa1d259653846` | yes | no |
| `frontend/app/opengraph-image.tsx` | 368 | `18f0c7f42d48771f1749450a279dec2ebe7d214dd5ae67913ea2fe534e2edc50` | yes | no |
| `frontend/app/page.tsx` | 22109 | `a41fc993c784e797c81ee4fcdcb4db6a964ace45c0e77f11f146eaba841f2590` | yes | no |
| `frontend/app/robots.ts` | 258 | `cab27474103797b0f2221e934e0bee26c195db07f5d580ff75cb45306bb010be` | yes | no |
| `frontend/app/sitemap.ts` | 1004 | `ce733b07f608e02001a865c6f930c30a4b7a6a421999602bd6a6ba91b0a89a88` | yes | no |
| `frontend/components/CopyButton.tsx` | 1211 | `795a52d125abbc5d55f43b4d2112c292ec367df67e3059a20a2b7b6b005f0b16` | yes | no |
| `frontend/components/covers.tsx` | 8621 | `b30986d672e18eabb9126d8ad1a136e80587087f461f54ab039b8d560ad43824` | yes | no |
| `frontend/components/diagrams.tsx` | 11895 | `8db43cafe94f9320dfb05eddc06615efa4e8b44c09144fb38bd62ef0347df5f6` | yes | no |
| `frontend/components/Footer.tsx` | 3658 | `306bcfac39476d1fcab3284b8fb3fe96eac724fadc9ccd0f6097a920ac36f339` | yes | no |
| `frontend/components/Hero.tsx` | 5214 | `c7b5499fd06ef936ae6d03d45a81e9a3aa98e88bba581e05d3898cd85fe4f938` | yes | no |
| `frontend/components/JournalTimeline.tsx` | 6531 | `bc5acbd1be56566930af693708c654997501f81cc0abbad4edbfbf3e7c49449d` | yes | no |
| `frontend/components/LenisSetup.tsx` | 1119 | `d696dd1c457098819185900df4186f740a06372ba304d9dfc33f08a5233001c7` | yes | no |
| `frontend/components/Markdown.tsx` | 476 | `cd9f9ed6c7f727e2dc3e4d96c5852f4cd9126ac394b23d746a59afeee9706c44` | yes | no |
| `frontend/components/MarkdownWithDiagram.tsx` | 618 | `2a06c76b96e5953201ba213dd4852d50aa40484748a56483cdd0d8d01808cb38` | yes | no |
| `frontend/components/Nav.tsx` | 7772 | `229212a66151f64ed509fe1b47e30673cf1bff8b6dd43fb4e1fba34c4322f906` | yes | no |
| `frontend/components/Plausible.tsx` | 365 | `5ee2273a07c1cda0e2b4251516d063b285ac6f46bb74901a68134ee2aa708090` | yes | no |
| `frontend/components/ProjectRow.tsx` | 4556 | `5ff66e98d57ef46aa3d704e98983c23a89a1701c17d8fcf3223608120fca0c89` | yes | no |
| `frontend/components/Reveal.tsx` | 2133 | `5366827775b569cdef1901c1cbe9e9588993f7fcbe052c16c97f7a829592a92e` | yes | no |
| `frontend/components/Sculpture.tsx` | 3421 | `0156951982a1b3761807e81a07d5ab47186ed4e78b2d8ecff196083195b41fb5` | yes | no |
| `frontend/components/SculptureScene.tsx` | 7493 | `501f41207252ca9cfcf2c9c3ba810b17476bfa62d2ea870cd7e3e483356407f3` | yes | no |
| `frontend/content/journal/2025-08-04-the-year-of-understanding.mdx` | 793 | `28a2b04327b6c36680d5e7af44556fbb7c342271ef7df2f83e7769c6a15d59d8` | yes | no |
| `frontend/content/journal/2025-10-12-why-reproducibility-deserves-better-tooling.mdx` | 1339 | `2adcca57e2140caf4c5e5637d73dc20df8095417747fb9de9cd13e63ef9934b4` | yes | no |
| `frontend/content/journal/2026-03-20-launchpad-sponsored.mdx` | 611 | `3aade32c58f8485f4c60a28de936dec746e2883f601a9b41ccd86fac0b63225f` | yes | no |
| `frontend/content/journal/2026-05-09-what-running-drives-taught-me.mdx` | 758 | `c29be423c49b107bb0b4fdc87131309d3b8fa139267581f1cfa9f9d6276df6b1` | yes | no |
| `frontend/content/journal/2026-10-26-co-founded-the-quantum-club.mdx` | 1033 | `5775bebcb36d0cbd641447b85059929fa7b43ff22ea6d649060f69159866de63` | yes | no |
| `frontend/content/leadership/quantum-club.mdx` | 531 | `52ca6f0cf5236dd5a6d9f2263b789fb4aba675b291fc389fc75621a187debebe` | yes | no |
| `frontend/content/leadership/tp-cell.mdx` | 590 | `1ab5fa0e12988a96c4d112d5d430f26c14ee2df626199841554edaa17b92a15f` | yes | no |
| `frontend/content/leadership/webdev-club.mdx` | 364 | `eb0d9649bddb88dec7569b68c1481b184ae0f8527cc4b0cd8c8782a0e686f89e` | yes | no |
| `frontend/content/projects/atrang.mdx` | 3265 | `6e3d751e3bf1e600f3644cb3fdd626cb7cde853559f37a6cb6d2439a5c0ef9b2` | yes | no |
| `frontend/content/projects/bm4a.mdx` | 3027 | `b7292d7ec54d9f79548f25933f5cbc605e8bbf5b367c867bae075181f18fdb8d` | yes | no |
| `frontend/content/projects/campushire.mdx` | 5232 | `1c3992a4f0752cd4d10203afe3e7e2f2ecd295d2ee9dab7d7e525da1cbeb015e` | yes | no |
| `frontend/content/projects/neuroweave.mdx` | 3363 | `55864969fbd783af048f36d76324f4bba093f0eed45d4d2ec3afcbb7b1cd2771` | yes | no |
| `frontend/content/projects/offline.mdx` | 2691 | `a35c1edc0205191f589d34570704e8546a86f104e3f60102c9cfd74560466758` | yes | no |
| `frontend/content/projects/ptfs.mdx` | 2050 | `543f30b037dbba5dd3aadf5c59beaa56a8a9182705d24d9b7e830bdfe3bea992` | yes | no |
| `frontend/content/research/ai-ml.mdx` | 881 | `7351fc1d03d62cc4cc926d0d1b6d349cb70b0fc3d7c90d9bccff69e42a49fc75` | yes | no |
| `frontend/content/research/quantum-computing.mdx` | 1101 | `0c580dec13d7d9cd80f58ddbc485d182e8531e02a3e878cd220d828338c28bf9` | yes | no |
| `frontend/content/research/reproducibility.mdx` | 1317 | `1628f712a300ad73bc7facae372fe6accb327cf4f73a8c023b0d18e3b674bee9` | yes | no |
| `frontend/lib/content.ts` | 5600 | `6c592b2270c88f3caac8a2367b0f66fcb471b28292e8056d7c5b747ea1063956` | yes | no |
| `frontend/lib/markdown.ts` | 577 | `c72c297d0c7713f43ceb86226f04b9d926889f0edd46a1704d547934f25d8ebd` | yes | no |
| `frontend/lib/motion.ts` | 250 | `61d94c748c5983a6ca2bf47fb632c099fe03682c8860b1412de59373b24819fb` | yes | no |
| `frontend/lib/og.tsx` | 2703 | `21419d368f7429f9367bd3599ff47b9ea4ecaca20bf0aaeb74b85e1fb3ed161d` | yes | no |
| `frontend/lib/site.ts` | 5752 | `2d8bed0fda9fdfbbf67b9e3212703501bcc9bc1912df6c38f1ca91e8000aa83c` | yes | no |
| `frontend/public/favicon.svg` | — | MISSING | | |
| `frontend/public/resume.pdf` | 3973 | `0dec714546f9b32c3f07ad2f3811957d20e7c3a7a981f1d97bd4655a833a8295` | yes | yes |
| `frontend/.gitignore` | 310 | `d373417ea2a8844e3b7a1515aab123e90fbeb4b7225144d55d243d9f6f04f73a` | yes | no |
| `frontend/components.json` | 444 | `73e1334afce0f20f01500532e3b63a7cc36238d8a05addef40c476fadf9dc349` | no | no |
| `frontend/next.config.ts` | 279 | `6d1ea032927d6054de2403eaad09b3bd6ecd2c4134ca154dd4a29f730ccb9383` | yes | no |
| `frontend/package.json` | 5160 | `4cc976062b2dcb90eb1ae2fff327d3f2dc3dc2fbd76a44705b9097eb458d1c0b` | yes | no |
| `frontend/postcss.config.js` | 82 | `251ecddd4672c9cf467547e3dc535de00ad2129df26e7e7ae728fa4e5ac45fc5` | yes | no |
| `frontend/README.md` | 2065 | `52613452e3bbe3b8414c9f65c1146bbde77f57dcf758b5ae39d3fd0aca891352` | yes | no |
| `frontend/tailwind.config.js` | 879 | `8cd3c81b4a22653919f7decf2279b86cf7a1fcd39f7a9f089df99346cac902ec` | yes | no |
| `frontend/tsconfig.json` | 562 | `1519b3e409b0059442adaf1c0c663021214e914c0f80b40cbba705e378aa4537` | yes | no |
| `frontend/yarn.lock` | 578084 | `84c4e1470aa6f822915f809f2924646c2c0c78a90e0a54286aa1a68eb7fc3c23` | yes | no |
| `memory/.gitkeep` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | n/a | no |
| `memory/PRD.md` | 6410 | `bc5c57613c7a5c2ad4a2fca3d132e24c499c3477337874f172f8f1418166031d` | yes | no |
| `test_reports/pytest/.gitkeep` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | n/a | no |
| `test_reports/.gitkeep` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | n/a | no |
| `tests/__init__.py` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | n/a | no |
| `.gitignore` | 1374 | `ce38eab21f7bfccc21ec200a63d57cddffc6be45787ce70cea9206a1a738d735` | yes | no |
| `design_guidelines.json` | 8837 | `fbf0f493d65d2b974770505cf05a8947850ded10001469a80cbcf7b5af1d5b7a` | no | no |
| `README.md` | 29 | `4d98a881426d611841978ecdc7192d83446a2191081b08776b94c39019ccda1f` | yes | no |
| `test_result.md` | 4774 | `53f98d35af485125f614f6e4db9d9f58d334bc2b086abb4e277ad13a950792a9` | no | yes |
| `yarn.lock` | 86 | `38df2378ed26e20124d8c38a945af1b4a058656aab3b3b1f71a9d8a629cc0d81` | yes | no |

## Build and test results (run in a scratch copy, with Node 24.22.1 and Python 3.13.5)
- **Frontend `yarn install --frozen-lockfile`** (yarn 1.22.22): ✅ succeeded
- **Frontend `yarn lint`** (`next lint`): ❌ no ESLint config in the project, so `next lint` opens an interactive setup prompt and exits 1. This is a project configuration gap, not a code error.
- **Frontend `yarn build`** (Next.js 15.5.28): ❌ as extracted. It compiled and type-checked successfully, then failed with `ENOENT assets/fonts/InstrumentSerif-Regular.ttf`. ✅ With the two Google Fonts files dropped into `frontend/assets/fonts/` (in the scratch copy only), the **build succeeded** and every route was generated (/, about, contact, journey and entries, research, resume, work and its 6 case studies, OG images, robots, sitemap).
- **Backend `pip install -r requirements.txt`**: ❌ `emergentintegrations==0.2.2` is Emergent's private package and isn't on PyPI. Also, `numpy`/`pandas` need Python ≤3.12 for some pins. With that one line skipped, everything else installed fine and `server.py` imports.
- **Backend `pytest`**: ⚠️ 0 tests collected (`tests/__init__.py` is empty, and no test files exist).
- The backend needs a running **MongoDB** (`MONGO_URL`, `DB_NAME`). The frontend is a static Next.js site and doesn't call the backend.

## Environment variables (templates only, no values)
- `backend/.env.example`: `MONGO_URL` (required), `DB_NAME` (required), `CORS_ORIGINS` (optional)
- `frontend/.env.example`: `NEXT_PUBLIC_SITE_URL` (optional), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)

## Run instructions
Frontend:
```
cd frontend
# first put the 2 font files in assets/fonts/ (see above)
npx yarn@1 install --frozen-lockfile
npx yarn@1 dev      # http://localhost:3000
npx yarn@1 build && npx next start
```
Backend (optional; the site doesn't use it):
```
cd backend
python3.12 -m venv .venv && source .venv/bin/activate
grep -v emergentintegrations requirements.txt | pip install -r /dev/stdin
cp .env.example .env   # fill in MONGO_URL and DB_NAME
uvicorn server:app --reload --port 8001
```

## Directory tree
```
.
./.gitignore
./EXTRACTION_LOG.md
./README.md
./backend
./backend/.env.example
./backend/pytest.ini
./backend/requirements.txt
./backend/server.py
./design_guidelines.json
./frontend
./frontend/.env.example
./frontend/.gitignore
./frontend/README.md
./frontend/app
./frontend/app/about
./frontend/app/about/page.tsx
./frontend/app/apple-icon.tsx
./frontend/app/contact
./frontend/app/contact/page.tsx
./frontend/app/globals.css
./frontend/app/journey
./frontend/app/journey/[slug]
./frontend/app/journey/[slug]/opengraph-image.tsx
./frontend/app/journey/[slug]/page.tsx
./frontend/app/journey/opengraph-image.tsx
./frontend/app/journey/page.tsx
./frontend/app/layout.tsx
./frontend/app/not-found.tsx
./frontend/app/opengraph-image.tsx
./frontend/app/page.tsx
./frontend/app/research
./frontend/app/research/page.tsx
./frontend/app/resume
./frontend/app/resume/page.tsx
./frontend/app/robots.ts
./frontend/app/sitemap.ts
./frontend/app/work
./frontend/app/work/[slug]
./frontend/app/work/[slug]/opengraph-image.tsx
./frontend/app/work/[slug]/page.tsx
./frontend/app/work/opengraph-image.tsx
./frontend/app/work/page.tsx
./frontend/components
./frontend/components.json
./frontend/components/CopyButton.tsx
./frontend/components/Footer.tsx
./frontend/components/Hero.tsx
./frontend/components/JournalTimeline.tsx
./frontend/components/LenisSetup.tsx
./frontend/components/Markdown.tsx
./frontend/components/MarkdownWithDiagram.tsx
./frontend/components/Nav.tsx
./frontend/components/Plausible.tsx
./frontend/components/ProjectRow.tsx
./frontend/components/Reveal.tsx
./frontend/components/Sculpture.tsx
./frontend/components/SculptureScene.tsx
./frontend/components/covers.tsx
./frontend/components/diagrams.tsx
./frontend/content
./frontend/content/journal
./frontend/content/journal/2025-08-04-the-year-of-understanding.mdx
./frontend/content/journal/2025-10-12-why-reproducibility-deserves-better-tooling.mdx
./frontend/content/journal/2026-03-20-launchpad-sponsored.mdx
./frontend/content/journal/2026-05-09-what-running-drives-taught-me.mdx
./frontend/content/journal/2026-10-26-co-founded-the-quantum-club.mdx
./frontend/content/leadership
./frontend/content/leadership/quantum-club.mdx
./frontend/content/leadership/tp-cell.mdx
./frontend/content/leadership/webdev-club.mdx
./frontend/content/projects
./frontend/content/projects/atrang.mdx
./frontend/content/projects/bm4a.mdx
./frontend/content/projects/campushire.mdx
./frontend/content/projects/neuroweave.mdx
./frontend/content/projects/offline.mdx
./frontend/content/projects/ptfs.mdx
./frontend/content/research
./frontend/content/research/ai-ml.mdx
./frontend/content/research/quantum-computing.mdx
./frontend/content/research/reproducibility.mdx
./frontend/lib
./frontend/lib/content.ts
./frontend/lib/markdown.ts
./frontend/lib/motion.ts
./frontend/lib/og.tsx
./frontend/lib/site.ts
./frontend/next.config.ts
./frontend/package.json
./frontend/postcss.config.js
./frontend/public
./frontend/public/resume.pdf
./frontend/tailwind.config.js
./frontend/tsconfig.json
./frontend/yarn.lock
./memory
./memory/.gitkeep
./memory/PRD.md
./test_reports
./test_reports/.gitkeep
./test_reports/pytest
./test_reports/pytest/.gitkeep
./test_result.md
./tests
./tests/__init__.py
./yarn.lock
```
