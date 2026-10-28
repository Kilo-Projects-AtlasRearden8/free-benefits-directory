# Freebies Directory

Free benefits and assistance programs: how to qualify, documents needed, how to apply, and where to get local help.

## What this is

A directory of free government and public-assistance programs in the United States, grouped by category:

- Food & Nutrition (SNAP, WIC, school meals, Summer EBT)
- Health Care (Medicaid, CHIP, Medicare, community health centers)
- Housing & Utilities (Section 8, LIHEAP, public housing, Lifeline)
- Income & Cash Assistance (TANF, SSI, SSDI, unemployment)
- Education & Child Care (CCDF, Head Start, Pell Grants/FAFSA, EITC/VITA)
- Veterans Benefits (VA health care, disability compensation, pension, GI Bill)
- Disability Services (state vocational rehabilitation)

For every program: who qualifies, documents needed, how to apply, where to get local help, and the official program link. Official links only. Education only — this is not legal, financial, tax, or medical advice.

## How to run

This is a static HTML site with zero dependencies. No build step is required to view it — open `site/index.html` directly in a browser, or serve it locally:

```bash
# Build from source (regenerates site/ from content/programs.json)
npm run build

# Serve locally
npm start
# then open http://localhost:8000

# Run verification
npm test
```

Client-side search filters programs by name, category, or summary — no server, no tracking, no API keys.

## Credit

Built by **Asdale Dynamics, LLC** (Indiana, formed October 2026). Educational resource for individuals and families navigating benefits. Dylan Asdale is a registered nurse turned AI author and founder of Asdale Dynamics, LLC; his book *The Massive AI Manual* and hub site dylanasdale.github.io explain AI "like a friend would": plain English, step by step, never condescending.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
