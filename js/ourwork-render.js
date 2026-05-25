/* ============================================================
   ASAAL — "Our Work" renderer
   Reads window.ASAAL_OURWORK (set by js/ourwork-data.js) and
   builds DOM markup. Used by /ourwork/index.html (full page)
   AND the homepage preview block.
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function url(path) { return (window.ASAAL_BASE || '') + path; }

  // Wrap a value string in a [data-counter] span so main.js animates it.
  // - Strips commas to derive the numeric target ("15,000" -> 15000).
  // - Detects decimal precision ("2.4" -> data-decimals="1").
  // - Bails out (returns escaped text) for non-numeric values.
  function counterHTML(value, suffix) {
    if (value == null || value === '') return '';
    const raw = String(value);
    const numeric = raw.replace(/,/g, '');
    if (!/^-?\d+(\.\d+)?$/.test(numeric)) {
      // Not a number we can animate — fall back to plain text with optional suffix span.
      return esc(raw) + (suffix ? `<span class="suffix">${esc(suffix)}</span>` : '');
    }
    const dot = numeric.indexOf('.');
    const decimals = dot >= 0 ? numeric.length - dot - 1 : 0;
    const attrs = [`data-counter="${numeric}"`];
    if (decimals > 0) attrs.push(`data-decimals="${decimals}"`);
    // Display the formatted value as the initial textContent so it renders
    // correctly before the IntersectionObserver fires (and for prefers-reduced-motion).
    return `<span ${attrs.join(' ')}>${esc(raw)}</span>`
         + (suffix ? `<span class="suffix">${esc(suffix)}</span>` : '');
  }

  // ---- PILLAR (full bento card) -----------------------------------
  function pillarHTML(p) {
    const size = p.size || 'compact';
    const bg = p.bg || 'default';
    const featured = p.featured || size === 'featured';
    const classes = [
      'pillar', 'reveal',
      featured ? 'pillar--featured' : '',
      size === 'lg' ? 'pillar--lg' : '',
      size === 'wide' ? 'pillar--wide' : '',
      bg === 'muted' ? 'pillar--muted' : '',
      bg === 'blue-card' ? 'pillar--blue-card' : ''
    ].filter(Boolean).join(' ');
    const examples = (p.examples || []).map(x => `<li>${esc(x)}</li>`).join('');
    const link = p.link ? (/^(https?:|mailto:|#)/.test(p.link) ? p.link : url(p.link)) : '#';
    const target = /^https?:/.test(link) ? ' target="_blank" rel="noopener"' : '';
    const stat = p.stat || {};
    return `
<article class="${classes}" id="pillar-${esc(p.id)}">
  <div class="pillar__head">
    <div class="pillar__mono pillar__mono--${esc(p.mono || 'blue')}" aria-hidden="true">${esc(p.icon || '')}</div>
    <div>
      <span class="pillar__num">PILLAR / ${esc(p.num || '')}</span>
      <span class="pillar__cat">${esc(p.category)}</span>
    </div>
  </div>
  <h3 class="pillar__title">${esc(p.title)}</h3>
  <p class="pillar__body">${esc(p.body)}</p>
  <ul class="pillar__examples">${examples}</ul>
  <div class="pillar__foot">
    <div class="pillar__stat">
      <div class="pillar__stat-num">${counterHTML(stat.value, stat.suffix)}</div>
      <div class="pillar__stat-label">${esc(stat.label || '')}</div>
    </div>
    <a href="${link}"${target} class="pillar__more">Learn more →</a>
  </div>
</article>`;
  }

  // ---- PILLAR (preview card — homepage) ---------------------------
  function previewCardHTML(p, fullPageUrl) {
    const link = fullPageUrl + '#pillar-' + esc(p.id);
    return `
<a href="${link}" class="ow-card reveal" id="ow-preview-${esc(p.id)}">
  <div class="ow-card__head">
    <div class="ow-card__mono ow-card__mono--${esc(p.mono || 'blue')}" aria-hidden="true">${esc(p.icon || '')}</div>
    <span class="ow-card__num">/ ${esc(p.num || '')}</span>
  </div>
  <h3 class="ow-card__title">${esc(p.category)}</h3>
  <p class="ow-card__body">${esc(p.body)}</p>
  <div class="ow-card__foot">
    <span>${esc((p.stat && p.stat.value) || '')}${(p.stat && p.stat.suffix) ? esc(p.stat.suffix) : ''} ${esc((p.stat && p.stat.label) || '')}</span>
    <span class="ow-card__more">Explore →</span>
  </div>
</a>`;
  }

  // ---- METRICS ----------------------------------------------------
  function metricHTML(m) {
    return `
<div class="impact">
  <div class="impact__num">${counterHTML(m.value, m.suffix)}</div>
  <div class="impact__label">${esc(m.label)}</div>
  <div class="impact__note">${esc(m.note || '')}</div>
</div>`;
  }

  // ---- STORY ------------------------------------------------------
  function storyHTML(s) {
    const accent = s.accent ? `story--accent-${esc(s.accent)}` : '';
    const items = (s.items || []).map(i => `<li>${esc(i)}</li>`).join('');
    const linkHref = s.metaLink ? (/^(https?:|mailto:|#)/.test(s.metaLink.href) ? s.metaLink.href : url(s.metaLink.href)) : '#';
    const linkLabel = s.metaLink ? s.metaLink.label : '';
    return `
<article class="story ${accent} reveal">
  <div class="story__visual">
    <img src="${url(s.image)}" alt="" loading="lazy">
    <span class="story__corner"><span class="dot"></span>${esc(s.corner)}</span>
    <span class="story__caption">${esc(s.caption)}</span>
  </div>
  <div class="story__body">
    <span class="story__cat">${esc(s.category)}</span>
    <h3 class="story__title">${esc(s.title)}</h3>
    <p>${esc(s.body)}</p>
    <ul class="story__items">${items}</ul>
    <div class="story__meta">
      <span>${esc(s.metaLeft || '')}</span>
      <a href="${linkHref}" class="story__meta-link">${esc(linkLabel)}</a>
    </div>
  </div>
</article>`;
  }

  // ---- CTA BUTTONS ------------------------------------------------
  function ctaButtonsHTML(buttons) {
    return buttons.map(b => {
      const cls = `btn btn--${esc(b.variant || 'primary')} btn--lg`;
      const href = b.external ? b.href : url(b.href);
      const target = b.external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${href}"${target} class="${cls}"><span>${esc(b.label)}</span></a>`;
    }).join('');
  }

  // ---- PUBLIC API -------------------------------------------------
  window.ASAAL_OURWORK_RENDER = {

    /* Render the FULL "Our Work" page into containers identified
       by data-ow-region attributes:
         data-ow-region="intro-eyebrow"
         data-ow-region="intro-title"
         data-ow-region="intro-lede"
         data-ow-region="intro-pills"
         data-ow-region="pillars"
         data-ow-region="metrics"
         data-ow-region="stories"
         data-ow-region="cta-eyebrow"
         data-ow-region="cta-title"
         data-ow-region="cta-body"
         data-ow-region="cta-buttons"
         data-ow-region="cta-contact"
    */
    full: function () {
      const D = window.ASAAL_OURWORK;
      if (!D) return;

      function fill(region, html) {
        const el = document.querySelector(`[data-ow-region="${region}"]`);
        if (el) el.innerHTML = html;
      }

      fill('intro-eyebrow', esc(D.intro.eyebrow));
      fill('intro-title', D.intro.title); // title contains <em>, do not escape
      fill('intro-lede', esc(D.intro.lede));
      fill('intro-pills', D.intro.pills.map(p => `<span class="work-intro__pill">${esc(p)}</span>`).join(''));

      fill('pillars', D.pillars.map(pillarHTML).join(''));
      fill('metrics', D.metrics.map(metricHTML).join(''));
      fill('stories', D.stories.map(storyHTML).join(''));

      fill('cta-eyebrow', esc(D.cta.eyebrow));
      fill('cta-title', esc(D.cta.title));
      fill('cta-body', esc(D.cta.body));
      fill('cta-buttons', ctaButtonsHTML(D.cta.buttons));
      fill('cta-contact', D.cta.contact.map(c => `<span>${c.html}</span>`).join(''));
    },

    /* Render the HOMEPAGE preview grid.
       opts: { selector: '#our-work-preview', count: 8 } */
    preview: function (opts) {
      opts = opts || {};
      const sel = opts.selector || '[data-ow-region="preview"]';
      const root = document.querySelector(sel);
      const D = window.ASAAL_OURWORK;
      if (!root || !D) return;
      const count = opts.count || 8;
      const fullPageUrl = url('ourwork/index.html');
      const pillars = D.pillars.slice(0, count);
      root.innerHTML = pillars.map(p => previewCardHTML(p, fullPageUrl)).join('');
    }
  };
})();
