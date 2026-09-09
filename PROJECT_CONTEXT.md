# Project Context for LLMs

## What this project is

This repository is a personal portfolio website for Enkh-Amgalan Enkhbayar ("Entwan"), a Data Scientist / AI Engineer based in London. It is a mostly static Astro site deployed to GitHub Pages, with a separate Cloudflare Worker that proxies private Spotify API credentials for the site's music widget.

## Stack and runtime

- Astro `^6.4.8`
- TypeScript with Astro's strict config
- Node.js `>=22.12.0`
- Plain CSS and Astro components; no React/Vue/Svelte/Tailwind
- GitHub Pages deployment through `.github/workflows/deploy.yml`
- Cloudflare Worker under `worker/`
- Production site: `https://enkhamgalan1230.github.io`

## Commands

Run from the repository root:

```sh
npm install
npm run dev
npm run build
npm run preview
npm run astro -- --help
```

Per repository instructions, start the development server in background mode:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

There is no configured test suite or lint script. `npm run build` is the main available verification command.

## Directory map

```text
src/
  pages/
    index.astro       Main portfolio homepage; most site interaction and styling lives here.
    projects.astro    Placeholder projects route.
    about.astro       Placeholder about route.
  layouts/
    BaseLayout.astro  Shared HTML shell, metadata, Header, Footer, and global CSS.
  components/
    Header.astro      Identity, London clock, social links, email link, FaceButton, MusicButton.
    Footer.astro      Footer branding, location, coordinates, and Ulzii mark.
    FaceButton.astro  Animated face trigger and about-me dialog.
    MusicButton.astro Spotify now-playing/search UI and client-side data loading.
    ProjectModal.astro Shared dialog behavior for project case studies.
    ProjectCard.astro Empty placeholder; currently unused.
    SectionTitle.astro Empty placeholder; currently unused.
  projects/
    ReceiptProject.astro    Receipt case-study modal content.
    AccountProject.astro    Accountancy case-study modal content.
  styles/
    global.css              Global reset, layout, fonts, and base colors.
    project-dialogs.css     Shared typography overrides for project sheets.

public/
  images/                    Face frames, profile image, project images, patterns.
  videos/                    Project card backgrounds and project demo videos.
  cv/Enkh-Amgalan_CV.pdf    Downloadable/viewable CV.
  favicon.*

worker/
  src/index.ts              Cloudflare Worker for Spotify OAuth and API proxying.
  wrangler.toml             Worker name, compatibility date, origin allowlist, redirect URI.
  README.md                 Worker deployment and secret setup notes.

.github/workflows/deploy.yml  Builds Astro with Node 22 and deploys `dist/` to GitHub Pages.
astro.config.mjs               Site URL configuration.
tsconfig.json                  Extends `astro/tsconfigs/strict`.
AGENTS.md                      Repository-specific development instructions.
CLAUDE.md                      Duplicate of the current development instructions.
```

## Current page behavior

### Homepage (`src/pages/index.astro`)

- Hero section with typewriter-style rotating text and a CV link.
- Horizontal project carousel with seven visual cards.
- Receipt and Accountancy cards open project dialogs.
- Projects Three through Seven are visual placeholders marked `IN PROGRESS`.
- A face prompt encourages opening the about dialog.
- Scroll/reveal effects, carousel movement, prompt interactions, and reduced-motion handling are implemented in an inline client-side script.
- Styling is largely inline in the page and is intentionally highly art-directed.

### Shared header

- Uses the animated `FaceButton` and `MusicButton` components.
- Displays the London time using `Intl.DateTimeFormat` with `Europe/London`.
- Contains LinkedIn, GitHub, and email links.
- Avoid changing selectors or data attributes casually because inline scripts depend on them.

### Project dialogs

- `ReceiptProject.astro` and `AccountProject.astro` are rendered on the homepage and wrapped by `ProjectModal.astro`.
- They are not independent routes.
- Receipt links to the live Streamlit app and its GitHub repository.
- Project dialog typography is customized by `src/styles/project-dialogs.css`.
- Preserve the existing modal IDs and `data-project-open` values when editing dialog behavior.

### Spotify integration

- `MusicButton.astro` calls the deployed Worker endpoint:
  `https://enkhamgalan-spotify-api.zaecisama.workers.dev/api/spotify`
- It uses `sessionStorage` for a short-lived browser cache and refreshes data periodically.
- The Worker keeps Spotify client credentials and refresh token in encrypted Cloudflare secrets.
- Never place Spotify secrets in Astro source, `public/`, Git history, or client-side JavaScript.
- The Worker supports `/health`, `/oauth/start`, `/oauth/callback`, and `GET /api/spotify`.
- CORS is controlled by `ALLOWED_ORIGIN` in `worker/wrangler.toml`.

## Visual design language

- Warm off-white background: approximately `#edecea`.
- Near-black text: approximately `#111111`.
- Muted green accent: approximately `#4d7657`.
- Main typefaces: `Courier Prime` for technical/body text and `Instrument Serif` for expressive headings.
- Fonts are loaded from Google Fonts in `global.css`.
- The site uses large editorial typography, soft rounded cards, video backgrounds, subtle motion, and responsive layouts.
- Mobile breakpoint is generally `640px`; tablet-specific behavior appears around `1100px`.
- Respect `prefers-reduced-motion` when adding animations.

## Editing rules for future LLMs

1. Inspect the relevant existing file before editing it.
2. Make the smallest change that satisfies the request; do not rewrite the homepage wholesale.
3. Reuse existing components, classes, assets, and interaction patterns.
4. Keep Astro pages and components server-rendered unless browser APIs are required.
5. Put browser-only logic in an Astro `<script>` and guard DOM queries for missing elements.
6. Preserve existing IDs, classes, `data-*` attributes, modal IDs, and asset paths unless the task explicitly changes them.
7. Keep secrets out of the frontend; Spotify changes usually belong in `worker/` or Cloudflare configuration.
8. Keep the design responsive and accessible: semantic elements, useful labels, keyboard Escape handling for dialogs, visible focus states, and reduced-motion support.
9. Do not edit generated directories such as `.astro/`, `dist/`, or `node_modules/`.
10. After code changes, run `npm run build` and report any issues.

## Known maintenance notes

- `README.md` is still the default Astro starter README and does not accurately describe this portfolio.
- `ProjectCard.astro` and `SectionTitle.astro` are empty and currently unused; do not assume they are active abstractions.
- Some checked-in text appears to have character-encoding corruption (for example arrows, em dashes, copyright symbols, and Mongolian text displayed as mojibake). Preserve or repair it intentionally rather than changing unrelated content.
- `src/styles/global.css` currently contains a duplicated Google Fonts import.
- The root package has no Worker deployment script; Worker deployment/configuration is managed separately with Cloudflare tooling.

## Recommended task prompt

```text
You are working in the Entwan portfolio repository. Read PROJECT_CONTEXT.md first, then inspect the specific files relevant to the task.

Task: <describe one concrete change>

Constraints:
- Preserve the existing visual language and responsive behavior.
- Reuse existing components and selectors where possible.
- Do not modify unrelated files or generated directories.
- Keep browser-only code in client-side Astro scripts.
- Do not expose secrets.

Acceptance criteria:
- <criterion 1>
- <criterion 2>

After editing, run `npm run build`, summarize changed files, and report verification results.
```
