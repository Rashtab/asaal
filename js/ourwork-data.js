/* ============================================================
   ASAAL — "Our Work" data
   Single source of truth for the /ourwork/ page AND the
   homepage preview. Update text, numbers, images, and links
   here — both views will pick up the change.

   Image paths are resolved relative to the project root
   (e.g. "ourwork/imgs/advocacy.jpg"). The rendering code
   prepends window.ASAAL_BASE (set by js/main.js) so this
   works from any subdirectory.
   ============================================================ */
(function () {
  'use strict';

  window.ASAAL_OURWORK = {

    /* ---- Section intro -------------------------------------- */
    intro: {
      eyebrow: '§ 02 — Our Work',
      title: 'Building power <em>through action.</em>',
      lede: 'ASAAL strengthens South Asian American communities through advocacy, civic engagement, leadership development, grassroots organizing, coalition building, and community service across the United States.',
      pills: [
        'National advocacy',
        'Civic engagement',
        'Political mobilization',
        'Leadership development',
        'Grassroots organizing',
        'Coalition building',
        'Community support',
        'Cultural unity'
      ]
    },

    /* ---- 8 Mission Pillars ---------------------------------- */
    /*  size:    'featured' | 'lg' | 'wide' | 'compact'
        bg:      'default'  | 'muted' | 'blue-card'
        mono:    monogram variant — 'blue' | 'red' | 'saffron' | 'ink' */
    pillars: [
      {
        id: 'advocacy',
        num: '01',
        category: 'Advocacy',
        title: 'Standing up for policies that strengthen working families.',
        body: 'Legislative engagement and public policy that lifts South Asian American communities and the broader labor movement — at city, state, and federal levels.',
        examples: ['Legislative engagement', 'Public policy', 'Community representation', 'Labor advocacy'],
        icon: 'A',
        mono: 'blue',
        stat: { value: '120', suffix: '+', label: 'Policy actions taken' },
        image: 'ourwork/imgs/advocacy.jpg',
        link: '#advocacy',
        size: 'wide',
        bg: 'blue-card'
      },
      {
        id: 'civic-engagement',
        num: '02',
        category: 'Civic Engagement',
        title: 'A democracy that includes every voice.',
        body: 'Voter registration, language access on ballots under § 203, education, and full census participation — the foundation of representative democracy.',
        examples: ['Voter registration', 'Language access', 'Voter education', 'Census participation'],
        icon: 'C',
        mono: 'red',
        stat: { value: '15,000', suffix: '+', label: 'Voters registered' },
        image: 'ourwork/imgs/civic-engagement.jpg',
        link: '#civic-engagement',
        size: 'wide',
        bg: 'default'
      },
      {
        id: 'political-mobilization',
        num: '03',
        category: 'Political Mobilization',
        title: 'When our community shows up, the ballot box listens.',
        body: "One of ASAAL's defining strengths. We endorse candidates who stand with workers, knock on tens of thousands of doors each cycle, and turn out the South Asian American vote in races that decide who represents us.",
        examples: ['Candidate endorsements', 'Door knocking', 'Phone banking', 'Get-Out-The-Vote', 'Community outreach'],
        icon: 'M',
        mono: 'saffron',
        stat: { value: '40,000', suffix: '+', label: 'Doors knocked since 2018' },
        image: 'ourwork/imgs/political-mobilization.jpg',
        link: 'accomplishments.html',
        size: 'featured',
        bg: 'default',
        featured: true
      },
      {
        id: 'leadership-development',
        num: '04',
        category: 'Leadership Development',
        title: 'Developing the leaders of the next 20 years.',
        body: 'Summits, mentorship, and structured training programs that prepare members to lead chapters, unions, organizations, and public service.',
        examples: ['Leadership summits', 'Mentorship', 'Training programs', 'Chapter leadership'],
        icon: 'L',
        mono: 'ink',
        stat: { value: '350', suffix: '+', label: 'Leaders trained' },
        image: 'ourwork/imgs/leadership-development.jpg',
        link: 'leadership.html',
        size: 'lg',
        bg: 'default'
      },
      {
        id: 'community-organizing',
        num: '05',
        category: 'Community Organizing',
        title: 'Grassroots power, built block by block.',
        body: 'Local chapters, monthly community meetings, and a volunteer-first culture — the engine that turns ASAAL membership into action wherever South Asian Americans live and work.',
        examples: ['Chapter development', 'Membership growth', 'Community meetings', 'Volunteer engagement'],
        icon: 'O',
        mono: 'red',
        stat: { value: '20', suffix: '', label: 'Active chapters' },
        image: 'ourwork/imgs/community-organizing.jpg',
        link: 'chapters.html',
        size: 'lg',
        bg: 'muted'
      },
      {
        id: 'coalition-building',
        num: '06',
        category: 'Coalition Building',
        title: 'Partnerships across labor, faith, and community.',
        body: 'Joint initiatives with CBTU, LCLAA, APALA, the NAACP, and hundreds of allied organizations — because no community wins alone.',
        examples: ['Joint initiatives', 'Regional coalitions', 'Cross-community work'],
        icon: 'B',
        mono: 'blue',
        stat: { value: '52', suffix: '', label: 'Active partnerships' },
        image: 'ourwork/imgs/coalition-building.jpg',
        link: '#coalition',
        size: 'compact',
        bg: 'default'
      },
      {
        id: 'community-support',
        num: '07',
        category: 'Community Support & Guidance',
        title: 'The bridge between policy and daily life.',
        body: 'Workplace guidance, immigration support, and resource referrals that meet members where they are — at the kitchen table, in the shop, on the picket line.',
        examples: ['Workplace guidance', 'Immigration support', 'Resource referrals'],
        icon: 'S',
        mono: 'saffron',
        stat: { value: '1,247', suffix: '+', label: 'Members assisted in 2025' },
        image: 'ourwork/imgs/community-support.jpg',
        link: '#support',
        size: 'compact',
        bg: 'default'
      },
      {
        id: 'cultural-unity',
        num: '08',
        category: 'Cultural & Community Unity',
        title: 'Heritage celebrated, community united.',
        body: 'Cultural programs, heritage celebrations, and cross-community gatherings that knit Afghans, Bangladeshis, Bhutanese, Indians, Maldivians, Nepalese, Pakistanis, and Sri Lankans into one diaspora movement.',
        examples: ['Cultural programs', 'Heritage celebrations', 'Community gatherings', 'Cross-cultural engagement'],
        icon: 'U',
        mono: 'ink',
        stat: { value: '80', suffix: '+', label: 'Heritage events / year' },
        image: 'ourwork/imgs/cultural-unity.jpg',
        link: 'events/index.html',
        size: 'wide',
        bg: 'muted'
      }
    ],

    /* ---- Impact metrics ------------------------------------- */
    metrics: [
      { value: '18',    suffix: '+', label: 'Years of service',        note: 'Founded 2008' },
      { value: '25',    suffix: '+', label: 'Chapters nationwide',     note: 'Plus regional working groups' },
      { value: '15',    suffix: '+', label: 'States with presence',    note: 'East coast to west coast' },
      { value: '10,000', suffix: '+', label: 'Members & counting',     note: 'Workers, professionals, families' },
      { value: '600',   suffix: '+', label: 'Community events',        note: 'Town halls, rallies, summits' },
      { value: '2.4',   suffix: 'M', label: 'Voters reached',          note: 'Federal, state & local races' },
      { value: '150',   suffix: '+', label: 'Candidates supported',    note: 'City, state, federal levels' },
      { value: '84,000', suffix: '+', label: 'Volunteer hours',        note: 'The currency of any movement' }
    ],

    /* ---- Success stories ------------------------------------ */
    stories: [
      {
        category: 'Election & Civic Impact',
        accent: 'blue',
        corner: '2008 — Present',
        title: 'Electing leaders who stand with workers.',
        body: 'From the first Asian Congresswoman from the East Coast to South Asian Americans on city councils across the country — ASAAL\'s endorsement process is one of the most rigorous in advocacy organizing.',
        items: [
          'Candidate endorsements across federal, state, and city races',
          'Voter engagement programs in language-access districts',
          'Civic participation victories under § 203'
        ],
        caption: 'Election night · ASAAL-endorsed candidate',
        image: 'ourwork/imgs/story-election.jpg',
        metaLeft: '3 federal · 11 state · 47 local wins',
        metaLink: { label: 'View timeline →', href: 'accomplishments.html' }
      },
      {
        category: 'Community Impact',
        accent: 'red',
        corner: 'Community programs',
        title: 'Showing up when families need us most.',
        body: 'From workplace clinics to immigration drop-in sessions, ASAAL chapters run year-round programs that translate national advocacy into help on the doorstep.',
        items: [
          'Community service initiatives across all chapters',
          'Direct resource distribution during workplace disputes',
          'Multi-lingual member assistance lines'
        ],
        caption: 'Community service event · multi-borough',
        image: 'ourwork/imgs/story-community.jpg',
        metaLeft: '1,247 members assisted in 2025',
        metaLink: { label: 'See programs →', href: '#' }
      },
      {
        category: 'Organizational Growth',
        accent: 'saffron',
        corner: '2008 → 2026',
        title: 'From one chapter to a national federation.',
        body: 'ASAAL has grown from a single founding chapter in 2008 into a federation spanning fifteen-plus states — adding new chapters, new leadership, and new working groups every year.',
        items: [
          'New chapters launched in five regions since 2020',
          'Year-over-year membership growth in double digits',
          'Leadership expansion through chapter summits'
        ],
        caption: 'New chapter launch ceremony',
        image: 'ourwork/imgs/story-growth.jpg',
        metaLeft: '+5 chapters · +28% members since 2022',
        metaLink: { label: 'Browse chapters →', href: 'chapters.html' }
      },
      {
        category: 'Coalition Successes',
        accent: 'ink',
        corner: 'Coalitions',
        title: 'Wins built with partners, not alone.',
        body: 'ASAAL works in coalition with CBTU, LCLAA, APALA, NAACP, faith institutions, and union locals — joint campaigns where each organization\'s strength amplifies the others\'.',
        items: [
          'Advocacy campaigns on language access & worker safety',
          'Partnerships with NY State AFL-CIO since 2017',
          'Joint community initiatives across constituency groups'
        ],
        caption: 'Coalition press conference · NY State AFL-CIO',
        image: 'ourwork/imgs/story-coalition.jpg',
        metaLeft: '52 active partners · 18 joint campaigns',
        metaLink: { label: 'Read more →', href: '#' }
      }
    ],

    /* ---- CTA ------------------------------------------------ */
    cta: {
      eyebrow: '/ 04 — Join the movement',
      title: 'The next chapter of South Asian American power is written by people like you.',
      body: 'Help strengthen South Asian American communities through leadership, advocacy, civic engagement, and community action. Pick the path that fits you — every role moves the work forward.',
      buttons: [
        { label: 'Join ASAAL',           href: 'form.html',                  variant: 'primary'     },
        { label: 'Find a chapter',       href: 'chapters.html',              variant: 'saffron'     },
        { label: 'Become a volunteer',   href: 'form.html',                  variant: 'ghost-light' },
        { label: 'Support our mission ↗', href: 'https://pay.asaal.org/',     variant: 'ghost-light', external: true }
      ],
      contact: [
        { html: 'Questions? <a href="mailto:info@asaal.org">info@asaal.org</a>' },
        { html: 'Press &amp; partnerships — <a href="mailto:press@asaal.org">press@asaal.org</a>' },
        { html: 'National office — 1-800-555-1212' }
      ]
    }
  };
})();
