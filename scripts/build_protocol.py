"""Build protocol economics chart from a sourced, frozen CSV. No third-party dependencies.

A snapshot is not a live API integration. The CSV and SOURCE_NOTES.md are provenance.
"""
import csv, json, math
from datetime import datetime, timezone
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'data/defillama_monthly_snapshot.csv'
OUTPUT = ROOT/'web/protocol.json'
FIELDS = ['gross_fees_usd','net_revenue_usd','reported_holders_revenue_usd','month_end_tvl_usd']

def build():
    with SOURCE.open(newline='',encoding='utf-8') as f:
        items = list(csv.DictReader(f))
    if not items:
        raise ValueError('No snapshots')
    seen = set(); rows = []
    for item in items:
        month=item['month']
        datetime.strptime(month,'%Y-%m')
        if month in seen: raise ValueError('Duplicate month: '+month)
        seen.add(month)
        vals={}
        for name in FIELDS:
            raw=(item.get(name) or '').strip()
            if not raw:
                vals[name]=None;continue
            value=float(raw)
            if not math.isfinite(value) or value<0: raise ValueError('Invalid metric: '+name)
            vals[name]=value
        if vals['net_revenue_usd'] is not None and vals['gross_fees_usd'] is not None and vals['net_revenue_usd']>vals['gross_fees_usd']:
            raise ValueError('Net revenue exceeds gross fees on '+month)
        if vals['reported_holders_revenue_usd'] is not None and vals['net_revenue_usd'] is not None and vals['reported_holders_revenue_usd']>vals['net_revenue_usd']:
            raise ValueError('Reported holder revenue exceeds net revenue on '+month)
        rows.append({'month':month,**vals,'capture_rate_pct':100*vals['net_revenue_usd']/vals['gross_fees_usd'] if vals['gross_fees_usd'] else None})
    rows.sort(key=lambda r:r['month'])
    complete=[r for r in rows if r['month']<='2026-10']
    sep=next(x for x in complete if x['month']=='2026-09')
    octo=next(x for x in complete if x['month']=='2026-10')
    def delta(k): return 100*(octo[k]/sep[k]-1)
    data={
       'source_url':'https://defillama.com/protocol/near-intents',
       'source_note':'Displayed, rounded historical table transcribed November 5, 2026; complete UTC months to October 2026. Not live and not a direct BigQuery result.',
       'snapshot_utc':'2026-11-05',
       'rows':complete,
       'findings':{
          'oct_2026_gross_fees_usd':octo['gross_fees_usd'],
          'oct_2026_revenue_usd':octo['net_revenue_usd'],
          'oct_2026_tvl_usd':octo['month_end_tvl_usd'],
          'sep_2026_capture_pct':sep['capture_rate_pct'],
          'oct_2026_capture_pct':octo['capture_rate_pct'],
          'revenue_mom_pct':delta('net_revenue_usd'),
          'fees_mom_pct':delta('gross_fees_usd'),
          'tvl_mom_pct':delta('month_end_tvl_usd'),
          'holders_classification_notice':'Reported holders revenue is a buyback classification, not a burn or a cash distribution.',
       }
    }
    OUTPUT.write_text(json.dumps(data,indent=2)+'\n',encoding='utf-8')
    return data

if __name__=='__main__':
    data=build(); print(f"Saved {OUTPUT} with {len(data['rows'])} complete monthly observations")
