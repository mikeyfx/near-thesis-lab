# NEAR Thesis Lab — Work-mode publishing brief

## Objective
Finish publishing and submit the Investment Thesis entry to https://near.army/ by 2026-11-14 23:59 UTC. The project is already created, tested, and packaged. Prioritize actual actions over more research.

## Files
Project: `near-thesis-lab/` in this ZIP. Dashboard: `web/index.html`; 61-day exported onchain dataset in `data/`; all build/reproduction files in repo. Screenshot/chart assets under `submission-assets/`. The complete draft for X, project description, and demo script are in `SUBMISSION.md`.

## Required workflow
1. Unpack attached ZIP and inspect README.md, THESIS.md, SUBMISSION.md. Do not claim unique signer or Intents-specific onchain transactions were measured.
2. With user's authorization, publish entire `near-thesis-lab` folder as public GitHub repository `near-thesis-lab` in **their** GitHub account. Never store credentials in repo. Do not upload the ZIP as a sole file: upload the extracted contents preserving folders and `.github/workflows/pages.yml`.
3. Under repository Settings → Pages, configure Source = GitHub Actions. Verify deployed site actually loads and analytics charts are visible; capture public URL. If deploy is blocked or unsupported, explain and present the exact next on-device action.
4. Prepare X demo post using source-backed Sep–Oct comparisons. Attach `submission-assets/01_onchain_transactions.png`, `02_monthly_comparison.png`, and any available dashboard screenshots; mention `@NEARProtocol` and `#NEARHackathon` and that it was built for the NEAR hackathon. Include actual public GitHub URL and site URL. Publish only with user's authorization and valid authenticated X access. Capture post permalink.
5. Submit project once on https://near.army/ with exact name NEAR Thesis Lab, Investment Thesis track, solo team (if appropriate), correct real contact email, NEAR payout account address, public GitHub URL, public X demo post URL, and the description in SUBMISSION.md. The user must provide/authorize personal identifiers if not available. NEVER invent email, wallet address or repository/post links. NEVER request a seed phrase or private key.
6. Verify submission confirmation and share actual links. If an account action is blocked, clearly state it and minimize necessary user steps.

## Quality and provenance notes
The repo includes executed NEAR BigQuery transaction counts for 61 days and publicly sourced monthly NEAR Intents economics data, both labeled with limitations. September daily average 800,151, October 729,933 (8.8% decline). Avoid suggesting falling NEAR transactions proves a causal change in NEAR Intents usage or NEAR token price. No additional BigQuery research is necessary before submitting; main priority is publishing.
