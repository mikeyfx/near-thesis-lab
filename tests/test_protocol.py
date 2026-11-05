import sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from build_protocol import build
class PublishedEconomicsTests(unittest.TestCase):
    def test_snapshot_has_only_completed_months(self):
        d=build();self.assertEqual(len(d['rows']),18)
        self.assertEqual(d['rows'][-1]['month'],'2026-10')
        self.assertNotIn('2026-11',[x['month'] for x in d['rows']])
    def test_october_values_and_ratios(self):
        d=build();f=d['findings']
        self.assertEqual(f['oct_2026_revenue_usd'],2190000)
        self.assertAlmostEqual(f['oct_2026_capture_pct'],34.27230046948357)
        self.assertAlmostEqual(f['revenue_mom_pct'],19.02173913043479)
        self.assertLess(f['tvl_mom_pct'],0)
    def test_no_unsupported_human_user_metric(self):
        d=build(); self.assertNotIn('unique_users',d['findings'])
if __name__=='__main__':unittest.main()
