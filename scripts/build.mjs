// Builds dist/index.html (one self-contained page) and dist/worker.js (a Worker that serves it).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../src/${p}`, import.meta.url), "utf8");
const model = read("model.js").replace(/^export /gm, "");
const app = read("app.js");
const script = `(() => {\n"use strict";\n${model}\n${app}\n})();`;

const html = read("index.html")
  .replace("/*__STYLES__*/", () => read("styles.css"))
  .replace("<!--__LOGO__-->", () => read("logo.svg").trim())
  .replace("/*__SCRIPT__*/", () => script.replace(/<\/script/gi, "<\\/script"));

const worker = `// Serves the single-page app. Static, no storage, no secrets.
const HTML = ${JSON.stringify(html)};
const HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=300",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "content-security-policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
    if (url.pathname === "/healthz") return new Response("ok", { headers: { "content-type": "text/plain" } });
    if (url.pathname !== "/" && url.pathname !== "/index.html") return Response.redirect(new URL("/", url).toString(), 302);
    return new Response(request.method === "HEAD" ? null : HTML, { headers: HEADERS });
  },
};
`;

mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/index.html", import.meta.url), html);
writeFileSync(new URL("../dist/worker.js", import.meta.url), worker);
console.log(`built dist/index.html (${(html.length / 1024).toFixed(1)} KB) and dist/worker.js`);
