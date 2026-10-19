// UI layer. Runs after model.js in the same bundle (see scripts/build.mjs).
// Pure DOM, no frameworks, no network calls, no randomness: same input, same page.

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ALL = enrichedAccounts();
const byId = Object.fromEntries(ALL.map((a) => [a.id, a]));
const COUNTRY = { UK: "UK", IE: "Ireland" };

const state = {
  seg: "ALL",
  tier: "ALL",
  q: "",
  sort: "score",
  seqSeg: "HIRE",
  seqAccount: null,
  seqMode: "filled",
  week: 6,
  playing: null,
  prevStages: null,
};

/* ---------- Tooltip ---------- */
const tip = $("#tooltip");
function showTip(e, html) {
  tip.innerHTML = html;
  tip.hidden = false;
  const r = tip.getBoundingClientRect();
  let x = e.clientX + 14, y = e.clientY + 14;
  if (x + r.width > innerWidth - 8) x = e.clientX - r.width - 14;
  if (y + r.height > innerHeight - 8) y = e.clientY - r.height - 14;
  tip.style.left = x + "px";
  tip.style.top = y + "px";
}
function hideTip() { tip.hidden = true; }
document.addEventListener("mousemove", (e) => {
  const t = e.target.closest("[data-tip]");
  if (t) showTip(e, t.getAttribute("data-tip"));
  else if (!tip.hidden) hideTip();
});

/* ---------- Routing ---------- */
const TABS = ["prospects", "sequences", "pipeline", "rhythm"];
function route() {
  const [tab, param] = (location.hash.slice(1) || "prospects").split("/");
  const active = TABS.includes(tab) ? tab : "prospects";
  document.body.dataset.tab = active;
  document.querySelectorAll(".view").forEach((v) => (v.hidden = v.dataset.view !== active));
  document.querySelectorAll(".tabs a").forEach((a) => {
    if (a.dataset.tab === active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (active === "sequences" && param && byId[param]) {
    state.seqSeg = byId[param].segment;
    state.seqAccount = param;
  }
  if (active !== "pipeline") stopPlay();
  render[active]();
  closeDrawer();
}
window.addEventListener("hashchange", () => { route(); window.scrollTo({ top: 0 }); });

/* ---------- Prospects ---------- */
function filtered() {
  const q = state.q.trim().toLowerCase();
  let rows = ALL.filter((a) =>
    (state.seg === "ALL" || a.segment === state.seg) &&
    (state.tier === "ALL" || a.tier === state.tier) &&
    (!q || [a.name, a.city, a.sector, a.signal, a.contact.role].join(" ").toLowerCase().includes(q))
  );
  if (state.sort === "name") rows = [...rows].sort((x, y) => x.name.localeCompare(y.name));
  if (state.sort === "staff") rows = [...rows].sort((x, y) => y.staff - x.staff || x.name.localeCompare(y.name));
  if (state.sort === "fresh") rows = [...rows].sort((x, y) => x.signalAgeDays - y.signalAgeDays || x.name.localeCompare(y.name));
  return rows;
}

function renderProspects() {
  const el = $("#view-prospects");
  const counts = { ALL: ALL.length };
  for (const k of Object.keys(SEGMENTS)) counts[k] = ALL.filter((a) => a.segment === k).length;
  el.innerHTML = `
    <div class="section-head">
      <div>
        <h2 id="h-prospects">Named-account prospect board</h2>
        <p>40 UK and Irish companies with 10–200 staff, each showing a public trigger that says they're about to employ, pay or expand across borders. Scored 0–100 on fit and timing, with the reason in plain English.</p>
      </div>
    </div>
    <div class="toolbar">
      <div class="chips" role="group" aria-label="Filter by trigger segment">
        <button class="chip" data-seg="ALL" aria-pressed="${state.seg === "ALL"}">All <span class="count">${counts.ALL}</span></button>
        ${Object.values(SEGMENTS).map((s) => `<button class="chip seg-${s.key}" data-seg="${s.key}" aria-pressed="${state.seg === s.key}"><i class="dot"></i>${s.label} <span class="count">${counts[s.key]}</span></button>`).join("")}
      </div>
      <div class="right">
        <select class="field" id="tier" aria-label="Filter by tier">
          ${["ALL", "A", "B", "C"].map((t) => `<option value="${t}" ${state.tier === t ? "selected" : ""}>${t === "ALL" ? "All tiers" : `Tier ${t}`}</option>`).join("")}
        </select>
        <select class="field" id="sort" aria-label="Sort">
          <option value="score" ${state.sort === "score" ? "selected" : ""}>Sort: fit score</option>
          <option value="fresh" ${state.sort === "fresh" ? "selected" : ""}>Sort: freshest signal</option>
          <option value="staff" ${state.sort === "staff" ? "selected" : ""}>Sort: headcount</option>
          <option value="name" ${state.sort === "name" ? "selected" : ""}>Sort: A–Z</option>
        </select>
        <input class="field" id="q" type="search" placeholder="Search company, city, sector" value="${esc(state.q)}" aria-label="Search accounts">
      </div>
    </div>
    <div class="tiles" id="tiles"></div>
    <div class="board"><table>
      <thead><tr><th>Company</th><th>Trigger signal</th><th>Segment</th><th>Fit score</th><th class="col-reason">Why this account, why now</th></tr></thead>
      <tbody id="rows"></tbody>
    </table></div>
    <p class="method">How the score works: headcount fit (20) + signal freshness (25) + cross-border footprint (30) + funding timing (15) + entity gap (10). Tier A is 75+, B is 60–74, C is under 60. Click any row for the breakdown.</p>`;

  el.querySelectorAll("[data-seg]").forEach((b) => b.addEventListener("click", () => { state.seg = b.dataset.seg; renderProspects(); }));
  $("#tier").addEventListener("change", (e) => { state.tier = e.target.value; fillRows(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; fillRows(); });
  $("#q").addEventListener("input", (e) => { state.q = e.target.value; fillRows(); });
  fillRows();
}

function fillRows() {
  const rows = filtered();
  const tierA = rows.filter((a) => a.tier === "A").length;
  const avg = rows.length ? Math.round(rows.reduce((s, a) => s + a.score, 0) / rows.length) : 0;
  const fresh = rows.filter((a) => a.signalAgeDays <= 14).length;
  $("#tiles").innerHTML = `
    <div class="tile"><div class="k">Accounts in view</div><div class="v">${rows.length}</div><div class="s">of ${ALL.length} on the board</div></div>
    <div class="tile"><div class="k">Tier A (75+)</div><div class="v">${tierA}</div><div class="s">work these first</div></div>
    <div class="tile"><div class="k">Average fit score</div><div class="v">${avg}</div><div class="s">out of 100</div></div>
    <div class="tile"><div class="k">Signal under 14 days old</div><div class="v">${fresh}</div><div class="s">act this week</div></div>`;
  $("#rows").innerHTML = rows.length ? rows.map((a) => `
    <tr data-id="${a.id}" tabindex="0" aria-label="${esc(a.name)}, score ${a.score}">
      <td><div class="co-name">${esc(a.name)}</div><div class="co-meta">${esc(a.city)}, ${COUNTRY[a.country]} · ${a.staff} staff</div><div class="co-meta">${esc(a.sector)}</div></td>
      <td class="signal">${esc(a.signal)}<div class="co-meta">${a.signalAgeDays} days ago</div></td>
      <td><span class="seg-tag seg-${a.segment}"><i class="dot"></i>${SEGMENTS[a.segment].short}</span></td>
      <td><div class="score"><span class="score-num">${a.score}</span><span class="bar" aria-hidden="true"><i style="width:${a.score}%"></i></span></div><span class="tier tier-${a.tier}">Tier ${a.tier}</span></td>
      <td class="reason col-reason">${esc(a.reason)}</td>
    </tr>`).join("") : `<tr><td colspan="5" class="empty">No accounts match those filters.</td></tr>`;
  document.querySelectorAll("#rows tr[data-id]").forEach((tr) => {
    tr.addEventListener("click", () => openDrawer(tr.dataset.id));
    tr.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDrawer(tr.dataset.id); } });
  });
}

/* ---------- Drawer ---------- */
const PART_LABEL = { headcount: "Headcount fit", recency: "Signal freshness", footprint: "Cross-border footprint", timing: "Funding timing", entity: "Entity gap" };
let lastFocus = null;
function openDrawer(id) {
  const a = byId[id];
  lastFocus = document.activeElement;
  const d = $("#drawer");
  d.innerHTML = `
    <button class="btn secondary small close" id="drawer-close" aria-label="Close">Close</button>
    <span class="seg-tag seg-${a.segment}"><i class="dot"></i>${SEGMENTS[a.segment].label}</span>
    <h3 id="drawer-title">${esc(a.name)}</h3>
    <div class="co-meta">${esc(a.sector)} · ${esc(a.city)}, ${COUNTRY[a.country]}</div>
    <dl class="kv">
      <dt>Staff</dt><dd>${a.staff}</dd>
      <dt>Signal</dt><dd>${esc(a.signal)} (${esc(a.detail)})</dd>
      <dt>Countries</dt><dd>${a.abroadCountries.map(esc).join(", ")}</dd>
      <dt>First contact</dt><dd>${esc(a.contact.first)}, ${esc(a.contact.role)}</dd>
      <dt>Deel wedge</dt><dd>${esc(SEGMENTS[a.segment].wedge)}</dd>
    </dl>
    <div class="score"><span class="score-num">${a.score}</span><span class="bar"><i style="width:${a.score}%"></i></span><span class="tier tier-${a.tier}">Tier ${a.tier}</span></div>
    <div class="parts">
      ${Object.entries(a.parts).map(([k, v]) => `<div class="part"><span>${PART_LABEL[k]}</span><span class="bar"><i style="width:${(v / SCORE_WEIGHTS[k]) * 100}%"></i></span><span class="val">${v} / ${SCORE_WEIGHTS[k]}</span></div>`).join("")}
    </div>
    <div class="callout">${esc(a.reason)}</div>
    <p style="margin-top:18px"><a class="btn" href="#sequences/${a.id}" id="drawer-seq">Open the ${esc(SEQUENCES[a.segment].title.toLowerCase())} sequence for ${esc(a.contact.first)}</a></p>`;
  d.hidden = false;
  $("#drawer-backdrop").hidden = false;
  $("#drawer-close").addEventListener("click", closeDrawer);
  $("#drawer-close").focus();
}
function closeDrawer() {
  if ($("#drawer").hidden) return;
  $("#drawer").hidden = true;
  $("#drawer-backdrop").hidden = true;
  if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
}
$("#drawer-backdrop").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

/* ---------- Sequences ---------- */
function highlight(template, a, mode) {
  const parts = template.split(/(\{\{\w+\}\})/g);
  return parts.map((p) => {
    const m = p.match(/^\{\{(\w+)\}\}$/);
    if (!m) return esc(p);
    if (mode === "template" || !a) return `<mark class="var">${esc(p)}</mark>`;
    return `<mark class="fill">${esc(fillTemplate(p, a))}</mark>`;
  }).join("");
}
const words = (t) => t.trim().split(/\s+/).length;

function renderSequences() {
  const el = $("#view-sequences");
  const seq = SEQUENCES[state.seqSeg];
  const seg = SEGMENTS[state.seqSeg];
  const options = ALL.filter((a) => a.segment === state.seqSeg);
  if (!state.seqAccount || byId[state.seqAccount].segment !== state.seqSeg) state.seqAccount = options[0].id;
  const a = byId[state.seqAccount];
  el.innerHTML = `
    <div class="section-head">
      <div>
        <h2 id="h-sequences">Three outbound sequences</h2>
        <p>One per trigger segment, three emails each, written in my voice. Each one opens with the prospect's own signal, asks a question they can answer in one line, and offers something useful before it asks for time.</p>
      </div>
    </div>
    <div class="toolbar">
      <div class="chips" role="group" aria-label="Choose a sequence">
        ${Object.values(SEGMENTS).map((s) => `<button class="chip seg-${s.key}" data-seqseg="${s.key}" aria-pressed="${state.seqSeg === s.key}"><i class="dot"></i>${esc(SEQUENCES[s.key].title)}</button>`).join("")}
      </div>
      <div class="toggle" role="group" aria-label="View mode">
        <button data-mode="filled" aria-pressed="${state.seqMode === "filled"}">Personalised</button>
        <button data-mode="template" aria-pressed="${state.seqMode === "template"}">Template</button>
      </div>
    </div>
    <div class="seq-layout">
      <div class="seq-side panel">
        <span class="seg-tag seg-${seg.key}"><i class="dot"></i>${seg.label}</span>
        <h3 style="margin-top:10px">${esc(seq.title)}</h3>
        <h4>Who it's for</h4><p>${esc(seq.audience)}</p>
        <h4>The angle</h4><p>${esc(seq.angle)}</p>
        <h4>Why this segment</h4><p>${esc(seg.why)}</p>
        <h4>Where Deel fits</h4><p>${esc(seg.wedge)}</p>
        <h4><label for="acct">Preview for account</label></h4>
        <select class="field picker" id="acct">${options.map((o) => `<option value="${o.id}" ${o.id === a.id ? "selected" : ""}>${esc(o.name)} (${o.score})</option>`).join("")}</select>
      </div>
      <div class="touches">
        ${seq.touches.map((t, i) => `
          <article class="touch">
            <div class="touch-head">
              <div class="touch-day"><span class="daybadge">Day ${t.day}</span>Touch ${i + 1} of 3 · email</div>
              <span class="wordcount">${words(fillTemplate(t.body, a))} words</span>
            </div>
            <div class="touch-subject"><span>Subject:</span> ${highlight(t.subject, a, state.seqMode)}</div>
            <div class="touch-body">${highlight(t.body, a, state.seqMode)}</div>
          </article>`).join("")}
        <p class="method">Highlighted text is pulled from the account record, so every send can be checked against the board. Sent from my own inbox, Tuesday to Thursday mornings, never with tracking pixels on the first touch.</p>
      </div>
    </div>`;
  el.querySelectorAll("[data-seqseg]").forEach((b) => b.addEventListener("click", () => { state.seqSeg = b.dataset.seqseg; state.seqAccount = null; renderSequences(); }));
  el.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => { state.seqMode = b.dataset.mode; renderSequences(); }));
  $("#acct").addEventListener("change", (e) => { state.seqAccount = e.target.value; renderSequences(); });
}

/* ---------- Pipeline ---------- */
function renderPipeline() {
  const el = $("#view-pipeline");
  el.innerHTML = `
    <div class="section-head">
      <div>
        <h2 id="h-pipeline">Pipeline view</h2>
        <p>How the 40 accounts would move through prospect, contacted, replied and meeting booked over a six-week sample run. Top-scored accounts are contacted first, seven a week. Press play to watch it fill. The flow is illustrative, not a forecast.</p>
      </div>
    </div>
    <div class="pipe-controls">
      <button class="btn" id="play">${state.playing ? "Pause" : "Play weeks 1–6"}</button>
      <div class="weeks" role="group" aria-label="Choose week">${Array.from({ length: WEEKS }, (_, i) => `<button data-week="${i + 1}" aria-pressed="${state.week === i + 1}">W${i + 1}</button>`).join("")}</div>
      <div class="legend">${Object.values(SEGMENTS).map((s) => `<span class="seg-${s.key}"><i class="dot"></i>${s.label}</span>`).join("")}</div>
    </div>
    <div class="funnel-wrap">
      <div class="panel"><h3 style="font-size:18px">Funnel at end of week <span id="wk">${state.week}</span><span class="sample-tag">Sample</span></h3><div class="funnel" id="funnel"></div><p class="axis-note">Cumulative: an account that replied also counts as contacted. Bars share one scale (40 accounts).</p></div>
      <div class="panel"><h3 style="font-size:18px">Stage-to-stage conversion</h3><div class="rates" id="rates"></div></div>
    </div>
    <div class="kanban" id="kanban"></div>`;
  $("#play").addEventListener("click", togglePlay);
  el.querySelectorAll("[data-week]").forEach((b) => b.addEventListener("click", () => { stopPlay(); setWeek(+b.dataset.week); }));
  state.prevStages = null;
  fillPipeline();
}

function setWeek(w) {
  state.week = w;
  document.querySelectorAll("[data-week]").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.week === w)));
  fillPipeline();
}

function fillPipeline() {
  const rows = pipelineAt(state.week, ALL);
  const funnel = funnelAt(state.week, ALL);
  $("#wk").textContent = state.week;
  $("#funnel").innerHTML = funnel.map((f, i) => {
    const prev = i > 0 ? funnel[i - 1].count : null;
    const conv = prev ? Math.round((f.count / prev) * 100) : null;
    return `<div class="f-row">
      <span class="f-label">${f.label}</span>
      <span class="f-track"><span class="f-bar" style="width:${(f.count / ALL.length) * 100}%"></span><span class="hit" data-tip="<b>${f.label}</b><br>${f.count} of ${ALL.length} accounts${conv != null ? `<br>${conv}% of previous stage` : ""}"></span></span>
      <span class="f-count">${f.count}</span>
    </div>`;
  }).join("");
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
  const [p, c, r, m] = funnel.map((f) => f.count);
  const pos = rows.filter((x) => x.stage >= 2 && x.sentiment !== "negative").length;
  $("#rates").innerHTML = `
    <div class="rate"><span>Prospect → contacted</span><b>${pct(c, p)}</b></div>
    <div class="rate"><span>Contacted → replied</span><b>${pct(r, c)}</b></div>
    <div class="rate"><span>Replied → meeting</span><b>${pct(m, r)}</b></div>
    <div class="rate"><span>Positive or referral replies</span><b>${pos} of ${r}</b></div>
    <div class="rate"><span>Contacted → meeting</span><b>${pct(m, c)}</b></div>`;
  const prev = state.prevStages;
  const cols = STAGES.map((label, i) => {
    const list = rows.filter((x) => x.stage === i);
    const show = list.slice(0, 12);
    return `<div class="col"><h4>${label}<span>${list.length}</span></h4>
      ${show.map((x) => `<div class="card seg-${x.segment} ${prev && prev[x.id] !== x.stage ? "moved" : ""}"><i class="dot"></i><span>${esc(x.name)}<span class="sub">${x.stage >= 2 ? sentimentLabel(x.sentiment) : `Score ${x.score} · ${x.stage === 1 ? `contacted W${x.contactedWeek}` : `queued for W${x.contactedWeek}`}`}</span></span></div>`).join("")}
      ${list.length > show.length ? `<div class="more">+ ${list.length - show.length} more</div>` : ""}
    </div>`;
  });
  $("#kanban").innerHTML = cols.join("");
  state.prevStages = Object.fromEntries(rows.map((x) => [x.id, x.stage]));
}
function sentimentLabel(s) {
  return { positive: "Positive reply", negative: "Not now", referral: "Referred to colleague" }[s] || "";
}
function togglePlay() {
  if (state.playing) return stopPlay();
  setWeek(1);
  $("#play").textContent = "Pause";
  state.playing = setInterval(() => {
    if (state.week >= WEEKS) return stopPlay();
    setWeek(state.week + 1);
  }, 1100);
}
function stopPlay() {
  if (state.playing) clearInterval(state.playing);
  state.playing = null;
  const b = $("#play");
  if (b) b.textContent = "Play weeks 1–6";
}

/* ---------- Rhythm ---------- */
function renderRhythm() {
  const el = $("#view-rhythm");
  el.innerHTML = `
    <div class="section-head">
      <div>
        <h2 id="h-rhythm">How this runs weekly</h2>
        <p>The engine only works if it runs the same way every week. Monday builds the list, Tuesday to Thursday is for conversations, and Friday is for learning what to change.</p>
      </div>
    </div>
    <div class="week-grid">
      ${RHYTHM.map((d) => `<div class="day"><div class="day-head"><b>${d.day}</b><span>${esc(d.focus)}</span></div>${d.blocks.map(([t, txt]) => `<div class="block"><time>${t}</time>${esc(txt)}</div>`).join("")}</div>`).join("")}
    </div>
    <div class="two-col">
      <div class="panel">
        <h3>Inputs I hold myself to</h3>
        <p style="margin-bottom:8px">Weekly targets for what I control. Outputs like replies and meetings are what Friday's review is for.</p>
        <ul class="inputs">${WEEKLY_INPUTS.map((i) => `<li><span>${esc(i.label)}</span><b>${esc(i.target)}</b></li>`).join("")}</ul>
      </div>
      <div class="panel">
        <h3>Rules of the engine</h3>
        <ol class="rules">
          <li>No signal, no sequence. Every account needs a dated, public trigger.</li>
          <li>Tier A gets a hand-written first line. Tier C waits until a fresh signal appears.</li>
          <li>One question per email, answerable in a line.</li>
          <li>Every reply gets tagged: interested, not now, wrong person, or objection.</li>
          <li>Drop or rewrite a subject line once it has had a fair run and is still the weakest.</li>
          <li>"Later" means a dated follow-up task, not a vague nurture list.</li>
        </ol>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>AE handoff brief (sent with every booked meeting)</h3>
      <div class="brief">Account: Halyard Security (Belfast, 96 staff) · Score 82, tier A
Trigger: two SOC Analyst roles in Romania, posted 11 days ago
Contact: Declan, VP Operations
What they said: hiring both by end of quarter; no Romanian entity; worried about overnight-shift rules
Likely fit: EOR for 2 hires, contractor review for 1 existing freelancer
Open questions: who signs off budget; whether the UK payroll provider is up for renewal
Meeting: 30 min, Thursday 10:00, Declan + Head of Finance</div>
      <p class="method" style="margin-top:8px">The brief above uses a sample account from the board.</p>
    </div>`;
}

const render = { prospects: renderProspects, sequences: renderSequences, pipeline: renderPipeline, rhythm: renderRhythm };
route();
