// End-to-end checks in a real browser. Run: npm run test:e2e
// Needs Playwright with Chromium available (set PLAYWRIGHT_MODULE to its index.mjs if it is not resolvable).
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const pw = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const html = readFileSync("dist/index.html");
const server = createServer((req, res) => { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); res.end(html); }).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await pw.chromium.launch();
const results = [];
async function check(name, fn) {
  try { await fn(); results.push(["PASS", name]); } catch (e) { results.push(["FAIL", name, e.message]); }
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(m.text()); });
await page.goto(base);

await check("E1 board loads with 40 rows, sorted by score", async () => {
  assert.equal(await page.locator("#rows tr[data-id]").count(), 40);
  const scores = await page.locator("#rows .score-num").allTextContents();
  const n = scores.map(Number);
  assert.deepEqual(n, [...n].sort((a, b) => b - a));
});
await check("E2 segment filter narrows the board and tiles update", async () => {
  await page.click('[data-seg="CONTRACT"]');
  const rows = await page.locator("#rows tr[data-id]").count();
  assert.equal(rows, 13);
  assert.equal((await page.locator("#tiles .v").first().textContent()).trim(), "13");
  await page.click('[data-seg="ALL"]');
});
await check("E3 search and tier filter combine; empty state shows", async () => {
  await page.selectOption("#tier", "A");
  await page.fill("#q", "Dublin");
  const n = await page.locator("#rows tr[data-id]").count();
  assert.ok(n >= 1 && n < 16);
  await page.fill("#q", "zzzz");
  assert.match(await page.locator("#rows").textContent(), /No accounts match/);
  await page.fill("#q", ""); await page.selectOption("#tier", "ALL");
});
await check("E4 row opens drawer with five score parts that add up", async () => {
  await page.locator("#rows tr[data-id]").first().click();
  assert.ok(await page.locator("#drawer").isVisible());
  const vals = await page.locator(".part .val").allTextContents();
  assert.equal(vals.length, 5);
  const sum = vals.reduce((s, v) => s + Number(v.split("/")[0]), 0);
  assert.equal(String(sum), (await page.locator("#drawer .score-num").textContent()).trim());
});
await check("E5 drawer links into that account's personalised sequence", async () => {
  const name = (await page.locator("#drawer-title").textContent()).trim();
  await page.click("#drawer-seq");
  await page.waitForSelector("#view-sequences:not([hidden])");
  const first = await page.locator(".touch").first().textContent();
  assert.ok(first.includes(name), "first touch (subject or body) names the company");
  assert.equal(await page.locator(".touch").count(), 3);
});
await check("E6 template mode shows merge fields, personalised mode fills them", async () => {
  await page.click('[data-mode="template"]');
  assert.ok(await page.locator("mark.var").count() > 0);
  await page.click('[data-mode="filled"]');
  assert.equal(await page.locator("mark.var").count(), 0);
  assert.doesNotMatch(await page.locator(".touches").textContent(), /\{\{/);
});
await check("E7 every sequence renders three touches for every account", async () => {
  for (const seg of ["HIRE", "CONTRACT", "EXPAND"]) {
    await page.click(`[data-seqseg="${seg}"]`);
    const ids = await page.locator("#acct option").evaluateAll((o) => o.map((x) => x.value));
    for (const id of ids) {
      await page.selectOption("#acct", id);
      assert.equal(await page.locator(".touch").count(), 3);
      assert.doesNotMatch(await page.locator(".touches").textContent(), /\{\{|undefined/);
    }
  }
});
await check("E8 pipeline: week buttons drive a monotonic funnel; play runs to week 6", async () => {
  await page.click('a[href="#pipeline"]');
  await page.waitForSelector("#view-pipeline:not([hidden]) .f-row");
  const counts = [];
  for (let w = 1; w <= 6; w++) {
    await page.click(`[data-week="${w}"]`);
    counts.push((await page.locator(".f-count").allTextContents()).map(Number));
  }
  for (let w = 1; w < 6; w++) for (let i = 0; i < 4; i++) assert.ok(counts[w][i] >= counts[w - 1][i]);
  await page.click("#play");
  await page.waitForFunction(() => document.querySelector("#wk").textContent === "6", null, { timeout: 10000 });
  const kanbanTotal = (await page.locator(".col h4 span").allTextContents()).reduce((s, v) => s + Number(v), 0);
  assert.equal(kanbanTotal, 40);
});
await check("E9 rhythm page shows Mon–Fri and the inputs list", async () => {
  await page.click('a[href="#rhythm"]');
  await page.waitForSelector("#view-rhythm:not([hidden]) .day");
  assert.equal(await page.locator(".day").count(), 5);
  assert.ok(await page.locator(".inputs li").count() >= 4);
});
await check("E10 sample notice appears exactly once; footer credit present; logo labelled unofficial", async () => {
  assert.equal(await page.locator("#sample-notice").count(), 1);
  assert.equal((await page.locator(".credit").textContent()).trim(), "Ayo Ahmed, independent concept");
  assert.match(await page.locator(".concept-pill").textContent(), /Unofficial concept/i);
});
await check("E11 keyboard: Enter opens a row, Escape closes the drawer", async () => {
  await page.click('a[href="#prospects"]');
  await page.waitForSelector("#view-prospects:not([hidden]) #rows tr[data-id]");
  await page.locator("#rows tr[data-id]").first().focus();
  await page.keyboard.press("Enter");
  assert.ok(await page.locator("#drawer").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(await page.locator("#drawer").isHidden());
});
await check("E12 no console or page errors", async () => assert.deepEqual(errors, []));

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await check("E13 mobile (390px): no horizontal scroll on any tab", async () => {
  for (const tab of ["prospects", "sequences", "pipeline", "rhythm"]) {
    await mobile.goto(base + "#" + tab);
    const w = await mobile.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(w <= 390, `${tab}: ${w}px`);
  }
});

await browser.close();
server.close();
for (const r of results) console.log(r.join("  "));
const failed = results.filter((r) => r[0] === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
