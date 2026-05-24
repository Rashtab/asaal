/* ============================================================
   ASAAL — Events Hub interactions
   Pure vanilla JS. Reads from window.ASAAL_EVENTS_DATA and
   window.ASAAL_CHAPTERS (loaded earlier).
   ============================================================ */
(function () {
  'use strict';

  const D = window.ASAAL_EVENTS_DATA;
  if (!D) { console.warn('events-data missing'); return; }

  const CATS_BY_KEY = Object.fromEntries(D.CATEGORIES.map(c => [c.key, c]));
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // ---------- helpers ---------------------------------------
  function parseDate(s) {
    // Use local time (no UTC shift); avoids off-by-one in EST/PST
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  function fmtDay(s)   { const dt = parseDate(s); return dt.getDate(); }
  function fmtMonth(s) { const dt = parseDate(s); return MONTH_SHORT[dt.getMonth()].toUpperCase(); }
  function fmtYear(s)  { return parseDate(s).getFullYear(); }
  function fmtWeekday(s){ return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][parseDate(s).getDay()]; }
  function fmtDateLong(s) {
    const dt = parseDate(s);
    return `${MONTH_NAMES[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
  }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
      else if (k === 'class') e.className = attrs[k];
      else if (k.startsWith('data-')) e.setAttribute(k, attrs[k]);
      else if (k in e) e[k] = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  // ---------- 1. HERO MAP -----------------------------------
  // Hand-tuned dot positions for lower-48 silhouette.
  const HERO_DOTS = [
    // bottom row
    [142,408],[182,422],[222,434],[262,440],[302,442],[342,440],[382,442],[422,438],[462,432],[502,420],[540,422],[580,424],[620,420],[660,418],[700,415],[745,418],[790,422],[836,432],[880,442],[920,448],[960,448],[990,442],
    // mid-low (TX/AZ/NM/CA)
    [120,378],[160,388],[200,394],[240,400],[280,404],[320,402],[360,394],[400,388],[440,388],[480,400],[520,408],[560,404],[600,400],[640,400],[680,398],[720,398],[760,396],[800,400],[840,408],[880,410],[920,412],
    // central US
    [130,332],[170,332],[210,330],[250,326],[290,322],[330,322],[370,326],[410,330],[450,338],[490,346],[530,348],[570,346],[610,340],[650,332],[690,326],[730,322],[770,322],[810,326],[850,330],[890,334],[930,338],
    [128,294],[168,288],[208,284],[248,278],[288,276],[328,278],[368,282],[408,288],[448,294],[488,302],[528,310],[568,316],[608,318],[648,318],[688,318],[728,316],[768,314],[808,318],[848,322],[888,326],[928,330],
    // upper mid
    [134,250],[174,246],[214,240],[254,236],[294,234],[334,236],[374,240],[414,244],[454,248],[494,256],[534,266],[574,272],[614,274],[654,274],[694,274],[734,274],[774,274],[814,278],[854,282],[894,288],
    // north
    [148,210],[188,204],[228,200],[268,198],[308,196],[348,200],[388,204],[428,212],[468,218],[508,228],[548,236],[588,240],[628,244],[668,244],[708,244],[748,244],[788,246],[828,250],[868,256],[908,262],
    // top
    [180,170],[220,166],[260,164],[300,166],[340,170],[380,176],[420,184],[460,192],[500,200],[540,210],[580,216],[620,220],[660,220],[700,220],[740,220],[780,222],[820,226],
    // FL spur
    [820,468],[838,488],[856,500],[860,520],[850,540],[840,520],
    // NY tail
    [970,318],[988,330],[1000,344]
  ];
  // Coarse city positions (approximate to lower-48 svg viewbox 1200x600)
  const HERO_CITIES = [
    {x: 996, y: 268, c: 'red'},   // NYC region
    {x: 980, y: 282, c: 'red'},   // NJ
    {x: 950, y: 296, c: 'blue'},  // Philly
    {x: 930, y: 320, c: 'blue'},  // DC
    {x: 938, y: 312, c: 'blue'},  // Baltimore
    {x: 870, y: 408, c: 'red'},   // Atlanta
    {x: 858, y: 470, c: 'blue'},  // Tampa FL
    {x: 590, y: 462, c: 'blue'},  // Houston TX
    {x: 800, y: 264, c: 'blue'},  // Detroit MI
    {x: 192, y: 286, c: 'red'}    // LA
  ];

  function renderHeroMap() {
    const dotsG = document.getElementById('evhero-dots');
    const citG  = document.getElementById('evhero-cities');
    if (!dotsG || !citG) return;

    HERO_DOTS.forEach(([x,y]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('class','dot');
      c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 2.2);
      dotsG.appendChild(c);
    });

    HERO_CITIES.forEach((city, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      const pulse = document.createElementNS('http://www.w3.org/2000/svg','circle');
      pulse.setAttribute('class', 'pulse' + (city.c === 'red' ? ' is-red' : ''));
      pulse.setAttribute('cx', city.x); pulse.setAttribute('cy', city.y); pulse.setAttribute('r', 14);
      pulse.style.animationDelay = (i * 0.4) + 's';
      g.appendChild(pulse);

      const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('class', 'city' + (city.c === 'red' ? ' is-red' : ''));
      dot.setAttribute('cx', city.x); dot.setAttribute('cy', city.y); dot.setAttribute('r', 3.6);
      g.appendChild(dot);

      citG.appendChild(g);
    });
  }

  // ---------- 2. COUNTDOWN ----------------------------------
  function startCountdown() {
    // 18th National Convention: Jul 18, 2026 · 2 PM local (Eastern)
    const target = new Date('2026-07-18T14:00:00-04:00').getTime();
    const dEl = document.getElementById('cd-d'),
          hEl = document.getElementById('cd-h'),
          mEl = document.getElementById('cd-m'),
          sEl = document.getElementById('cd-s');
    if (!dEl) return;
    function tick() {
      let diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000); diff -= days * 86400000;
      const hrs  = Math.floor(diff / 3600000);  diff -= hrs * 3600000;
      const mins = Math.floor(diff / 60000);    diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);
      dEl.textContent = String(days).padStart(2,'0');
      hEl.textContent = String(hrs).padStart(2,'0');
      mEl.textContent = String(mins).padStart(2,'0');
      sEl.textContent = String(secs).padStart(2,'0');
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---------- 3. CATEGORIES ---------------------------------
  function renderCategories() {
    const grid = document.getElementById('cats-grid');
    if (!grid) return;
    // Compute event counts per category
    const counts = {};
    D.EVENTS.forEach(e => { counts[e.category] = (counts[e.category]||0) + 1; });

    D.CATEGORIES.forEach(cat => {
      const link = document.createElement('a');
      link.className = 'cat';
      link.href = '#upcoming';
      link.style.setProperty('--cat-color', cat.color);
      link.style.setProperty('--cat-tint',  cat.tint);
      link.dataset.cat = cat.key;
      link.innerHTML = `
        <div class="cat__mark">${cat.symbol}</div>
        <div class="cat__head">
          <span class="cat__eyebrow">${cat.eyebrow}</span>
          <span class="cat__count"><strong>${counts[cat.key] || 0}</strong> upcoming</span>
        </div>
        <h3 class="cat__title">${cat.label}</h3>
        <p class="cat__summary">${cat.summary}</p>
        <ul class="cat__items">
          ${cat.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
      `;
      link.addEventListener('click', e => {
        // Click on category navigates to upcoming and filters
        const filterBtn = document.querySelector(`.upfilter[data-filter="${cat.key}"]`);
        if (filterBtn) {
          e.preventDefault();
          document.querySelector('#upcoming').scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => filterBtn.click(), 350);
        }
      });
      grid.appendChild(link);
    });

    // CTA tile
    const cta = document.createElement('a');
    cta.className = 'cat cat--cta';
    cta.href = '../form.html';
    cta.innerHTML = `
      <h3 class="cat__title">Propose an event</h3>
      <p class="cat__summary">Chapter organizing something new? Submit it — we'll promote it across the network.</p>
      <span class="evcard__chip is-featured" style="margin-top: var(--s-2);">For members</span>
    `;
    grid.appendChild(cta);
  }

  // ---------- 4. UPCOMING EVENTS ----------------------------
  const UPCOMING_INITIAL = 9;
  const UPCOMING_STEP = 6;
  let upcomingFilter = 'all';
  let upcomingShown = UPCOMING_INITIAL;

  function getUpcoming() {
    const now = Date.now();
    return D.EVENTS
      .filter(e => parseDate(e.date).getTime() >= now - 86400000)
      .sort((a,b) => parseDate(a.date) - parseDate(b.date));
  }

  function eventCardHTML(e) {
    const cat = CATS_BY_KEY[e.category] || {};
    const chips = [];
    if (e.featured)   chips.push('<span class="evcard__chip is-featured">★ Featured</span>');
    if (e.soldOut)    chips.push('<span class="evcard__chip is-sold">Sold out</span>');
    if (e.audience === 'invite')  chips.push('<span class="evcard__chip is-invite">By invitation</span>');
    if (e.audience === 'members') chips.push('<span class="evcard__chip is-members">Members only</span>');
    if (e.audience === 'public')  chips.push('<span class="evcard__chip is-public">Public</span>');

    const card = document.createElement('article');
    card.className = 'evcard';
    card.dataset.cat = e.category;
    card.dataset.featured = e.featured ? '1' : '0';
    card.style.setProperty('--cat-color', cat.color);
    card.style.setProperty('--cat-tint', cat.tint);
    card.innerHTML = `
      <div class="evcard__top">
        <div class="evcard__date">
          <div class="m">${fmtMonth(e.date)}</div>
          <div class="d">${fmtDay(e.date)}</div>
          <div class="y">${fmtYear(e.date)}</div>
        </div>
        <div>
          <div class="evcard__cat">${cat.eyebrow || e.category}</div>
          <div class="evcard__chap">${e.chapter || 'National'}</div>
        </div>
        ${chips[0] || ''}
      </div>
      <div class="evcard__body">
        <h3 class="evcard__title">${e.title}</h3>
        <div class="evcard__where">
          <span>${e.venue}</span>
          <span class="sep"></span>
          <span>${e.city}${e.state ? ', '+e.state : ''}</span>
          <span class="sep"></span>
          <span>${e.time}</span>
        </div>
        <p class="evcard__blurb">${e.blurb}</p>
      </div>
      <div class="evcard__foot">
        ${e.soldOut
          ? '<a class="btn btn--ghost btn--sm" data-disabled>Waitlist</a>'
          : (e.audience === 'invite'
              ? '<a class="btn btn--ghost btn--sm" href="'+(e.detailUrl||'#')+'">View invitation</a>'
              : '<a class="btn btn--primary btn--sm" href="'+(e.registerUrl||'../form.html')+'">Register</a>'
            )
        }
        <button class="btn btn--ghost btn--sm" data-evdetails>Details</button>
      </div>
    `;
    card.querySelector('[data-evdetails]').addEventListener('click', ev => { ev.stopPropagation(); openEventModal(e); });
    card.addEventListener('click', () => openEventModal(e));
    return card;
  }

  function renderUpcoming() {
    const grid = document.getElementById('upgrid');
    if (!grid) return;
    grid.innerHTML = '';
    let list = getUpcoming();
    if (upcomingFilter === 'featured') list = list.filter(e => e.featured);
    else if (upcomingFilter !== 'all') list = list.filter(e => e.category === upcomingFilter);

    const slice = list.slice(0, upcomingShown);
    if (!slice.length) {
      grid.innerHTML = `<div style="grid-column: 1/-1; padding: var(--s-7); text-align: center; color: var(--ink-3); font-family: var(--font-mono);">No events match this filter. Try "All".</div>`;
    } else {
      slice.forEach(e => grid.appendChild(eventCardHTML(e)));
    }

    const btn = document.getElementById('upmore-btn');
    if (btn) {
      btn.style.display = (list.length > upcomingShown) ? '' : 'none';
    }
  }

  function bindUpcoming() {
    document.querySelectorAll('.upfilter').forEach(b => {
      b.addEventListener('click', () => {
        upcomingFilter = b.dataset.filter;
        upcomingShown = UPCOMING_INITIAL;
        document.querySelectorAll('.upfilter').forEach(x => x.classList.toggle('is-active', x === b));
        renderUpcoming();
      });
    });
    const btn = document.getElementById('upmore-btn');
    if (btn) btn.addEventListener('click', () => { upcomingShown += UPCOMING_STEP; renderUpcoming(); });
  }

  // ---------- 5. CALENDAR -----------------------------------
  const cal = {
    view: null,         // first day of currently shown month
    selected: null,     // 'YYYY-MM-DD'
    visibleCats: new Set(D.CATEGORIES.map(c => c.key))
  };

  function initCalendar() {
    // Pin to current month, but if "today" is before the data range start
    // (e.g. summer 2026 data on May 24, 2026), bump forward to the first
    // upcoming-month with events.
    const today = new Date();
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    const minEv = getUpcoming()[0];
    if (minEv) {
      const m = parseDate(minEv.date);
      const minMonth = new Date(m.getFullYear(), m.getMonth(), 1);
      if (view < minMonth) view = minMonth;
    }
    cal.view = view;
    renderLegend();
    renderCalendar();
    document.getElementById('cal-prev').addEventListener('click', () => stepCalendar(-1));
    document.getElementById('cal-next').addEventListener('click', () => stepCalendar(+1));
    document.getElementById('cal-today').addEventListener('click', () => {
      cal.view = new Date(today.getFullYear(), today.getMonth(), 1);
      cal.selected = null;
      renderCalendar();
      renderSide();
    });
  }
  function stepCalendar(dir) {
    cal.view = new Date(cal.view.getFullYear(), cal.view.getMonth() + dir, 1);
    cal.selected = null;
    renderCalendar();
    renderSide();
  }
  function renderLegend() {
    const legend = document.getElementById('cal-legend');
    legend.innerHTML = '';
    D.CATEGORIES.forEach(cat => {
      const label = document.createElement('label');
      label.dataset.checked = 'true';
      label.style.setProperty('--legend-color', cat.color);
      label.innerHTML = `<input type="checkbox" data-cat="${cat.key}" checked><i></i>${cat.eyebrow}`;
      label.querySelector('input').addEventListener('change', ev => {
        const k = ev.target.dataset.cat;
        if (ev.target.checked) cal.visibleCats.add(k); else cal.visibleCats.delete(k);
        label.dataset.checked = ev.target.checked;
        renderCalendar();
        renderSide();
      });
      legend.appendChild(label);
    });
  }
  function eventsOnDay(ymd) {
    return D.EVENTS.filter(e => {
      if (!cal.visibleCats.has(e.category)) return false;
      if (!e.endDate) return e.date === ymd;
      // multi-day events
      const target = parseDate(ymd).getTime();
      return target >= parseDate(e.date).getTime() && target <= parseDate(e.endDate).getTime();
    });
  }
  function ymd(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function renderCalendar() {
    const title = document.getElementById('cal-title');
    title.textContent = `${MONTH_NAMES[cal.view.getMonth()]} ${cal.view.getFullYear()}`;
    const daysEl = document.getElementById('cal-days');
    daysEl.innerHTML = '';

    const firstWeekday = cal.view.getDay();
    const monthDays = new Date(cal.view.getFullYear(), cal.view.getMonth()+1, 0).getDate();
    const prevDays  = new Date(cal.view.getFullYear(), cal.view.getMonth(), 0).getDate();

    // 42 cells (6 weeks). Leading + trailing fillers in muted style.
    const today = new Date();
    const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate();

    for (let i = 0; i < 42; i++) {
      const dayNum = i - firstWeekday + 1;
      const cell = document.createElement('div');
      cell.className = 'calday';
      let dt;
      if (dayNum < 1) {
        dt = new Date(cal.view.getFullYear(), cal.view.getMonth()-1, prevDays + dayNum);
        cell.classList.add('is-other');
      } else if (dayNum > monthDays) {
        dt = new Date(cal.view.getFullYear(), cal.view.getMonth()+1, dayNum - monthDays);
        cell.classList.add('is-other');
      } else {
        dt = new Date(cal.view.getFullYear(), cal.view.getMonth(), dayNum);
      }
      const key = ymd(dt);
      cell.dataset.ymd = key;

      const isToday = (dt.getFullYear()===todayY && dt.getMonth()===todayM && dt.getDate()===todayD);
      if (isToday) cell.classList.add('is-today');
      if (cal.selected === key) cell.classList.add('is-selected');

      const evs = eventsOnDay(key);
      if (evs.length) cell.classList.add('has-events');

      const num = document.createElement('div'); num.className = 'calday__num';
      const numText = document.createElement('span'); numText.textContent = dt.getDate();
      num.appendChild(numText);
      if (evs.length) {
        const c = document.createElement('small');
        c.textContent = evs.length + (evs.length === 1 ? ' event' : ' events');
        num.appendChild(c);
      }
      cell.appendChild(num);

      if (evs.length) {
        const pips = document.createElement('div'); pips.className = 'calday__pips';
        // Up to 4 pips; group by category
        const seen = new Set();
        evs.forEach(e => {
          if (seen.has(e.category)) return;
          seen.add(e.category);
          if (seen.size > 4) return;
          const pip = document.createElement('div');
          pip.className = 'calday__pip';
          pip.style.setProperty('--pip-color', (CATS_BY_KEY[e.category]||{}).color);
          pips.appendChild(pip);
        });
        cell.appendChild(pips);
        cell.addEventListener('click', () => {
          cal.selected = key;
          renderCalendar();
          renderSide();
        });
      }

      daysEl.appendChild(cell);
    }
    renderSide();
  }
  function renderSide() {
    const eyebrow = document.getElementById('cal-side-eyebrow');
    const dateEl  = document.getElementById('cal-side-date');
    const list    = document.getElementById('cal-side-list');

    if (!cal.selected) {
      // Show "this month's flagship" — first featured of view month
      const monthKey = `${cal.view.getFullYear()}-${String(cal.view.getMonth()+1).padStart(2,'0')}`;
      const monthEvs = D.EVENTS.filter(e => e.date.startsWith(monthKey) && cal.visibleCats.has(e.category));
      eyebrow.textContent = monthEvs.length ? `${monthEvs.length} event${monthEvs.length>1?'s':''} this month` : '— No events selected —';
      dateEl.textContent  = `${MONTH_NAMES[cal.view.getMonth()]} ${cal.view.getFullYear()}`;
      list.innerHTML = '';
      if (!monthEvs.length) {
        list.innerHTML = '<p class="cal__side-empty">No events match your active filters in this month. Try toggling more categories above.</p>';
        return;
      }
      monthEvs.forEach(e => list.appendChild(calEventRow(e)));
      return;
    }
    const evs = eventsOnDay(cal.selected);
    eyebrow.textContent = `${evs.length} event${evs.length===1?'':'s'} scheduled`;
    dateEl.textContent  = `${fmtWeekday(cal.selected)}, ${fmtDateLong(cal.selected)}`;
    list.innerHTML = '';
    if (!evs.length) {
      list.innerHTML = '<p class="cal__side-empty">Nothing on this day.</p>';
      return;
    }
    evs.forEach(e => list.appendChild(calEventRow(e)));
  }
  function calEventRow(e) {
    const cat = CATS_BY_KEY[e.category] || {};
    const row = document.createElement('div');
    row.className = 'calevent';
    row.style.setProperty('--cat-color', cat.color);
    row.innerHTML = `
      <div class="calevent__stripe"></div>
      <div class="calevent__body">
        <div class="calevent__cat">${cat.eyebrow || e.category}</div>
        <div class="calevent__title">${e.title}</div>
        <div class="calevent__when">${e.time} · ${e.city}${e.state ? ', '+e.state : ''}${e.chapter ? ' · ' + e.chapter : ''}</div>
      </div>
    `;
    row.addEventListener('click', () => openEventModal(e));
    return row;
  }

  // ---------- 6. STATE MAP ----------------------------------
  // Schematic — we draw colored regions and chapter dots in a simplified
  // lower-48 projection. Not geographically exact, but legible.
  const STATE_POSITIONS = {
    'NY': { x: 838, y: 188, label: { dx: 18, dy: -8 } },
    'NJ': { x: 836, y: 220, label: { dx: 22, dy: 4 } },
    'PA': { x: 776, y: 218, label: { dx: -14, dy: -14 } },
    'MD': { x: 798, y: 250, label: { dx: 22, dy: 6 } },
    'VA': { x: 770, y: 268, label: { dx: -12, dy: 14 } },
    'DC': { x: 798, y: 240, label: { dx: -24, dy: -10 } },
    'GA': { x: 720, y: 380, label: { dx: 12, dy: 8 } },
    'FL': { x: 760, y: 458, label: { dx: 14, dy: -6 } },
    'TX': { x: 460, y: 432, label: { dx: -12, dy: 16 } },
    'MI': { x: 666, y: 192, label: { dx: 14, dy: -8 } },
    'CA': { x:  86, y: 290, label: { dx: -20, dy: 18 } }
  };
  function renderEventMap() {
    const svg = document.getElementById('evmap-svg');
    if (!svg) return;
    const bg = document.getElementById('evmap-bg');
    const dotsG = document.getElementById('evmap-dots');
    const linesG = document.getElementById('evmap-lines');

    // Simplified US lower-48 outline — recognizable silhouette in viewBox 1000x560.
    // North border across the top, Maine notch top-right, east coast down through
    // NY/NJ/DC/Carolinas, Florida peninsula, Gulf coast across LA/TX, Mexican
    // border, southern California, west coast back up to Washington.
    bg.innerHTML = `
      <path d="M70,145 L150,135 L260,128 L360,124 L460,125 L490,135 L510,155 L540,175 L580,175 L620,170 L660,165 L700,158 L760,148 L820,142 L870,138 L870,175 L862,200 L860,232 L854,262 L845,295 L825,330 L805,365 L800,395 L805,425 L815,455 L800,480 L768,478 L738,458 L720,432 L700,425 L660,422 L615,420 L575,425 L540,432 L510,440 L478,446 L440,452 L405,442 L360,425 L305,410 L250,388 L195,370 L145,358 L105,340 L82,320 L70,290 L65,250 L62,210 L65,175 Z"
            class="evmap__state has-events"/>
    `;

    // Connection lines between key chapter hubs (subtle, animated)
    const lines = [
      ['NY','NJ'], ['NJ','PA'], ['PA','MD'], ['MD','DC'], ['DC','VA'],
      ['NY','MI'], ['MI','GA'], ['GA','FL'], ['GA','TX'], ['TX','CA']
    ];
    lines.forEach(([a,b]) => {
      const A = STATE_POSITIONS[a], B = STATE_POSITIONS[b];
      if (!A || !B) return;
      const cx = (A.x + B.x) / 2;
      const cy = Math.min(A.y, B.y) - Math.abs(B.x - A.x) * 0.08 - 16;
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', `M${A.x},${A.y} Q${cx},${cy} ${B.x},${B.y}`);
      path.setAttribute('class','evmap__connector');
      linesG.appendChild(path);
    });

    // Dots per state activity
    D.STATE_ACTIVITY.forEach(s => {
      const pos = STATE_POSITIONS[s.code];
      if (!pos) return;
      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      g.setAttribute('class', 'evmap__dot' + (s.color === 'blue' ? ' is-blue' : ''));
      g.setAttribute('transform', `translate(${pos.x},${pos.y})`);
      g.dataset.code = s.code;

      const pulse = document.createElementNS('http://www.w3.org/2000/svg','circle');
      pulse.setAttribute('class', 'evmap__pulse' + (s.color === 'blue' ? ' is-blue' : ''));
      pulse.setAttribute('r', 14);
      g.appendChild(pulse);

      const outer = document.createElementNS('http://www.w3.org/2000/svg','circle');
      outer.setAttribute('class','outer'); outer.setAttribute('r', 18);
      g.appendChild(outer);

      const r = Math.max(14, 12 + s.upcoming);
      const inner = document.createElementNS('http://www.w3.org/2000/svg','circle');
      inner.setAttribute('class','inner'); inner.setAttribute('r', r);
      g.appendChild(inner);

      const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
      txt.setAttribute('y', 4); txt.textContent = s.upcoming;
      g.appendChild(txt);

      const label = document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('x', pos.label.dx); label.setAttribute('y', r + 18 + pos.label.dy);
      label.setAttribute('text-anchor', pos.label.dx < 0 ? 'end' : (pos.label.dx > 0 ? 'start' : 'middle'));
      label.style.fontFamily = 'var(--font-mono)';
      label.style.fontSize = '11px';
      label.style.fill = 'rgba(255,255,255,.75)';
      label.style.letterSpacing = '0.08em';
      label.textContent = s.code;
      g.appendChild(label);

      g.addEventListener('click', () => selectState(s.code));
      dotsG.appendChild(g);
    });

    // Side list
    const listEl = document.getElementById('evmap-list');
    listEl.innerHTML = '';
    D.STATE_ACTIVITY.slice().sort((a,b) => b.upcoming - a.upcoming).forEach(s => {
      const row = document.createElement('div');
      row.className = 'evmap__row';
      row.dataset.code = s.code;
      row.innerHTML = `
        <div class="evmap__row-code">${s.code}</div>
        <div>
          <div class="evmap__row-state">${s.state}</div>
          <div class="evmap__row-sub">${s.chapters} chapter${s.chapters>1?'s':''}</div>
        </div>
        <div class="evmap__row-count">${s.upcoming}<small>Upcoming</small></div>
      `;
      row.addEventListener('click', () => selectState(s.code));
      listEl.appendChild(row);
    });
  }
  function selectState(code) {
    document.querySelectorAll('.evmap__row').forEach(r => r.classList.toggle('is-active', r.dataset.code === code));
    document.querySelectorAll('.evmap__dot').forEach(g => g.style.outline = '');

    // Filter upcoming events by state's events — open modal with first
    const events = D.EVENTS.filter(e => e.state === code);
    if (events.length) openStateModal(code, events);
  }
  function openStateModal(code, events) {
    const stateInfo = D.STATE_ACTIVITY.find(s => s.code === code);
    const inner = document.getElementById('evmodal-inner');
    inner.innerHTML = `
      <span class="evcard__chip is-featured">${stateInfo.state}</span>
      <h3 style="margin-top: var(--s-3);">${events.length} upcoming event${events.length===1?'':'s'} in ${stateInfo.state}</h3>
      <p class="lede" style="font-size: 15px; color: var(--ink-2);">${stateInfo.chapters} active chapter${stateInfo.chapters===1?'':'s'} organizing across the state.</p>
      <div style="display: flex; flex-direction: column; gap: var(--s-2); margin-top: var(--s-4);">
        ${events.map(e => {
          const cat = CATS_BY_KEY[e.category] || {};
          return `<div class="calevent" style="--cat-color:${cat.color};">
            <div class="calevent__stripe"></div>
            <div class="calevent__body">
              <div class="calevent__cat">${cat.eyebrow}</div>
              <div class="calevent__title">${e.title}</div>
              <div class="calevent__when">${fmtDateLong(e.date)} · ${e.time} · ${e.venue}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
    showModal();
  }

  // ---------- 7. ARCHIVES -----------------------------------
  const ARCH_POSTER_VARIANTS = ['is-blue','is-red','is-saffron','is-ink'];
  function renderArchives() {
    const grid = document.getElementById('archgrid');
    if (!grid) return;
    grid.innerHTML = '';
    D.ARCHIVES.forEach((a, idx) => {
      const card = document.createElement('article');
      card.className = 'archcard';
      const tag = ['conventions','programs','leadership','advocacy'].find(t => a.title.toLowerCase().includes(t.replace('s','')))
        || (a.title.includes('Convention') ? 'conventions'
        : a.title.includes('Community') ? 'programs'
        : a.title.includes('Leadership') ? 'leadership'
        : a.title.includes('Advocacy') ? 'advocacy' : 'conventions');
      card.dataset.archtype = tag;
      const variant = ARCH_POSTER_VARIANTS[idx % ARCH_POSTER_VARIANTS.length];
      card.innerHTML = `
        <div class="archcard__poster ${variant}">
          <div class="archcard__year">${a.year}</div>
          <div class="archcard__chip">№ ${idx+1}</div>
        </div>
        <div class="archcard__body">
          <h3 class="archcard__title">${a.title}</h3>
          <div class="archcard__meta">${a.city} · ${a.date}</div>
          <div class="archcard__meta" style="color: var(--ink-2);">${a.attendees} attendees</div>
          <div class="archcard__stats">
            <div><strong>${a.photos}</strong><span>Photos</span></div>
            <div><strong>${a.videos}</strong><span>Videos</span></div>
            <div><strong>${a.press}</strong><span>Press</span></div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    document.querySelectorAll('.archtab').forEach(t => {
      t.addEventListener('click', () => {
        const k = t.dataset.archtab;
        document.querySelectorAll('.archtab').forEach(x => x.classList.toggle('is-active', x === t));
        document.querySelectorAll('.archcard').forEach(c => {
          c.style.display = (k === 'all' || c.dataset.archtype === k) ? '' : 'none';
        });
      });
    });
  }

  // ---------- 8. GALLERY ------------------------------------
  // 18 placeholder tiles — heights vary to create masonry rhythm.
  const GALLERY_TILES = [
    { type: 'convention', label: 'Convention · plenary',          aspect: '3/4',  bg: '#0E2F5C', fg: '#E59B22' },
    { type: 'advocacy',   label: 'Voter registration · Queens',    aspect: '4/3',  bg: '#B91C26', fg: '#fff' },
    { type: 'youth',      label: 'Youth workshop · Atlanta',       aspect: '1/1',  bg: '#0A6D58', fg: '#fff' },
    { type: 'convention', label: 'Convention · keynote',           aspect: '4/3',  bg: '#061B3A', fg: '#fff' },
    { type: 'women',      label: "Women's forum · DC",             aspect: '3/4',  bg: '#7A1F4E', fg: '#fff' },
    { type: 'service',    label: 'Food drive · NJ',                aspect: '1/1',  bg: '#2B5E8A', fg: '#fff' },
    { type: 'chapter',    label: 'Meet & greet · Philadelphia',    aspect: '4/3',  bg: '#E59B22', fg: '#0F1014' },
    { type: 'convention', label: 'Gala · awards',                  aspect: '3/4',  bg: '#1A1F2C', fg: '#E59B22' },
    { type: 'advocacy',   label: 'Labor Day march · NYC',          aspect: '4/3',  bg: '#8C1019', fg: '#fff' },
    { type: 'youth',      label: 'Mentor mixer · LIC',             aspect: '1/1',  bg: '#0A6D58', fg: '#fff' },
    { type: 'service',    label: 'MLK Day of Service',             aspect: '3/4',  bg: '#0F1014', fg: '#E59B22' },
    { type: 'chapter',    label: 'Year-end reception · Queens',    aspect: '4/3',  bg: '#0E2F5C', fg: '#fff' },
    { type: 'women',      label: "International Women's Day",      aspect: '1/1',  bg: '#7A1F4E', fg: '#fff' },
    { type: 'convention', label: 'Coalition panel',                aspect: '4/3',  bg: '#B87412', fg: '#fff' },
    { type: 'advocacy',   label: 'Healthcare rally · City Hall',   aspect: '3/4',  bg: '#B91C26', fg: '#fff' },
    { type: 'chapter',    label: 'Diwali celebration · Iselin',    aspect: '4/3',  bg: '#E59B22', fg: '#0F1014' },
    { type: 'service',    label: 'Thanksgiving distribution',      aspect: '1/1',  bg: '#2B5E8A', fg: '#fff' },
    { type: 'youth',      label: 'Career workshop · Brooklyn',     aspect: '3/4',  bg: '#0A6D58', fg: '#fff' }
  ];
  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';
    GALLERY_TILES.forEach((t, i) => {
      const tile = document.createElement('a');
      tile.className = 'galtile';
      tile.dataset.gal = t.type;
      tile.href = '#gallery';
      tile.innerHTML = `
        <div class="galtile__art" style="--gal-bg:${t.bg}; --gal-fg:${t.fg}; aspect-ratio:${t.aspect};">
          ${t.label.toUpperCase()}
        </div>
        <div class="galtile__cap">
          <span><strong>№ ${String(i+1).padStart(2,'0')}</strong> · ${t.type}</span>
          <span>${t.aspect}</span>
        </div>
      `;
      tile.addEventListener('click', ev => {
        ev.preventDefault();
        openGalleryModal(t, i);
      });
      grid.appendChild(tile);
    });
    document.querySelectorAll('.galfilter').forEach(b => {
      b.addEventListener('click', () => {
        const k = b.dataset.galfilter;
        document.querySelectorAll('.galfilter').forEach(x => x.classList.toggle('is-active', x === b));
        document.querySelectorAll('.galtile').forEach(t => {
          t.style.display = (k === 'all' || t.dataset.gal === k) ? '' : 'none';
        });
      });
    });
  }
  function openGalleryModal(t, i) {
    const inner = document.getElementById('evmodal-inner');
    inner.innerHTML = `
      <span class="evcard__chip is-featured">Photo · ${t.type}</span>
      <h3 style="margin-top: var(--s-3);">${t.label}</h3>
      <p style="color: var(--ink-3); font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;">№ ${String(i+1).padStart(2,'0')} · From ASAAL archives</p>
      <div style="aspect-ratio: 16/10; background: ${t.bg}; color: ${t.fg}; display:flex; align-items:center; justify-content:center; font-family: var(--font-mono); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; border-radius: var(--r-3); border: 1px dashed rgba(255,255,255,.2); margin-top: var(--s-4); padding: var(--s-5); text-align: center;">
        ${t.label}<br>(photo placeholder)
      </div>
      <p style="margin-top: var(--s-4); color: var(--ink-2);">Drop a real photo into <code>/img/events/${t.type}-${String(i+1).padStart(2,'0')}.jpg</code> and the gallery will pick it up.</p>
    `;
    showModal();
  }

  // ---------- 9. IMPACT -------------------------------------
  function renderImpact() {
    const grid = document.getElementById('impact-grid');
    if (!grid) return;
    D.IMPACT.forEach(m => {
      const cell = document.createElement('div');
      cell.className = 'impact__cell';
      cell.innerHTML = `
        <div class="impact__num"><span data-counter="${m.num}" data-suffix="${m.suffix}">0${m.suffix}</span></div>
        <div class="impact__lbl">${m.label}</div>
      `;
      grid.appendChild(cell);
    });
    // Re-run counter observer for these newly-injected nodes
    document.querySelectorAll('#impact-grid [data-counter]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      let observed = false;
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !observed) {
            observed = true;
            const dur = 1400; const start = performance.now();
            (function tick(now) {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = Math.round(target * eased).toLocaleString() + suffix;
              if (t < 1) requestAnimationFrame(tick);
            })(start);
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  // ---------- 10. EVENT MODAL -------------------------------
  function openEventModal(e) {
    const cat = CATS_BY_KEY[e.category] || {};
    const inner = document.getElementById('evmodal-inner');
    const dateLabel = e.endDate
      ? `${fmtDateLong(e.date)} — ${fmtDateLong(e.endDate)}`
      : `${fmtWeekday(e.date)}, ${fmtDateLong(e.date)}`;
    inner.innerHTML = `
      <span class="evcard__chip is-featured" style="background:${cat.color}; color:#fff;">${cat.eyebrow || e.category}</span>
      <h3 style="margin-top: var(--s-3);">${e.title}</h3>
      <p style="color: var(--ink-2); font-size: 17px; line-height: 1.5; margin-top: var(--s-2);">${e.blurb}</p>
      <dl class="evmodal__meta">
        <div><dt>When</dt><dd>${dateLabel}</dd></div>
        <div><dt>Time</dt><dd>${e.time}</dd></div>
        <div><dt>Venue</dt><dd>${e.venue}</dd></div>
        <div><dt>Location</dt><dd>${e.city}${e.state ? ', '+e.state : ''}</dd></div>
        <div><dt>Chapter</dt><dd>${e.chapter || 'National'}</dd></div>
        <div><dt>Audience</dt><dd>${ {public:'Public',members:'Members only','invite':'By invitation'}[e.audience] || e.audience }</dd></div>
      </dl>
      <div class="evmodal__cta">
        ${e.soldOut
          ? '<button class="btn btn--ghost btn--lg" data-disabled>Join waitlist</button>'
          : (e.audience === 'invite'
              ? '<a class="btn btn--primary btn--lg" href="'+(e.detailUrl||'../form.html')+'">View invitation</a>'
              : '<a class="btn btn--primary btn--lg" href="'+(e.registerUrl||'../form.html')+'">Register</a>'
            )
        }
        ${e.detailUrl ? '<a class="btn btn--ghost btn--lg" href="'+e.detailUrl+'">More details →</a>' : ''}
        <button class="btn btn--ghost btn--lg" data-evmodal-close>Close</button>
      </div>
    `;
    showModal();
  }
  function showModal() {
    const m = document.getElementById('evmodal');
    m.hidden = false;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function hideModal() {
    const m = document.getElementById('evmodal');
    m.hidden = true;
    m.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function bindModal() {
    document.getElementById('evmodal').addEventListener('click', e => {
      if (e.target.closest('[data-evmodal-close]') || e.target.classList.contains('evmodal__backdrop')) hideModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideModal();
    });
  }

  // ---------- INIT ------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    renderHeroMap();
    startCountdown();
    renderCategories();
    bindUpcoming();
    renderUpcoming();
    initCalendar();
    renderEventMap();
    renderArchives();
    renderGallery();
    renderImpact();
    bindModal();
  });
})();
