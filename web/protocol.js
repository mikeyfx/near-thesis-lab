(() => {
  const $=id=>document.getElementById(id);
  const defs={
    net_revenue_usd:{title:'Monthly captured revenue',legend:'NEAR Intents net captured revenue • UTC calendar month',fmt:'usd'},
    gross_fees_usd:{title:'Monthly gross swap fees',legend:'Gross fees include distributor and affiliate fees',fmt:'usd'},
    month_end_tvl_usd:{title:'Month-end verifier TVL',legend:'Month-end value locked, price-sensitive and not a user metric',fmt:'usd'},
    capture_rate_pct:{title:'Net revenue / gross fees',legend:'Reported net capture rate; based on source-rounded values',fmt:'pct'},
  };
  let rows=[],field='net_revenue_usd',range=6;
  const fmt=(v,type='usd')=>!Number.isFinite(v)?'—':type==='pct'?v.toFixed(1)+'%':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',notation:'compact',maximumFractionDigits:2}).format(v);
  const signed=v=>(v>=0?'+':'')+v.toFixed(1)+'%';
  const safe=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  function graph(){
    const data=range==='all'?rows:rows.slice(-range);
    const points=data.filter(x=>Number.isFinite(x[field]));
    $('econ-chart-title').textContent=defs[field].title;
    $('econ-legend').textContent=defs[field].legend;
    $('econ-window-label').textContent=`${points.length} MONTHS • 2026-11-05 SNAPSHOT`;
    if(points.length<2){$('econ-chart-wrap').innerHTML='<div class="empty-chart">Not enough published observations for this metric.</div>';return;}
    const W=980,H=265,L=70,R=20,T=16,B=43, max=Math.max(...points.map(p=>p[field]))*1.1 || 1, chartH=H-T-B, chartW=W-L-R;
    const x=i=>L+i*chartW/(points.length-1),y=v=>T+(1-v/max)*chartH;
    const d=points.map((p,i)=>`${i?'L':'M'}${x(i).toFixed(2)},${y(p[field]).toFixed(2)}`).join(' ');
    const tick=[0,1,2,3,4].map(i=>{const val=max*(1-i/4),yy=T+chartH*i/4;return `<line x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}" class="grid"/><text x="${L-10}" y="${yy+4}" class="axis" text-anchor="end">${safe(fmt(val,defs[field].fmt))}</text>`;}).join('');
    const picks=[0,Math.floor((points.length-1)/2),points.length-1];
    const labels=picks.map(i=>`<text x="${x(i)}" y="${H-9}" class="axis" text-anchor="middle">${safe(points[i].month)}</text>`).join('');
    const hits=points.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p[field])}" r="10" fill="transparent"><title>${safe(p.month)}: ${safe(fmt(p[field],defs[field].fmt))}</title></circle>`).join('');
    $('econ-chart-wrap').innerHTML=`<svg class="chart-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${safe(defs[field].title)}: ${points.length} published monthly observations"><defs><linearGradient id="econFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#c7f593" stop-opacity=".28"/><stop offset="100%" stop-color="#c7f593" stop-opacity="0"/></linearGradient></defs>${tick}<path d="${d} L${x(points.length-1)} ${H-B} L${L} ${H-B} Z" class="econ-area"/><path d="${d}" class="econ-line"/>${labels}${hits}</svg>`;
  }
  for(const button of document.querySelectorAll('.econ-metric')) button.addEventListener('click',()=>{document.querySelectorAll('.econ-metric').forEach(b=>b.classList.remove('active'));button.classList.add('active');field=button.dataset.field;graph();});
  for(const button of document.querySelectorAll('.econ-range')) button.addEventListener('click',()=>{document.querySelectorAll('.econ-range').forEach(b=>b.classList.remove('active'));button.classList.add('active');range=button.dataset.range==='all'?'all':Number(button.dataset.range);graph();});
  fetch('protocol.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{
    rows=Array.isArray(data.rows)?data.rows:[];rows.sort((a,b)=>a.month.localeCompare(b.month));
    const f=data.findings||{};
    $('econ-fees').textContent=fmt(f.oct_2026_gross_fees_usd);
    $('econ-revenue').textContent=fmt(f.oct_2026_revenue_usd);
    $('econ-capture').textContent=fmt(f.oct_2026_capture_pct,'pct');
    $('econ-tvl').textContent=fmt(f.oct_2026_tvl_usd);
    $('rev-change').textContent=signed(f.revenue_mom_pct)+' vs September';
    $('capture-change').textContent=fmt(f.sep_2026_capture_pct,'pct')+' in September';
    $('tvl-change').textContent=signed(f.tvl_mom_pct)+' vs September';
    $('evidence-one').textContent=`October fees ${signed(f.fees_mom_pct)}, captured revenue ${signed(f.revenue_mom_pct)}, and month-end TVL ${signed(f.tvl_mom_pct)} versus September. More fee capture despite less gross activity.`;
    graph();
  }).catch(err=>{$('econ-chart-wrap').innerHTML=`<div class="empty-chart">Data snapshot unavailable: ${safe(err.message)}</div>`});
})();
