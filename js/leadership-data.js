/* ============================================================
   ASAAL — Leadership Data
   Single source of truth for ALL leadership rosters.
   Update this file annually after each National Convention.
   Used by:
     • leadership.html             (national landing)
     • executive-council.html      (full directory)
     • profile-*.html              (individual bio pages)
     • Org chart                   (interactive hierarchy)
   ============================================================ */
(function () {
  'use strict';

  // ---------- 1. FOUNDER & PRESIDENT EMERITUS -----------------
  const FOUNDER = {
    id: "maf-misbah-uddin",
    slug: "maf-misbah-uddin",
    name: "Maf Misbah Uddin",
    initials: "MU",
    title: "Founder & National President Emeritus",
    titleShort: "Founder · President Emeritus",
    photo: null,                                  // null → branded monogram fallback
    affiliations: [
      "President, Local 1407",
      "Treasurer, DC 37",
      "NYS AAPI Commission Member"
    ],
    yearsOfService: "2008 – present",
    profileUrl: "profile-maf-misbah-uddin.html",
    quote: "Our community deserves an independent voice at the union hall, the community board, and the chambers of elected officials. ASAAL is that voice — and it began with the conviction that no one is coming to speak for us. We have to speak for ourselves.",
    bioPreview: "In 2008, Maf Misbah Uddin founded the Alliance of South Asian American Labor — the first and only national organization of the South Asian diaspora in America. From a single chapter in Queens, his vision grew into a 20-chapter federation across 11 states. As President of Local 1407 and Treasurer of DC 37, he brought to ASAAL the discipline of organized labor and the conviction that working people, organized together, are the engine of every just movement.",
    accomplishmentsSummary: [
      "Founded ASAAL in 2008 as the first national South Asian American labor organization",
      "Led affiliation with the NY State AFL-CIO (2017) — joining a 2.5M-member federation",
      "Expanded ASAAL from one chapter to 20 chapters across 11 states",
      "Appointed to the New York State AAPI Commission",
      "Treasurer of DC 37 — the largest municipal employees union in NYC"
    ]
  };

  // ---------- 2. CURRENT NATIONAL PRESIDENT --------------------
  const PRESIDENT = {
    id: "mohammed-karim-chowdhury",
    slug: "mohammed-karim-chowdhury",
    name: "Mohammed Karim Chowdhury",
    initials: "MC",
    title: "National President",
    titleShort: "National President",
    photo: null,
    affiliations: [
      "Member, Richmond County Democratic Committee",
      "Member, Mayoral Transition Team"
    ],
    yearsOfService: "2008 – present (Trustee · Officer · President)",
    profileUrl: "profile-mohammed-karim-chowdhury.html",
    quote: "Our future depends on what we build now — chapter by chapter, voter by voter, contract by contract. The next generation of South Asian American leaders is already here. Our job is to make room for them at every table.",
    visionStatement: "Under Mohammed Karim Chowdhury's leadership, ASAAL is investing in the next generation — expanding the Youth Committee, deepening chapter infrastructure across the South and Midwest, and strengthening the legislative pipeline that has already produced the first Asian Congresswoman from the East and the first Bangladeshi-American State Senator.",
    bioPreview: "Mohammed Karim Chowdhury serves as ASAAL's National President, carrying forward the founding vision into a new era of growth. A member of the Richmond County Democratic Committee and the Mayoral Transition Team, he brings deep electoral experience to a movement that has helped elect South Asians at the City, State, and Federal levels. He is also a Trustee of the national organization — a sign of continuity between the founding generation and the leadership of today.",
    initiatives: [
      "Expanding the Youth Committee scholarship program (10+ scholars in 2025)",
      "Launching new chapter pipelines in the South and Midwest",
      "Strengthening the legislative endorsement process for 2026 cycle",
      "Deepening coalition work with CBTU, LCLAA, APALA, and the NAACP"
    ]
  };

  // ---------- 3. EXECUTIVE OFFICERS (the rest of the Council) -
  // Order reflects organizational protocol.
  const EXECUTIVE_OFFICERS = [
    {
      id: "jamilla-uddin",
      name: "Jamilla A. Uddin",
      initials: "JU",
      title: "Executive Vice President",
      photo: null,
      affiliations: [
        "NY State Committee Woman in AD 24",
        "Community Liaison · Assemblywoman in AD 25"
      ]
    },
    {
      id: "harjit-minhas",
      name: "Harjit Minhas",
      initials: "HM",
      title: "Secretary General",
      photo: null,
      affiliations: [
        "Ex-Secretary, Queens Chapter",
        "Ex-Executive Board Member, Local 1407"
      ]
    },
    {
      id: "rashtab-mahmud",
      name: "Rashtab Mahmud",
      initials: "RM",
      title: "Corresponding Secretary",
      photo: null,
      affiliations: [
        "Corresponding Secretary, Capital Region"
      ]
    },
    {
      id: "jed-matalon",
      name: "Jed M. Matalon",
      initials: "JM",
      title: "Treasurer",
      photo: null,
      affiliations: [
        "Vice President, Local 1407"
      ]
    },
    {
      id: "farook-hossain",
      name: "Farook Hossain",
      initials: "FH",
      title: "Executive Director",
      photo: null,
      affiliations: [
        "President, New Jersey Chapter",
        "Organizer, UNITE HERE Local 54"
      ]
    },
    {
      id: "omar-faroque-khasru",
      name: "Omar Faroque Khasru",
      initials: "OK",
      title: "Organizing Director",
      photo: null,
      affiliations: [
        "Vice President, ASAAL Queens"
      ]
    },
    {
      id: "adan-islam",
      name: "Adan Islam",
      initials: "AI",
      title: "Women's Committee Chair",
      photo: null,
      affiliations: [
        "Member, State Council on Developmental Disabilities"
      ]
    },
    {
      id: "kazi-farid-ahammad",
      name: "Kazi Farid Ahammad",
      initials: "KA",
      title: "Immigration Director",
      photo: null,
      affiliations: [
        "President, Queens Chapter"
      ]
    },
    {
      id: "rhonda-binda",
      name: "Rhonda Binda, Esq.",
      initials: "RB",
      title: "Political Director",
      photo: null,
      affiliations: [
        "District Leader, AD 24",
        "Ex-Deputy, Queens Borough President's Office"
      ]
    }
  ];

  // ---------- 4. VICE PRESIDENTS ------------------------------
  const VICE_PRESIDENTS = [
    "Nazmul Hasan Manik", "Ibrahim Barobhuya", "Syed T. Haque",
    "Md. Alauddin", "Mashud R. Topan", "ASM Mayen Uddin",
    "Santanu Barua", "Sharafat Hussain Babu", "Sultana Khanam",
    "Duke Khan", "Nahidul Khan Shahel", "Tanjina Islam",
    "Nayeem L. Choudhury", "Md. Sayed Ali Reza", "Mahabube Khan",
    "Minhaj Russell Chowdhury", "Syed Shahid", "Mohammed Akbar Hussain",
    "Ketan Parmer", "Prof. Mizanur Rahman", "Dr. Hasan Ahmed",
    "Irshad Sheikh, Pharm.D.", "Hasan Chowdhury", "Mizanur Rahman",
    "Khurshed Sabbir", "Masba Uddin", "Zakir Hossain",
    "Mohammad Kabir", "Mir Salauddin", "Dr. Mohammed Islam",
    "Dr. Shahriar Chowdhury", "Dr. Zainal Abedin", "Majib Siddiquee, MBA",
    "Shah Mohammed Golamkader", "Md. Kamal Uddin (Buthu)", "Somnath Ghimire",
    "Chhiring Rapke Lama", "Kazi Zahidul Islam", "Dr. Abdullah Al-Mahmoud"
  ];

  // ---------- 5. TRUSTEES -------------------------------------
  const TRUSTEES = [
    "Mr. Aziz Ahmad",
    "Shah M. Newaz, MBA",
    "Prof. Mohsin Patwary, Ph.D.",
    "Prof. Golam Chowdhury Iqbal, Ph.D.",
    "Abu Liaquat Hussain",
    "Mohammed Karim Chowdhury",
    "Maf Misbah Uddin"
  ];

  // ---------- 6. WOMEN'S COMMITTEE ----------------------------
  const WOMENS_COMMITTEE = {
    chair: "Adan Islam",
    members: [
      "Hasina Murshida Shefa", "Sultana Khanam", "Dr. Mriam Singh",
      "Dr. Nargis Ahmed", "Sahana Begum", "Farhana Ahmed",
      "Dr. Shahina N. Huq", "Tahmina Yasmin", "Ferdousi Akter",
      "Ummay Jannatul Ferdous", "Ianitha Rajakauna", "Sabiha Sultana Jani",
      "Tahmina Begum", "Afruza Begum Beli", "Shamima Nasreen",
      "Shelina Ahmed", "Tonu Hasan", "Mahmuda Begum",
      "Parvin Banu", "Dalia Parvin", "Rowshan Uddin",
      "Shahanara Mazumder", "Saifun Naher", "Helena Kamal",
      "Roushan Begum", "Tanjina Islam", "Afsana Akter Bebe",
      "Mosammat Nahar", "Jasmine L. Robinson", "Badrun N. Khan"
    ]
  };

  // ---------- 7. YOUTH COMMITTEE ------------------------------
  // "**" suffix = Scholarship winner (per source document)
  const YOUTH_COMMITTEE = {
    director:        { name: "Mahtab Khan",          scholarshipWinner: false },
    coDirector:      { name: "Meahrab Hossain Asif", scholarshipWinner: false },
    deputyDirector:  { name: "Suhana Wasika",        scholarshipWinner: false },
    members: [
      { name: "Sarah Wasika",         scholarshipWinner: true  },
      { name: "Leehan M. Islam",      scholarshipWinner: true  },
      { name: "Asheq Arafath Uddin",  scholarshipWinner: false },
      { name: "Mahdi Wadud",          scholarshipWinner: true  },
      { name: "Mohammed Shamim",      scholarshipWinner: false },
      { name: "Tabassum Toma",        scholarshipWinner: true  },
      { name: "Anwarul Uddin",        scholarshipWinner: false },
      { name: "Nafeeza Ahmed",        scholarshipWinner: false },
      { name: "Mahmudul Hasan",       scholarshipWinner: false },
      { name: "Mohammed Hoque",       scholarshipWinner: false },
      { name: "Fatin Ishteaque",      scholarshipWinner: false },
      { name: "Afnan Joarder",        scholarshipWinner: true  },
      { name: "Md. Ismail Hossain",   scholarshipWinner: false },
      { name: "Hashemul Khan",        scholarshipWinner: false },
      { name: "Junaed Iqbal",         scholarshipWinner: false },
      { name: "Adhora N. Kazi",       scholarshipWinner: false },
      { name: "Mohammed Sakeeb Khan", scholarshipWinner: false },
      { name: "Omar Khan",            scholarshipWinner: false },
      { name: "Kazi Tiaba Islam",     scholarshipWinner: false }
    ]
  };

  // ---------- 8. NATIONAL COMMITTEES METADATA -----------------
  const NATIONAL_COMMITTEES = [
    {
      id: "trustees",
      name: "Board of Trustees",
      role: "Fiduciary oversight, strategic guidance, institutional memory",
      count: TRUSTEES.length,
      anchor: "executive-council.html#trustees"
    },
    {
      id: "womens",
      name: "Women's Committee",
      role: "Empowerment, leadership development, advocacy for South Asian women",
      count: 1 + WOMENS_COMMITTEE.members.length,
      anchor: "executive-council.html#womens"
    },
    {
      id: "youth",
      name: "Youth Committee",
      role: "Next-generation leadership, scholarships, civic engagement",
      count: 3 + YOUTH_COMMITTEE.members.length,
      anchor: "executive-council.html#youth"
    },
    {
      id: "vps",
      name: "Vice Presidents",
      role: "Cross-chapter coordination, professional & regional representation",
      count: VICE_PRESIDENTS.length,
      anchor: "executive-council.html#vps"
    }
  ];

  // ---------- EXPORT ------------------------------------------
  window.ASAAL_LEADERSHIP = {
    founder: FOUNDER,
    president: PRESIDENT,
    executiveOfficers: EXECUTIVE_OFFICERS,
    vicePresidents: VICE_PRESIDENTS,
    trustees: TRUSTEES,
    womensCommittee: WOMENS_COMMITTEE,
    youthCommittee: YOUTH_COMMITTEE,
    nationalCommittees: NATIONAL_COMMITTEES,
    // The whole executive council (Founder + President + 9 officers) — convenient combined list
    fullExecutiveCouncil: [FOUNDER, PRESIDENT, ...EXECUTIVE_OFFICERS]
  };

  // ---------- HELPERS (rendering primitives) ------------------
  // Branded monogram avatar — falls back gracefully when photo is null/missing.
  // Color is deterministic from the name so the same person always gets the same swatch.
  window.ASAAL_avatar = function (person, opts) {
    opts = opts || {};
    const size  = opts.size  || 'md';                          // 'sm' | 'md' | 'lg' | 'xl'
    const shape = opts.shape || 'square';                      // 'square' | 'circle'
    const photo = person && person.photo;
    const initials = (person && person.initials)
      ? person.initials
      : (person && person.name ? person.name.split(/\s+/).filter(w=>/^[A-Z]/.test(w[0])).slice(0,2).map(s=>s[0]).join('') : '··');
    // Deterministic palette pick
    const palettes = ['blue', 'red', 'saffron', 'ink'];
    let h = 0;
    const seed = (person && person.name) || '';
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const palette = palettes[h % palettes.length];

    if (photo) {
      return `<div class="avatar avatar--${size} avatar--${shape} avatar--photo">
        <img src="${photo}" alt="Portrait of ${person.name}">
      </div>`;
    }
    return `<div class="avatar avatar--${size} avatar--${shape} avatar--${palette}" role="img" aria-label="${person.name||'Member'} (initials avatar)">
      <span class="avatar__initials">${initials}</span>
      <span class="avatar__corner" aria-hidden="true"></span>
    </div>`;
  };
})();
