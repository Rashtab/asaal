/* ============================================================
   ASAAL — Leadership renderers
   Hydrates leadership.html, executive-council.html, and profile
   pages from window.ASAAL_LEADERSHIP (the single source of truth).
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const L = window.ASAAL_LEADERSHIP;
    if (!L) return;
    const avatar = window.ASAAL_avatar;

    // ---- Generic bind helper -----------------------------------
    function bindText(key, value) {
      document.querySelectorAll('[data-bind="' + key + '"]').forEach(el => {
        el.textContent = value || '';
      });
    }
    function bindHref(key, href) {
      document.querySelectorAll('[data-bind="' + key + '"]').forEach(el => {
        el.setAttribute('href', href);
      });
    }
    function bindList(key, items, renderItem) {
      document.querySelectorAll('[data-bind="' + key + '"]').forEach(el => {
        el.innerHTML = items.map(renderItem).join('');
      });
    }

    // ---- LEADERSHIP LANDING ------------------------------------
    // Founder
    if (L.founder) {
      const f = L.founder;
      bindText('founderDesignation', 'Founder & National President Emeritus');
      bindText('founderName', f.name);
      bindText('founderTitle', f.affiliations.join(' · '));
      document.querySelectorAll('[data-bind="founderQuote"]').forEach(el => {
        el.innerHTML = '“' + f.quote + '”';
      });
      bindText('founderBio', f.bioPreview);
      bindList('founderHighlights', f.accomplishmentsSummary, item => `<li>${item}</li>`);
      bindHref('founderProfileBtn', f.profileUrl);
    }

    // Current President
    if (L.president) {
      const p = L.president;
      bindText('presidentDesignation', 'National President');
      bindText('presidentName', p.name);
      bindText('presidentTitle', p.affiliations.join(' · '));
      bindText('presidentVision', p.visionStatement);
      bindText('presidentBio', p.bioPreview);
      bindList('presidentInitiatives', p.initiatives, (item, i) =>
        `<div class="president-feature__initiative">
          <span class="badge">${String(i+1).padStart(2,'0')}</span>
          <span>${item}</span>
        </div>`
      );
      bindHref('presidentProfileBtn', p.profileUrl);
    }

    // ---- Executive officers grid (landing + exec-council pages) -
    const officersGrid = document.getElementById('exec-officers-grid');
    if (officersGrid && L.executiveOfficers) {
      officersGrid.innerHTML = L.executiveOfficers.map(o =>
        renderCouncilCard(o, false)
      ).join('');
    }

    // ---- Full Council (Founder + President + Officers) ---------
    const fullCouncil = document.getElementById('full-council-grid');
    if (fullCouncil && L.fullExecutiveCouncil) {
      fullCouncil.innerHTML = L.fullExecutiveCouncil.map(o =>
        renderCouncilCard(o, o === L.founder || o === L.president)
      ).join('');
    }

    // ---- Committees overview cards -----------------------------
    const committeesGrid = document.getElementById('committees-grid');
    if (committeesGrid && L.nationalCommittees) {
      committeesGrid.innerHTML = L.nationalCommittees.map(c => `
        <a href="${c.anchor}" class="card card--interactive" style="display:flex; flex-direction:column; gap: var(--s-3); text-decoration:none !important;">
          <div style="display:flex; justify-content: space-between; align-items: start;">
            <span class="tag is-blue"><span class="dot"></span>${c.count} member${c.count===1?'':'s'}</span>
            <span style="color: var(--asaal-blue); font-size: 18px;">→</span>
          </div>
          <h4 class="card__title" style="margin: 0;">${c.name}</h4>
          <p style="font-size: 14px; color: var(--ink-3); margin: 0;">${c.role}</p>
        </a>
      `).join('');
    }

    // ---- Vice Presidents roster --------------------------------
    const vpsRoster = document.getElementById('vps-roster');
    if (vpsRoster && L.vicePresidents) {
      vpsRoster.innerHTML = L.vicePresidents.map(name => renderRosterItem({
        name: name,
        role: 'Vice President'
      })).join('');
    }

    // ---- Trustees roster --------------------------------------
    const trusteesRoster = document.getElementById('trustees-roster');
    if (trusteesRoster && L.trustees) {
      trusteesRoster.innerHTML = L.trustees.map(name => renderRosterItem({
        name: name,
        role: name === L.founder.name || name === L.president.name ? 'Trustee · Executive' : 'Trustee'
      })).join('');
    }

    // ---- Women's Committee roster -----------------------------
    const womensRoster = document.getElementById('womens-roster');
    if (womensRoster && L.womensCommittee) {
      const items = [
        { name: L.womensCommittee.chair, role: 'Chair' },
        ...L.womensCommittee.members.map(n => ({ name: n, role: 'Member' }))
      ];
      womensRoster.innerHTML = items.map(renderRosterItem).join('');
    }

    // ---- Youth Committee roster -------------------------------
    const youthRoster = document.getElementById('youth-roster');
    if (youthRoster && L.youthCommittee) {
      const y = L.youthCommittee;
      const items = [
        { name: y.director.name,       role: 'Director' },
        { name: y.coDirector.name,     role: 'Co-Director' },
        { name: y.deputyDirector.name, role: 'Deputy Director' },
        ...y.members.map(m => ({
          name: m.name,
          role: 'Member',
          badge: m.scholarshipWinner ? 'Scholar' : null
        }))
      ];
      youthRoster.innerHTML = items.map(renderRosterItem).join('');
    }

    // ---- Org chart --------------------------------------------
    const orgRoot = document.getElementById('orgchart');
    if (orgRoot) renderOrgChart(orgRoot, L);

    // ============================================================
    // RENDERERS
    // ============================================================
    function renderCouncilCard(person, featured) {
      const isPair = (person === L.founder || person === L.president);
      const profileHref = person.profileUrl || null;
      const designation = person.title;
      const subtitle = person.affiliations ? person.affiliations.map(a => `<li>${a}</li>`).join('') : '';

      return `
        <article class="council-card${featured ? ' is-featured' : ''}">
          <div class="council-card__head">
            ${avatar(person, { size: 'lg', shape: 'square' })}
            <div style="min-width: 0; flex: 1;">
              <div class="council-card__title">${designation}</div>
              <h3 class="council-card__name">${person.name}</h3>
            </div>
          </div>
          ${subtitle ? `<ul class="council-card__affiliations">${subtitle}</ul>` : ''}
          <div class="council-card__actions">
            ${profileHref ? `<a href="${profileHref}" class="btn btn--ghost btn--sm">View profile →</a>` : ''}
            <a href="mailto:info@asaal.org?subject=Contact: ${encodeURIComponent(person.name)}" class="btn btn--ghost btn--sm" title="Contact through the national office">Contact</a>
          </div>
        </article>
      `;
    }

    function renderRosterItem(item) {
      const initials = item.name
        .replace(/[,.()]/g, '')
        .split(/\s+/)
        .filter(w => /^[A-Z]/.test(w))
        .slice(0, 2)
        .map(s => s[0])
        .join('') || item.name.slice(0,2).toUpperCase();
      const fakePerson = { name: item.name, initials: initials };
      return `
        <li>
          ${avatar(fakePerson, { size: 'sm', shape: 'circle' })}
          <div class="roster__body">
            <span class="roster__name">${item.name}</span>
            ${item.role ? `<span class="roster__role">${item.role}</span>` : ''}
          </div>
          ${item.badge ? `<span class="roster__badge">${item.badge}</span>` : ''}
        </li>
      `;
    }

    // ---- Org chart -- horizontal layered bands, UN-style -------
    function renderOrgChart(root, L) {
      // The bands. Each band defines its label, nodes (clickable),
      // and a panel-renderer fn that returns the HTML to show when
      // a node is expanded.
      const bands = [
        {
          variant: 'root',
          label: 'Level 01',
          title: 'ASAAL National',
          lede: 'The Alliance — the national organization, headquartered in NYC.',
          nodes: [
            { key: 'mission',  label: 'Mission & Charter' },
            { key: 'national', label: 'National Office', count: 1 }
          ],
          panel: function (key) {
            if (key === 'mission') {
              return wrap('Foundation', [
                chipExt('Founded 2008'),
                chipExt('Constituency group · NY State AFL-CIO (2017)'),
                chipExt('First & only national South Asian American labor organization'),
                chipExt('Headquartered in Hollis, NY')
              ]);
            }
            return wrap('Headquarters', [
              chipExt('186-05 Jamaica Avenue, Hollis, NY 11423'),
              chipExt('info@asaal.org'),
              chipExt('1-800-464-7370')
            ]);
          }
        },
        {
          label: 'Level 02',
          title: 'National Executive Council',
          lede: '11 officers — the Founder, the National President, and 9 directors elected to lead the operational work.',
          nodes: [
            { key: 'officers', label: 'Executive Officers', count: 11 }
          ],
          panel: function () {
            return wrap('Executive Officers', L.fullExecutiveCouncil.map(p =>
              chipLink(p.profileUrl || 'executive-council.html#officers',
                       p.name, p.title)
            ));
          }
        },
        {
          label: 'Level 03',
          title: 'National Committees',
          lede: 'Four standing bodies: Trustees, Vice Presidents, Women\'s Committee, Youth Committee.',
          nodes: L.nationalCommittees.map(c => ({
            key: c.id, label: c.name, count: c.count
          })),
          panel: function (key) {
            if (key === 'trustees')  return wrap('Trustees',         L.trustees.map(n => chipLink('executive-council.html#trustees', n, 'Trustee')));
            if (key === 'vps')       return wrap('Vice Presidents',  L.vicePresidents.map(n => chipLink('executive-council.html#vps', n, 'VP')));
            if (key === 'womens')    {
              const all = [L.womensCommittee.chair, ...L.womensCommittee.members];
              return wrap('Women\'s Committee', all.map((n, i) =>
                chipLink('executive-council.html#womens', n, i === 0 ? 'Chair' : 'Member')
              ));
            }
            if (key === 'youth')     {
              const y = L.youthCommittee;
              const all = [
                { name: y.director.name,       role: 'Director' },
                { name: y.coDirector.name,     role: 'Co-Director' },
                { name: y.deputyDirector.name, role: 'Deputy Director' },
                ...y.members.map(m => ({ name: m.name, role: m.scholarshipWinner ? 'Scholar' : 'Member' }))
              ];
              return wrap('Youth Committee', all.map(p =>
                chipLink('executive-council.html#youth', p.name, p.role)
              ));
            }
            return '';
          }
        },
        {
          label: 'Level 04',
          title: 'Regional & State Chapters',
          lede: '20 chapters across 11 states — organized into four regions.',
          nodes: [
            { key: 'northeast', label: 'Northeast', count: 11 },
            { key: 'south',     label: 'South',     count: 6  },
            { key: 'midwest',   label: 'Midwest',   count: 1  },
            { key: 'west',      label: 'West',      count: 1  },
            { key: 'national',  label: 'National (Pro)', count: 1 }
          ],
          panel: function (key) {
            const region = key === 'national' ? 'National' :
                           key === 'northeast' ? 'Northeast' :
                           key === 'south' ? 'South' :
                           key === 'midwest' ? 'Midwest' : 'West';
            const chs = (window.ASAAL_CHAPTERS || []).filter(c => c.region === region);
            if (!chs.length) return wrap(region + ' Chapters', [chipExt('No chapters loaded')]);
            return wrap(region + ' Chapters', chs.map(c => chipLink(c.anchor, c.name, c.state)));
          }
        },
        {
          label: 'Level 05',
          variant: 'leaves',
          title: 'Chapter Executive Councils',
          lede: 'Every chapter elects its own officers — President, Vice President, Secretary, Treasurer — to lead locally.',
          nodes: [
            { key: 'roles', label: 'Standard Roles', count: 4 }
          ],
          panel: function () {
            return wrap('Officer Roles at Every Chapter', [
              chipExt('President'),
              chipExt('Vice President'),
              chipExt('Secretary'),
              chipExt('Treasurer'),
              chipExt('Organizing Director'),
              chipExt('Women\'s & Youth Liaisons')
            ]);
          }
        },
        {
          label: 'Level 06',
          variant: 'leaves',
          title: 'Members',
          lede: '10,000+ members and counting — accountants to zookeepers, every profession across the South Asian diaspora in America.',
          nodes: [
            { key: 'membership', label: 'Membership', count: '10,000+' },
            { key: 'origins',    label: '8 South Asian Origins' }
          ],
          panel: function (key) {
            if (key === 'origins') {
              return wrap('South Asian Diaspora in ASAAL', [
                chipExt('Afghan'), chipExt('Bangladeshi'), chipExt('Bhutanese'),
                chipExt('Indian'), chipExt('Maldivian'),  chipExt('Nepalese'),
                chipExt('Pakistani'), chipExt('Sri Lankan')
              ]);
            }
            return wrap('Membership Sectors', [
              chipExt('Union members'),
              chipExt('Public sector workers'),
              chipExt('Private sector workers'),
              chipExt('Self-employed & small business'),
              chipExt('Professionals · doctors · scientists'),
              chipExt('Community activists')
            ]);
          }
        }
      ];

      root.innerHTML = bands.map((band, bandIdx) => {
        const variantClass = band.variant ? ' orgchart__band--' + band.variant : '';
        return `
          <section class="orgchart__band${variantClass}" data-band="${bandIdx}">
            <header>
              <div class="orgchart__label">
                <span class="level">${band.label}</span>
              </div>
              <h3 class="orgchart__title">${band.title}</h3>
              <div class="orgchart__lede">${band.lede}</div>
            </header>
            <div class="orgchart__nodes">
              ${band.nodes.map(n => `
                <button class="orgchart__node" type="button"
                        aria-expanded="false"
                        data-band="${bandIdx}" data-node="${n.key}">
                  ${n.label}
                  ${n.count !== undefined ? `<span class="count">${n.count}</span>` : ''}
                  <svg class="caret" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5"/></svg>
                </button>
              `).join('')}
            </div>
            <div class="orgchart__panel" data-panel-for="${bandIdx}" aria-live="polite"></div>
          </section>
        `;
      }).join('');

      // Wire up clicks
      root.querySelectorAll('.orgchart__node').forEach(node => {
        node.addEventListener('click', () => {
          const bandIdx = +node.getAttribute('data-band');
          const nodeKey = node.getAttribute('data-node');
          const band    = bands[bandIdx];
          const panel   = root.querySelector(`[data-panel-for="${bandIdx}"]`);
          const peers   = root.querySelectorAll(`[data-band="${bandIdx}"].orgchart__node`);

          const wasOpen = node.getAttribute('aria-expanded') === 'true';
          // close all peers
          peers.forEach(p => p.setAttribute('aria-expanded', 'false'));
          if (wasOpen) {
            panel.classList.remove('is-open');
            panel.innerHTML = '';
          } else {
            node.setAttribute('aria-expanded', 'true');
            panel.innerHTML = band.panel(nodeKey);
            // next tick so transition fires
            requestAnimationFrame(() => panel.classList.add('is-open'));
          }
        });
      });
    }

    function wrap(label, chips) {
      return `<div class="orgchart__panel-title">${label}</div>
              <div class="orgchart__chips">${chips.join('')}</div>`;
    }
    function chipExt(label) {
      return `<span class="orgchart__chip">${label}</span>`;
    }
    function chipLink(href, label, role) {
      return `<a href="${href}" class="orgchart__chip"><span>${label}</span>${role ? `<span class="role">${role}</span>` : ''}</a>`;
    }
  });
})();
