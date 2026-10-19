// UKI SMB Outbound Engine — data model.
// Every company, person and number in this file is SYNTHETIC sample data.
// Nothing here describes a real business or a real outcome.

export const SEGMENTS = {
  HIRE: {
    key: "HIRE",
    label: "Hiring abroad",
    short: "Hiring abroad",
    colour: "#5938B7",
    wedge: "Employer of Record for the first hire in a country with no entity",
    why: "A first hire outside the UK or Ireland forces a decision: set up an entity, misuse a contractor agreement, or employ through an EOR. That decision has a deadline (the offer date), so the timing is real.",
  },
  CONTRACT: {
    key: "CONTRACT",
    label: "Contractor-heavy",
    short: "Contractors",
    colour: "#2187CF",
    wedge: "Contractor management, compliant contracts and one-run payments",
    why: "Teams paying several overseas contractors by bank transfer feel it every month-end: invoice chasing, FX fees, and a growing worry that long-running contractors look like employees.",
  },
  EXPAND: {
    key: "EXPAND",
    label: "International expansion",
    short: "Expansion",
    colour: "#CD4311",
    wedge: "EOR to test a market before an entity, then global payroll once it sticks",
    why: "Opening a new market means people on the ground before the legal set-up is finished. Expansion plans are public (press, job ads, new-office posts), so the trigger is easy to spot and time.",
  },
};

// fundingMonths: months since last announced round (null = none public).
// noEntity: true when the signal points to people in a country where the company has no entity.
export const ACCOUNTS = [
  // ---- Hiring abroad (14) ----
  { id: "a01", name: "Brightwake Analytics", city: "Manchester", country: "UK", sector: "B2B SaaS (retail analytics)", staff: 64, segment: "HIRE", signal: "Job ad for a Senior Data Engineer, remote in Portugal", detail: "posted 9 days ago, first role outside the UK", signalAgeDays: 9, abroadCountries: ["Portugal"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 5, noEntity: true, contact: { first: "Hannah", role: "Head of People" }, roleAbroad: "Senior Data Engineer", countryAbroad: "Portugal" },
  { id: "a02", name: "Tidemark Health", city: "Dublin", country: "IE", sector: "Digital health", staff: 48, segment: "HIRE", signal: "Three clinical-ops roles advertised in Poland", detail: "all three posted in the last fortnight", signalAgeDays: 12, abroadCountries: ["Poland"], openRolesAbroad: 3, contractorsAbroad: 1, fundingMonths: 7, noEntity: true, contact: { first: "Ciarán", role: "COO" }, roleAbroad: "Clinical Operations Lead", countryAbroad: "Poland" },
  { id: "a03", name: "Kestrel Ledger", city: "Edinburgh", country: "UK", sector: "Fintech (SME lending)", staff: 112, segment: "HIRE", signal: "Hiring a Compliance Analyst in Lithuania", detail: "listed alongside two UK compliance roles", signalAgeDays: 21, abroadCountries: ["Lithuania"], openRolesAbroad: 1, contractorsAbroad: 2, fundingMonths: 11, noEntity: true, contact: { first: "Morag", role: "Head of People Operations" }, roleAbroad: "Compliance Analyst", countryAbroad: "Lithuania" },
  { id: "a04", name: "Pollen & Pine Studio", city: "Bristol", country: "UK", sector: "Games studio", staff: 37, segment: "HIRE", signal: "Hiring a Technical Artist in Spain", detail: "careers page says 'remote, Spain-based'", signalAgeDays: 6, abroadCountries: ["Spain"], openRolesAbroad: 1, contractorsAbroad: 3, fundingMonths: null, noEntity: true, contact: { first: "Owen", role: "Co-founder & Studio Director" }, roleAbroad: "Technical Artist", countryAbroad: "Spain" },
  { id: "a05", name: "Corrib Robotics", city: "Galway", country: "IE", sector: "Industrial automation", staff: 83, segment: "HIRE", signal: "Field Service Engineer role based in Germany", detail: "to support a new customer site near Stuttgart", signalAgeDays: 17, abroadCountries: ["Germany"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: 9, noEntity: true, contact: { first: "Aoife", role: "HR Manager" }, roleAbroad: "Field Service Engineer", countryAbroad: "Germany" },
  { id: "a06", name: "Quayside Learning", city: "Newcastle", country: "UK", sector: "EdTech", staff: 29, segment: "HIRE", signal: "Curriculum Designer role open to candidates in South Africa", detail: "first hire outside the UK", signalAgeDays: 25, abroadCountries: ["South Africa"], openRolesAbroad: 1, contractorsAbroad: 1, fundingMonths: 14, noEntity: true, contact: { first: "Priya", role: "CEO" }, roleAbroad: "Curriculum Designer", countryAbroad: "South Africa" },
  { id: "a07", name: "Halyard Security", city: "Belfast", country: "UK", sector: "Cybersecurity", staff: 96, segment: "HIRE", signal: "Two SOC Analyst roles in Romania", detail: "to cover overnight UK hours", signalAgeDays: 11, abroadCountries: ["Romania"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: 4, noEntity: true, contact: { first: "Declan", role: "VP Operations" }, roleAbroad: "SOC Analyst", countryAbroad: "Romania" },
  { id: "a08", name: "Fernhill Foods Online", city: "Leeds", country: "UK", sector: "D2C e-commerce", staff: 71, segment: "HIRE", signal: "Customer Support Lead role in the Philippines", detail: "listed as 'Manila, full-time employee'", signalAgeDays: 34, abroadCountries: ["Philippines"], openRolesAbroad: 1, contractorsAbroad: 4, fundingMonths: null, noEntity: true, contact: { first: "Gemma", role: "Head of Operations" }, roleAbroad: "Customer Support Lead", countryAbroad: "the Philippines" },
  { id: "a09", name: "Marlowe Legal Tech", city: "London", country: "UK", sector: "LegalTech", staff: 54, segment: "HIRE", signal: "Hiring a Product Designer in the Netherlands", detail: "posted by the Head of Product on LinkedIn", signalAgeDays: 8, abroadCountries: ["Netherlands"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 3, noEntity: true, contact: { first: "Tom", role: "Head of Talent" }, roleAbroad: "Product Designer", countryAbroad: "the Netherlands" },
  { id: "a10", name: "Slaney Bio", city: "Cork", country: "IE", sector: "Biotech services", staff: 142, segment: "HIRE", signal: "Regulatory Affairs Manager role in France", detail: "ahead of an EU submission", signalAgeDays: 46, abroadCountries: ["France"], openRolesAbroad: 1, contractorsAbroad: 1, fundingMonths: 18, noEntity: true, contact: { first: "Niamh", role: "Head of HR" }, roleAbroad: "Regulatory Affairs Manager", countryAbroad: "France" },
  { id: "a11", name: "Larkspur Payments", city: "Cardiff", country: "UK", sector: "Fintech (payments)", staff: 58, segment: "HIRE", signal: "Backend Engineer role open in Canada", detail: "to overlap with a new North American partner", signalAgeDays: 19, abroadCountries: ["Canada"], openRolesAbroad: 1, contractorsAbroad: 1, fundingMonths: 6, noEntity: true, contact: { first: "Rhys", role: "CTO" }, roleAbroad: "Backend Engineer", countryAbroad: "Canada" },
  { id: "a12", name: "Ashgrove Recruitment Tech", city: "Birmingham", country: "UK", sector: "HR tech", staff: 22, segment: "HIRE", signal: "Sales Development role in Ireland advertised", detail: "first person outside the UK", signalAgeDays: 58, abroadCountries: ["Ireland"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: null, noEntity: true, contact: { first: "Sam", role: "Founder" }, roleAbroad: "Sales Development Rep", countryAbroad: "Ireland" },
  { id: "a13", name: "Northlight Media Group", city: "Glasgow", country: "UK", sector: "Digital publishing", staff: 168, segment: "HIRE", signal: "Video Editor roles in India", detail: "two roles posted on the careers page", signalAgeDays: 72, abroadCountries: ["India"], openRolesAbroad: 2, contractorsAbroad: 6, fundingMonths: null, noEntity: true, contact: { first: "Fiona", role: "People Director" }, roleAbroad: "Video Editor", countryAbroad: "India" },
  { id: "a14", name: "Bramble Mobility", city: "Cambridge", country: "UK", sector: "Mobility software", staff: 15, segment: "HIRE", signal: "Embedded Engineer role open in Sweden", detail: "founder posted it in a hiring thread", signalAgeDays: 27, abroadCountries: ["Sweden"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 2, noEntity: true, contact: { first: "Ella", role: "Co-founder & CEO" }, roleAbroad: "Embedded Engineer", countryAbroad: "Sweden" },

  // ---- Contractor-heavy (13) ----
  { id: "a15", name: "Saltmarsh Digital", city: "Brighton", country: "UK", sector: "Web & product agency", staff: 41, segment: "CONTRACT", signal: "Team page lists 11 freelancers across 6 countries", detail: "developers in Ukraine, Brazil and Vietnam", signalAgeDays: 14, abroadCountries: ["Ukraine", "Brazil", "Vietnam", "Poland", "Serbia", "Argentina"], openRolesAbroad: 0, contractorsAbroad: 11, fundingMonths: null, noEntity: false, contact: { first: "Lewis", role: "Managing Director" }, contractorCount: 11, contractorCountries: 6 },
  { id: "a16", name: "Inishfree Translations", city: "Limerick", country: "IE", sector: "Localisation services", staff: 34, segment: "CONTRACT", signal: "Recruiting freelance linguists in 9 languages", detail: "ongoing contractor pool, paid per project", signalAgeDays: 10, abroadCountries: ["Spain", "Italy", "Germany", "Japan", "Brazil", "Mexico", "Poland", "Turkey", "Korea"], openRolesAbroad: 0, contractorsAbroad: 40, fundingMonths: null, noEntity: false, contact: { first: "Sinéad", role: "Finance Manager" }, contractorCount: 40, contractorCountries: 9 },
  { id: "a17", name: "Copperleaf Studios", city: "London", country: "UK", sector: "Animation studio", staff: 58, segment: "CONTRACT", signal: "Credits list 23 remote animators on the last project", detail: "most based outside the UK", signalAgeDays: 31, abroadCountries: ["Canada", "France", "India", "Philippines", "Spain"], openRolesAbroad: 0, contractorsAbroad: 23, fundingMonths: 8, noEntity: false, contact: { first: "Maya", role: "Head of Production" }, contractorCount: 23, contractorCountries: 5 },
  { id: "a18", name: "Wrenfield Software", city: "Sheffield", country: "UK", sector: "Vertical SaaS (construction)", staff: 76, segment: "CONTRACT", signal: "Engineering blog thanks 'our contractor team in Egypt and Pakistan'", detail: "8 named engineers, all long-running", signalAgeDays: 22, abroadCountries: ["Egypt", "Pakistan"], openRolesAbroad: 0, contractorsAbroad: 8, fundingMonths: 10, noEntity: false, contact: { first: "Chris", role: "CFO" }, contractorCount: 8, contractorCountries: 2 },
  { id: "a19", name: "Glenmore Outdoor", city: "Aberdeen", country: "UK", sector: "Outdoor retail (D2C)", staff: 47, segment: "CONTRACT", signal: "Overseas content creators and a contractor e-com team", detail: "7 contractors listed on LinkedIn", signalAgeDays: 40, abroadCountries: ["Norway", "Canada", "Philippines"], openRolesAbroad: 0, contractorsAbroad: 7, fundingMonths: null, noEntity: false, contact: { first: "Callum", role: "Operations Director" }, contractorCount: 7, contractorCountries: 3 },
  { id: "a20", name: "Beacon Street Research", city: "Oxford", country: "UK", sector: "Market research", staff: 26, segment: "CONTRACT", signal: "Advertising for freelance field researchers in 5 markets", detail: "rolling call on their site", signalAgeDays: 16, abroadCountries: ["Kenya", "Nigeria", "Ghana", "South Africa", "Egypt"], openRolesAbroad: 0, contractorsAbroad: 15, fundingMonths: null, noEntity: false, contact: { first: "Abi", role: "Operations Manager" }, contractorCount: 15, contractorCountries: 5 },
  { id: "a21", name: "Lagan Labs", city: "Belfast", country: "UK", sector: "Software consultancy", staff: 63, segment: "CONTRACT", signal: "Case study mentions a nearshore contractor squad", detail: "14 developers in Portugal and Romania", signalAgeDays: 29, abroadCountries: ["Portugal", "Romania"], openRolesAbroad: 0, contractorsAbroad: 14, fundingMonths: null, noEntity: false, contact: { first: "Gareth", role: "Finance Director" }, contractorCount: 14, contractorCountries: 2 },
  { id: "a22", name: "Hollybush Design Co.", city: "Nottingham", country: "UK", sector: "Brand & packaging design", staff: 18, segment: "CONTRACT", signal: "Freelance illustrators in 4 countries on the studio page", detail: "6 regular contributors", signalAgeDays: 55, abroadCountries: ["Italy", "Mexico", "Indonesia", "Argentina"], openRolesAbroad: 0, contractorsAbroad: 6, fundingMonths: null, noEntity: false, contact: { first: "Lucy", role: "Studio Owner" }, contractorCount: 6, contractorCountries: 4 },
  { id: "a23", name: "Shannonside Data", city: "Limerick", country: "IE", sector: "Data labelling services", staff: 39, segment: "CONTRACT", signal: "Hiring contract annotators in Kenya and India", detail: "batch of 20 contractors", signalAgeDays: 7, abroadCountries: ["Kenya", "India"], openRolesAbroad: 0, contractorsAbroad: 20, fundingMonths: 4, noEntity: false, contact: { first: "Eoin", role: "Head of Operations" }, contractorCount: 20, contractorCountries: 2 },
  { id: "a24", name: "Redkite Marketing", city: "Reading", country: "UK", sector: "Performance marketing agency", staff: 52, segment: "CONTRACT", signal: "Offshore paid-media team of contractors in South Africa", detail: "mentioned on the agency's 'how we work' page", signalAgeDays: 37, abroadCountries: ["South Africa", "Philippines"], openRolesAbroad: 0, contractorsAbroad: 9, fundingMonths: null, noEntity: false, contact: { first: "Jess", role: "COO" }, contractorCount: 9, contractorCountries: 2 },
  { id: "a25", name: "Tamar Ventures Studio", city: "Plymouth", country: "UK", sector: "Venture studio", staff: 12, segment: "CONTRACT", signal: "Portfolio builds staffed by freelancers in 3 countries", detail: "5 contractors on current builds", signalAgeDays: 63, abroadCountries: ["Poland", "Ukraine", "Spain"], openRolesAbroad: 0, contractorsAbroad: 5, fundingMonths: 13, noEntity: false, contact: { first: "Ben", role: "Studio Partner" }, contractorCount: 5, contractorCountries: 3 },
  { id: "a26", name: "Westport Games", city: "Galway", country: "IE", sector: "Mobile games", staff: 44, segment: "CONTRACT", signal: "Contract QA testers in Brazil and Vietnam", detail: "12 testers on rolling contracts", signalAgeDays: 20, abroadCountries: ["Brazil", "Vietnam"], openRolesAbroad: 0, contractorsAbroad: 12, fundingMonths: 9, noEntity: false, contact: { first: "Róisín", role: "Producer & Ops Lead" }, contractorCount: 12, contractorCountries: 2 },
  { id: "a27", name: "Ironbridge Engineering Services", city: "Birmingham", country: "UK", sector: "Engineering consultancy", staff: 188, segment: "CONTRACT", signal: "Project contractors on sites in the UAE and Saudi Arabia", detail: "per a recent project announcement", signalAgeDays: 49, abroadCountries: ["UAE", "Saudi Arabia"], openRolesAbroad: 0, contractorsAbroad: 10, fundingMonths: null, noEntity: false, contact: { first: "Anil", role: "HR Business Partner" }, contractorCount: 10, contractorCountries: 2 },

  // ---- International expansion (13) ----
  { id: "a28", name: "Harbourline Logistics Tech", city: "Liverpool", country: "UK", sector: "Logistics SaaS", staff: 87, segment: "EXPAND", signal: "Announced a Netherlands launch with a Rotterdam pilot customer", detail: "press release last week", signalAgeDays: 7, abroadCountries: ["Netherlands"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: 3, noEntity: true, contact: { first: "Natalie", role: "COO" }, market: "the Netherlands", marketCity: "Rotterdam" },
  { id: "a29", name: "Clover Pay", city: "Dublin", country: "IE", sector: "Fintech (embedded payments)", staff: 74, segment: "EXPAND", signal: "Series A announcement names Germany and Spain as next markets", detail: "€12m round, 'expanding into DACH and Iberia'", signalAgeDays: 13, abroadCountries: ["Germany", "Spain"], openRolesAbroad: 3, contractorsAbroad: 1, fundingMonths: 1, noEntity: true, contact: { first: "Rory", role: "Head of People" }, market: "Germany and Spain", marketCity: "Berlin" },
  { id: "a30", name: "Thistle Energy Systems", city: "Glasgow", country: "UK", sector: "Clean-tech (battery software)", staff: 103, segment: "EXPAND", signal: "Opening a US sales presence after a Texas utility deal", detail: "CEO interview in trade press", signalAgeDays: 18, abroadCountries: ["United States"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: 6, noEntity: true, contact: { first: "Iain", role: "CFO" }, market: "the US", marketCity: "Austin" },
  { id: "a31", name: "Pebblebrook Pet Care", city: "Bristol", country: "UK", sector: "Pet health D2C", staff: 46, segment: "EXPAND", signal: "Launching in Ireland and France", detail: "new country sites live, local roles advertised", signalAgeDays: 24, abroadCountries: ["Ireland", "France"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: 8, noEntity: true, contact: { first: "Zoe", role: "Head of People & Culture" }, market: "France", marketCity: "Paris" },
  { id: "a32", name: "Ardmore Clinical", city: "Cork", country: "IE", sector: "Clinical trials tech", staff: 61, segment: "EXPAND", signal: "Hiring a Country Lead for the Nordics", detail: "first Nordic customer signed", signalAgeDays: 15, abroadCountries: ["Denmark", "Sweden"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 12, noEntity: true, contact: { first: "Brendan", role: "VP Commercial" }, market: "the Nordics", marketCity: "Copenhagen" },
  { id: "a33", name: "Foxglove Interiors", city: "Manchester", country: "UK", sector: "Furniture e-commerce", staff: 92, segment: "EXPAND", signal: "Opening an EU fulfilment hub in Belgium", detail: "post-Brexit shipping costs cited", signalAgeDays: 39, abroadCountries: ["Belgium"], openRolesAbroad: 4, contractorsAbroad: 0, fundingMonths: null, noEntity: true, contact: { first: "Kate", role: "Operations Director" }, market: "Belgium", marketCity: "Antwerp" },
  { id: "a34", name: "Signalbox Telematics", city: "Derby", country: "UK", sector: "Rail telematics", staff: 134, segment: "EXPAND", signal: "Won an Australian rail contract; hiring locally", detail: "two engineering roles in Sydney", signalAgeDays: 28, abroadCountries: ["Australia"], openRolesAbroad: 2, contractorsAbroad: 0, fundingMonths: null, noEntity: true, contact: { first: "Martin", role: "Finance Director" }, market: "Australia", marketCity: "Sydney" },
  { id: "a35", name: "Lumen Lane Lighting", city: "Leeds", country: "UK", sector: "Smart lighting hardware", staff: 33, segment: "EXPAND", signal: "Distributor deal in the UAE; first sales hire planned", detail: "LinkedIn post from the founder", signalAgeDays: 44, abroadCountries: ["UAE"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 15, noEntity: true, contact: { first: "Adam", role: "Founder" }, market: "the UAE", marketCity: "Dubai" },
  { id: "a36", name: "Kinsale Wealth Software", city: "Dublin", country: "IE", sector: "WealthTech", staff: 57, segment: "EXPAND", signal: "Partner hire in Luxembourg to support a fund-admin client", detail: "job ad mentions 'first EU hub outside Ireland'", signalAgeDays: 10, abroadCountries: ["Luxembourg"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: 7, noEntity: true, contact: { first: "Orla", role: "Head of Finance" }, market: "Luxembourg", marketCity: "Luxembourg City" },
  { id: "a37", name: "Moorland Coffee Roasters", city: "York", country: "UK", sector: "Specialty coffee (D2C & wholesale)", staff: 24, segment: "EXPAND", signal: "Opening a wholesale arm in Germany", detail: "German-language site launched", signalAgeDays: 66, abroadCountries: ["Germany"], openRolesAbroad: 1, contractorsAbroad: 0, fundingMonths: null, noEntity: true, contact: { first: "Laura", role: "Co-owner" }, market: "Germany", marketCity: "Hamburg" },
  { id: "a38", name: "Gullwing Aerial", city: "Southampton", country: "UK", sector: "Drone inspection services", staff: 68, segment: "EXPAND", signal: "Expanding inspection crews into Norway's offshore wind sector", detail: "framework contract announced", signalAgeDays: 21, abroadCountries: ["Norway"], openRolesAbroad: 3, contractorsAbroad: 2, fundingMonths: 5, noEntity: true, contact: { first: "Joe", role: "Head of Operations" }, market: "Norway", marketCity: "Stavanger" },
  { id: "a39", name: "Wicklow Biologics Software", city: "Dublin", country: "IE", sector: "Lab software", staff: 118, segment: "EXPAND", signal: "Opening a Boston office for US customers", detail: "VP Sales hired in Boston", signalAgeDays: 33, abroadCountries: ["United States"], openRolesAbroad: 3, contractorsAbroad: 0, fundingMonths: 9, noEntity: true, contact: { first: "Seán", role: "CFO" }, market: "the US", marketCity: "Boston" },
  { id: "a40", name: "Pennant Travel Tech", city: "Edinburgh", country: "UK", sector: "Travel booking SaaS", staff: 197, segment: "EXPAND", signal: "Entering Italy via a new tour-operator partnership", detail: "Italian partnerships manager role advertised", signalAgeDays: 81, abroadCountries: ["Italy"], openRolesAbroad: 1, contractorsAbroad: 3, fundingMonths: null, noEntity: true, contact: { first: "Alasdair", role: "VP People" }, market: "Italy", marketCity: "Milan" },
];

// ---- Fit score (deterministic, 0–100) ----
// Five components, each explainable in one line. Weights sum to 100.
export const SCORE_WEIGHTS = { headcount: 20, recency: 25, footprint: 30, timing: 15, entity: 10 };

export function scoreAccount(a) {
  const headcount = a.staff >= 25 && a.staff <= 150 ? 20 : a.staff >= 15 && a.staff <= 200 ? 14 : 8;
  const recency = a.signalAgeDays <= 14 ? 25 : a.signalAgeDays <= 30 ? 20 : a.signalAgeDays <= 60 ? 13 : 6;
  const countryPts = Math.min(18, a.abroadCountries.length * 6);
  const peoplePts = Math.min(12, a.openRolesAbroad * 3 + Math.ceil(a.contractorsAbroad / 2));
  const footprint = countryPts + peoplePts;
  const timing = a.fundingMonths == null ? 4 : a.fundingMonths <= 6 ? 15 : a.fundingMonths <= 12 ? 9 : 4;
  const entity = a.noEntity ? 10 : a.contractorsAbroad >= 8 ? 8 : 5;
  const parts = { headcount, recency, footprint, timing, entity };
  const total = headcount + recency + footprint + timing + entity;
  return { total, parts };
}

export function tierFor(score) {
  return score >= 75 ? "A" : score >= 60 ? "B" : "C";
}

export const withArticle = (w) => `${/^[AEIOU]/i.test(w) ? "an" : "a"} ${w}`;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Reason = the segment's core trigger, the next strongest supporting fact, and the biggest drag.
// Every phrase is built from the account's own fields, so it can never contradict the data.
export function reasonFor(a, scored = scoreAccount(a)) {
  const core = {
    HIRE: `Hiring ${withArticle(a.roleAbroad)} in ${a.countryAbroad}, with no local entity there`,
    CONTRACT: `${plural(a.contractorsAbroad, "contractor", "contractors")} across ${plural(a.abroadCountries.length, "country", "countries")}, likely paid invoice by invoice`,
    EXPAND: `Launching in ${a.market} before a local entity exists`,
  }[a.segment];

  const p = scored.parts;
  const support = [];
  if (p.recency === 25) support.push([4, `signal is only ${a.signalAgeDays} days old`]);
  if (p.timing === 15) support.push([3, `raised ${plural(a.fundingMonths, "month", "months")} ago, so budget and urgency line up`]);
  if (a.segment !== "CONTRACT" && a.openRolesAbroad >= 2) support.push([2, `${a.openRolesAbroad} roles open abroad, not just one`]);
  if (p.headcount === 20) support.push([1, `${a.staff} staff sits in the 25–150 sweet spot`]);
  if (p.recency === 20) support.push([0, `signal is ${a.signalAgeDays} days old`]);
  support.sort((x, y) => y[0] - x[0]);

  let watch;
  if (a.staff < 25) watch = `small team (${a.staff}), so budget may be tight`;
  else if (a.staff > 150) watch = `${a.staff} staff, so there may be an existing process to displace`;
  else if (a.signalAgeDays > 30) watch = `signal is ${a.signalAgeDays} days old, so open with a softer question`;
  else if (a.segment !== "CONTRACT" && a.openRolesAbroad + a.contractorsAbroad <= 1) watch = "only one person abroad so far, so the deal starts small";
  else if (a.fundingMonths == null) watch = "no recent funding news";
  else if (p.timing < 15) watch = `last raise was ${plural(a.fundingMonths, "month", "months")} ago`;
  else watch = "nothing obvious; qualify the decision-maker early";

  return `${core}${support.length ? `; ${support[0][1]}` : ""}. Watch: ${watch}.`;
}

export function enrichedAccounts() {
  return ACCOUNTS.map((a) => {
    const scored = scoreAccount(a);
    return { ...a, score: scored.total, parts: scored.parts, tier: tierFor(scored.total), reason: reasonFor(a, scored) };
  }).sort((x, y) => y.score - x.score || x.name.localeCompare(y.name));
}

// ---- Sample pipeline flow (illustrative, six-week window) ----
// Contact order follows score rank: the top 7 accounts start in week 1, the next 7 in week 2, and so on.
// Replies and meetings are hand-placed sample events so the funnel has something to show. They are not results.
export const WEEKS = 6;
export const SAMPLE_EVENTS = {
  a07: { replied: 2, sentiment: "positive", meeting: 3 },
  a02: { replied: 2, sentiment: "positive", meeting: 3 },
  a29: { replied: 3, sentiment: "positive", meeting: 4 },
  a01: { replied: 3, sentiment: "negative" },
  a23: { replied: 4, sentiment: "positive", meeting: 5 },
  a16: { replied: 4, sentiment: "referral" },
  a30: { replied: 5, sentiment: "positive", meeting: 6 },
  a26: { replied: 6, sentiment: "negative" },
};

export const STAGES = ["Prospect", "Contacted", "Replied", "Meeting booked"];

export function pipelineAt(week, accounts = enrichedAccounts()) {
  return accounts.map((a, rank) => {
    const contacted = 1 + Math.floor(rank / 7);
    const ev = SAMPLE_EVENTS[a.id] || {};
    let stage = 0;
    if (week >= contacted) stage = 1;
    if (ev.replied && week >= ev.replied) stage = 2;
    if (ev.meeting && week >= ev.meeting) stage = 3;
    return { ...a, contactedWeek: contacted, stage, sentiment: stage >= 2 ? ev.sentiment : null };
  });
}

// Cumulative funnel: an account in "Replied" also counts as "Contacted", and so on.
export function funnelAt(week, accounts) {
  const rows = pipelineAt(week, accounts);
  return STAGES.map((label, i) => ({ label, count: rows.filter((r) => r.stage >= i).length }));
}

// ---- Outbound sequences (3 segments x 3 touches) ----
export const SEQUENCES = {
  HIRE: {
    title: "First hire abroad",
    audience: "Heads of People, COOs and founders at 10–200 person UK/IE companies advertising their first role in a country where they have no entity.",
    angle: "The offer date is a real deadline. Ask how they plan to employ the person before they have to decide in a hurry.",
    touches: [
      {
        day: 1,
        subject: "{{roleAbroad}} in {{countryAbroad}}",
        body: `Hi {{first}},

Saw {{company}} is hiring {{aRoleAbroad}} in {{countryAbroad}} ({{detail}}).

The first hire in a new country is usually where the admin catches up with you: a local contract, payroll, mandatory benefits and holiday rules you haven't run before, and no entity to run them through.

I speak to UK and Irish teams at exactly this point. Genuine question rather than a pitch: have you decided how you'll employ them yet? Entity, contractor agreement, or an employer of record?

If it's still open, I'm happy to walk you through how other teams your size have handled it. 15 minutes, and you can tell me if it's useless.

Ayo`,
      },
      {
        day: 4,
        subject: "Re: {{roleAbroad}} in {{countryAbroad}}",
        body: `Hi {{first}},

One useful thing, whatever you decide: before the offer goes out in {{countryAbroad}}, it's worth having four answers ready. What notice period and probation are standard there, which benefits are mandatory, when the payroll cut-off falls, and who signs the contract on your side.

Candidates tend to ask about at least two of them in the final round.

I've put those into a one-page checklist for {{countryAbroad}}. Want me to send it over? There's no call attached.

Ayo`,
      },
      {
        day: 9,
        subject: "Close the loop?",
        body: `Hi {{first}},

I'll leave it here so I'm not cluttering your inbox.

If the {{roleAbroad}} hire is already sorted, ignore me. If the timing's just wrong, reply "later" and I'll check back next quarter. If someone else owns this at {{company}}, a name is all I need.

Good luck with the search either way.

Ayo`,
      },
    ],
  },
  CONTRACT: {
    title: "Contractor-heavy teams",
    audience: "Finance and operations leads at UK/IE agencies, studios and software firms paying several overseas contractors through invoices and bank transfers.",
    angle: "Month-end is the pain they feel. Lead with the payments admin and leave classification risk as a second, quieter point.",
    touches: [
      {
        day: 1,
        subject: "{{contractorCount}} contractors, {{contractorCountries}} countries",
        body: `Hi {{first}},

Noticed {{company}} works with a sizeable contractor team abroad ({{detail}}).

Teams in that position usually tell me month-end is the painful bit: chasing invoices in different formats, paying transfer and FX fees on every one, and somebody in finance doing it all by hand.

How do you run contractor payments today? One batch, or one transfer at a time?

If it's the second, I can show you how similar teams get it down to a single monthly run. 15 minutes, no deck.

Ayo`,
      },
      {
        day: 4,
        subject: "Re: {{contractorCount}} contractors, {{contractorCountries}} countries",
        body: `Hi {{first}},

There's a second point I didn't want to lead with. When a contractor has worked for you full time for a year or two, on your tools and to your schedule, some countries can start to treat that relationship as employment.

It isn't a reason to panic. It is worth knowing which of your {{contractorCount}} contractors look most like employees on paper.

I can send a short self-check (five questions per contractor) that most finance teams finish in about 20 minutes. Interested?

Ayo`,
      },
      {
        day: 9,
        subject: "Last one from me",
        body: `Hi {{first}},

Last note from me on this.

If contractor payments at {{company}} already run smoothly, then I've got it wrong and I'll leave you be. If they're on the list for next quarter, reply "later" and I'll come back then.

If someone else owns it, point me their way and I'll keep it short.

Ayo`,
      },
    ],
  },
  EXPAND: {
    title: "New market entry",
    audience: "COOs, CFOs and people leads at UK/IE companies that have publicly announced a new country launch, office or partner.",
    angle: "They need people on the ground before an entity exists. Ask about sequencing, not software.",
    touches: [
      {
        day: 1,
        subject: "{{company}} in {{market}}",
        body: `Hi {{first}},

Congrats on the {{market}} news ({{detail}}).

Teams expanding from the UK and Ireland usually hit the same sequencing question early: do you set up a local entity first, or get the first people working in {{marketCity}} while you find out whether the market sticks?

How are you planning to approach it?

I talk to teams at this stage most weeks, so I can tell you what I've seen work. 15 minutes, whenever suits.

Ayo`,
      },
      {
        day: 4,
        subject: "Re: {{company}} in {{market}}",
        body: `Hi {{first}},

Something worth adding to the plan: setting up an entity in a new country can take months, and a first hire's start date often comes around sooner than that.

Teams that test a market first tend to employ their first two or three people through an employer of record, then move them onto their own payroll once the entity exists. It keeps the launch date in your hands.

Happy to sketch what that could look like for {{market}}, with rough timelines and the decision points. Useful?

Ayo`,
      },
      {
        day: 9,
        subject: "Leaving this here",
        body: `Hi {{first}},

I'll stop here. If the {{market}} plan is already covered, great, and good luck with the launch.

If it's further out than I assumed, reply "later" and I'll check in when you're closer to hiring. And if someone else is leading the expansion, I'd be grateful for a name.

Ayo`,
      },
    ],
  },
};

export function fillTemplate(text, a) {
  const vars = {
    first: a.contact.first,
    company: a.name,
    detail: a.detail,
    roleAbroad: a.roleAbroad,
    aRoleAbroad: a.roleAbroad && withArticle(a.roleAbroad),
    countryAbroad: a.countryAbroad,
    contractorCount: a.contractorCount,
    contractorCountries: a.contractorCountries,
    market: a.market,
    marketCity: a.marketCity,
  };
  return text.replace(/\{\{(\w+)\}\}/g, (m, k) => (vars[k] == null ? m : String(vars[k])));
}

// ---- Weekly operating rhythm (targets I set for myself; not results) ----
export const RHYTHM = [
  { day: "Mon", focus: "Build & score", blocks: [["08:30", "Pull new trigger signals: job ads abroad, expansion news, contractor footprints"], ["10:00", "Score and tier new accounts; drop anything under 60"], ["13:30", "Research the week's tier-A accounts: one personal line each"], ["16:00", "Load sequences, check merge fields by hand"]] },
  { day: "Tue", focus: "First touches", blocks: [["08:30", "Send day-1 emails to tier A (morning send window)"], ["10:00", "Call block 1: tier-A accounts that opened or replied"], ["14:00", "LinkedIn: connect and comment where the signal came from"], ["16:30", "Reply inside the hour; log every reply reason"]] },
  { day: "Wed", focus: "Follow-ups", blocks: [["08:30", "Day-4 touches go out"], ["10:00", "Call block 2"], ["13:30", "Tier-B research and first touches"], ["16:00", "Hand booked meetings to the AE with a written brief"]] },
  { day: "Thu", focus: "Calls & conversations", blocks: [["08:30", "Call block 3: best connect window for UK/IE SMB"], ["11:00", "Referral asks from 'not me' replies"], ["14:00", "Day-9 close-the-loop emails"], ["16:00", "Update CRM stages; no stale records"]] },
  { day: "Fri", focus: "Review & tune", blocks: [["09:00", "Funnel review: where did accounts stall this week?"], ["10:30", "Read every reply again, tag the objection, rewrite one line"], ["13:30", "Pipeline sync with the AE and manager"], ["15:00", "Pick next week's segment focus and swap the weakest subject line"]] },
];

export const WEEKLY_INPUTS = [
  { label: "New accounts researched & scored", target: "40" },
  { label: "Tier-A personalised first touches", target: "20" },
  { label: "Call blocks", target: "3 × 60 min" },
  { label: "Reply turnaround", target: "< 1 working hour" },
  { label: "Meetings handed to AE with written brief", target: "Every one" },
];
