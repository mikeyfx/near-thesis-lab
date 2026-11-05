(() => {
  const definitions = {
    active_signers: { label: 'Active signer trend', legend: 'Daily unique signer accounts', format: 'int' },
    transactions: { label: 'Daily transaction trend', legend: 'Onchain transactions per day', format: 'int' },
    active_contracts: { label: 'Distinct called contracts', legend: 'Unique FUNCTION_CALL receiver accounts per day', format: 'int' },
    swap_volume_usd: { label: 'NEAR Intents 1Click volume', legend: 'USD input volume for verified successful public 1Click swaps', format: 'usd' },
  };
  let rows = [];
  let field = 'transactions';
  let range = 90;
  const $ = (id) => document.getElementById(id);
  const fmt = (v, type = 'int') => {
    if (v === null || v === undefined || !Number.isFinite(v)) return '—';
    if (type === 'usd') return '$' + Intl.NumberFormat('en-US', {notation:'compact',maximumFractionDigits:2}).format(v);
    return Intl.NumberFormat('en-US', {notation:'compact',maximumFractionDigits:1}).format(v);
  };
  const safe = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  function visibleRows() {
    if (!rows.length || range === 'all') return rows;
    const latest = new Date(rows.at(-1).date + 'T00:00:00Z');
    const cutoff = new Date(latest);
    cutoff.setUTCDate(cutoff.getUTCDate() - (Number(range) - 1));
    return rows.filter(r => new Date(r.date + 'T00:00:00Z') >= cutoff);
  }
  function chartMarkup(data, metric) {
    const width = 980, height = 265, left = 62, right = 20, top = 16, bottom = 40;
    const points = data.filter(r => Number.isFinite(r[metric]));
    if (points.length < 2) return null;
    let min = Math.min(...points.map(p => p[metric]));
    let max = Math.max(...points.map(p => p[metric]));
    min = Math.max(0, min * 0.85);
    if (max === min) max += Math.max(1, max * 0.1);
    const usableH = height - top - bottom, usableW = width - left - right;
    const y = (value) => top + usableH * (1-(value - min)/(max-min));
    const x = (i) => left + usableW * i / (points.length - 1);
    const path = points.map((point,i) => `${i?'L':'M'}${x(i).toFixed(2)},${y(point[metric]).toFixed(2)}`).join(' ');
    const bottomY = height-bottom;
    const area = `${path} L${x(points.length-1)},${bottomY} L${left},${bottomY} Z`;
    const ticks = [0,1,2,3,4].map(i => {
      const v = min + (max-min)*(1-i/4);
      const yy = top + usableH * i/4;
      return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="grid"/><text class="axis" x="${left-10}" y="${yy+4}" text-anchor="end">${safe(fmt(v,definitions[metric].format))}</text>`;
    }).join('');
    const xLabels = [0,Math.floor((points.length-1)/2),points.length-1].map(i => `<text class="axis" x="${x(i)}" y="${height-8}" text-anchor="middle">${safe(points[i].date)}</text>`).join('');
    const circles = points.map((p,i) => `<circle cx="${x(i)}" cy="${y(p[metric])}" r="8" fill="transparent"><title>${safe(p.date)}: ${safe(fmt(p[metric],definitions[metric].format))}</title></circle>`).join('');
    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safe(definitions[metric].label)} graph with ${points.length} verified days"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#c7f593" stop-opacity=".20"/><stop offset="100%" stop-color="#c7f593" stop-opacity="0"/></linearGradient></defs>${ticks}<path class="area" d="${area}"/><path class="line" d="${path}"/>${xLabels}${circles}</svg>`;
  }
  function update() {
    const selected = visibleRows();
    const metric = definitions[field];
    $('chart-title').textContent = metric.label;
    $('legend').textContent = metric.legend;
    const content = chartMarkup(selected, field);
    const validCount = selected.filter(r => Number.isFinite(r[field])).length;
    $('window-label').textContent = `${validCount} OBSERVED DAYS • ${range==='all'?'ALL TIME':range+'D'} WINDOW`;
    $('chart-wrap').innerHTML = content || `<div class="empty-chart"><div class="empty-icon">⌁</div><strong>${validCount ? 'Not enough observations to chart' : 'No verified observations for this metric'}</strong><span>Import matching UTC-day CSV exports and rebuild data.json. Missing values are never silently replaced with zero.</span></div>`;
    for (const [metric, id, type] of [['active_signers','stat-signers','int'],['transactions','stat-tx','int'],['active_contracts','stat-contracts','int'],['swap_volume_usd','stat-intents','usd']]) {
      const latest = [...selected].reverse().find(r => Number.isFinite(r[metric]));
      $(id).textContent = latest ? fmt(latest[metric],type) : '—';
      $(id).title = latest ? `Last observation: ${latest.date}` : 'No verified observation';
    }
  }
  document.querySelectorAll('.metric').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.metric').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); field = b.dataset.field; update();
  }));
  document.querySelectorAll('.range').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.range').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); range = b.dataset.range === 'all' ? 'all' : Number(b.dataset.range); update();
  }));
  fetch('data.json', {cache:'no-store'}).then(r => {if (!r.ok) throw Error('HTTP '+r.status); return r.json();}).then(data => {
    rows = Array.isArray(data.rows) ? data.rows : [];
    rows.sort((a,b) => a.date.localeCompare(b.date));
    $('data-status').textContent = rows.length ? 'ONCHAIN TRANSACTION DATA VERIFIED' : 'ONCHAIN NETWORK SERIES PENDING';
    $('updated').textContent = (rows.length ? 'Snapshot created: ' : 'Empty snapshot • ') + (data.snapshot_utc || 'not yet generated');
    for (const name of ['transactions','contracts','intents']) {
      const label = $('source-'+name);
      const loaded = !!data.sources?.[name];
      label.textContent = loaded ? (name === 'transactions' && rows.every(r => r.active_signers === null) ? 'TX COUNTS LOADED' : 'LOADED') : 'NOT LOADED';
      label.classList.toggle('loaded',loaded);
    }
    update();
  }).catch(err => {
    $('data-status').textContent = 'DATA FILE UNAVAILABLE';
    $('updated').textContent = 'Error loading data.json: '+err.message;
    update();
  });
})();
