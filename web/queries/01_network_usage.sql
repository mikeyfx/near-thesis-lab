-- Data: NEAR Public Lakehouse via Google BigQuery
-- Counts the distinct onchain signer accounts per UTC day, NOT distinct humans.
-- Dates are limited to control query cost. Change range before running.
SELECT
  CAST(block_date AS STRING) AS date,
  COUNT(DISTINCT signer_account_id) AS active_signers,
  COUNT(*) AS transactions
FROM `bigquery-public-data.crypto_near_mainnet_us.transactions`
WHERE block_date BETWEEN DATE '2026-08-01' AND DATE '2026-11-04'
GROUP BY date
ORDER BY date ASC;
