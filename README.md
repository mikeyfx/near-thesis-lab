# NEAR Thesis Lab · The Gap Between Volume and Value

**NEAR Hackathon 2026 — Investment Thesis track** · Evidence-first research project

**[Open the live dashboard](https://mikeyfx.github.io/near-thesis-lab/)** · [Read the thesis](THESIS.md) · [View demo images](submission-assets/)

Does growth in NEAR Intents create durable economic value for the NEAR token? We compare published revenue, fees, capture efficiency, and locked value with 61 independently queried daily NEAR mainnet transaction counts. Unique signers, contract breadth, and Intents-specific transaction attribution remain unmeasured.

## What works right now

- Fully functioning static research dashboard with **18 sourced monthly observations (May 2025–Oct 2026)** from DefiLlama public history.
- Interactive monthly charts: gross fees, NEAR-captured revenue, month-end TVL and fee capture percentage, with six-month, twelve-month or all-time ranges.
- Computed Sep→Oct changes, published methodology, counterarguments and safety risk disclosure.
- Onchain network section with **61 real daily NEAR mainnet transaction counts (Sep–Oct 2026)** from the participant’s executed BigQuery query. Other metrics (unique signers, contracts and 1Click volume) remain unknown, not zero.
- Data lineage, validation, tests, and a **one-command** dashboard build.

## How to run locally (no npm required)

The dashboard can be viewed **without Python** using VS Code Live Server on `web/index.html`. Python 3.9+ is needed only to recompute JSON from CSVs. On **Windows**, double-click `START_HERE_WINDOWS.bat`, or use these commands from the project directory:

```bash
python scripts/build_all.py
python -m unittest discover -s tests -v
python -m http.server 8000 --directory web
```

Then visit **http://localhost:8000/** (not `file:///...`). The economics charts are populated with frozen, source-rounded data and the **network transactions** chart is populated from a participant-executed, validated BigQuery export. Signers, contract activity and Intents-specific daily volume remain empty, as no such export has been provided.

### Reproducing data

- Original monthly spreadsheet: [`data/defillama_monthly_snapshot.csv`](data/defillama_monthly_snapshot.csv)
- Provenance and rounding: [`data/SOURCE_NOTES.md`](data/SOURCE_NOTES.md)
- Economics pipeline: [`scripts/build_protocol.py`](scripts/build_protocol.py)
- Computed dashboard JSON: [`web/protocol.json`](web/protocol.json)
- Investment analysis and falsification: [`THESIS.md`](THESIS.md)

Economics rebuild is reproducible from the **provided frozen public-history transcription**, but not automatically re-fetched from upstream or onchain. To obtain full-precision values in the future, check DefiLlama's downloadable CSV/API and validate metric definitions before replacing the snapshot.

## Executed BigQuery transaction analysis and optional enhancements

The official track asks for actual network-level SQL tests. **The participant ran one transaction-count query**, supplying a 61-row export:

1. Executed query: `sql/03_executed_transaction_counts.sql`, output preserved as `data/bq-results-20261105-223933-1793918407307.csv`, processed into `data/transactions.csv` and `web/data.json`. Analysis: `data/TRANSACTION_ANALYSIS.md`.
2. For optional signer/contract work, open [NEAR Public BigQuery](https://docs.near.org/data-infrastructure/big-query). Verify that the tables/columns in the two queries still exist.
3. Preview cost / bytes billed and restrict `block_date`.
4. Execute `sql/01_network_usage.sql` (requires BigQuery access), save its extended CSV as `data/transactions.csv` **only if it includes real signer counts**; this overwrites the current transaction-only export, so keep the original raw file.
5. Execute `sql/02_contract_activity.sql`, save CSV `data/contracts.csv`.
6. Rebuild with `python scripts/build_all.py` and reopen the page. Loaded series are labelled transparently.

Optional daily 1Click totals: only import if obtained via a licensed/authorized Explorer source; store `data/intents.csv` with columns `date,swap_volume_usd,successful_swaps`. The 1Click API can require a partner JWT and cannot be assumed to reflect confidential Intents.

*Sample CSV schema:* current transaction counts only: `date,transactions`; optional extended network query: `date,active_signers,transactions`; contracts: `date,function_calls,active_contracts`. Missing metrics stay null.

## Publication

The site is entirely static and included under `web/`. GitHub Pages deploy workflow: `.github/workflows/pages.yml`. Push to a **public GitHub repository**, turn on GitHub Pages → Source: GitHub Actions; the Actions workflow publishes the `web` directory. Screenshot locally or from the deployed dashboard. Finalize the repository + X demo post, then submit on [near.army](https://near.army/) by **Nov 14, 2026 at 23:59 UTC**.

See [`SUBMISSION.md`](SUBMISSION.md) for handoff, draft submission text, and demo walkthrough. This project contains no wallet credentials or private API tokens.

## Sources

1. Official track: https://github.com/nearai/near-hackathon-prompt-examples/blob/main/tracks/02-thesis.md
2. Public metrics: https://defillama.com/protocol/near-intents
3. Official tokenomics: https://near.org/blog/evolving-near-tokenomics
4. Token supply/accounting interpretation: https://app.blockworks.com/projects/near-protocol/analytics/near-financials
5. Independent security analysis: https://www.certik.com/blog/hot-bridge-near-intents
6. NEAR BigQuery: https://docs.near.org/data-infrastructure/big-query

**Limitations:** A decline in mainnet transaction count is not evidence of Intents-specific user loss; public rounded snapshots are not proof of unique-user adoption; wallet buybacks are not burns; observations do not imply causality or future token returns. Research, not investment advice.
