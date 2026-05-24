/* ============================================================
   ASAAL — Chapters Data
   Single source of truth for ALL chapter info. Update this file
   annually (or whenever a chapter elects new leadership) and every
   page in the site rehydrates automatically:
     • chapters.html        (directory + map)
     • chapter.html?id=...  (chapter detail template)
     • leadership.html      (org chart Level 04 chapters)
     • js/chapters-map.js   (markers)

   SCHEMA per chapter:
   {
     id, name, slug,                       // identifiers
     state, region, city,                  // geography
     anchor,                               // detail page URL
     lead,                                 // one-line summary
     bannerColor?,                         // brand tint (palette key)
     founded, members,                     // hero stats
     overview,                             // 2-paragraph intro
     leadership: {                         // executive council
       president, vicePresident, secretary, treasurer,
       organizingDirector?, women?, youth?
     },
     committees: [ {name, chair, focus, count?} ],
     achievements: [ {num, label, body} ],
     gallery: [ {label, caption} ],        // placeholder slots (drop in real photos later)
     contact: { email, phone, address }
   }
   ============================================================ */
(function () {
  'use strict';

  // ---------- 1. Helpers -------------------------------------
  function person(name, opts) {
    opts = opts || {};
    return Object.assign({
      name: name,
      photo: null,        // null → branded monogram avatar fallback
      title: opts.title || null,
      bio: opts.bio || null,
      email: opts.email || null,
      phone: opts.phone || null,
      linkedin: opts.linkedin || null,
      facebook: opts.facebook || null,
      initials: name.split(/\s+/).filter(w => /^[A-Z]/.test(w[0])).slice(0,2).map(s=>s[0]).join('') || name.slice(0,2).toUpperCase()
    }, opts);
  }
  function TBA(role) {
    return person('To Be Announced', { title: role, _placeholder: true, initials: 'TB' });
  }
  // Standard placeholder committees structure when none specified
  function defaultCommittees() {
    return [
      { name: "Executive Committee",   chair: "President & Officers",  focus: "Chapter governance, planning, and oversight", count: 5 },
      { name: "Women's Committee",     chair: "—",                      focus: "Women's leadership development & advocacy",   count: 8 },
      { name: "Youth Committee",       chair: "—",                      focus: "Next-generation civic engagement",             count: 10 },
      { name: "Advisory Board",        chair: "Senior members",         focus: "Community elders & long-time members",         count: 6 }
    ];
  }
  // Standard placeholder gallery slots
  function defaultGallery(chapterName) {
    return [
      { label: "Community event",  caption: chapterName + " · Annual Iftar gathering" },
      { label: "Chapter meeting",  caption: "Monthly leadership meeting" },
      { label: "Outreach",         caption: "Voter registration drive" },
      { label: "Convention",       caption: "Delegates at the National Convention" },
      { label: "Coalition",        caption: "Joint event with allied unions" },
      { label: "Cultural",         caption: "Cultural festival booth" }
    ];
  }
  // Standard placeholder achievements when chapter-specific not provided
  function defaultAchievements() {
    return [
      { num: "8+",    label: "Events organized",  body: "Community gatherings, advocacy events, and voter drives in the past year." },
      { num: "1,200", label: "Community served",  body: "Constituents reached through outreach, education, and direct services." },
      { num: "12%",   label: "Membership growth", body: "Year-over-year growth in chapter membership." },
      { num: "3",     label: "Awards received",   body: "Civic recognition from local government and partner organizations." }
    ];
  }

  // ---------- 2. The 20 chapters ------------------------------
  const CHAPTERS = [
    // ========== NORTHEAST ==========
    {
      id: "Queens_committee",
      name: "Queens",
      slug: "queens",
      state: "NY", region: "Northeast", city: "Queens, NY",
      bannerColor: "blue",
      anchor: "chapter.html?id=Queens_committee",
      lead: "Largest NYC chapter — voter mobilization & immigrant rights",
      founded: 2009,
      members: "850+",
      overview: "ASAAL Queens is the largest and oldest of ASAAL's NYC borough chapters — anchored in the heart of South Asian Queens. From Jackson Heights to Richmond Hill, the chapter organizes voter mobilization, immigrant rights advocacy, and worker-protection campaigns across one of the most South-Asian-dense urban geographies in the country.",
      leadership: {
        president:        person("Kazi Farid Ahammad", { title: "President", bio: "President of the Queens Chapter and Immigration Director on the National Executive Council." }),
        vicePresident:    person("Omar Faroque Khasru", { title: "Vice President", bio: "VP of ASAAL Queens and Organizing Director on the National Executive Council." }),
        secretary:        TBA("Secretary"),
        treasurer:        TBA("Treasurer"),
        organizingDirector: TBA("Organizing Director")
      },
      committees: defaultCommittees(),
      achievements: [
        { num: "850+",  label: "Members",            body: "ASAAL's largest chapter by membership." },
        { num: "12+",   label: "Annual events",      body: "From Iftar gatherings to voter registration drives." },
        { num: "5K+",   label: "Voters registered",  body: "Across multiple election cycles since 2010." },
        { num: "2012",  label: "Historic first",     body: "Mobilized for Grace Meng's election as the first Asian Congresswoman from the East." }
      ],
      gallery: defaultGallery("Queens"),
      contact: { email: "queens@asaal.org", phone: "+1-718-555-0109", address: "Hollis, NY" }
    },
    {
      id: "Brooklyn_committee",
      name: "Brooklyn",
      slug: "brooklyn",
      state: "NY", region: "Northeast", city: "Brooklyn, NY",
      bannerColor: "red",
      anchor: "chapter.html?id=Brooklyn_committee",
      lead: "Brooklyn worker outreach & coalition building",
      founded: 2010,
      members: "620+",
      overview: "ASAAL Brooklyn organizes across the borough's diverse South Asian neighborhoods — from Kensington's Bangladeshi community to Midwood, Sunset Park, and Coney Island. The chapter runs voter outreach in partnership with local elected officials, coordinates union know-your-rights workshops, and represents Brooklyn workers at the National Convention.",
      leadership: {
        president:        TBA("President"),
        vicePresident:    TBA("Vice President"),
        secretary:        TBA("Secretary"),
        treasurer:        TBA("Treasurer"),
        organizingDirector: TBA("Organizing Director")
      },
      committees: defaultCommittees(),
      achievements: [
        { num: "620+", label: "Members",          body: "Active members across Brooklyn's South Asian neighborhoods." },
        { num: "10",   label: "Events organized", body: "In the past year — Iftar gatherings, candidate forums, KYR workshops." },
        { num: "3,000", label: "Outreach",        body: "Constituents engaged through tabling, canvassing, and direct services." },
        { num: "2010", label: "Founded",          body: "One of ASAAL's earliest chapters." }
      ],
      gallery: [
        { label: "Iftar gathering",          caption: "Brooklyn Chapter · Ramadan Iftar at the community center" },
        { label: "Voter registration",       caption: "Voter registration drive · Kensington" },
        { label: "Candidate forum",          caption: "City Council candidate forum hosted by Brooklyn Chapter" },
        { label: "Union KYR workshop",       caption: "Know Your Rights workshop in partnership with DC 37" },
        { label: "Coalition march",          caption: "Joint march for immigrant rights with allied organizations" },
        { label: "Convention delegation",    caption: "Brooklyn delegates at the 17th National Convention" }
      ],
      contact: { email: "brooklyn@asaal.org", phone: "+1-718-555-0110", address: "Brooklyn, NY" }
    },
    {
      id: "Bronx_committee",
      name: "Bronx",
      slug: "bronx",
      state: "NY", region: "Northeast", city: "Bronx, NY",
      bannerColor: "saffron",
      anchor: "chapter.html?id=Bronx_committee",
      lead: "Bronx-wide community organizing",
      founded: 2011,
      members: "350+",
      overview: "ASAAL Bronx organizes across the borough's South Asian, Caribbean, and Sub-Saharan diaspora communities — with a particular focus on tenant rights, healthcare access, and education advocacy. The chapter works closely with Bronx-based unions and faith communities.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Bronx"),
      contact: { email: "bronx@asaal.org", phone: "+1-718-555-0111", address: "Bronx, NY" }
    },
    {
      id: "Manhatt_committee",
      name: "Manhattan",
      slug: "manhattan",
      state: "NY", region: "Northeast", city: "Manhattan, NY",
      bannerColor: "blue",
      anchor: "chapter.html?id=Manhatt_committee",
      lead: "Manhattan civic engagement",
      founded: 2010,
      members: "410+",
      overview: "ASAAL Manhattan focuses on civic engagement, professional networking, and policy advocacy — leveraging the borough's concentration of unions, universities, and elected officials. The chapter hosts ASAAL's annual Lobby Day at the City Council and represents members working across Manhattan's service, hospitality, and healthcare sectors.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Manhattan"),
      contact: { email: "manhattan@asaal.org", phone: "+1-212-555-0101", address: "Manhattan, NY" }
    },
    {
      id: "Jackson-Heights_committee",
      name: "Jackson Heights",
      slug: "jackson-heights",
      state: "NY", region: "Northeast", city: "Jackson Heights, NY",
      bannerColor: "saffron",
      anchor: "chapter.html?id=Jackson-Heights_committee",
      lead: "Heart of South Asian Queens",
      founded: 2012,
      members: "540+",
      overview: "ASAAL Jackson Heights is the chapter at the geographic and cultural heart of South Asian New York. The 74th Street corridor and Diversity Plaza are home to thousands of ASAAL members. The chapter runs daily outreach on immigrant rights, small-business support, and access to city services in five South Asian languages.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Jackson Heights"),
      contact: { email: "jacksonheights@asaal.org", phone: "+1-718-555-0112", address: "Jackson Heights, NY" }
    },
    {
      id: "Richmond-Hill_committee",
      name: "Richmond Hill",
      slug: "richmond-hill",
      state: "NY", region: "Northeast", city: "Richmond Hill, NY",
      bannerColor: "red",
      anchor: "chapter.html?id=Richmond-Hill_committee",
      lead: "Punjabi & Bangladeshi community hub",
      founded: 2013,
      members: "470+",
      overview: "ASAAL Richmond Hill anchors organizing in one of the densest Punjabi and Bangladeshi neighborhoods in the country. The chapter focuses on small-business advocacy, gurdwara-mosque-temple coalition work, and the AD 24 / AD 27 electoral districts that ASAAL members have helped reshape.",
      leadership: {
        president: TBA("President"),
        vicePresident: TBA("Vice President"),
        secretary: TBA("Secretary"),
        treasurer: TBA("Treasurer"),
        organizingDirector: person("Rhonda Binda, Esq.", { title: "District Leader · AD 24 · ASAAL National Political Director", bio: "Member of the National Executive Council representing the Richmond Hill area." })
      },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Richmond Hill"),
      contact: { email: "richmondhill@asaal.org", phone: "+1-718-555-0113", address: "Richmond Hill, NY" }
    },
    {
      id: "Ozone-Park_committee",
      name: "Ozone Park",
      slug: "ozone-park",
      state: "NY", region: "Northeast", city: "Ozone Park, NY",
      bannerColor: "blue",
      anchor: "chapter.html?id=Ozone-Park_committee",
      lead: "Ozone Park outreach",
      founded: 2015,
      members: "320+",
      overview: "ASAAL Ozone Park works alongside the Richmond Hill chapter to organize across south Queens — building electoral muscle in AD 27 and supporting small-business owners, taxi drivers, and gig workers.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Ozone Park"),
      contact: { email: "ozonepark@asaal.org", phone: "+1-718-555-0114", address: "Ozone Park, NY" }
    },
    {
      id: "Long-Island_committee",
      name: "Long Island",
      slug: "long-island",
      state: "NY", region: "Northeast", city: "Long Island, NY",
      bannerColor: "saffron",
      anchor: "chapter.html?id=Long-Island_committee",
      lead: "Long Island chapter",
      founded: 2014,
      members: "290+",
      overview: "ASAAL Long Island serves South Asian American workers across Nassau and Suffolk counties — with particular strength among healthcare workers, teachers, and small-business owners. The chapter hosts annual networking events with the LI Federation of Labor.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Long Island"),
      contact: { email: "longisland@asaal.org", phone: "+1-516-555-0101", address: "Mineola, NY" }
    },
    {
      id: "NY-Capital_committee",
      name: "NY Capital",
      slug: "ny-capital",
      state: "NY", region: "Northeast", city: "Albany, NY",
      bannerColor: "red",
      anchor: "chapter.html?id=NY-Capital_committee",
      lead: "Albany legislative advocacy",
      founded: 2016,
      members: "180+",
      overview: "ASAAL's Capital Region chapter is the federation's eyes and ears in Albany — coordinating Lobby Days with State Assembly and Senate offices, tracking legislation, and building relationships across both chambers of the New York State Legislature.",
      leadership: {
        president: TBA("President"), vicePresident: TBA("Vice President"),
        secretary: person("Rashtab Mahmud", { title: "Corresponding Secretary · ASAAL National Corresponding Secretary" }),
        treasurer: TBA("Treasurer")
      },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("NY Capital"),
      contact: { email: "albany@asaal.org", phone: "+1-518-555-0101", address: "Albany, NY" }
    },
    {
      id: "New-Jeresy_committee",
      name: "New Jersey",
      slug: "new-jersey",
      state: "NJ", region: "Northeast", city: "Edison, NJ",
      bannerColor: "saffron",
      anchor: "chapter.html?id=New-Jeresy_committee",
      lead: "Statewide NJ chapter",
      founded: 2010,
      members: "540+",
      overview: "ASAAL New Jersey is a statewide chapter with strongholds in Edison, Jersey City, and Atlantic City. With the highest South Asian American population density of any U.S. state, NJ is home to some of ASAAL's most active electoral organizing — particularly in Middlesex and Hudson counties.",
      leadership: {
        president: person("Farook Hossain", { title: "President · ASAAL National Executive Director", bio: "President of New Jersey Chapter and Executive Director on the National Council." }),
        vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer")
      },
      committees: defaultCommittees(),
      achievements: [
        { num: "540+",  label: "Members",          body: "Across Edison, Jersey City, Atlantic City, and beyond." },
        { num: "12",    label: "Cities organized", body: "Active organizing presence in 12+ NJ municipalities." },
        { num: "2010",  label: "Founded",          body: "Among ASAAL's earliest chapters." },
        { num: "AFL-CIO", label: "Affiliation",    body: "Coordinating closely with the NJ State AFL-CIO." }
      ],
      gallery: defaultGallery("New Jersey"),
      contact: { email: "newjersey@asaal.org", phone: "+1-732-555-0101", address: "Edison, NJ" }
    },
    {
      id: "Peensylvenia_committee",
      name: "Pennsylvania",
      slug: "pennsylvania",
      state: "PA", region: "Northeast", city: "Philadelphia, PA",
      bannerColor: "blue",
      anchor: "chapter.html?id=Peensylvenia_committee",
      lead: "Philadelphia & Pittsburgh region",
      founded: 2014,
      members: "380+",
      overview: "ASAAL Pennsylvania organizes across the state's two metro areas — Philadelphia and Pittsburgh — with strong presence in healthcare, transit, and the academic sector. The chapter has been a critical battleground player in every recent statewide election.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Pennsylvania"),
      contact: { email: "pennsylvania@asaal.org", phone: "+1-215-555-0101", address: "Philadelphia, PA" }
    },

    // ========== SOUTH ==========
    {
      id: "US-Capital_committee",
      name: "U.S. Capital",
      slug: "us-capital",
      state: "DC", region: "South", city: "Washington, DC",
      bannerColor: "red",
      anchor: "chapter.html?id=US-Capital_committee",
      lead: "Federal advocacy & DC chapter",
      founded: 2017,
      members: "260+",
      overview: "ASAAL DC organizes federal-level advocacy and serves as the federation's representative on Capitol Hill. The chapter coordinates congressional visits, federal regulatory comment campaigns, and joint events with the National AFL-CIO, APALA, CBTU, and LCLAA.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Washington, DC"),
      contact: { email: "dc@asaal.org", phone: "+1-202-555-0101", address: "Washington, DC" }
    },
    {
      id: "Maryland_committee",
      name: "Maryland",
      slug: "maryland",
      state: "MD", region: "South", city: "Baltimore, MD",
      bannerColor: "saffron",
      anchor: "chapter.html?id=Maryland_committee",
      lead: "Maryland statewide",
      founded: 2018,
      members: "320+",
      overview: "ASAAL Maryland organizes across the Baltimore-DC corridor with particular strength in Montgomery and Prince George's counties. The chapter focuses on healthcare worker organizing, education policy, and state legislative advocacy in Annapolis.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Maryland"),
      contact: { email: "maryland@asaal.org", phone: "+1-301-555-0101", address: "Baltimore, MD" }
    },
    {
      id: "VIRGINIA_committee",
      name: "Virginia",
      slug: "virginia",
      state: "VA", region: "South", city: "Arlington, VA",
      bannerColor: "blue",
      anchor: "chapter.html?id=VIRGINIA_committee",
      lead: "Northern Virginia chapter",
      founded: 2019,
      members: "290+",
      overview: "ASAAL Virginia anchors in Northern Virginia (Fairfax, Arlington, Loudoun) — one of the highest-growth South Asian American regions in the country. The chapter focuses on tech-sector worker organizing, school board advocacy, and electoral mobilization in Virginia's increasingly competitive elections.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Virginia"),
      contact: { email: "virginia@asaal.org", phone: "+1-703-555-0101", address: "Arlington, VA" }
    },
    {
      id: "Georgia_committee",
      name: "Georgia",
      slug: "georgia",
      state: "GA", region: "South", city: "Atlanta, GA",
      bannerColor: "red",
      anchor: "chapter.html?id=Georgia_committee",
      lead: "Atlanta metro chapter",
      founded: 2016,
      members: "410+",
      overview: "ASAAL Georgia is the federation's anchor chapter in the Deep South — and the chapter that helped elect the first Bangladeshi-American State Senator in 2018. The chapter organizes across the Atlanta metro and the I-85 corridor, with significant presence in tech, healthcare, and small-business sectors.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(),
      achievements: [
        { num: "410+",  label: "Members",         body: "Across the Atlanta metro and I-85 corridor." },
        { num: "2018",  label: "Historic first",  body: "Elected the first Bangladeshi-American State Senator in Georgia." },
        { num: "8K+",   label: "Voters contacted", body: "Per cycle through ASAAL Georgia's mobilization program." },
        { num: "5",     label: "Counties active", body: "Fulton, DeKalb, Gwinnett, Cobb, and Forsyth." }
      ],
      gallery: defaultGallery("Georgia"),
      contact: { email: "georgia@asaal.org", phone: "+1-404-555-0101", address: "Atlanta, GA" }
    },
    {
      id: "Florida_committe",
      name: "Florida",
      slug: "florida",
      state: "FL", region: "South", city: "Tampa, FL",
      bannerColor: "saffron",
      anchor: "chapter.html?id=Florida_committe",
      lead: "Florida statewide",
      founded: 2018,
      members: "280+",
      overview: "ASAAL Florida is a statewide chapter anchored in Tampa, with active organizing in Orlando, Miami, and Jacksonville. The chapter serves a fast-growing South Asian American community in the I-4 corridor.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Florida"),
      contact: { email: "florida@asaal.org", phone: "+1-813-555-0101", address: "Tampa, FL" }
    },
    {
      id: "Houston_Texas_committee",
      name: "Houston",
      slug: "houston",
      state: "TX", region: "South", city: "Houston, TX",
      bannerColor: "blue",
      anchor: "chapter.html?id=Houston_Texas_committee",
      lead: "Houston / Texas chapter",
      founded: 2023,
      members: "210+",
      chapterType: "new",
      overview: "ASAAL Houston is one of ASAAL's newest chapters — established in 2023 to anchor the federation's expansion across the Southwest. Houston is home to one of the largest and fastest-growing South Asian American communities outside the Northeast, and the chapter focuses on healthcare worker organizing, energy-sector workers, and emerging tech.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Houston"),
      contact: { email: "houston@asaal.org", phone: "+1-713-555-0101", address: "Houston, TX" }
    },

    // ========== MIDWEST ==========
    {
      id: "Michigan_committee",
      name: "Michigan",
      slug: "michigan",
      state: "MI", region: "Midwest", city: "Detroit, MI",
      bannerColor: "red",
      anchor: "chapter.html?id=Michigan_committee",
      lead: "Michigan chapter",
      founded: 2017,
      members: "250+",
      overview: "ASAAL Michigan is the federation's only Midwest chapter — organizing across the Detroit and Hamtramck metro area, with particular focus on auto-sector workers, Bangladeshi small-business owners, and educational advocacy. The chapter works closely with the Michigan AFL-CIO.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Michigan"),
      contact: { email: "michigan@asaal.org", phone: "+1-313-555-0101", address: "Detroit, MI" }
    },

    // ========== WEST ==========
    {
      id: "LOS-ANGELES_committee",
      name: "Los Angeles",
      slug: "los-angeles",
      state: "CA", region: "West", city: "Los Angeles, CA",
      bannerColor: "saffron",
      anchor: "chapter.html?id=LOS-ANGELES_committee",
      lead: "California chapter",
      founded: 2019,
      members: "380+",
      overview: "ASAAL Los Angeles serves South Asian American workers across Southern California — from the tech corridor to the entertainment industry to the healthcare workforce that powers the LA basin. The chapter coordinates with the LA County Federation of Labor and represents the federation on the West Coast.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: defaultCommittees(), achievements: defaultAchievements(), gallery: defaultGallery("Los Angeles"),
      contact: { email: "losangeles@asaal.org", phone: "+1-213-555-0101", address: "Los Angeles, CA" }
    },

    // ========== NATIONAL (PROFESSIONAL) ==========
    {
      id: "HCP_committee",
      name: "Healthcare Professionals",
      slug: "healthcare-professionals",
      state: "—", region: "National", city: "Cross-state professional chapter",
      bannerColor: "blue",
      anchor: "chapter.html?id=HCP_committee",
      lead: "Cross-state healthcare worker chapter",
      founded: 2024,
      members: "480+",
      chapterType: "new",
      overview: "ASAAL's Healthcare Professionals chapter is the federation's first professional (non-geographic) chapter — established in 2024 to organize the thousands of South Asian American doctors, nurses, technicians, and healthcare administrators in the ASAAL membership. The chapter operates virtually with regional meetups, and partners with allied healthcare unions including 1199SEIU and the NY State Nurses Association.",
      leadership: { president: TBA("President"), vicePresident: TBA("Vice President"), secretary: TBA("Secretary"), treasurer: TBA("Treasurer") },
      committees: [
        { name: "Executive Committee", chair: "President & Officers", focus: "Chapter governance and strategy", count: 5 },
        { name: "Physicians Committee", chair: "—", focus: "MD/DO members and clinical advocacy", count: 12 },
        { name: "Nursing Committee",    chair: "—", focus: "RN/NP members and nursing workforce policy", count: 18 },
        { name: "Allied Health Committee", chair: "—", focus: "Technicians, therapists, and administrators", count: 14 }
      ],
      achievements: defaultAchievements(),
      gallery: defaultGallery("Healthcare Professionals"),
      contact: { email: "healthcare@asaal.org", phone: "+1-800-555-1212", address: "National · virtual chapter" }
    }
  ];

  // ---------- EXPORT ------------------------------------------
  window.ASAAL_CHAPTERS = CHAPTERS;
})();
