# Frozen external data snapshot (retrieved 2026-11-05)

**Source:** https://defillama.com/protocol/near-intents — “NEAR Intents history”; method and month-end TVL tables; pages visited November 5, 2026. This CSV is a **manually transcribed, display-rounded snapshot** (NOT the full-precision downloadable API or a direct onchain query).

- Month column is UTC calendar month. All months here are *complete* through October 31, 2026. November is excluded as incomplete.
- Gross fees include the protocol and distributor / affiliate fee revenue; net revenue is the share attributed to NEAR’s wallets in the DefiLlama methodology.
- “Reported holders revenue” is DefiLlama’s **classification** of Intents revenue allocated to NEAR buybacks. It does **not** mean that NEAR was burned, distributed to stakers, or all existing NEAR holders received a cash distribution. The figures are not additional to net revenue.
- TVL is the month-end USD value in NEAR Intents Verifier across supported chains, **not** a count of users, and can move with token market prices. First row where TVL available is October 2025.
- Some data values are **rounded on the source website** ($2.5m etc.). Calculations using this snapshot inherit that rounding uncertainty; we display percentage changes to at most one decimal place.
- The upstream source may revise history. Use the source’s CSV/API for higher precision, then verify definitions and date ranges before replacing this snapshot.
- Additional context: NEAR tokenomics update: https://near.org/blog/evolving-near-tokenomics and https://near.org/blog/the-state-of-near-q-2-2026 ; independent risks: https://www.certik.com/blog/hot-bridge-near-intents ; alternate supply-value classification: https://app.blockworks.com/projects/near-protocol/analytics/near-financials .

**Important distinction (Nov 5 update):** The project participant supplied 61 verified daily BigQuery transaction counts (Sep–Oct 2026). The exact SQL, raw export, transformed CSV and monthly comparison are included; see `data/TRANSACTION_ANALYSIS.md`. Unique signers, contract calls and Intents 1Click volume remain unavailable and are displayed as missing, not zero. No invented onchain results are in this repository.
