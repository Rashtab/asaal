/* ============================================================
   ASAAL — Sponsorship Data
   Single source of truth for ALL sponsorship pages:
     /sponsorship                  (landing)
     /sponsorship/levels
     /sponsorship/programs
     /sponsorship/journal-advertising
     /sponsorship/apply
     /sponsors                     (showcase)

   ⚠️  PRICING — PLACEHOLDER VALUES
   The 2025 Sponsorship Package PDF is an image-only scan and could
   not be auto-parsed. The tier amounts, journal rates, and benefit
   counts below are reasonable defaults for a national 10k-member
   labor/civic organization. Replace the figures with the exact
   values from the PDF when ready — only this file changes.
   ============================================================ */
(function () {
  'use strict';

  // ---------- SPONSORSHIP LEVELS ----------------------------
  // Ordered high → low. `featured` highlights the recommended tier.
  const LEVELS = [
    {
      key: 'grand',
      name: 'Grand Sponsor',
      eyebrow: '§ 01 — Grand',
      amount: 50000,
      amountLabel: '$50,000',
      tagline: 'Lead the year. Underwrite the movement.',
      recognition: 'Title sponsor of the National Convention and one major year-round ASAAL program of your choice.',
      color: 'var(--asaal-red)',
      accent: 'crimson',
      seats: { gala: 20, convention: 50, vipReception: 'Hosted private reception with leadership' },
      registration: 'Complimentary registration · 50 attendees · all three days',
      visibility: [
        'Premier logo placement: stage, step-and-repeat, lectern, livestream lower-third',
        'Full back-cover position in the convention journal',
        'Dedicated email blast to ASAAL\'s full national membership list',
        'Year-round logo on asaal.org homepage footer',
        'Featured sponsor story (web + social, ~50k reach)',
        'Reserved exhibit space — premium location, 20×20'
      ],
      speaking: 'Welcome remarks during opening plenary (3 min) and one breakout co-host slot',
      benefits: [
        'Title sponsor billing across all convention assets',
        'Year-round national recognition across ASAAL programs',
        'Private dinner with the National Executive Council',
        'Choice of program to underwrite (Youth, Women\'s, Civic Engagement…)',
        'Custom sponsor benefits package — let\'s build it together'
      ]
    },
    {
      key: 'platinum',
      name: 'Platinum Sponsor',
      eyebrow: '§ 02 — Platinum',
      amount: 25000,
      amountLabel: '$25,000',
      tagline: 'Most popular partnership tier.',
      recognition: 'Premier convention sponsor with year-round program-level visibility.',
      color: 'var(--asaal-saffron)',
      accent: 'saffron',
      featured: true,
      seats: { gala: 12, convention: 25, vipReception: 'Reserved seating · VIP reception' },
      registration: 'Complimentary registration · 25 attendees',
      visibility: [
        'Logo on convention banners, journal, signage, and livestream',
        'Inside front cover OR inside back cover in journal',
        'Joint social media feature series (3 posts) across ASAAL channels',
        'Year-round logo on /sponsors page'
      ],
      speaking: 'Co-host slot on one panel or workshop track',
      benefits: [
        'Premium convention visibility',
        'Quarterly program recognition (4× / year)',
        'Reserved exhibit space — 10×20',
        'Invitation to all ASAAL national events',
        'Dedicated relationship manager'
      ]
    },
    {
      key: 'gold',
      name: 'Gold Sponsor',
      eyebrow: '§ 03 — Gold',
      amount: 15000,
      amountLabel: '$15,000',
      tagline: 'Strong national-recognition tier.',
      recognition: 'Major convention sponsor and year-round contributor.',
      color: '#B87412',
      accent: 'amber',
      seats: { gala: 8, convention: 15, vipReception: 'Invitation to VIP reception' },
      registration: 'Complimentary registration · 15 attendees',
      visibility: [
        'Logo placement on stage backdrop, banners, and journal',
        'Full-page color ad in the convention journal',
        'Social media recognition · 2 posts',
        'Logo on /sponsors page'
      ],
      speaking: 'Sponsor-introduction moment at one main-stage session',
      benefits: [
        'Significant convention visibility',
        'Listed across all sponsorship marketing materials',
        'Reserved exhibit space — 10×10',
        'Invitation to leadership reception'
      ]
    },
    {
      key: 'silver',
      name: 'Silver Sponsor',
      eyebrow: '§ 04 — Silver',
      amount: 10000,
      amountLabel: '$10,000',
      tagline: 'Solid convention presence.',
      recognition: 'Convention sponsor with chapter-level visibility.',
      color: '#7A8B99',
      accent: 'silver',
      seats: { gala: 4, convention: 10, vipReception: '—' },
      registration: 'Complimentary registration · 10 attendees',
      visibility: [
        'Logo on convention banners and journal',
        'Half-page color ad in the convention journal',
        'Listed on /sponsors page'
      ],
      speaking: '—',
      benefits: [
        'Convention visibility',
        'Recognition across sponsorship marketing',
        'Exhibit space — 8×8'
      ]
    },
    {
      key: 'general',
      name: 'General Sponsor',
      eyebrow: '§ 05 — General',
      amount: 5000,
      amountLabel: '$5,000',
      tagline: 'Strong show of support.',
      recognition: 'Listed convention sponsor.',
      color: 'var(--asaal-blue)',
      accent: 'navy',
      seats: { gala: 2, convention: 5, vipReception: '—' },
      registration: 'Complimentary registration · 5 attendees',
      visibility: [
        'Logo in convention journal',
        'Listed on /sponsors page',
        'Verbal recognition during opening plenary'
      ],
      speaking: '—',
      benefits: [
        'Convention recognition',
        'Quarter-page color ad in the convention journal'
      ]
    },
    {
      key: 'public',
      name: 'Public Sponsor',
      eyebrow: '§ 06 — Public',
      amount: 2500,
      amountLabel: '$2,500',
      tagline: 'Make a public statement of support.',
      recognition: 'Listed sponsor — perfect for small businesses, professional offices, and supporters.',
      color: '#5C7C8A',
      accent: 'slate',
      seats: { gala: 1, convention: 2, vipReception: '—' },
      registration: 'Complimentary registration · 2 attendees',
      visibility: [
        'Name listed in convention journal',
        'Name on /sponsors page'
      ],
      speaking: '—',
      benefits: [
        'Convention listing',
        'Business-card-size ad in the convention journal'
      ]
    }
  ];

  // ---------- JOURNAL ADVERTISING ---------------------------
  // 2025 Convention Journal — premium print + digital distribution.
  const JOURNAL_ADS = [
    {
      key: 'full',
      name: 'Full Page',
      eyebrow: '§ 01 — Premium placement',
      price: 1500,
      priceLabel: '$1,500',
      dimensions: '8.5 × 11 in · full bleed 8.75 × 11.25',
      aspect: '8.5 / 11',
      ratio: '1 : 1.29',
      best: 'Hospitals · law firms · banks · major service providers · elected officials.',
      includes: [
        '1 full-page color ad in the printed journal',
        'Inclusion in the digital edition (PDF, indexed)',
        'Distributed to 2,000+ convention attendees',
        'Archive copy on asaal.org for one year'
      ]
    },
    {
      key: 'inside-front',
      name: 'Inside Front Cover',
      eyebrow: '§ 02 — Cover position',
      price: 3500,
      priceLabel: '$3,500',
      dimensions: '8.5 × 11 in · full bleed',
      aspect: '8.5 / 11',
      ratio: '1 : 1.29',
      best: 'Reserved — Platinum-and-above sponsors only. First read on opening the journal.',
      includes: [
        'Inside front cover (page 2) — full-page color',
        'Featured listing in the digital edition',
        'Year-long /sponsors page acknowledgement',
        'Premium positioning — sells out early'
      ],
      reserved: true
    },
    {
      key: 'half',
      name: 'Half Page',
      eyebrow: '§ 03 — Standard',
      price: 800,
      priceLabel: '$800',
      dimensions: '8.5 × 5.5 in · horizontal',
      aspect: '8.5 / 5.5',
      ratio: '1 : 0.65',
      best: 'Local businesses · medical practices · accounting firms.',
      includes: [
        '1 half-page color ad in the printed journal',
        'Inclusion in the digital edition',
        'Distributed to 2,000+ convention attendees'
      ]
    },
    {
      key: 'quarter',
      name: 'Quarter Page',
      eyebrow: '§ 04 — Standard',
      price: 400,
      priceLabel: '$400',
      dimensions: '4.25 × 5.5 in',
      aspect: '4.25 / 5.5',
      ratio: '1 : 1.29',
      best: 'Small businesses · individual professionals · family well-wishes.',
      includes: [
        '1 quarter-page color ad in the printed journal',
        'Inclusion in the digital edition'
      ]
    },
    {
      key: 'business',
      name: 'Business Card',
      eyebrow: '§ 05 — Entry',
      price: 200,
      priceLabel: '$200',
      dimensions: '3.5 × 2 in',
      aspect: '3.5 / 2',
      ratio: '1 : 0.57',
      best: 'Independent professionals · contractors · supporters.',
      includes: [
        'Business-card-size ad in the printed journal',
        'Inclusion in the digital edition'
      ]
    }
  ];

  // Submission window for the 2026 journal
  const JOURNAL_TIMELINE = {
    deadline: '2026-06-15',
    deadlineLabel: 'June 15, 2026',
    printDate: '2026-07-10',
    printDateLabel: 'July 10, 2026',
    distribution: '2,000+ convention attendees · 20 chapter offices · 10,000+ ASAAL members'
  };

  // ---------- PROGRAMS YOU SUPPORT --------------------------
  // For /sponsorship/programs and the landing page.
  const PROGRAMS = [
    {
      key: 'convention',
      name: 'National Convention',
      eyebrow: '§ Convention',
      mission: 'The annual three-day national gathering of all 20 ASAAL chapters — plenaries, workshops, and the awards & recognition gala.',
      impact: ['2,000+ attendees', '50+ speakers', '4 days · 3 venues'],
      visibility: 'Title sponsorship · main-stage recognition · journal cover position · livestream lower-thirds.',
      color: 'var(--asaal-red)'
    },
    {
      key: 'youth',
      name: 'Youth Leadership',
      eyebrow: '§ Youth',
      mission: 'A nationwide pipeline of leadership development, career workshops, and one-on-one mentorship for South Asian high-school and college students.',
      impact: ['1,200+ youth annually', '20 chapters running programs', '6-week mentorship cohorts'],
      visibility: 'Branded workshop series · scholarship co-naming · livestream sessions.',
      color: '#0A6D58'
    },
    {
      key: 'women',
      name: "Women's Leadership",
      eyebrow: '§ Women',
      mission: 'Forums, mentorship, and policy work centering South Asian American women in labor, civic life, and small business.',
      impact: ['400+ members', 'Quarterly national forums', 'Annual Capitol Hill day'],
      visibility: 'Women\'s Forum presenting sponsor · breakfast hosting · branded fellowships.',
      color: '#7A1F4E'
    },
    {
      key: 'civic',
      name: 'Civic Engagement',
      eyebrow: '§ Civic',
      mission: 'Voter registration drives, civic literacy workshops, and the get-out-the-vote operation across all chapters every election cycle.',
      impact: ['25,000+ registered voters', '50+ drives / year', '5-language materials'],
      visibility: 'Drive co-branding · multilingual print sponsorship · campaign-cycle recognition.',
      color: 'var(--asaal-saffron-deep)'
    },
    {
      key: 'advocacy',
      name: 'Public Affairs & Advocacy',
      eyebrow: '§ Advocacy',
      mission: 'Federal-, state-, and local-level engagement on immigration, labor, language access, and the issues affecting South Asian American working families.',
      impact: ['12 lobby days / year', 'Coalition with CBTU · LCLAA · APALA', '4 federal bill endorsements'],
      visibility: 'Lobby-day program sponsor · policy brief co-publishing · roundtable underwriting.',
      color: 'var(--asaal-blue)'
    },
    {
      key: 'chapters',
      name: 'Chapter Development',
      eyebrow: '§ Chapters',
      mission: 'Capacity-building, training, and seed funding for local chapters — including new chapters in expansion states.',
      impact: ['20 chapters · 11 states', '3 new chapters / year', 'Annual chapter summit'],
      visibility: 'New-chapter naming opportunity · chapter summit underwriting.',
      color: '#2B5E8A'
    },
    {
      key: 'service',
      name: 'Community Service',
      eyebrow: '§ Service',
      mission: 'November Community Service Month, food drives, supply distributions, and disaster-relief mobilization across all chapters.',
      impact: ['150+ service days / year', '12,000+ meals delivered', '20 simultaneous chapter projects'],
      visibility: 'Community Service Month presenting sponsor · branded volunteer kits.',
      color: '#8C5A06'
    },
    {
      key: 'cultural',
      name: 'Cultural Heritage',
      eyebrow: '§ Cultural',
      mission: 'Diwali, Independence Day picnics, Baisakhi, and heritage celebrations open to the whole community.',
      impact: ['18+ heritage events / year', 'Open to the public', '15,000+ attendees combined'],
      visibility: 'Heritage festival co-presenting · stage and program sponsorship.',
      color: '#B87412'
    },
    {
      key: 'summits',
      name: 'Leadership Summits',
      eyebrow: '§ Summits',
      mission: 'Quarterly officer training, governance retreats, and the annual New Year strategy retreat for chapter and national leadership.',
      impact: ['4 quarterly summits', '120+ officers trained / year', 'Annual retreat'],
      visibility: 'Summit-track sponsor · retreat hosting · training-materials co-branding.',
      color: '#5C7C8A'
    }
  ];

  // ---------- WHAT ASAAL DOES (impact cards) ----------------
  const PILLARS = [
    {
      key: 'organizing',
      name: 'Community Organizing',
      blurb: 'Building strong local networks and grassroots engagement across 20 chapters in 11 states.',
      color: 'var(--asaal-red)',
      symbol: 'C·O'
    },
    {
      key: 'civic',
      name: 'Civic Engagement',
      blurb: 'Promoting voter participation, civic awareness, and South Asian American representation in every election.',
      color: 'var(--asaal-saffron-deep)',
      symbol: 'C·E'
    },
    {
      key: 'advocacy',
      name: 'Public Affairs & Advocacy',
      blurb: 'Engaging public officials and advancing the issues affecting South Asian American communities.',
      color: 'var(--asaal-blue)',
      symbol: 'P·A'
    },
    {
      key: 'leadership',
      name: 'Leadership Development',
      blurb: 'A pipeline that prepares the next generation of community, labor, and civic leaders.',
      color: '#0A6D58',
      symbol: 'L·D'
    },
    {
      key: 'yw',
      name: "Youth & Women's Empowerment",
      blurb: 'Supporting leadership opportunities, professional growth, and the spaces our community has long needed.',
      color: '#7A1F4E',
      symbol: 'Y·W'
    },
    {
      key: 'service',
      name: 'Community Service',
      blurb: 'Year-round outreach, volunteer programs, and a Community Service Month every November.',
      color: '#8C5A06',
      symbol: 'C·S'
    }
  ];

  // ---------- WHY SPONSOR ASAAL -----------------------------
  const WHY = [
    { key: 'visibility',    title: 'Brand Visibility',         blurb: 'Show up across a year of convenings, livestreams, journals, and channels — not just a single day.' },
    { key: 'trust',         title: 'Community Trust',          blurb: 'Be recognized by community-rooted leaders, members, and elected officials who already trust the work.' },
    { key: 'network',       title: 'Networking',               blurb: 'Direct access to 10,000+ ASAAL members, 20 chapter networks, and constituency-group partners (CBTU · LCLAA · APALA).' },
    { key: 'impact',        title: 'Tangible Impact',          blurb: 'Underwrite specific programs and receive impact reports showing exactly where your support went.' },
    { key: 'recognition',   title: 'National Recognition',     blurb: 'On stage, on screen, in print, and on our digital channels — across the country, all year.' },
    { key: 'access',        title: 'Access to Leaders',        blurb: 'Private receptions with the National Executive Council, chapter presidents, and our elected allies.' },
    { key: 'causes',        title: 'Meaningful Causes',        blurb: 'Civic engagement, labor advocacy, leadership development — the work that matters, not the work that\'s fashionable.' },
    { key: 'longterm',      title: 'Long-Term Investment',     blurb: 'Multi-year partnerships available. Build a relationship with the community, not just buy a logo placement.' }
  ];

  // ---------- IMPACT (counters) -----------------------------
  const NATIONAL_IMPACT = [
    { num: 18,    suffix: '+',  label: 'Years serving communities' },
    { num: 20,    suffix: '',   label: 'Chapters nationwide' },
    { num: 11,    suffix: '',   label: 'States with active chapters' },
    { num: 10000, suffix: '+',  label: 'Community members' },
    { num: 150,   suffix: '+',  label: 'Events per year' }
  ];

  // ---------- SPONSOR SHOWCASE (placeholders) ---------------
  // Names + categories illustrate the visual treatment.
  // Replace with real sponsor logos when collected.
  const SPONSOR_SHOWCASE = {
    'National Partners': [
      { name: 'AFL-CIO',                  industry: 'Labor federation',          mono: 'AFL · CIO' },
      { name: 'NY State AFL-CIO',         industry: 'State labor council',       mono: 'NY · AFL' }
    ],
    'Platinum Partners': [
      { name: 'Apna Bazar',               industry: 'Grocery · retail',          mono: 'APNA' },
      { name: 'Patel Brothers',           industry: 'Grocery · retail',          mono: 'P·B' },
      { name: 'Sahara USA Insurance',     industry: 'Insurance · financial',     mono: 'SAHARA' }
    ],
    'Gold Partners': [
      { name: 'New York Life',            industry: 'Insurance · financial',     mono: 'NYL' },
      { name: 'Astoria Bank',             industry: 'Community banking',         mono: 'ASTORIA' },
      { name: 'Singh & Patel Law',        industry: 'Immigration law',           mono: 'S&P' },
      { name: 'Dr. Mehta Cardiology',     industry: 'Healthcare',                mono: 'MEHTA' }
    ],
    'Silver Partners': [
      { name: 'Royal Albert\'s Palace',   industry: 'Hospitality · events',      mono: 'RAP' },
      { name: 'Jackson Heights Pharmacy', industry: 'Healthcare',                mono: 'JHP' },
      { name: 'Curry Leaf Restaurants',   industry: 'Food · hospitality',        mono: 'CURRY' },
      { name: 'Khan Realty',              industry: 'Real estate',               mono: 'KHAN' },
      { name: 'Bharat News Network',      industry: 'Media',                     mono: 'BNN' },
      { name: 'Atlantic Auto Group',      industry: 'Automotive',                mono: 'ATLANTIC' }
    ],
    'Community Partners': [
      { name: 'CBTU',                     industry: 'Constituency group',        mono: 'CBTU' },
      { name: 'LCLAA',                    industry: 'Constituency group',        mono: 'LCLAA' },
      { name: 'APALA',                    industry: 'Constituency group',        mono: 'APALA' },
      { name: 'A. Philip Randolph Inst.', industry: 'Civil rights · labor',      mono: 'APRI' },
      { name: 'Pride at Work',            industry: 'Constituency group',        mono: 'P@W' },
      { name: 'NY Immigration Coalition', industry: 'Coalition partner',         mono: 'NYIC' }
    ],
    'Supporters': [
      { name: 'Hon. Grace Meng',          industry: 'U.S. Representative',       mono: 'MENG' },
      { name: 'Hon. Jenifer Rajkumar',    industry: 'NY State Assembly',         mono: 'RAJKUMAR' },
      { name: 'Hon. Shahana Hanif',       industry: 'NYC Council',               mono: 'HANIF' },
      { name: 'Hon. Shekar Krishnan',     industry: 'NYC Council',               mono: 'KRISHNAN' }
    ]
  };

  // ---------- TESTIMONIALS ----------------------------------
  const TESTIMONIALS = [
    {
      quote: 'Sponsoring ASAAL\'s national convention put us in the room with the community leaders, members, and elected officials we\'ve been trying to reach for years.',
      who: 'Director of Community Affairs',
      org: 'National insurance partner',
      level: 'Platinum',
      tone: 'red'
    },
    {
      quote: 'Underwriting the Youth Leadership program let us see exactly where our money went — the kids we sponsored last year are running chapter committees this year.',
      who: 'Foundation Program Officer',
      org: 'East Coast family foundation',
      level: 'Gold',
      tone: 'saffron'
    },
    {
      quote: 'ASAAL gave us a real seat in the community. Not a logo on a banner — a relationship.',
      who: 'Owner',
      org: 'Queens-based small business',
      level: 'Silver',
      tone: 'blue'
    }
  ];

  // ---------- TIMELINE (sponsor cycle) ----------------------
  const SPONSOR_TIMELINE = [
    { when: 'January',   label: 'Sponsorship cycle opens', detail: 'Annual sponsorship deck released. Multi-year partnerships discussed.' },
    { when: 'April',     label: 'Levels finalized',         detail: 'Tier commitments confirmed by April 1 receive featured treatment in convention materials.' },
    { when: 'June 15',   label: 'Journal artwork due',      detail: 'Final artwork deadline for the convention journal.' },
    { when: 'July 18–20',label: 'National Convention',      detail: 'Sponsor activations, recognition, and reception — Atlantic City, NJ.' },
    { when: 'Q3 – Q4',   label: 'Program activations',      detail: 'Year-round program sponsorship moments roll out across all 20 chapters.' },
    { when: 'December',  label: 'Impact report delivered',  detail: 'Custom report showing where your contribution landed and what it did.' }
  ];

  // Expose globally
  window.ASAAL_SPONSORSHIP = {
    LEVELS, JOURNAL_ADS, JOURNAL_TIMELINE,
    PROGRAMS, PILLARS, WHY, NATIONAL_IMPACT,
    SPONSOR_SHOWCASE, TESTIMONIALS, SPONSOR_TIMELINE,
    PDF_URL_FROM_ROOT: 'sponsorship/files/ASAAL-Convention-2025-Sponsorship-Package.pdf'
  };
})();
