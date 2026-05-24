/* ============================================================
   ASAAL — Sponsorship shared interactions
   Loaded on every /sponsorship/* and /sponsors page.
   ============================================================ */
(function () {
  'use strict';

  // ---------- Counter animation ----------------------------
  function animateCounters() {
    document.querySelectorAll('[data-counter]:not([data-counter-done])').forEach(el => {
      el.setAttribute('data-counter-done', '1');
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const unitNode = el.querySelector('.unit');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          observer.disconnect();
          const dur = 1500, start = performance.now();
          (function tick(now) {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = Math.round(target * eased).toLocaleString();
            if (unitNode) {
              // Preserve the unit span
              el.firstChild.textContent = val;
            } else {
              el.textContent = val + suffix;
            }
            if (t < 1) requestAnimationFrame(tick);
          })(start);
        });
      }, { threshold: 0.3 });
      observer.observe(el);
    });
  }
  window.SP_animateCounters = animateCounters;

  // ---------- Fade-in on scroll ---------------------------
  function bindFadeIn() {
    const els = document.querySelectorAll('.pillar, .prog, .level, .adcard, .tstm, .why__cell, .sptl__item, .spimpact__cell, .archcard, .sptile');
    if (!('IntersectionObserver' in window) || !els.length) return;
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    // animateCounters() is invoked per-page after content renders
    bindFadeIn();
  });
})();
