-- Function-call receipt activity (not distinct human users).
-- Receipt cascades and bot activity can inflate this number.
-- Call 'active_contracts' = distinct receiver accounts of function-call receipts.
SELECT
  CAST(block_date AS STRING) AS date,
  COUNT(*) AS function_calls,
  COUNT(DISTINCT receipt_receiver_account_id) AS active_contracts
FROM `bigquery-public-data.crypto_near_mainnet_us.receipt_actions`
WHERE block_date BETWEEN DATE '2026-08-01' AND DATE '2026-11-04'
  AND action_kind = 'FUNCTION_CALL'
GROUP BY date
ORDER BY date ASC;
