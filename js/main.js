/* ============================================================
   ASAAL — Main JavaScript
   Mounts shared header/footer, handles nav, tweaks, modals,
   chapter filter, form validation.
   ============================================================ */
(function () {
  'use strict';

  // ---------- Tweakable defaults (light/dark, density) -----------
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "density": "comfortable",
    "darkAccent": "default"
  }/*EDITMODE-END*/;

  // ---------- Compute project root URL from this script's location.
  // Lets pages in subdirectories (e.g. /events/, /convention/2026/) get
  // correct relative nav links without per-page configuration.
  const __myScript = document.currentScript || Array.from(document.scripts).find(s => /\/main\.js(\?|$)/.test(s.src || ''));
  const BASE = __myScript ? new URL('../', __myScript.src).href : '';
  function u(p) { return BASE + p; }
  window.ASAAL_BASE = BASE;

  // ---------- Chapter data --------------------------------------
  // Chapter data lives in js/chapters-data.js (loaded by every page that
  // needs it). Keeping it in one place lets us update the roster annually
  // without touching markup. We expose a tiny "missing data" fallback here
  // so pages that forgot to include chapters-data.js still degrade gracefully.
  if (!window.ASAAL_CHAPTERS) window.ASAAL_CHAPTERS = [];

  // ---------- HEADER markup -------------------------------------
  function headerHTML(active) {
    const CHAPTERS = window.ASAAL_CHAPTERS || [];
    const link = (href, label, key) => `<a href="${u(href)}" class="nav__link${active===key?' is-active':''}">${label}</a>`;
    return `
<div class="site-header__topbar">
  <div class="container">
    <div class="quick">
      <a href="mailto:info@asaal.org">info@asaal.org</a>
      <span style="opacity:.4">·</span>
      <a href="tel:+18005551212">1-800-555-1212</a>
    </div>
    <div class="quick">
      <a href="https://pay.asaal.org/" target="_blank" rel="noopener">Pay Membership Dues ↗</a>
      <span style="opacity:.4">·</span>
      <a href="${u('form.html')}">Join ASAAL</a>
    </div>
  </div>
</div>
<div class="site-header__main">
  <div class="container">
    <a href="${u('index.html')}" class="brand" aria-label="ASAAL home">
      <img class="brand__seal" src="${u('img/asaalLogo.png')}" alt="ASAAL seal — Alliance of South Asian American Labor, Established 2008">
      <span class="brand__wordmark">
        <span class="brand__name">ASAAL</span>
        <span class="brand__sub">Alliance of South Asian American Labor · Est. 2008</span>
      </span>
    </a>

    <nav class="nav" id="primary-nav" aria-label="Primary">
      <div class="nav__item">${link('index.html', 'Home', 'home')}</div>
      <div class="nav__item">${link('index.html#about', 'Our Purpose', 'about')}</div>
      <div class="nav__item">
        <a href="${u('index.html#activities')}" class="nav__link${active==='services'?' is-active':''}">Our Work <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <div class="nav__panel">
          <a href="${u('ourwork/index.html')}">Overview →</a>
          <a href="${u('ourwork/index.html#pillar-advocacy')}">Advocacy</a>
          <a href="${u('ourwork/index.html#pillar-civic-engagement')}">Civic Engagement</a>
          <a href="${u('ourwork/index.html#pillar-political-mobilization')}">Political Mobilization</a>
          <a href="${u('ourwork/index.html#pillar-leadership-development')}">Leadership Development</a>
          <a href="${u('ourwork/index.html#pillar-community-organizing')}">Community Organizing</a>
          <a href="${u('ourwork/index.html#pillar-coalition-building')}">Coalition Building</a>
          <a href="${u('ourwork/index.html#pillar-community-support')}">Community Support &amp; Guidance</a>
          <a href="${u('ourwork/index.html#pillar-cultural-unity')}">Cultural &amp; Community Unity</a>
          <a href="${u('accomplishments.html')}">Accomplishments →</a>
        </div>
      </div>
      <div class="nav__item">
        <a href="${u('chapters.html')}" class="nav__link${active==='chapters'?' is-active':''}">Chapters <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <div class="nav__panel nav__panel--mega">
          <div class="mega__title">20 Chapters · 11 States · 10,000+ members</div>
          <div class="mega__cols">
            <div class="mega__col">
              <h6>Northeast</h6>
              ${CHAPTERS.filter(c=>c.region==='Northeast').map(c=>`<a href="${u(c.anchor)}">${c.name}</a>`).join('')}
            </div>
            <div class="mega__col">
              <h6>South</h6>
              ${CHAPTERS.filter(c=>c.region==='South').map(c=>`<a href="${u(c.anchor)}">${c.name}</a>`).join('')}
              <h6 style="margin-top:16px">Midwest · West</h6>
              ${CHAPTERS.filter(c=>['Midwest','West'].includes(c.region)).map(c=>`<a href="${u(c.anchor)}">${c.name}</a>`).join('')}
            </div>
            <div class="mega__col">
              <h6>Professional</h6>
              ${CHAPTERS.filter(c=>c.region==='National').map(c=>`<a href="${u(c.anchor)}">${c.name}</a>`).join('')}
              <h6 style="margin-top:16px">All Chapters</h6>
              <a href="${u('chapters.html')}">Browse all 20 →</a>
            </div>
          </div>
        </div>
      </div>
      <div class="nav__item">
        <a href="${u('events/index.html')}" class="nav__link${active==='events'?' is-active':''}">Events <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <div class="nav__panel">
          <a href="${u('events/index.html')}">All Events</a>
          <a href="${u('convention/2026/index.html')}">National Convention 2026</a>
          <a href="${u('events/index.html#calendar')}">Calendar</a>
          <a href="${u('events/index.html#categories')}">Categories</a>
          <a href="${u('events/index.html#archives')}">Past Events</a>
        </div>
      </div>
      <div class="nav__item">
        <a href="${u('sponsorship/index.html')}" class="nav__link${active==='sponsorship'?' is-active':''}">Sponsorship <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <div class="nav__panel">
          <a href="${u('sponsorship/index.html')}">Overview</a>
          <a href="${u('sponsorship/levels/index.html')}">Sponsorship Levels</a>
          <a href="${u('sponsorship/programs/index.html')}">Programs You Support</a>
          <a href="${u('sponsorship/journal-advertising/index.html')}">Journal Advertising</a>
          <a href="${u('sponsorship/apply/index.html')}">Become a Sponsor</a>
          <a href="${u('sponsors/index.html')}">Our Sponsors</a>
        </div>
      </div>
      <div class="nav__item">
        <a href="${u('leadership.html')}" class="nav__link${active==='team'?' is-active':''}">Leadership <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg></a>
        <div class="nav__panel nav__panel--leadership">
          <div class="lp-cols">
            <a href="${u('leadership.html')}" class="lp-link">
              <div class="lp-link__label">§ 01 · Landing</div>
              <div class="lp-link__title">National Leadership</div>
              <div class="lp-link__sub">Founder, President, and the leadership of ASAAL.</div>
            </a>
            <a href="${u('executive-council.html')}" class="lp-link">
              <div class="lp-link__label">§ 02 · Roster</div>
              <div class="lp-link__title">National Executive Council</div>
              <div class="lp-link__sub">11 officers · 39 vice presidents · 7 trustees</div>
            </a>
            <a href="${u('executive-council.html#committees')}" class="lp-link">
              <div class="lp-link__label">§ 03 · Committees</div>
              <div class="lp-link__title">National Committees</div>
              <div class="lp-link__sub">Women's, Youth, Trustees, Vice Presidents.</div>
            </a>
            <a href="${u('chapters.html')}" class="lp-link">
              <div class="lp-link__label">§ 04 · Local</div>
              <div class="lp-link__title">Chapters Leadership</div>
              <div class="lp-link__sub">20 chapters · 11 states · find local officers.</div>
            </a>
          </div>
        </div>
      </div>
      <div class="nav__item">${link('index.html#contact', 'Contact', 'contact')}</div>
    </nav>

    <div class="header-actions">
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Toggle theme (T)">
        <svg class="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/>
          <g stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
            <path d="M12 2.5v2.2"/><path d="M12 19.3v2.2"/>
            <path d="M2.5 12h2.2"/><path d="M19.3 12h2.2"/>
            <path d="M4.9 4.9l1.6 1.6"/><path d="M17.5 17.5l1.6 1.6"/>
            <path d="M4.9 19.1l1.6-1.6"/><path d="M17.5 6.5l1.6-1.6"/>
          </g>
        </svg>
        <svg class="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a.6.6 0 0 0-.82-.7 9.5 9.5 0 1 0 12.22 12.22.6.6 0 0 0-.7-.82z" fill="currentColor"/>
        </svg>
        <span class="theme-toggle__label">Theme</span>
      </button>
      <a href="${u('form.html')}" class="btn btn--primary btn--sm no-wrap">
        <svg class="ic" viewBox="0 0 16 16" fill="none"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2.5 14a5.5 5.5 0 0111 0" stroke="currentColor" stroke-width="1.5"/></svg>
        Join ASAAL
      </a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="primary-nav">
        <span></span>
      </button>
    </div>
  </div>
</div>
`;
  }

  // ---------- FOOTER markup -------------------------------------
  function footerHTML() {
    return `
<div class="container">
  <div class="site-footer__grid">
    <div>
      <div class="site-footer__brand">
        <img src="${u('img/asaalLogo.png')}" alt="ASAAL">
        <div>
          <div class="brand__name">ASAAL</div>
          <div class="brand__sub">Alliance of South Asian American Labor</div>
        </div>
      </div>
      <p class="site-footer__lede">A movement of our own. Economic, political, and social justice for South Asian workers and all Americans since 2008.</p>
      <div class="social" aria-label="Social media">
        <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .2 2 .2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7c4.8-.7 8.4-4.9 8.4-9.9z"/></svg></a>
        <a href="#" aria-label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7.5 8.6L22.5 22H16l-5-6.4L5.2 22H2l8-9.2L1.5 2H8l4.5 5.9L18 2zm-1 18h1.7L7 4H5.2L17 20z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.9.3 2.3.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.3 1.9-.4 2.3-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.9-.3-2.3-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.3-1.9.4-2.3.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.2 2.8.8 3.5.5 4.3c-.3.8-.5 1.7-.6 3C-.1 8.5 0 8.9 0 12s0 3.5.1 4.7c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.2 1.2 20.5.8 19.7.5c-.8-.3-1.7-.5-3-.6C15.5 0 15.1 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm7.8-10.4a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.5 3.5 12 3.5 12 3.5s-4.5 0-7.8.2c-.5.1-1.4.1-2.3 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.8v1.4c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .2 8 .2s4.5 0 7.8-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8zM9.8 14.6V8.4l5.8 3.1-5.8 3.1z"/></svg></a>
      </div>
    </div>
    <div>
      <h6>Organization</h6>
      <a href="${u('index.html#about')}">Our Purpose</a>
      <a href="${u('index.html#about')}">Mission & Vision</a>
      <a href="${u('leadership.html')}">Leadership</a>
      <a href="${u('accomplishments.html')}">Accomplishments</a>
      <a href="${u('index.html#contact')}">Contact</a>
    </div>
    <div>
      <h6>Our Work</h6>
      <a href="${u('ourwork/index.html')}">Overview</a>
      <a href="${u('ourwork/index.html#pillar-advocacy')}">Advocacy</a>
      <a href="${u('ourwork/index.html#pillar-civic-engagement')}">Civic Engagement</a>
      <a href="${u('ourwork/index.html#pillar-political-mobilization')}">Political Mobilization</a>
      <a href="${u('ourwork/index.html#pillar-leadership-development')}">Leadership</a>
      <a href="${u('ourwork/index.html#pillar-coalition-building')}">Coalition Building</a>
    </div>
    <div>
      <h6>Get Involved</h6>
      <a href="${u('form.html')}">Join ASAAL</a>
      <a href="https://pay.asaal.org/" target="_blank" rel="noopener">Pay Dues</a>
      <a href="${u('chapters.html')}">Find a Chapter</a>
      <a href="${u('events/index.html')}">All Events</a>
      <a href="${u('convention/2026/index.html')}">Convention 2026</a>
      <a href="${u('sponsorship/index.html')}">Sponsor ASAAL</a>
    </div>
    <div>
      <h6>Newsletter</h6>
      <p style="font-size:13px; margin-bottom:12px;">Monthly updates from chapters across America.</p>
      <form class="newsletter" onsubmit="event.preventDefault(); this.querySelector('input').value=''; this.querySelector('button').textContent='✓ Subscribed';">
        <input type="email" placeholder="you@example.com" required>
        <button type="submit">Join</button>
      </form>
    </div>
  </div>
  <div class="site-footer__bottom">
    <div>© 2008–2026 Alliance of South Asian American Labor (ASAAL). All rights reserved.</div>
    <div>Constituency group · NY State AFL-CIO</div>
  </div>
</div>
`;
  }

  // ---------- TWEAKS panel --------------------------------------
  function tweaksHTML() {
    return `
<h6>Tweaks</h6>
<div class="tweaks__label">Theme</div>
<div class="tweak-row" data-tweak="theme">
  <button data-value="light">Light</button>
  <button data-value="dark">Dark</button>
</div>
<div class="tweaks__label">Density</div>
<div class="tweak-row" data-tweak="density">
  <button data-value="comfortable">Comfortable</button>
  <button data-value="dense">Dense</button>
</div>
<div class="tweaks__label">Dark accent <span style="opacity:.6; text-transform:none; letter-spacing:0;">(applies in dark mode)</span></div>
<div class="tweak-row" data-tweak="darkAccent">
  <button data-value="default">Default</button>
  <button data-value="bottle" title="Bottle green — Bangladesh flag">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#006A4E; vertical-align:middle; margin-right:6px; border:1px solid rgba(0,0,0,.15);"></span>Bottle
  </button>
</div>
<div style="font-size:11px; color:var(--ink-3); margin-top:8px; font-family:var(--font-mono);">Press T to toggle theme</div>
`;
  }

  // ---------- Apply tweaks --------------------------------------
  function applyTweaks(t) {
    document.documentElement.setAttribute('data-theme', t.theme);
    document.documentElement.setAttribute('data-density', t.density);
    document.documentElement.setAttribute('data-dark-accent', t.darkAccent || 'default');
    document.querySelectorAll('.tweaks [data-tweak]').forEach(group => {
      const key = group.getAttribute('data-tweak');
      group.querySelectorAll('button').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-value') === t[key]);
      });
    });
    // Sync header theme-toggle aria-pressed state
    const tt = document.getElementById('theme-toggle');
    if (tt) {
      tt.setAttribute('aria-pressed', String(t.theme === 'dark'));
      tt.setAttribute('title', t.theme === 'dark' ? 'Switch to light theme (T)' : 'Switch to dark theme (T)');
    }
  }

  // ---------- Mount + behaviors ---------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    // Mount header
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      const active = headerEl.getAttribute('data-active') || '';
      headerEl.innerHTML = headerHTML(active);
      headerEl.className = 'site-header';
    }
    // Mount footer
    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
      footerEl.innerHTML = footerHTML();
      footerEl.className = 'site-footer';
    }
    // Tweaks panel removed per request — the user controls theme via
    // the header Theme toggle button. The applyTweaks() function below
    // is still used to apply saved theme/density on load.

    // Load saved tweaks
    const saved = Object.assign({}, TWEAK_DEFAULTS, JSON.parse(localStorage.getItem('asaal_tweaks') || '{}'));
    applyTweaks(saved);

    // Tweak controls
    document.querySelectorAll('.tweaks [data-tweak]').forEach(group => {
      group.addEventListener('click', e => {
        const btn = e.target.closest('button[data-value]');
        if (!btn) return;
        const key = group.getAttribute('data-tweak');
        saved[key] = btn.getAttribute('data-value');
        localStorage.setItem('asaal_tweaks', JSON.stringify(saved));
        applyTweaks(saved);
      });
    });
    // Keyboard shortcut
    document.addEventListener('keydown', e => {
      if (e.key === 't' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
        saved.theme = saved.theme === 'dark' ? 'light' : 'dark';
        saved.density = 'comfortable';
        saved.darkAccent = saved.theme === 'dark' ? 'bottle' : 'default';
        localStorage.setItem('asaal_tweaks', JSON.stringify(saved));
        applyTweaks(saved);
      }
    });

    // Header theme toggle button — cycles between two curated presets:
    //   Light : comfortable density, default accent
    //   Dark  : comfortable density, bottle-green accent
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const goingDark = saved.theme !== 'dark';
        saved.theme = goingDark ? 'dark' : 'light';
        saved.density = 'comfortable';
        saved.darkAccent = goingDark ? 'bottle' : 'default';
        localStorage.setItem('asaal_tweaks', JSON.stringify(saved));
        applyTweaks(saved);
      });
    }

    // Mobile menu toggle
    const toggle = document.querySelector('.menu-toggle');
    const nav    = document.querySelector('.nav');
    // (headerEl already declared above)

    // Set --header-actual-h to the rendered header height so the mobile
    // menu lines up flush below it (handles the topbar + main row, plus
    // any wrapping at narrow widths). Re-measure on resize and on font
    // load — the header can grow when text wraps.
    function syncHeaderHeight() {
      if (!headerEl) return;
      const h = headerEl.offsetHeight;
      document.documentElement.style.setProperty('--header-actual-h', h + 'px');
    }
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncHeaderHeight);
    }

    if (toggle && nav) {
      // iOS-friendly scroll lock — remember scroll position so we can
      // restore it when the menu closes.
      let lockedScrollY = 0;
      const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
        if (open) {
          lockedScrollY = window.scrollY;
          document.body.style.position = 'fixed';
          document.body.style.top = `-${lockedScrollY}px`;
          document.body.style.left = '0';
          document.body.style.right = '0';
          document.body.style.width = '100%';
        } else {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.left = '';
          document.body.style.right = '';
          document.body.style.width = '';
          window.scrollTo(0, lockedScrollY);
          // Collapse all expanded dropdowns when menu closes
          nav.querySelectorAll('.nav__item.is-open').forEach(it => it.classList.remove('is-open'));
        }
      };

      toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

      // Mobile dropdown click-to-expand (one open at a time)
      nav.querySelectorAll('.nav__item').forEach(item => {
        const link = item.querySelector('.nav__link');
        const panel = item.querySelector('.nav__panel');
        if (!panel || !link) return;
        link.addEventListener('click', e => {
          if (window.innerWidth <= 1024 && link.querySelector('.caret')) {
            e.preventDefault();
            const willOpen = !item.classList.contains('is-open');
            nav.querySelectorAll('.nav__item.is-open').forEach(i => i !== item && i.classList.remove('is-open'));
            item.classList.toggle('is-open', willOpen);
          }
        });
      });

      // Close menu when a leaf link is clicked
      nav.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', () => {
          if (window.innerWidth <= 1024 && !a.querySelector('.caret')) {
            setOpen(false);
          }
        });
      });

      // Esc closes the menu
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
      });

      // Resize past the breakpoint → reset menu state so desktop hover works
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && nav.classList.contains('is-open')) setOpen(false);
      });
    }

    // Modal system
    document.querySelectorAll('[data-modal-open]').forEach(t => {
      t.addEventListener('click', () => {
        const m = document.getElementById(t.getAttribute('data-modal-open'));
        if (m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
      });
    });
    document.querySelectorAll('.modal').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m || e.target.closest('[data-modal-close]')) {
          m.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.is-open').forEach(m => m.classList.remove('is-open'));
        document.body.style.overflow = '';
      }
    });

    // Counter animation
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      let observed = false;
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !observed) {
            observed = true;
            const dur = 1400; const start = performance.now();
            function tick(now) {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              const raw = target * eased;
              const display = decimals > 0
                ? raw.toFixed(decimals)
                : Math.round(raw).toLocaleString();
              el.textContent = display + suffix;
              if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
      const ro = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } });
      }, { threshold: 0.12 });
      reveals.forEach(r => ro.observe(r));
    }

    // Form validation + submission (generic)
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();

        // 1. Client-side validation
        let ok = true;
        form.querySelectorAll('[required]').forEach(input => {
          const field = input.closest('.field');
          const valid = input.checkValidity();
          if (field) field.classList.toggle('is-invalid', !valid);
          if (!valid) ok = false;
        });
        if (!ok) return;

        // Honeypot — silently succeed for bots without sending
        if (form.querySelector('[name="_honey"]')?.value) {
          showSuccess(form);
          return;
        }

        const endpoint = form.getAttribute('data-endpoint');

        // No endpoint configured → fall back to the in-page success banner
        // (preserves the old behaviour for forms that don't post anywhere).
        if (!endpoint) { showSuccess(form); return; }

        // 2. Async submit with loading state
        const btn = form.querySelector('button[type="submit"]');
        const errBox = form.querySelector('.form-error');
        if (errBox) errBox.hidden = true;
        if (btn) { btn.disabled = true; btn.classList.add('is-loading'); }

        // Collect into JSON (FormSubmit AJAX expects JSON or formdata)
        const fd = new FormData(form);
        const payload = {};
        fd.forEach((v, k) => { payload[k] = v; });

        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          showSuccess(form);
        } catch (err) {
          // Network or service unavailable → fall back to mailto:
          // We open a pre-filled email so the message isn't lost.
          showError(form, payload);
        } finally {
          if (btn) { btn.disabled = false; btn.classList.remove('is-loading'); }
        }
      });

      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => {
          const field = input.closest('.field');
          if (field && input.checkValidity()) field.classList.remove('is-invalid');
        });
      });
    });

    function showSuccess(form) {
      const banner = form.querySelector('.form-success');
      const err    = form.querySelector('.form-error');
      if (err) err.hidden = true;
      if (banner) {
        banner.style.display = 'block';
        form.querySelector('.fields')?.style.setProperty('display','none');
        banner.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    function showError(form, payload) {
      const err = form.querySelector('.form-error');
      const mailto = form.querySelector('.form-error__mailto');
      const endpoint = form.getAttribute('data-endpoint') || '';
      // Recover recipient from the FormSubmit-style endpoint
      const to = endpoint.split('/').pop() || 'asaal@asaal.org';
      const subject = encodeURIComponent(payload._subject || 'ASAAL website contact form');
      const body = encodeURIComponent(
        'Name: '    + (payload.name    || '') + '\n' +
        'Email: '   + (payload.email   || '') + '\n' +
        'Subject: ' + (payload.subject || '') + '\n\n' +
        (payload.message || '')
      );
      if (mailto) mailto.setAttribute('href', `mailto:${to}?subject=${subject}&body=${body}`);
      if (err) err.hidden = false;
    }
  });

  // Modal styles injected once
  const modalCss = document.createElement('style');
  modalCss.textContent = `
.modal { position: fixed; inset: 0; background: rgba(11,14,21,.72); z-index: 100; display: none; align-items: flex-start; justify-content: center; padding: 5vh 20px; overflow-y: auto; }
.modal.is-open { display: flex; }
.modal__dialog { background: var(--bg-elev); border: 1px solid var(--line); border-radius: var(--r-3); max-width: 760px; width: 100%; padding: var(--s-7); position: relative; box-shadow: var(--shadow-3); }
.modal__close { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; display:inline-flex; align-items:center; justify-content:center; border-radius: 50%; border:1px solid var(--line); background: var(--bg); color: var(--ink); font-size: 18px; cursor: pointer; }
.modal__close:hover { background: var(--ink); color: var(--ink-inverse); }
.reveal { opacity: 0; transform: translateY(14px); transition: opacity 600ms cubic-bezier(.2,.7,.2,1), transform 600ms cubic-bezier(.2,.7,.2,1); }
.reveal.is-in { opacity: 1; transform: none; }

/* Form result banners — readable in BOTH light and dark themes
   (the old rule hardcoded a deep-blue ink that disappeared on the dark
   tinted background; var(--ink) tracks the active theme). */
.form-success {
  display: none;
  padding: var(--s-5);
  background: var(--asaal-blue-tint);
  border-radius: var(--r-3);
  border: 1px solid var(--asaal-blue);
  color: var(--ink);
}
.form-success strong { color: var(--asaal-blue); }
[data-theme="dark"] .form-success { background: rgba(122,166,230,0.10); border-color: rgba(122,166,230,0.45); color: var(--ink); }
[data-theme="dark"] .form-success strong { color: #BFD4F2; }

.form-error {
  padding: var(--s-5);
  background: var(--asaal-red-tint);
  border-radius: var(--r-3);
  border: 1px solid var(--asaal-red);
  color: var(--ink);
  margin-bottom: var(--s-4);
}
.form-error strong { color: var(--asaal-red); display: block; margin-bottom: 4px; }
.form-error__mailto { color: var(--asaal-red); text-decoration: underline; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.05em; }
[data-theme="dark"] .form-error { background: rgba(220,80,90,0.10); border-color: rgba(220,80,90,0.5); }
[data-theme="dark"] .form-error strong,
[data-theme="dark"] .form-error__mailto { color: #F1A8AE; }

/* Submit-button loading state */
.btn .btn__spinner { display: none; }
.btn.is-loading .btn__label { opacity: 0.6; }
.btn.is-loading .btn__spinner {
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  vertical-align: -2px;
  margin-left: 8px;
  animation: btn-spin 700ms linear infinite;
}
@keyframes btn-spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(modalCss);
})();
