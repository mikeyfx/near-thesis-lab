# One-day completion and submission handoff

## Confirmed hackathon obligations

Official page: https://near.army/  
Track: `Investment Thesis`  
Deadline: **2026-11-14 23:59 UTC** (12:59 AM Nigeria time on Nov 15).  
Required fields: project name, team lead, email, team size, tracks, **NEAR wallet address**, public GitHub URL, public X demo post URL, 20–2,000 character project description, and consent to review/contact. The official API documentation identifies `website` as a spam trap: leave it empty and include the deployed dashboard link in the description and X post instead. No wallet connection is required; a NEAR account address must be entered for potential prize payout. Do not paste a secret phrase or private key anywhere.

## Publication checklist

- [x] Extract the ZIP and run `python scripts/build_all.py`, then `python -m http.server 8000 --directory web`.
- [x] Verified the live dashboard, economics metric buttons, time filters, missing-data behavior, and downloadable sources.
- [x] **One real BigQuery export collected:** 61 days of Sep–Oct 2026 NEAR mainnet transaction counts, validated and plotted. Independent unique signers, contract use, and Intents attribution are not measured. Additional SQL is optional but would strengthen the submission.
- [x] Published the complete project at https://github.com/mikeyfx/near-thesis-lab and verified every uploaded file against the local source.
- [x] Enabled GitHub Actions for Pages and verified the live dashboard: https://mikeyfx.github.io/near-thesis-lab/
- [x] Prepared four demo images in `submission-assets/`; screenshots can accompany the hosted dashboard. A video walkthrough is optional.
- [ ] Make a public X demo post tagging `@NEARProtocol`, using `#NEARHackathon`, attaching video/screenshots, and including GitHub and website links. Copy X URL.
- [ ] Submit via https://near.army/ with repo + X URL and your NEAR account address. Enter actual contact info yourself. **Submit once**, then use the site's change-request option if corrections are needed.

## X demo post — ready to publish

NEAR Intents captured more revenue in October while fees and TVL fell. What actually improved?

I built NEAR Thesis Lab for @NEARProtocol’s #NEARHackathon to investigate.

September → October 2026, using DefiLlama’s published, rounded figures:

• Captured revenue: $1.84M → $2.19M (+19.0%)
• Gross fees: $7.33M → $6.39M (−12.8%)
• Month-end TVL: $241.21M → $204.48M (−15.2%)
• Revenue / fees: 25.1% → 34.3%

I also queried 61 days of NEAR mainnet transactions. Daily average activity fell 8.8% across the same months.

Those datasets measure different things. This does not establish Intents-specific user loss or causality. Unique signers and Intents attribution remain unmeasured.

My provisional take: fee capture improved, but the long-term token-value case still needs stronger adoption and supply evidence. Buybacks alone are not burns.

The dashboard lets you switch metrics and time ranges. SQL, CSVs, build scripts, tests, sources and counterarguments are public.

Try it: https://mikeyfx.github.io/near-thesis-lab/
Code + thesis: https://github.com/mikeyfx/near-thesis-lab

What would you test next to strengthen or challenge this thesis?

## Demo script (60–90 seconds)

0–12s: “NEAR Intents volume is a headline. What matters is how much economic value actually reaches NEAR. I built a research dashboard to test that distinction.”

12–32s: Show fees and revenue chart, September versus October. “Gross fees fell around 13%, but captured revenue rose around 19%. That pushes capture efficiency from roughly 25% to 34%.”

32–48s: Show TVL tab. “Month-end TVL also declined about 15%. A change in fee share is not the same as growth in users. The dashboard keeps those questions separate.”

48–63s: Show the research section. “There is a buyback channel, but bought tokens aren't necessarily burned. We also consider the bridge incident and token issuance.”

63–77s: Show BigQuery transactions chart and methods. “I ran an independent query of 61 days of NEAR mainnet transactions. The daily average fell 8.8% from September to October. This does not count unique users or directly identify Intents transactions. Query, raw CSV, transformations and research notes are public.”

77–90s: “My verdict: improving monetization is encouraging, but long-term NEAR value capture needs more evidence. This is NEAR Thesis Lab.”

## Submission description (under 2,000 characters)

NEAR Thesis Lab is a reproducible, evidence-first research dashboard exploring whether NEAR Intents produces meaningful economic value for the NEAR token rather than merely generating high transaction volume. It visualizes 18 completed months of DefiLlama’s published Intents revenue and fee history, month-end TVL (when available), and the captured-revenue-to-gross-fees ratio. It computes interpretable September–October 2026 changes: net captured revenue rose ~19.0% even as gross fees fell ~12.8% and month-end TVL fell ~15.2%. An independently executed BigQuery query supplies 61 NEAR mainnet daily transaction counts (Sept 1–Oct 31, 2026); the daily average fell ~8.8% month over month. The research notebook documents fee capture, buybacks versus burns, security risk, and the limits of cross-dataset inference. The repository includes the original query and exported CSV, processing scripts, tests, and responsive dashboard. Unique signers, contract activity, and Intents-specific transactions remain unmeasured. The provisional thesis is cautiously constructive on fee capture, but does not claim causal user growth or guaranteed token price appreciation. Public sources and limitations are disclosed throughout.

## Final warning

The project now includes a **real executed NEAR mainnet transaction-count query and export** alongside third-party protocol economics. Do not describe unique signers, contract use, or Intents-specific activity as verified; those studies have not been executed.
