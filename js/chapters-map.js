/* ============================================================
   ASAAL — Interactive Chapter Map (v2)
   Click-to-select interaction. No hover preview, no flicker.
   NYC cluster expands into spider layout.
   Depends on global window.d3, window.topojson, window.ASAAL_CHAPTERS
   ============================================================ */
(function () {
  'use strict';

  // FIPS → USPS state code map
  const FIPS_TO_USPS = {
    "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE","11":"DC","12":"FL",
    "13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME",
    "24":"MD","25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH",
    "34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
    "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV","55":"WI","56":"WY"
  };

  // Geo + details per chapter (merged into window.ASAAL_CHAPTERS).
  // President / members / founded are placeholders — replace via Claude Code when real data is ready.
  const CHAPTER_GEO = {
    'Queens_committee':          { lng: -73.79,  lat: 40.73,  members: '850+', founded: 2009, president: 'To be announced', city: 'Queens, NY' },
    'Bronx_committee':           { lng: -73.86,  lat: 40.84,  members: '350+', founded: 2011, president: 'To be announced', city: 'Bronx, NY' },
    'Brooklyn_committee':        { lng: -73.95,  lat: 40.65,  members: '620+', founded: 2010, president: 'To be announced', city: 'Brooklyn, NY' },
    'Manhatt_committee':         { lng: -73.97,  lat: 40.78,  members: '410+', founded: 2010, president: 'To be announced', city: 'Manhattan, NY' },
    'Jackson-Heights_committee': { lng: -73.88,  lat: 40.755, members: '540+', founded: 2012, president: 'To be announced', city: 'Jackson Heights, NY' },
    'Richmond-Hill_committee':   { lng: -73.83,  lat: 40.695, members: '470+', founded: 2013, president: 'To be announced', city: 'Richmond Hill, NY' },
    'Ozone-Park_committee':      { lng: -73.845, lat: 40.679, members: '320+', founded: 2015, president: 'To be announced', city: 'Ozone Park, NY' },
    'Long-Island_committee':     { lng: -73.20,  lat: 40.79,  members: '290+', founded: 2014, president: 'To be announced', city: 'Long Island, NY' },
    'NY-Capital_committee':      { lng: -73.76,  lat: 42.65,  members: '180+', founded: 2016, president: 'To be announced', city: 'Albany, NY' },
    'New-Jeresy_committee':      { lng: -74.27,  lat: 40.55,  members: '540+', founded: 2010, president: 'To be announced', city: 'New Jersey' },
    'Peensylvenia_committee':    { lng: -75.16,  lat: 39.95,  members: '380+', founded: 2014, president: 'To be announced', city: 'Philadelphia, PA' },
    'US-Capital_committee':      { lng: -77.04,  lat: 38.90,  members: '260+', founded: 2017, president: 'To be announced', city: 'Washington, DC' },
    'Maryland_committee':        { lng: -76.62,  lat: 39.29,  members: '320+', founded: 2018, president: 'To be announced', city: 'Baltimore, MD' },
    'VIRGINIA_committee':        { lng: -77.11,  lat: 38.88,  members: '290+', founded: 2019, president: 'To be announced', city: 'Arlington, VA' },
    'Georgia_committee':         { lng: -84.39,  lat: 33.75,  members: '410+', founded: 2016, president: 'To be announced', city: 'Atlanta, GA' },
    'Florida_committe':          { lng: -82.46,  lat: 27.95,  members: '280+', founded: 2018, president: 'To be announced', city: 'Tampa, FL' },
    'Houston_Texas_committee':   { lng: -95.37,  lat: 29.76,  members: '210+', founded: 2023, president: 'To be announced', city: 'Houston, TX', chapterType: 'new' },
    'Michigan_committee':        { lng: -83.05,  lat: 42.33,  members: '250+', founded: 2017, president: 'To be announced', city: 'Detroit, MI' },
    'LOS-ANGELES_committee':     { lng: -118.24, lat: 34.05,  members: '380+', founded: 2019, president: 'To be announced', city: 'Los Angeles, CA' },
    'HCP_committee':             { lng: null,    lat: null,   members: '480+', founded: 2024, president: 'To be announced', city: 'National · Healthcare', chapterType: 'new' }
  };

  const FUTURE_CHAPTERS = [
    { id: 'future-IL', name: 'Chicago',        city: 'Chicago, IL',     lng: -87.65, lat: 41.85, status: 'In formation · 2026' },
    { id: 'future-MA', name: 'Boston',         city: 'Boston, MA',      lng: -71.06, lat: 42.36, status: 'In formation · 2026' },
    { id: 'future-NC', name: 'North Carolina', city: 'Raleigh, NC',     lng: -78.64, lat: 35.78, status: 'Planned' },
    { id: 'future-KS', name: 'Kansas',         city: 'Wichita, KS',     lng: -97.34, lat: 37.69, status: 'Planned' },
    { id: 'future-LA', name: 'Louisiana',      city: 'New Orleans, LA', lng: -90.07, lat: 29.95, status: 'Planned' },
    { id: 'future-MO', name: 'Missouri',       city: 'St. Louis, MO',   lng: -90.20, lat: 38.63, status: 'Planned' }
  ];

  const CONNECTION_LINES = [
    ['Queens_committee',         'New-Jeresy_committee'],
    ['New-Jeresy_committee',     'Peensylvenia_committee'],
    ['Peensylvenia_committee',   'US-Capital_committee'],
    ['US-Capital_committee',     'Maryland_committee'],
    ['US-Capital_committee',     'VIRGINIA_committee'],
    ['Queens_committee',         'Michigan_committee'],
    ['Michigan_committee',       'Georgia_committee'],
    ['Georgia_committee',        'Florida_committe'],
    ['Georgia_committee',        'Houston_Texas_committee'],
    ['Houston_Texas_committee',  'LOS-ANGELES_committee']
  ];

  // Cluster definitions — dense metros where markers would overlap
  const CLUSTERS = [{
    id: 'NYC',
    label: 'NYC Metro',
    centroid: { lng: -73.92, lat: 40.74 },
    chapterIds: [
      'Manhatt_committee',
      'Brooklyn_committee',
      'Queens_committee',
      'Bronx_committee',
      'Jackson-Heights_committee',
      'Richmond-Hill_committee',
      'Ozone-Park_committee'
    ],
    spiderRadius: 46
  }];

  // -------- State ----------
  const STATE = { selectedId: null, expandedClusterId: null };
  let projection;
  let topology;

  // -------- Helpers ----------
  function svgEl(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function starPath(cx, cy, spikes, outerR, innerR) {
    const step = Math.PI / spikes;
    let rot = -Math.PI / 2;
    let path = `M${cx + Math.cos(rot) * outerR},${cy + Math.sin(rot) * outerR}`;
    for (let i = 0; i < spikes; i++) {
      rot += step;
      path += `L${cx + Math.cos(rot) * innerR},${cy + Math.sin(rot) * innerR}`;
      rot += step;
      path += `L${cx + Math.cos(rot) * outerR},${cy + Math.sin(rot) * outerR}`;
    }
    return path + 'Z';
  }
  function getCluster(chapterId) {
    return CLUSTERS.find(c => c.chapterIds.includes(chapterId)) || null;
  }
  function spiderPosition(cluster, idx) {
    const n = cluster.chapterIds.length;
    const angle = (2 * Math.PI / n) * idx - Math.PI / 2;
    const center = projection([cluster.centroid.lng, cluster.centroid.lat]);
    return [
      center[0] + Math.cos(angle) * cluster.spiderRadius,
      center[1] + Math.sin(angle) * cluster.spiderRadius
    ];
  }
  function getChapterMarkerPos(chapter) {
    const cluster = getCluster(chapter.id);
    if (cluster) {
      if (cluster.id !== STATE.expandedClusterId) return null;
      return spiderPosition(cluster, cluster.chapterIds.indexOf(chapter.id));
    }
    if (chapter.lng == null || chapter.lat == null) return null;
    return projection([chapter.lng, chapter.lat]);
  }
  function enrichChapters() {
    if (!window.ASAAL_CHAPTERS) return;
    window.ASAAL_CHAPTERS.forEach(c => {
      const geo = CHAPTER_GEO[c.id];
      if (geo) Object.assign(c, geo);
    });
  }

  // -------- Rendering ----------
  function renderMarkers() {
    const dotsG = document.getElementById('markers-group');
    if (!dotsG) return;
    dotsG.innerHTML = '';

    // 1. Spider spokes (background) when cluster expanded
    if (STATE.expandedClusterId) {
      const cluster = CLUSTERS.find(c => c.id === STATE.expandedClusterId);
      const center = projection([cluster.centroid.lng, cluster.centroid.lat]);
      cluster.chapterIds.forEach((id, i) => {
        const [ex, ey] = spiderPosition(cluster, i);
        dotsG.appendChild(svgEl('line', {
          class: 'cluster-spoke',
          x1: center[0], y1: center[1], x2: ex, y2: ey
        }));
      });
    }

    // 2. Cluster badges (collapsed clusters only)
    CLUSTERS.forEach(cluster => {
      if (cluster.id === STATE.expandedClusterId) return;
      const xy = projection([cluster.centroid.lng, cluster.centroid.lat]);
      if (!xy) return;
      const [x, y] = xy;
      const g = svgEl('g', {
        class: 'chapter-cluster',
        transform: `translate(${x},${y})`,
        tabindex: '0',
        role: 'button',
        'aria-label': cluster.chapterIds.length + ' chapters in ' + cluster.label + '. Click to expand.'
      });
      g.appendChild(svgEl('circle', { class: 'chapter-cluster__halo', r: '22' }));
      g.appendChild(svgEl('circle', { class: 'chapter-cluster__dot',  r: '15' }));
      const text = svgEl('text', {
        class: 'chapter-cluster__count',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        y: '0.5'
      });
      text.textContent = cluster.chapterIds.length;
      g.appendChild(text);
      g.addEventListener('click', e => {
        e.stopPropagation();
        STATE.expandedClusterId = cluster.id;
        STATE.selectedId = null;
        hideCard();
        renderMarkers();
      });
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
      });
      dotsG.appendChild(g);
    });

    // 3. Individual chapter markers
    window.ASAAL_CHAPTERS.forEach(c => {
      const pos = getChapterMarkerPos(c);
      if (!pos) return;
      const [x, y] = pos;
      const isNew = c.chapterType === 'new';
      const isSelected = STATE.selectedId === c.id;
      const cluster = getCluster(c.id);
      const inSpider = cluster && cluster.id === STATE.expandedClusterId;

      const g = svgEl('g', {
        class: 'chapter-marker' +
               (isNew ? ' chapter-marker--new' : ' chapter-marker--active') +
               (isSelected ? ' is-selected' : '') +
               (inSpider ? ' chapter-marker--spider' : ''),
        transform: `translate(${x},${y})`,
        'data-chapter-id': c.id,
        tabindex: '0',
        role: 'button',
        'aria-label': c.name + ' chapter' + (isSelected ? ' (selected)' : ''),
        'aria-pressed': isSelected ? 'true' : 'false'
      });

      // Static selection halo
      if (isSelected) {
        g.appendChild(svgEl('circle', { class: 'chapter-marker__halo', r: '13' }));
      }

      if (isNew) {
        g.appendChild(svgEl('path', { class: 'chapter-marker__dot chapter-marker__star', d: starPath(0, 0, 5, 7.5, 3.3) }));
      } else {
        g.appendChild(svgEl('circle', { class: 'chapter-marker__dot', r: inSpider ? '5.5' : '5' }));
      }

      const handleSelect = (e) => {
        if (e) e.stopPropagation();
        STATE.selectedId = c.id;
        renderMarkers();
        showCard(c, x, y);
      };
      g.addEventListener('click', handleSelect);
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(); }
      });
      dotsG.appendChild(g);
    });

    // 4. Future markers
    FUTURE_CHAPTERS.forEach(f => {
      const xy = projection([f.lng, f.lat]);
      if (!xy) return;
      const [x, y] = xy;
      const isSelected = STATE.selectedId === f.id;
      const g = svgEl('g', {
        class: 'chapter-marker chapter-marker--future' + (isSelected ? ' is-selected' : ''),
        transform: `translate(${x},${y})`,
        tabindex: '0',
        role: 'button',
        'aria-label': f.city + ' future chapter',
        'aria-pressed': isSelected ? 'true' : 'false'
      });
      if (isSelected) g.appendChild(svgEl('circle', { class: 'chapter-marker__halo', r: '13' }));
      g.appendChild(svgEl('circle', { class: 'chapter-marker__dot', r: '6' }));

      const data = { id: f.id, name: f.name, city: f.city, status: f.status, _future: true };
      const handleSelect = (e) => {
        if (e) e.stopPropagation();
        STATE.selectedId = f.id;
        renderMarkers();
        showCard(data, x, y);
      };
      g.addEventListener('click', handleSelect);
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(); }
      });
      dotsG.appendChild(g);
    });

    // 5. Cluster center close button (when expanded)
    if (STATE.expandedClusterId) {
      const cluster = CLUSTERS.find(c => c.id === STATE.expandedClusterId);
      const center = projection([cluster.centroid.lng, cluster.centroid.lat]);
      const g = svgEl('g', {
        class: 'cluster-close',
        transform: `translate(${center[0]},${center[1]})`,
        tabindex: '0',
        role: 'button',
        'aria-label': 'Collapse ' + cluster.label + ' cluster'
      });
      g.appendChild(svgEl('circle', { class: 'cluster-close__bg', r: '11' }));
      g.appendChild(svgEl('path', { class: 'cluster-close__icon', d: 'M-4,-4 L4,4 M4,-4 L-4,4' }));
      g.addEventListener('click', e => {
        e.stopPropagation();
        STATE.expandedClusterId = null;
        STATE.selectedId = null;
        hideCard();
        renderMarkers();
      });
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
      });
      dotsG.appendChild(g);
    }
  }

  function clearAll() {
    STATE.selectedId = null;
    STATE.expandedClusterId = null;
    hideCard();
    renderMarkers();
  }

  // -------- Card ----------
  function showCard(c, sx, sy) {
    const popup = document.getElementById('chapter-popup');
    if (!popup) return;
    const isMobile = window.innerWidth <= 760;
    const isFuture = c._future;

    const subLine = isFuture
      ? 'Coming soon'
      : (c.region || 'ASAAL') + ' · ' + (c.city || c.state || '');

    const body = isFuture
      ? `<p class="popup-body">${c.status || ''}</p>
         <p class="popup-body" style="font-size:12px; color: rgba(255,255,255,.55); margin-top:8px;">Volunteers wanted. Help us launch this chapter.</p>
         <a class="popup-cta" href="index.html#contact">Get involved <span>→</span></a>`
      : `<dl class="popup-dl">
           <dt>President</dt><dd>${c.president || 'TBA'}</dd>
           <dt>Members</dt><dd>${c.members || '—'}</dd>
           <dt>Founded</dt><dd>${c.founded || '—'}</dd>
           <dt>Focus</dt><dd>${c.lead || '—'}</dd>
         </dl>
         <a class="popup-cta" href="${c.anchor || ('chapter.html?id=' + c.id)}">View chapter <span>→</span></a>`;

    popup.innerHTML = `
      <button class="popup-close" type="button" aria-label="Close">×</button>
      <div class="popup-header">
        <img class="popup-seal" src="img/asaalLogo.png" alt="">
        <div>
          <div class="popup-sub">${subLine}</div>
          <h4 class="popup-title">ASAAL ${c.name}${isFuture ? '' : ' Chapter'}</h4>
        </div>
      </div>
      ${body}
    `;
    popup.querySelector('.popup-close').addEventListener('click', e => {
      e.stopPropagation();
      clearAll();
    });

    popup.classList.add('is-on');

    if (!isMobile) {
      // Measure after paint, then position
      requestAnimationFrame(() => positionCard(popup, sx, sy));
    } else {
      // mobile: CSS handles position as bottom sheet
      popup.style.left = '';
      popup.style.top = '';
    }
  }

  function positionCard(popup, sx, sy) {
    const svg = document.getElementById('us-map-svg');
    const wrap = document.querySelector('.us-map-wrap');
    if (!svg || !wrap) return;
    const svgRect = svg.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const scaleX = svgRect.width / 960;
    const scaleY = svgRect.height / 600;
    const relX = sx * scaleX + (svgRect.left - wrapRect.left);
    const relY = sy * scaleY + (svgRect.top - wrapRect.top);

    const cardRect = popup.getBoundingClientRect();
    const cardW = cardRect.width || 300;
    const cardH = cardRect.height || 220;
    const gap = 24;
    const margin = 14;
    const maxW = wrapRect.width;
    const maxH = wrapRect.height;

    let left, top, placement;

    // Prefer right placement
    if (relX + gap + cardW <= maxW - margin) {
      left = relX + gap;
      top  = relY - cardH / 2;
      placement = 'right';
    } else if (relX - gap - cardW >= margin) {
      // Then left
      left = relX - gap - cardW;
      top  = relY - cardH / 2;
      placement = 'left';
    } else if (relY - gap - cardH >= margin) {
      // Then above
      left = Math.max(margin, Math.min(maxW - cardW - margin, relX - cardW / 2));
      top  = relY - gap - cardH;
      placement = 'top';
    } else {
      // Then below
      left = Math.max(margin, Math.min(maxW - cardW - margin, relX - cardW / 2));
      top  = relY + gap;
      placement = 'bottom';
    }
    top = Math.max(margin, Math.min(maxH - cardH - margin, top));

    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';
    popup.setAttribute('data-placement', placement);
  }

  function hideCard() {
    const popup = document.getElementById('chapter-popup');
    if (popup) popup.classList.remove('is-on');
  }

  // -------- Outside click + Esc ----------
  function setupGlobalHandlers() {
    const wrap = document.querySelector('.us-map-wrap');
    if (!wrap) return;

    // Inside map but not on a marker/cluster/popup → clear
    wrap.addEventListener('click', e => {
      if (e.target.closest('.chapter-marker'))  return;
      if (e.target.closest('.chapter-cluster')) return;
      if (e.target.closest('.cluster-close'))   return;
      if (e.target.closest('#chapter-popup'))   return;
      if (STATE.selectedId || STATE.expandedClusterId) clearAll();
    });

    // Outside the map entirely → close
    document.addEventListener('click', e => {
      if (e.target.closest('.us-map-wrap')) return;
      if (STATE.selectedId || STATE.expandedClusterId) clearAll();
    });

    // Esc → close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && (STATE.selectedId || STATE.expandedClusterId)) {
        clearAll();
      }
    });

    // Reposition card on resize
    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        if (!STATE.selectedId) return;
        const c = window.ASAAL_CHAPTERS.find(x => x.id === STATE.selectedId);
        const f = !c ? FUTURE_CHAPTERS.find(x => x.id === STATE.selectedId) : null;
        const target = c || f;
        if (!target) return;
        const pos = c ? getChapterMarkerPos(c) : projection([f.lng, f.lat]);
        if (pos) positionCard(document.getElementById('chapter-popup'), pos[0], pos[1]);
      }, 120);
    });
  }

  // -------- Init ----------
  async function renderMap() {
    enrichChapters();
    const svg = document.getElementById('us-map-svg');
    if (!svg) return;
    const statesG = svg.querySelector('#states-group');
    const linesG  = svg.querySelector('#connections-group');
    const loadingEl = document.getElementById('map-loading');

    try {
      const r = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
      if (!r.ok) throw new Error('fetch failed');
      topology = await r.json();
    } catch (e) {
      console.warn('us-atlas load failed:', e);
      if (loadingEl) loadingEl.textContent = 'Could not load map data. Please refresh.';
      return;
    }
    if (!window.d3 || !window.topojson) return;

    const states = topojson.feature(topology, topology.objects.states);
    projection = d3.geoAlbersUsa().scale(1280).translate([480, 305]);
    const pathGen = d3.geoPath(projection);

    const chapterStates = new Set();
    window.ASAAL_CHAPTERS.forEach(c => { if (c.state && c.state !== '—') chapterStates.add(c.state); });

    statesG.innerHTML = '';
    states.features.forEach(feature => {
      const usps = FIPS_TO_USPS[String(feature.id).padStart(2,'0')];
      const d = pathGen(feature);
      if (!d) return;
      const p = svgEl('path', {
        d,
        class: 'state' + (chapterStates.has(usps) ? ' has-chapter' : ''),
        'data-state': usps || ''
      });
      statesG.appendChild(p);
    });

    // Connection lines — route via cluster centroid for clustered endpoints
    linesG.innerHTML = '';
    CONNECTION_LINES.forEach(([fromId, toId], i) => {
      const a = window.ASAAL_CHAPTERS.find(c => c.id === fromId);
      const b = window.ASAAL_CHAPTERS.find(c => c.id === toId);
      if (!a || !b) return;
      const ca = getCluster(fromId), cb = getCluster(toId);
      if (ca && cb && ca.id === cb.id) return; // skip cluster-internal
      const pos = (ch, id) => {
        const cl = getCluster(id);
        return cl ? projection([cl.centroid.lng, cl.centroid.lat]) :
                    (ch.lng != null ? projection([ch.lng, ch.lat]) : null);
      };
      const p1 = pos(a, fromId);
      const p2 = pos(b, toId);
      if (!p1 || !p2) return;
      const mx = (p1[0] + p2[0]) / 2;
      const my = (p1[1] + p2[1]) / 2 - Math.abs(p1[0] - p2[0]) * 0.18;
      const path = svgEl('path', {
        d: `M${p1[0]},${p1[1]} Q${mx},${my} ${p2[0]},${p2[1]}`,
        class: 'connection-line'
      });
      path.style.animationDelay = (i * 0.6) + 's';
      linesG.appendChild(path);
    });

    renderMarkers();
    setupGlobalHandlers();
    if (loadingEl) loadingEl.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderMap, 50);
  });
})();
