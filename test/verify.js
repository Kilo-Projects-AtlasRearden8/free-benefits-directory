// Verifies the static site builds and contains required content.
// Run: npm test
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = process.cwd();
const SITE = path.join(ROOT, "site");

const errors = [];
function check(condition, message) {
  if (!condition) errors.push(message);
}

const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const css = fs.readFileSync(path.join(SITE, "style.css"), "utf8");
const app = fs.readFileSync(path.join(SITE, "app.js"), "utf8");

check(fs.existsSync(path.join(SITE, "index.html")), "site/index.html missing");
check(fs.existsSync(path.join(SITE, "style.css")), "site/style.css missing");
check(fs.existsSync(path.join(SITE, "app.js")), "site/app.js missing");

check(html.includes("Freebies Directory"), "page title missing");
check(html.includes("SNAP"), "SNAP program missing");
check(html.includes("Medicaid"), "Medicaid program missing");
check(html.includes("VA Disability Compensation"), "VA disability program missing");
check(html.includes("State Vocational Rehabilitation Services"), "VR program missing");
check(html.includes("window.PROGRAMS"), "embedded search index missing");
check(html.includes("Asdale Dynamics, LLC"), "credit missing");
check(/fns\.usda\.gov/.test(html) && /ssa\.gov/.test(html) && /va\.gov/.test(html), "official links missing");
check(/client-side search/i.test(app) || /search-input/.test(app), "client-side search missing");
check(/Copyright \(c\) 2026 Asdale Dynamics, LLC/.test(fs.readFileSync(path.join(ROOT, "LICENSE"), "utf8")), "LICENSE copyright line missing");

if (errors.length) {
  console.error("VERIFICATION FAILED:");
  errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
}
console.log("Verification passed: site builds, programs present, search index embedded, LICENSE correct.");
