"""Make a verifiable dashboard snapshot from independently exported CSVs.

Run from repo root: python scripts/build.py
No external dependencies. Missing fields remain null (never silently zero).
"""
from __future__ import annotations

import csv
from datetime import date, datetime, timezone
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
INPUTS = {
    "transactions": (ROOT / "data/transactions.csv", ("active_signers", "transactions")),
    "contracts": (ROOT / "data/contracts.csv", ("function_calls", "active_contracts")),
    "intents": (ROOT / "data/intents.csv", ("swap_volume_usd", "successful_swaps")),
}


def parse_csv(path: Path, fields: tuple[str, ...]):
    """Validate source rows; reject missing, duplicate, invalid or negative data."""
    out = {}
    with path.open(encoding="utf-8-sig", newline="") as fh:
        reader = csv.DictReader(fh)
        needed = {"date", *fields}
        if not needed.issubset(reader.fieldnames or []):
            raise ValueError(f"{path}: expected columns {sorted(needed)}")
        for row in reader:
            day = date.fromisoformat(row["date"].strip()).isoformat()
            if day in out:
                raise ValueError(f"{path}: duplicate date {day}")
            metrics = {}
            for field in fields:
                raw = row[field].strip()
                if raw == "":
                    raise ValueError(f"{path}: blank value on {day}: {field}")
                number = float(raw)
                if not (0 <= number < float("inf")):
                    raise ValueError(f"{path}: invalid nonnegative value {field}={raw}")
                if field != "swap_volume_usd" and not number.is_integer():
                    raise ValueError(f"{path}: {field} must be an integer")
                metrics[field] = round(number, 4) if field == "swap_volume_usd" else int(number)
            out[day] = metrics
    return out


def build_payload(base: Path = ROOT):
    inputs = {
        "transactions": (base / "data/transactions.csv", ("active_signers", "transactions")),
        "contracts": (base / "data/contracts.csv", ("function_calls", "active_contracts")),
        "intents": (base / "data/intents.csv", ("swap_volume_usd", "successful_swaps")),
    }
    sources = {name: path.exists() for name, (path, _) in inputs.items()}
    collected = {}
    for name, (path, fields) in inputs.items():
        if sources[name]:
            # The first executed BigQuery export is transaction-count only.
            # Never invent signer counts: allow partial verified columns.
            if name == "transactions":
                with path.open(encoding="utf-8-sig", newline="") as fh:
                    header = csv.DictReader(fh).fieldnames or []
                if "active_signers" not in header:
                    fields = ("transactions",)
            for day, metrics in parse_csv(path, fields).items():
                collected.setdefault(day, {}).update(metrics)
    full_fields = ["active_signers", "transactions", "function_calls", "active_contracts", "swap_volume_usd", "successful_swaps"]
    return {
        "snapshot_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sources": sources,
        "research_status": "Loaded CSV exports" if any(sources.values()) else "Awaiting verified exports. No values have been fabricated.",
        "rows": [{"date": day, **{key: collected[day].get(key) for key in full_fields}} for day in sorted(collected)],
    }


if __name__ == "__main__":
    payload = build_payload()
    output = ROOT / "web/data.json"
    output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {output} with {len(payload['rows'])} dated rows, sources: {payload['sources']}")
