// Unit tests for the data model and the built page. Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import {
  ACCOUNTS, SEGMENTS, SEQUENCES, SCORE_WEIGHTS, STAGES, WEEKS, SAMPLE_EVENTS,
  scoreAccount, tierFor, enrichedAccounts, pipelineAt, funnelAt, fillTemplate, reasonFor,
} from "../src/model.js";

test("board holds about 40 accounts with unique ids and names", () => {
  assert.equal(ACCOUNTS.length, 40);
  assert.equal(new Set(ACCOUNTS.map((a) => a.id)).size, 40);
  assert.equal(new Set(ACCOUNTS.map((a) => a.name)).size, 40);
});

test("every account is a UK or Irish SMB with 10–200 staff", () => {
  for (const a of ACCOUNTS) {
    assert.ok(["UK", "IE"].includes(a.country), `${a.name} country`);
    assert.ok(a.staff >= 10 && a.staff <= 200, `${a.name} staff ${a.staff}`);
  }
});

test("all three segments are represented and every account has a signal", () => {
  for (const k of Object.keys(SEGMENTS)) assert.ok(ACCOUNTS.filter((a) => a.segment === k).length >= 10, k);
  for (const a of ACCOUNTS) {
    assert.ok(a.signal.length > 10 && a.signalAgeDays > 0, a.name);
    assert.ok(a.abroadCountries.length >= 1, a.name);
  }
});

test("score weights sum to 100 and every score is within 0–100", () => {
  assert.equal(Object.values(SCORE_WEIGHTS).reduce((s, v) => s + v, 0), 100);
  for (const a of ACCOUNTS) {
    const { total, parts } = scoreAccount(a);
    assert.ok(total >= 0 && total <= 100);
    for (const [k, v] of Object.entries(parts)) assert.ok(v >= 0 && v <= SCORE_WEIGHTS[k], `${a.name} ${k}`);
    assert.equal(total, Object.values(parts).reduce((s, v) => s + v, 0));
  }
});

test("scoring is deterministic", () => {
  const one = JSON.stringify(enrichedAccounts());
  const two = JSON.stringify(enrichedAccounts());
  assert.equal(one, two);
});

test("tiers follow the documented thresholds and the board has all three", () => {
  assert.equal(tierFor(75), "A");
  assert.equal(tierFor(74), "B");
  assert.equal(tierFor(60), "B");
  assert.equal(tierFor(59), "C");
  const tiers = new Set(enrichedAccounts().map((a) => a.tier));
  assert.deepEqual([...tiers].sort(), ["A", "B", "C"]);
});

test("reasons are built from the account's own facts", () => {
  for (const a of enrichedAccounts()) {
    assert.match(a.reason, /Watch: /);
    if (a.segment === "HIRE") assert.ok(a.reason.includes(a.countryAbroad), a.name);
    if (a.segment === "EXPAND") assert.ok(a.reason.includes(a.market), a.name);
    if (a.segment === "CONTRACT") assert.ok(a.reason.includes(String(a.contractorsAbroad)), a.name);
    if (a.reason.includes("sweet spot")) assert.ok(a.staff >= 25 && a.staff <= 150, `${a.name} sweet spot claim`);
    assert.doesNotMatch(a.reason, /\ba [AEIOU]/, `${a.name} article`);
  }
  assert.equal(reasonFor(ACCOUNTS[0]), enrichedAccounts().find((a) => a.id === ACCOUNTS[0].id).reason);
});

test("three sequences, three touches each, every merge field resolves for every account in the segment", () => {
  assert.deepEqual(Object.keys(SEQUENCES).sort(), Object.keys(SEGMENTS).sort());
  for (const [seg, seq] of Object.entries(SEQUENCES)) {
    assert.equal(seq.touches.length, 3, seg);
    const days = seq.touches.map((t) => t.day);
    assert.deepEqual(days, [...days].sort((x, y) => x - y), `${seg} days ascending`);
    for (const a of ACCOUNTS.filter((x) => x.segment === seg)) {
      for (const t of seq.touches) {
        const filled = fillTemplate(t.subject + "\n" + t.body, a);
        assert.doesNotMatch(filled, /\{\{|\}\}|undefined|null/, `${seg} ${a.name}`);
      }
    }
  }
});

test("emails stay short, ask one question in touch 1, and are signed by Ayo", () => {
  for (const [seg, seq] of Object.entries(SEQUENCES)) {
    for (const t of seq.touches) {
      const words = t.body.trim().split(/\s+/).length;
      assert.ok(words <= 140, `${seg} day ${t.day}: ${words} words`);
      assert.match(t.body.trim(), /Ayo$/);
    }
    assert.ok((seq.touches[0].body.match(/\?/g) || []).length >= 1, `${seg} touch 1 asks a question`);
  }
});

test("pipeline flow is cumulative and never goes backwards week to week", () => {
  const acc = enrichedAccounts();
  let prev = null;
  for (let w = 1; w <= WEEKS; w++) {
    const f = funnelAt(w, acc).map((x) => x.count);
    assert.equal(f.length, STAGES.length);
    for (let i = 1; i < f.length; i++) assert.ok(f[i] <= f[i - 1], `week ${w} stage ${i}`);
    if (prev) for (let i = 0; i < f.length; i++) assert.ok(f[i] >= prev[i], `week ${w} stage ${i} monotonic`);
    prev = f;
  }
  for (const [id, ev] of Object.entries(SAMPLE_EVENTS)) {
    const a = pipelineAt(WEEKS, acc).find((x) => x.id === id);
    assert.ok(ev.replied >= a.contactedWeek, `${id} replies after contact`);
    if (ev.meeting) assert.ok(ev.meeting >= ev.replied, `${id} meeting after reply`);
  }
});

test("built page: sample notice once up front, credit in footer, unofficial label, no attribution to tools", () => {
  execSync("node scripts/build.mjs", { stdio: "ignore" });
  const html = readFileSync("dist/index.html", "utf8");
  assert.equal((html.match(/id="sample-notice"/g) || []).length, 1);
  assert.ok(html.indexOf("sample-notice") < html.indexOf('id="main"'), "notice sits above the content");
  assert.match(html, /Ayo Ahmed, independent concept/);
  assert.match(html, /Unofficial concept/);
  const text = html.toLowerCase();
  for (const banned of ["claude", "anthropic", "openai", "chatgpt", "gpt-", "copilot", "generated by", "built with ai", "ai-generated", "lovable", "cursor.sh"]) {
    assert.ok(!text.includes(banned), `page must not mention "${banned}"`);
  }
  assert.ok(!/fetch\(|XMLHttpRequest|localStorage|Math\.random/.test(html.replace(/async fetch\(request\)/, "")), "front end is deterministic and offline");
});

test("worker bundle exists and serves the same page", () => {
  assert.ok(existsSync("dist/worker.js"));
  const w = readFileSync("dist/worker.js", "utf8");
  assert.match(w, /export default/);
  assert.ok(w.includes(JSON.stringify(readFileSync("dist/index.html", "utf8")).slice(0, 200)));
});
