# STATUS

## What was built

**Freebies Directory** — a Markdown-sourced, static HTML site with client-side search listing free benefits and assistance programs. For each program: who qualifies, documents needed, how to apply, where to get local help, and the official program link.

- Source data: `content/programs.json` (25 programs across 7 categories: Food & Nutrition, Health Care, Housing & Utilities, Income & Cash Assistance, Education & Child Care, Veterans Benefits, Disability Services). Text uses minimal Markdown (bold, links, lists) rendered by `build.js`.
- Build output: `site/index.html` with an embedded JSON search index (`window.PROGRAMS`); `site/style.css`, `site/app.js` are static assets served alongside.
- Client-side search: `site/app.js` filters programs by name, category, or summary in the browser — no server, no API keys, no tracking.
- `build.js`: zero-dependency generator (`npm run build`). `server.js`: tiny local dev server (`npm start`). `test/verify.js`: assertion suite (`npm test`).
- Credit: Asdale Dynamics, LLC in README and site footer. MIT `LICENSE` with the exact line `Copyright (c) 2026 Asdale Dynamics, LLC`. Official government/program links only; education-only disclaimer on every program card and in the footer.

## How to run

```bash
cd /workspace/kilo-lab/free-benefits-directory

# Regenerate site/ from content/programs.json
npm run build

# Serve locally and open http://localhost:8000
npm start

# Run verification suite
npm test
```

No build step is required to view the site — open `site/index.html` directly in a browser.

## Verification results

- `node build.js`: built successfully (25 programs, 7 categories).
- `npm test`: passed — `site/index.html`, `style.css`, `app.js` present; SNAP, Medicaid, VA disability, and vocational rehabilitation programs rendered; embedded search index present with 25 entries; official links (fns.usda.gov, ssa.gov, va.gov, hud.gov, etc.) present; Asdale Dynamics credit present; `LICENSE` contains the exact copyright line.
- Sanity check: no unrendered Markdown (`**`, `[text](url)`) leaked into the HTML; all 25 program articles and 25 search entries present.

## Known gaps

- Single-page layout; no per-category HTML pages (anchor links to `#cat-<key>` sections exist instead).
- Income/eligibility limits are described qualitatively because they vary by state and change over time; users must verify with the agency.
- Local help points to 2-1-1, state offices, and agency locators — no scraped local office directory (would require personal/location data, which is out of scope).
- No automated link validity checker; links were hand-picked from official domains.
- Education only — not legal, financial, tax, or medical advice.
- No `.github/workflows` or CI configuration, per project rules.
