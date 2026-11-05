# NEAR Thesis Lab — The Gap Between Volume and Value

**Track:** Investment Thesis · NEAR Hackathon 2026  
**Research freeze:** November 5, 2026  
**Status:** Preliminary economics thesis supplemented with **independently queried NEAR mainnet transaction counts (61 daily observations)**. Unique signers and contract breadth remain unmeasured.  
**Not financial advice.**

## 1. Investment question

Can NEAR Intents produce durable economic value for the NEAR token as more cross-chain activity is routed through it, even when market liquidity weakens?

## 2. Verdict — constructive, but conditional

**Preliminary assessment: the fee capture story is improving, but the long-term token-holder case is not yet proven.** Gross volumes alone are an unreliable proxy for the durable net economic benefits of NEAR Intents. NEAR is earning captured fees through Intents, and there is evidence of a governance-directed buyback mechanism; however, buybacks are not synonymous with burning tokens, and there are important unresolved questions about genuine user growth, network retention, issuance and security.

This project is a measurement tool, not a target price, probability forecast or recommendation to purchase NEAR.

## 3. Main observations (completed September and October 2026)

| Source-reported metric | September 2026 | October 2026 | Change |
|---|---:|---:|---:|
| Gross Intents fees | $7.33M | $6.39M | **−12.8%** |
| NEAR net captured Intents revenue | $1.84M | $2.19M | **+19.0%** |
| Net revenue / gross fees | 25.1% | 34.3% | **+9.2 percentage points** |
| Month-end Intents verifier TVL | $241.21M | $204.48M | **−15.2%** |

**Source:** DefiLlama NEAR Intents protocol page, monthly history and month-end TVL table, consulted 2026-11-05. https://defillama.com/protocol/near-intents . Figures are source-rounded; changes computed from these rounded displayed values and are therefore *approximate*.

### Interpretation

The September-to-October data **support the narrower claim** that NEAR's share of gross Intents fees grew, even as the reported overall fee pool and month-end locked value declined. This is a sign of improving monetization efficiency over a two-month comparison, **not** proof of growing activity, rising unique users, greater net token scarcity, a causal relationship, or a sustained long-term trend.

The economic capture rate is `net captured revenue / gross swap fees`. It should **not** be confused with `net revenue / total swap volume` (a different ratio, in basis points). *TVL is a month-end balance valued in USD and can fall solely due to market-price changes; it cannot be used to infer unique user loss without account-level data.*

## 3A. Independent onchain evidence: NEAR mainnet transactions

The participant executed a UTC-day count query against the **Google BigQuery public NEAR mainnet transactions table** and exported all 61 daily values for September–October 2026. The raw CSV, exact query, daily chart and summary are in this repository (`data/TRANSACTION_ANALYSIS.md`).

| Metric | September (30 days) | October (31 days) | Change |
|---|---:|---:|---:|
| Total onchain transactions | 24,004,533 | 22,627,935 | -5.7% |
| Average transactions per day | 800,151 | 729,933 | **-8.8%** |

**Finding:** The average daily number of transactions recorded on NEAR mainnet decreased about 8.8% between the two months, even while the separately reported NEAR Intents revenue increased ~19%. This is evidence that headline Intents economic capture and overall chain transaction count do not necessarily move together over the same short window. **It is not evidence of Intents-specific user churn or causal decoupling.** Intents may involve activity on multiple chains, and definitions/coverage differ.

**Important missing evidence:** This export contained `block_date,transactions` only. We have **not** measured unique active signers, contract usage, or which transactions are directly attributable to Intents. Any claim about broader adoption or unique users remains unverified.

## 4. Is there a token-value mechanism?

**Yes, with qualifications.** NEAR's official 24 February 2026 tokenomics statement confirms the Intents fee switch and indicates that captured proceeds can be used for buybacks and other governance-directed treasury activity. https://near.org/blog/evolving-near-tokenomics

DefiLlama's “holders revenue” classification records buyback-designated value beginning in February 2026. This is **a subset/classification** of net captured revenue, **not a second revenue stream to add on top**. In March–October 2026, the source reports amounts under both protocol revenue and “holders revenue.” https://defillama.com/protocol/near-intents

**Caution:** Independent analysis by Blockworks reports that bought-back NEAR held in `buybacks.multisignature.near` remains part of the total token supply. NEAR L1 fee burns *do* remove supply; buybacks *alone* do not. https://app.blockworks.com/projects/near-protocol/analytics/near-financials

The first-party dashboard at https://revenue.near.org/ includes language about removing NEAR from circulation. We distinguish **reduced circulating liquidity** from **permanent destruction of total supply**, and refrain from claiming a buyback burn without a verifiable burn record. Management discretion, wallet accounting and timing must be tracked.

## 5. Evidence FOR the investment hypothesis

1. NEAR's 2026 Intents revenue capture mechanism is documented by first-party materials and supported by an independent analytics methodology. Source: https://near.org/blog/evolving-near-tokenomics ; https://defillama.com/protocol/near-intents
2. **Revenue capture improved sharply in October:** net revenue / fees increased from 25.1% to 34.3%, while absolute captured revenue grew approximately 19.0% month-on-month (rounded-source data).
3. A funded buyback mechanism gives a tangible possible demand channel for the NEAR token, rather than relying solely on NEAR network transaction fees. However, the size and persistence of demand need ongoing verification. Source: https://app.blockworks.com/projects/near-protocol/analytics/near-financials

## 6. Evidence AGAINST / material risks

1. **Gross fees and TVL decreased** across September to October (−12.8% and −15.2%, respectively). Improved captured revenue could arise from a better fee split rather than greater demand or usage.
2. **Buybacks do not equal burns.** Supply issuance can outweigh network fee burns, and governance-directed held tokens might later be moved. Specific net-supply impact is **not measured** in this prototype.
3. **Security:** CertiK independently analyzed a HOT Omni Bridge / NEAR Intents-related exploit around 30 September 2026 involving around $3.86 million in BSC treasury payouts. Whether funds were subsequently returned does not erase the underlying operational/integration risk. Source: https://www.certik.com/blog/hot-bridge-near-intents
4. **Network transaction counts fell.** Our BigQuery-derived daily average transaction count was ~8.8% lower in October than September. We still cannot infer unique users, activity attributable to Intents, contract breadth, or causal network adoption.
5. **Confidential and aggregator coverage differ.** NEAR Intents Explorer 1Click data can exclude confidential or other Intent flows. DefiLlama protocol revenue, cross-chain volume, Intents volume, and chain-level transactions should not be mixed without verifying definitions and time ranges.
6. Most of the visible comparison spans just two months, and market-price changes affect TVL. This is insufficient evidence for a lasting long-term advantage.

## 7. Key tests and falsification criteria

| Question | Test | Present state | Interpretation if failed |
|---|---|---|---|
| Does demand broaden? | Query total transactions and distinct daily NEAR signers | **Transactions queried for 61 days; signers NOT queried** | Revenue concentration may not equal broad adoption |
| Is the app ecosystem broadening? | Query daily distinct receipt receivers and function calls | **Not run** | Growth may depend on few operators/contracts |
| Does protocol value increase sustainably? | Compare monthly net revenue and capture rate across periods | **Observed:** improved Sept→Oct | A subsequent capture-rate reversal would weaken monetization thesis |
| Does revenue produce net token scarcity? | Track verified buyback wallet flows, network fee burns and gross NEAR issuance separately | **Incomplete** | Buyback demand may not offset issuance; buys are not burns |
| Is growth operationally durable? | Examine post-incident usage and publicly reported remediation | **Open** | Continued exploits or withdrawal pauses weaken quality of revenue |

**What would change the conclusion?** A durable multi-month increase in verified unique signers and application breadth, alongside rising net Intents revenue, independently auditable buyback flows and a stronger net supply/issuance picture, would strengthen it. Declining fee capture, poor user retention, unaddressed bridge security issues or dilution outweighing buyback demand would weaken it. If BigQuery results contradict aggregator data, the conclusion must be revised.

## 8. Reproducibility & source registry

**Loaded snapshot:** `data/defillama_monthly_snapshot.csv`, transcribed from the publicly displayed historical table on 2026-11-05 (see `data/SOURCE_NOTES.md`). Excludes incomplete November month. 18 complete monthly rows, May 2025–October 2026. See `scripts/build_protocol.py` for automatic validation, rate calculations and JSON rebuild. Values labelled in USD, source-rounded.

**Executed onchain transaction query and remaining planned queries:**

- `sql/03_executed_transaction_counts.sql` is the **participant-executed**, export-backed September–October daily transaction count query. Raw and normalized exports are in `data/`; results are reflected in `web/data.json`. See `data/TRANSACTION_ANALYSIS.md`.
- `sql/01_network_usage.sql` is an **unexecuted** extended query that would query `bigquery-public-data.crypto_near_mainnet_us.transactions` and calculates daily unique `signer_account_id` plus total transaction count.
- `sql/02_contract_activity.sql` is also **unexecuted** and would query `bigquery-public-data.crypto_near_mainnet_us.receipt_actions` and calculates function-call receipts and distinct receiver accounts.
- These extended queries filter `block_date` to limit costs. Their optional signer/contract results should not be confused with the executed transaction-only query.
- Intents Explorer API https://docs.near-intents.org/integration/distribution-channels/1click-api/explorer/introduction requires partner JWT for the planned API-backed 1Click daily data; no credentials were supplied and no direct pull was performed.

**Security and tokenomics:** [CertiK exploit analysis](https://www.certik.com/blog/hot-bridge-near-intents), [official NEAR February 2026 tokenomics](https://near.org/blog/evolving-near-tokenomics), [NEAR Q2 2026](https://near.org/blog/the-state-of-near-q-2-2026), [Blockworks on buyback versus burn](https://app.blockworks.com/projects/near-protocol/analytics/near-financials).

**Reason to remain cautious:** The revenue snapshot is not itself a BigQuery/onchain extraction. A real 61-day NEAR mainnet **transaction count** export now supports the network chart; however, this is not a full first-party adoption study, because unique signers, contract activity and Intents-specific flows are still unmeasured.
