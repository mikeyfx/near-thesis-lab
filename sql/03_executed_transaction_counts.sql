-- Executed by project participant in Google BigQuery on Nov 5, 2026.
-- Transaction counts only; no active signers or contracts measured.
-- Source: bigquery-public-data.crypto_near_mainnet_us.transactions
SELECT
  block_date,
  COUNT(*) AS transactions
FROM `bigquery-public-data.crypto_near_mainnet_us.transactions`
WHERE block_date >= DATE '2026-09-01'
  AND block_date < DATE '2026-11-01'
GROUP BY block_date
ORDER BY block_date;
