# Independently queried NEAR mainnet transaction counts — September vs October 2026

## Evidence and reproducibility
- Original source: Google BigQuery public dataset `bigquery-public-data.crypto_near_mainnet_us.transactions`.
- User-executed query date: 2026-11-05, observed in the BigQuery results UI. 61 daily rows exported as `bq-results-20261105-223933-1793918407307.csv`.
- Exact SQL preserved: `sql/03_executed_transaction_counts.sql`.
- Original file included under `data/`; normalized data under `data/transactions.csv` (the date column is renamed to `date` for the dashboard).
- Dashboard-ready static export under `web/transactions-source.csv`.
- UTC calendar dates Sept 1–Oct 31, 2026; count of records from **transactions** table.

## Month comparison

| Metric | September (30 days) | October (31 days) |
|---|---:|---:|
| Total transactions | 24,004,533 | 22,627,935 |
| Average daily transactions | 800,151.1 | 729,933.4 |
| Change in total | n/a | -5.73% |
| Change in daily average | n/a | -8.78% |

The daily average is the appropriate month-length-adjusted comparison. Across these two months, average daily NEAR transactions decreased about 8.8%. However, the previously recorded DefiLlama snapshot reports that NEAR Intents captured revenue increased over the same period. This juxtaposition is not proof of divergence in the same user cohort: Intents revenue can come from cross-chain activity whose ledger coverage differs from NEAR mainnet transaction counts.

## Limits
- The export contains **transaction counts only**: `active_signers`, contract breadth, daily Intents USD, human users, retention, and transactions attributable specifically to Intents are **not measured**.
- This observational 2-month comparison does not support cause-effect claims or long-term forecasts.
- The exported data are user-provided and have been validated for complete date coverage, uniqueness, and nonnegative integer counts. We did not execute a second independent BigQuery retrieval in this environment.
