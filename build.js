// Build script: reads content/programs.json (authored with markdown-rich text),
// renders static HTML (site/index.html) with embedded JSON search index, and
// copies assets. Zero dependencies. Run: node build.js

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content", "programs.json");
const OUT = path.join(ROOT, "site");
const DATA = JSON.parse(fs.readFileSync(SRC, "utf8"));
fs.mkdirSync(OUT, { recursive: true });

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(text) {
  if (!text) return "";
  const lines = String(text).split("\n");
  const html = [];
  let listOpen = false;

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") {
      closeList();
      if (html.length && html[html.length - 1] !== "</p>") {
        html.push("</p>");
      }
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      closeList();
      html.push(`<ol><li>${renderInline(numbered[1])}</li></ol>`);
      continue;
    }

    closeList();
    if (html.length && html[html.length - 1] === "</p>") {
      html.pop();
      html.push(`<p>${renderInline(line)}</p>`);
    } else if (html.length && !html[html.length - 1].startsWith("<h") && !html[html.length - 1].endsWith("</li>")) {
      html.push(`<p>${renderInline(line)}</p>`);
    } else {
      html.push(`<p>${renderInline(line)}</p>`);
    }
  }
  closeList();
  return html.join("\n");
}

const INLINE_PATTERNS = [
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'],
  [/\*\*(.+?)\*\*/g, "<strong>$1</strong>"],
  [/\*(.+?)\*/g, "<em>$1</em>"]
];

function renderInline(text) {
  let out = escapeHtml(text);
  for (const [pattern, repl] of INLINE_PATTERNS) {
    out = out.replace(pattern, repl);
  }
  return out;
}

function renderProgram(p) {
  return `
<article class="program" id="${escapeHtml(p.id)}">
  <header class="program-header">
    <h2>${escapeHtml(p.name)}</h2>
    <a class="btn official" href="${escapeHtml(p.officialUrl)}" target="_blank" rel="noopener">Official site</a>
  </header>
  <p class="program-summary">${renderMarkdown(p.summary)}</p>
  <section>
    <h3>Who qualifies</h3>
    <div class="prose">${renderMarkdown(p.whoQualifies)}</div>
  </section>
  <section>
    <h3>Documents needed</h3>
    <div class="prose">${renderMarkdown(p.documents)}</div>
  </section>
  <section>
    <h3>How to apply</h3>
    <div class="prose">${renderMarkdown(p.howToApply)}</div>
  </section>
  <section class="local-help">
    <h3>Where to get local help</h3>
    <div class="prose">${renderMarkdown(p.localHelp)}</div>
  </section>
  <div class="disclaimer">${escapeHtml(DATA.meta.disclaimer)}</div>
</article>`;
}

function renderPage() {
  const categoryMap = new Map();
  for (const c of DATA.categories) categoryMap.set(c.key, c);

  const programsByCategory = new Map();
  for (const c of DATA.categories) programsByCategory.set(c.key, []);
  for (const p of DATA.programs) {
    if (!programsByCategory.has(p.category)) programsByCategory.set(p.category, []);
    programsByCategory.get(p.category).push(p);
  }

  const categorySections = [];
  for (const c of DATA.categories) {
    const programs = programsByCategory.get(c.key) || [];
    categorySections.push(`
<section class="category-section" id="cat-${c.key}">
  <h2>${escapeHtml(c.name)} <span class="count">(${programs.length})</span></h2>
  <p class="category-desc">${renderMarkdown(c.description)}</p>
  <div class="program-grid">
    ${programs.map(renderProgram).join("\n")}
  </div>
</section>`);
  }

  const allProgramsJson = JSON.stringify(DATA.programs.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    summary: p.summary,
    officialUrl: p.officialUrl
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(DATA.meta.title)} — ${escapeHtml(DATA.meta.credit)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="wrapper">
      <h1 class="site-title">${escapeHtml(DATA.meta.title)}</h1>
      <p class="site-subtitle">${escapeHtml(DATA.meta.subtitle)}</p>
    </div>
  </header>

  <div class="search-bar wrapper">
    <label for="search-input">Search programs</label>
    <input type="search" id="search-input" placeholder="Search by program name, category, or what it helps with…" aria-label="Search programs">
    <span class="result-count" id="result-count"></span>
  </div>

  <main class="wrapper">
    ${categorySections.join("\n")}
  </main>

  <footer class="site-footer">
    <div class="wrapper">
      <p><strong>${escapeHtml(DATA.meta.title)}</strong> by ${escapeHtml(DATA.meta.credit)}.</p>
      <p>${escapeHtml(DATA.meta.disclaimer)} All links point to official government or program websites. Information is for education only — verify details with the agency before applying.</p>
      <p>&copy; 2026 ${escapeHtml(DATA.meta.credit)}. All rights not granted by the MIT License are reserved.</p>
    </div>
  </footer>

  <script>
    window.PROGRAMS = ${allProgramsJson};
  </script>
  <script src="app.js"></script>
</body>
</html>`;
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "index.html"), renderPage());
  console.log("Built site/index.html (" + DATA.programs.length + " programs, " + DATA.categories.length + " categories)");
}

main();
