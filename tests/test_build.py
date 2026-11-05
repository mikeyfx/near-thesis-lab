import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from build import build_payload, parse_csv

class PipelineTests(unittest.TestCase):
    def test_empty_sources_means_no_fake_values(self):
        with tempfile.TemporaryDirectory() as tmp:
            self.assertEqual(build_payload(Path(tmp))["rows"], [])

    def test_merge_and_missing_values_remain_none(self):
        with tempfile.TemporaryDirectory() as tmp:
            data = Path(tmp) / "data"
            data.mkdir()
            (data / "transactions.csv").write_text("date,active_signers,transactions\n2026-11-01,11,21\n", encoding="utf-8")
            result = build_payload(Path(tmp))
            self.assertEqual(result["rows"][0]["active_signers"], 11)
            self.assertIsNone(result["rows"][0]["swap_volume_usd"])

    def test_real_transaction_only_export_does_not_invent_signers(self):
        with tempfile.TemporaryDirectory() as tmp:
            data = Path(tmp) / "data"
            data.mkdir()
            (data / "transactions.csv").write_text("date,transactions\n2026-10-01,1151492\n", encoding="utf-8")
            result = build_payload(Path(tmp))
            self.assertEqual(result["rows"][0]["transactions"], 1151492)
            self.assertIsNone(result["rows"][0]["active_signers"])

    def test_duplicates_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "input.csv"
            path.write_text("date,active_signers,transactions\n2026-11-01,2,4\n2026-11-01,3,5\n")
            with self.assertRaises(ValueError):
                parse_csv(path, ("active_signers", "transactions"))

    def test_negative_numbers_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "input.csv"
            path.write_text("date,active_signers,transactions\n2026-11-01,-2,4\n")
            with self.assertRaises(ValueError):
                parse_csv(path, ("active_signers", "transactions"))

if __name__ == "__main__":
    unittest.main()
