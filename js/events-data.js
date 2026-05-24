/* ============================================================
   ASAAL — Events Data
   Single source of truth for ALL ASAAL events. Powers:
     • events/index.html  (full hub)
     • index.html#events  (homepage preview)
     • chapter.html       (per-chapter event feeds)
     • convention/2026/   (cross-promotion)

   SCHEMA per event:
   {
     id, slug,                              // identifiers
     title, lede,                           // copy
     category,                              // one of CATEGORY_KEYS
     date,  endDate?,                       // ISO date strings (event-local day)
     time,                                  // human time string
     city, state, venue,                    // location
     chapter,                               // chapter name (null for national)
     audience: 'public'|'members'|'invite',
     featured?: true,                       // promote to top of lists
     soldOut?: true,
     status: 'open'|'soldOut'|'invite'|'past',
     registerUrl?,                          // call-to-action URL
     detailUrl?,                            // landing page URL
     blurb                                  // short description
   }
   ============================================================ */
(function () {
  'use strict';

  // ----- Categories -----------------------------------------
  const CATEGORIES = [
    {
      key: 'national',
      label: 'National Events',
      eyebrow: 'National',
      color: 'var(--asaal-red)',
      tint: 'var(--asaal-red-tint)',
      summary: 'Convention, national meetings, leadership summits.',
      items: ['Convention', 'National Meetings', 'Leadership Summits'],
      symbol: 'N'
    },
    {
      key: 'chapter',
      label: 'Chapter Events',
      eyebrow: 'Chapters',
      color: 'var(--asaal-blue)',
      tint: 'var(--asaal-blue-tint)',
      summary: 'Community meetings, meet & greets, networking.',
      items: ['Community Meetings', 'Meet & Greet with Politicians', 'Networking'],
      symbol: 'C'
    },
    {
      key: 'advocacy',
      label: 'Advocacy',
      eyebrow: 'Advocacy',
      color: 'var(--asaal-saffron-deep)',
      tint: 'var(--asaal-saffron-tint)',
      summary: 'Voter registration, civic engagement, labor advocacy.',
      items: ['Voter Registration', 'Civic Engagement', 'Labor Advocacy'],
      symbol: 'A'
    },
    {
      key: 'youth',
      label: 'Youth Programs',
      eyebrow: 'Youth',
      color: '#0A6D58',
      tint: 'rgba(10,109,88,.10)',
      summary: 'Leadership development, career workshops, mentorship.',
      items: ['Leadership Development', 'Career Workshops', 'Mentorship'],
      symbol: 'Y'
    },
    {
      key: 'women',
      label: "Women's Programs",
      eyebrow: 'Women',
      color: '#7A1F4E',
      tint: 'rgba(122,31,78,.10)',
      summary: 'Leadership forums, community initiatives, networking.',
      items: ['Leadership Forums', 'Community Initiatives', 'Networking'],
      symbol: 'W'
    },
    {
      key: 'cultural',
      label: 'Cultural Events',
      eyebrow: 'Cultural',
      color: '#B87412',
      tint: 'rgba(184,116,18,.10)',
      summary: 'South Asian heritage, festivals, gatherings.',
      items: ['South Asian Heritage', 'Festivals', 'Community Gatherings'],
      symbol: 'F'
    },
    {
      key: 'service',
      label: 'Community Service',
      eyebrow: 'Service',
      color: '#2B5E8A',
      tint: 'rgba(43,94,138,.10)',
      summary: 'Volunteer programs, food drives, charity initiatives.',
      items: ['Volunteer Programs', 'Food Drives', 'Charity Initiatives'],
      symbol: 'S'
    }
  ];

  // ----- Events ----------------------------------------------
  // June 2026 → April 2027 schedule. Anchored to the 18th National
  // Convention (July 18–20, Atlantic City) as the flagship.
  const EVENTS = [
    // ── JUNE 2026 ──────────────────────────────────────────
    {
      id: 'e-2026-06-07-naturalization',
      title: 'Citizenship & Naturalization Clinic',
      category: 'advocacy',
      date: '2026-06-07', time: '10:00 AM',
      city: 'Jackson Heights', state: 'NY', venue: 'JHCC Community Hall',
      chapter: 'Jackson Heights Committee', audience: 'public', status: 'open',
      blurb: 'Free legal help with USCIS forms, English-language coaching, and N-400 pre-screening — staffed by volunteer attorneys.'
    },
    {
      id: 'e-2026-06-13-youth-leadership',
      title: 'Youth Leadership Workshop',
      category: 'youth',
      date: '2026-06-13', time: '1:00 PM',
      city: 'Atlanta', state: 'GA', venue: 'Atlanta Chapter HQ',
      chapter: 'Georgia Committee', audience: 'public', status: 'open',
      featured: true,
      blurb: 'A full-day workshop for South Asian high-school and college students. Civic literacy, public speaking, and a Q&A with state legislators.'
    },
    {
      id: 'e-2026-06-18-bronx-meeting',
      title: 'Bronx Chapter Monthly Meeting',
      category: 'chapter',
      date: '2026-06-18', time: '7:00 PM',
      city: 'Bronx', state: 'NY', venue: 'Bronx Library Center',
      chapter: 'Bronx Committee', audience: 'members', status: 'open',
      blurb: 'Standing chapter meeting. Officer reports, summer outreach planning, and a brief from the National Executive Council.'
    },
    {
      id: 'e-2026-06-22-vrx-houston',
      title: 'Voter Registration Drive — Houston',
      category: 'advocacy',
      date: '2026-06-22', time: '9:00 AM',
      city: 'Houston', state: 'TX', venue: 'Hillcroft Plaza',
      chapter: 'Houston Texas Committee', audience: 'public', status: 'open',
      blurb: 'Multilingual voter registration in Bangla, Hindi, Urdu, and Nepali. Materials provided. Walk-in volunteers welcome.'
    },
    {
      id: 'e-2026-06-27-women-forum-la',
      title: "Women's Leadership Forum — West Coast",
      category: 'women',
      date: '2026-06-27', time: '6:30 PM',
      city: 'Los Angeles', state: 'CA', venue: 'LA Chapter Office',
      chapter: 'Los Angeles Committee', audience: 'public', status: 'open',
      blurb: 'Quarterly forum focused on workplace harassment, equal pay, and immigrant women in the labor force.'
    },

    // ── JULY 2026 — CONVENTION MONTH ───────────────────────
    {
      id: 'e-2026-07-11-pre-conv-mixer',
      title: 'Pre-Convention Delegate Mixer',
      category: 'national',
      date: '2026-07-11', time: '7:00 PM',
      city: 'Queens', state: 'NY', venue: 'Diversity Plaza',
      chapter: 'Queens Committee', audience: 'members', status: 'open',
      blurb: 'A casual meet-up the week before the National Convention for NYC-area delegates and first-time attendees.'
    },
    {
      id: 'e-2026-07-18-convention',
      title: '18th National Convention',
      category: 'national',
      date: '2026-07-18', endDate: '2026-07-20', time: '2:00 PM',
      city: 'Atlantic City', state: 'NJ', venue: 'Sheraton Atlantic City',
      chapter: null, audience: 'members', status: 'open',
      featured: true,
      registerUrl: '../form.html',
      detailUrl: '../convention/2026/index.html',
      blurb: 'Three days. Twenty chapters. Ten thousand members. The largest annual gathering of South Asian American labor in the United States.'
    },
    {
      id: 'e-2026-07-19-gala',
      title: 'Awards & Recognition Gala',
      category: 'national',
      date: '2026-07-19', time: '7:00 PM',
      city: 'Atlantic City', state: 'NJ', venue: 'Sheraton Grand Ballroom',
      chapter: null, audience: 'invite', status: 'invite',
      detailUrl: '../invitationCard2024.html',
      blurb: 'Black-tie evening honoring the organizers, members, and elected allies whose work made the year possible. By invitation.'
    },

    // ── AUGUST ─────────────────────────────────────────────
    {
      id: 'e-2026-08-08-summit',
      title: 'Chapter Leadership Summit',
      category: 'national',
      date: '2026-08-08', time: '10:00 AM',
      city: 'Virtual', state: 'US', venue: 'Online (all 20 chapters)',
      chapter: null, audience: 'members', status: 'open',
      featured: true,
      blurb: 'Half-day virtual training for chapter officers — governance, budgeting, member engagement, and the 2026–27 strategy roll-out.'
    },
    {
      id: 'e-2026-08-15-iftar-recap',
      title: 'Independence Day Community Picnic',
      category: 'cultural',
      date: '2026-08-15', time: '11:00 AM',
      city: 'Edison', state: 'NJ', venue: 'Roosevelt Park',
      chapter: 'New Jersey Committee', audience: 'public', status: 'open',
      blurb: "A family picnic marking India, Pakistan, and Bangladesh independence days. Music, food, kids' programming."
    },
    {
      id: 'e-2026-08-22-meet-greet-philly',
      title: 'Meet & Greet — State Rep. Philadelphia',
      category: 'chapter',
      date: '2026-08-22', time: '6:00 PM',
      city: 'Philadelphia', state: 'PA', venue: 'Sangam Hall',
      chapter: 'Pennsylvania Committee', audience: 'public', status: 'open',
      blurb: 'Informal conversation with State Rep. on the priorities of the South Asian working-class district she represents.'
    },
    {
      id: 'e-2026-08-29-fooddrive-queens',
      title: 'Back-to-School Food & Supply Drive',
      category: 'service',
      date: '2026-08-29', time: '10:00 AM',
      city: 'Queens', state: 'NY', venue: 'Diversity Plaza',
      chapter: 'Queens Committee', audience: 'public', status: 'open',
      blurb: 'Distributing backpacks, school supplies, and groceries to 500+ families ahead of the new school year. Volunteers needed.'
    },

    // ── SEPTEMBER ──────────────────────────────────────────
    {
      id: 'e-2026-09-04-labor-day',
      title: 'Labor Day Mobilization',
      category: 'advocacy',
      date: '2026-09-04', time: '11:00 AM',
      city: 'New York', state: 'NY', venue: 'Multi-borough march & rally',
      chapter: null, audience: 'public', status: 'open',
      featured: true,
      blurb: 'ASAAL marches with the NY State AFL-CIO. Staging in Queens, Brooklyn, and Manhattan. Buses provided from all NYC chapters.'
    },
    {
      id: 'e-2026-09-12-mentor',
      title: 'Career Mentorship Mixer',
      category: 'youth',
      date: '2026-09-12', time: '3:00 PM',
      city: 'Long Island City', state: 'NY', venue: 'Verifone Pavilion',
      chapter: 'Long Island Committee', audience: 'public', status: 'open',
      blurb: 'Pair college students and early-career members with senior professionals across law, finance, healthcare, and tech.'
    },
    {
      id: 'e-2026-09-20-vrx-fl',
      title: 'Statewide Voter Registration Day — FL',
      category: 'advocacy',
      date: '2026-09-20', time: '8:00 AM',
      city: 'Tampa', state: 'FL', venue: '7 sites across Hillsborough County',
      chapter: 'Florida Committee', audience: 'public', status: 'open',
      blurb: 'Coordinated registration push at temples, mosques, and South Asian grocery stores. Materials in 5 languages.'
    },
    {
      id: 'e-2026-09-26-coalition',
      title: 'Coalition Roundtable — CBTU · LCLAA · APALA',
      category: 'advocacy',
      date: '2026-09-26', time: '1:00 PM',
      city: 'Washington', state: 'DC', venue: 'AFL-CIO HQ',
      chapter: 'US Capital Committee', audience: 'invite', status: 'invite',
      blurb: 'Quarterly working session with sister constituency groups on joint federal-policy priorities.'
    },

    // ── OCTOBER ────────────────────────────────────────────
    {
      id: 'e-2026-10-04-women-forum-natl',
      title: "Women's National Leadership Forum",
      category: 'women',
      date: '2026-10-04', endDate: '2026-10-05', time: '9:00 AM',
      city: 'Washington', state: 'DC', venue: 'Hyatt Regency on Capitol Hill',
      chapter: null, audience: 'members', status: 'soldOut', soldOut: true,
      featured: true,
      blurb: 'Two-day national forum bringing together 200+ women members. Speakers from Congress, organized labor, and academia.'
    },
    {
      id: 'e-2026-10-11-michigan-mtg',
      title: 'Michigan Chapter Monthly Meeting',
      category: 'chapter',
      date: '2026-10-11', time: '6:30 PM',
      city: 'Detroit', state: 'MI', venue: 'Hamtramck Community Center',
      chapter: 'Michigan Committee', audience: 'members', status: 'open',
      blurb: 'Officer reports and a vote on the chapter\'s 2027 budget.'
    },
    {
      id: 'e-2026-10-17-diwali',
      title: 'Diwali Cultural Celebration',
      category: 'cultural',
      date: '2026-10-17', time: '5:00 PM',
      city: 'Iselin', state: 'NJ', venue: 'Royal Albert\'s Palace',
      chapter: 'New Jersey Committee', audience: 'public', status: 'open',
      featured: true,
      blurb: 'Festival of lights celebration — performances, food stalls, kids\' rangoli, and a community-service drive.'
    },
    {
      id: 'e-2026-10-24-hcw-rally',
      title: 'Healthcare Workers Solidarity Rally',
      category: 'advocacy',
      date: '2026-10-24', time: '12:00 PM',
      city: 'New York', state: 'NY', venue: 'NYC City Hall steps',
      chapter: 'HCP Committee', audience: 'public', status: 'open',
      blurb: 'ASAAL Healthcare Professionals chapter rallies alongside 1199SEIU on safe staffing legislation.'
    },

    // ── NOVEMBER ───────────────────────────────────────────
    {
      id: 'e-2026-11-07-csm',
      title: 'Community Service Month — Kickoff',
      category: 'service',
      date: '2026-11-07', time: '9:00 AM',
      city: 'Multi-chapter', state: 'US', venue: '20 chapters · simultaneous',
      chapter: null, audience: 'public', status: 'open',
      featured: true,
      blurb: 'Month-long ASAAL initiative — every chapter runs at least one volunteer project. Kickoff service projects on day one.'
    },
    {
      id: 'e-2026-11-14-mentor-bk',
      title: 'Brooklyn Youth Career Workshop',
      category: 'youth',
      date: '2026-11-14', time: '2:00 PM',
      city: 'Brooklyn', state: 'NY', venue: 'Brooklyn Public Library',
      chapter: 'Brooklyn Committee', audience: 'public', status: 'open',
      blurb: 'Resume reviews, mock interviews, and a panel with South Asian professionals across five industries.'
    },
    {
      id: 'e-2026-11-21-thanks-drive',
      title: 'Thanksgiving Food Drive — National',
      category: 'service',
      date: '2026-11-21', time: '8:00 AM',
      city: 'Multi-chapter', state: 'US', venue: '14 chapters participating',
      chapter: null, audience: 'public', status: 'open',
      blurb: 'Collecting and distributing 5,000 holiday meal kits across 14 chapters. Volunteers needed at every site.'
    },

    // ── DECEMBER ───────────────────────────────────────────
    {
      id: 'e-2026-12-06-civic-fl',
      title: 'Civic Engagement Workshop — FL',
      category: 'advocacy',
      date: '2026-12-06', time: '10:00 AM',
      city: 'Tampa', state: 'FL', venue: 'University Area Community Center',
      chapter: 'Florida Committee', audience: 'public', status: 'open',
      blurb: 'How to testify at a public hearing, write to your representative, and organize your block.'
    },
    {
      id: 'e-2026-12-13-toy-drive',
      title: 'Holiday Toy & Coat Drive',
      category: 'service',
      date: '2026-12-13', time: '11:00 AM',
      city: 'Maryland', state: 'MD', venue: 'Baltimore Chapter Hall',
      chapter: 'Maryland Committee', audience: 'public', status: 'open',
      blurb: 'Donations distributed to 200+ families. Drop-off, sort, or volunteer at delivery routes.'
    },
    {
      id: 'e-2026-12-19-yearend',
      title: 'Year-End Member Reception',
      category: 'chapter',
      date: '2026-12-19', time: '7:00 PM',
      city: 'Queens', state: 'NY', venue: 'Sagar Restaurant',
      chapter: 'Queens Committee', audience: 'members', status: 'open',
      blurb: 'Casual member gathering — share wins from 2026, preview 2027, and welcome new chapter officers.'
    },

    // ── JANUARY 2027 ───────────────────────────────────────
    {
      id: 'e-2027-01-10-new-year',
      title: 'New Year Strategy Retreat',
      category: 'national',
      date: '2027-01-10', endDate: '2027-01-11', time: '9:00 AM',
      city: 'Tarrytown', state: 'NY', venue: 'Tarrytown House Estate',
      chapter: null, audience: 'invite', status: 'invite',
      blurb: 'Annual two-day retreat for the National Executive Council, chapter presidents, and committee chairs.'
    },
    {
      id: 'e-2027-01-24-mlk',
      title: 'MLK Day of Service',
      category: 'service',
      date: '2027-01-24', time: '10:00 AM',
      city: 'Multi-chapter', state: 'US', venue: '20 chapters · simultaneous',
      chapter: null, audience: 'public', status: 'open',
      blurb: 'Service projects, voter-engagement events, and a national livestreamed program honoring Dr. King.'
    },

    // ── FEBRUARY ───────────────────────────────────────────
    {
      id: 'e-2027-02-14-vrx-ga',
      title: 'Atlanta Civic Engagement Day',
      category: 'advocacy',
      date: '2027-02-14', time: '9:00 AM',
      city: 'Atlanta', state: 'GA', venue: 'GA State Capitol',
      chapter: 'Georgia Committee', audience: 'public', status: 'open',
      blurb: 'Lobby visits with the Georgia delegation on language access, immigration, and worker protections.'
    },

    // ── MARCH ──────────────────────────────────────────────
    {
      id: 'e-2027-03-08-iwd',
      title: "International Women's Day Forum",
      category: 'women',
      date: '2027-03-08', time: '5:00 PM',
      city: 'New York', state: 'NY', venue: 'CUNY Graduate Center',
      chapter: null, audience: 'public', status: 'open',
      blurb: 'Panel and reception featuring South Asian women labor leaders, with breakout sessions on policy and organizing.'
    },

    // ── APRIL ──────────────────────────────────────────────
    {
      id: 'e-2027-04-11-baisakhi',
      title: 'Baisakhi & Spring Cultural Festival',
      category: 'cultural',
      date: '2027-04-11', time: '12:00 PM',
      city: 'Richmond Hill', state: 'NY', venue: 'Phil Rizzuto Park',
      chapter: 'Richmond Hill Committee', audience: 'public', status: 'open',
      blurb: 'Punjabi New Year and broader spring festival — bhangra performances, langar (community meal), kids\' programming.'
    },
  ];

  // ----- Past events (archives) ------------------------------
  const ARCHIVES = [
    { year: 2025, title: '17th National Convention', city: 'Washington, DC', date: 'July 12–14, 2025', attendees: '2,100+', photos: 480, videos: 18, press: 6 },
    { year: 2024, title: '16th National Convention', city: 'Queens, NY',     date: 'July 19–21, 2024', attendees: '1,950+', photos: 412, videos: 14, press: 9 },
    { year: 2023, title: '15th National Convention', city: 'Atlanta, GA',    date: 'July 14–16, 2023', attendees: '1,720+', photos: 360, videos: 11, press: 5 },
    { year: 2022, title: '14th National Convention', city: 'Atlantic City',  date: 'July 22–24, 2022', attendees: '1,540+', photos: 295, videos:  9, press: 4 },
    { year: 2025, title: 'Community Programs',      city: 'Nationwide',     date: '12 months',        attendees: '8,400+', photos: 1240, videos: 32, press: 11 },
    { year: 2025, title: 'Leadership Meetings',     city: 'Nationwide',     date: '4 quarterly',      attendees: '420+',  photos: 88, videos:  4, press: 2 },
    { year: 2024, title: 'Advocacy Campaigns',      city: 'Nationwide',     date: '12 months',        attendees: '15,000+', photos: 920, videos: 24, press: 18 },
  ];

  // ----- State activity (for map) ----------------------------
  // Derived from the EVENTS array; surfaced here for the map module.
  const STATE_ACTIVITY = [
    { state: 'New York',      code: 'NY', upcoming: 12, chapters: 9, color: 'red' },
    { state: 'New Jersey',    code: 'NJ', upcoming:  8, chapters: 1, color: 'red' },
    { state: 'Pennsylvania',  code: 'PA', upcoming:  5, chapters: 1, color: 'blue' },
    { state: 'Maryland',      code: 'MD', upcoming:  4, chapters: 1, color: 'blue' },
    { state: 'Virginia',      code: 'VA', upcoming:  3, chapters: 1, color: 'blue' },
    { state: 'DC',            code: 'DC', upcoming:  4, chapters: 1, color: 'red' },
    { state: 'Georgia',       code: 'GA', upcoming:  6, chapters: 1, color: 'red' },
    { state: 'Florida',       code: 'FL', upcoming:  4, chapters: 1, color: 'blue' },
    { state: 'Texas',         code: 'TX', upcoming:  3, chapters: 1, color: 'blue' },
    { state: 'Michigan',      code: 'MI', upcoming:  3, chapters: 1, color: 'blue' },
    { state: 'California',    code: 'CA', upcoming:  5, chapters: 1, color: 'red' }
  ];

  // ----- Impact metrics --------------------------------------
  const IMPACT = [
    { num: 150, suffix: '+', label: 'Events per year' },
    { num:  25, suffix: '+', label: 'Active chapters' },
    { num:  15, suffix: '+', label: 'States with activity' },
    { num: 2000, suffix: '+', label: 'Annual participants' },
    { num:  50, suffix: '+', label: 'Community partners' }
  ];

  // Expose globally
  window.ASAAL_EVENTS_DATA = {
    CATEGORIES: CATEGORIES,
    EVENTS: EVENTS,
    ARCHIVES: ARCHIVES,
    STATE_ACTIVITY: STATE_ACTIVITY,
    IMPACT: IMPACT
  };
})();
