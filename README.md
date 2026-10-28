# Freebies Directory

Free benefits and assistance programs — how to qualify, documents needed, how to apply, and where to get local help.

A plain-English guide to free government and public-assistance programs in the United States, grouped by category. Written for real people who just want to know what help is available and how to get it.

## What this is

This directory covers free benefits and assistance programs you may qualify for based on income, age, disability, military service, or family situation. For every program it explains:

- **Who qualifies** — the basic eligibility rules
- **Documents you'll need** — what to gather before you apply
- **How to apply** — online, by phone, by mail, or in person
- **Where to get local help** — phone numbers, offices, and who can walk you through it
- **The official program link** — go straight to the government page

All links point to official government or program websites. Nothing here is legal, financial, tax, or medical advice — it's education only. Program rules and income limits change and vary by state, so verify details with the agency or your local office before applying.

## What's inside

| Category | Programs |
|---|---|
| Food & Nutrition | SNAP, WIC, school meals, Summer EBT |
| Health Care | Medicaid, CHIP, Medicare, community health centers |
| Housing & Utilities | Section 8, LIHEAP, public housing, Lifeline |
| Income & Cash Assistance | TANF, SSI, SSDI, unemployment insurance |
| Education & Child Care | CCDF child care, Head Start, Pell Grants/FAFSA, EITC/VITA |
| Veterans Benefits | VA health care, disability compensation, pension, GI Bill |
| Disability Services | State Vocational Rehabilitation, Ticket to Work |

25 programs in total, each with its own official link.

## How to use the site

1. Open `site/index.html` in any web browser, or run it locally (below).
2. Browse by category, or type into the search box to filter programs by name, category, or what they help with.
3. Read the program card for eligibility, documents, application steps, and local help.
4. Click **"Official site"** to open the government page and apply.

The search runs entirely in your browser — nothing is sent to a server, and there are no trackers or API keys.

## How to run

This is a static HTML site with zero dependencies. No build step is required to view it — just open `site/index.html` in a browser.

To regenerate the site from source, serve it locally, or run the verification suite:

```bash
# Regenerate site/index.html from content/programs.json
npm run build

# Serve locally, then open http://localhost:8000
npm start

# Run the verification suite
npm test
```

## Who this is for

Built by **Asdale Dynamics, LLC** (Indiana, formed October 2026) as an educational resource for individuals and families navigating benefits.

Asdale Dynamics is founded by Dylan Asdale, a registered nurse turned AI author. His book *The Massive AI Manual* and hub site dylanasdale.github.io explain AI "like a friend would": plain English, step by step, never condescending. The LLC publishes beginner-friendly AI education, books and guides, and practical tools — and this directory is one of them: a practical life-admin helper that anyone can use.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
