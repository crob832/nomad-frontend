export const ISSUES = [
  {
    id: "vol4",
    slug: "vol-04-our-futures",
    title: "Vol. 04: Our Futures",
    year: "2023",
    theme: "Speculative futures, climate anxiety, and hope.",
    coverColor: "bg-ink",
    articles: [
      {
        id: 101,
        title: "The Anthropocene as a Local Reality",
        author: "Sarah Jenkins",
        tags: ["Environment", "Politics"]
      },
      {
        id: 102,
        title: "Digital Borders: Sovereignty in the Cloud",
        author: "Marcus Wei",
        tags: ["Tech", "Security"]
      },
      {
        id: 103,
        title: "Interview: Dr. Arapera Ngaha on Language Revitalization",
        author: "Nomad Editorial",
        tags: ["Interview", "Culture"]
      }
    ]
  },
  {
    id: "vol3",
    slug: "vol-03-crossing-boundaries",
    title: "Vol. 03: Crossing Boundaries",
    year: "2022",
    theme: "Transnationalism, migration, and fluid identities.",
    coverColor: "bg-brand",
    articles: [
      { id: 201, title: "Beyond the Nation State", author: "Elara Vane", tags: ["Politics"] },
      { id: 202, title: "Culinary Diaspora in Auckland", author: "James T.", tags: ["Culture", "Sociology"] }
    ]
  },
  {
    id: "vol2",
    slug: "vol-02-systems-of-power",
    title: "Vol. 02: Systems of Power",
    year: "2022",
    theme: "Analyzing hegemonic structures in the Pacific.",
    coverColor: "bg-brand-strong",
    articles: []
  },
  {
    id: "vol1",
    slug: "vol-01-inception",
    title: "Vol. 01: Inception",
    year: "2021",
    theme: "The inaugural edition of Nomad.",
    coverColor: "bg-slate-700",
    articles: []
  }
];

export const FEATURED_ARTICLES = [
  {
    id: 1,
    slug: "urban-resilience-in-the-pacific-century",
    title: "Urban Resilience in the Pacific Century",
    author: "Elena Rata",
    degree: "BA (Global Studies / Politics)",
    abstract:
      "An examination of how Suva and Auckland are adapting infrastructure for rising sea levels through indigenous knowledge frameworks.",
    category: "Environment",
    readTime: "8 min read",
    issue: "Vol. 04",
    issueSlug: "vol-04-our-futures",
    publishedAt: "2023-07-08",
    body: [
      "Resilience in Pacific urban contexts is not only an engineering question. It is also a governance question rooted in land, memory, and social trust.",
      "When climate adaptation plans are built with local communities rather than around them, infrastructure decisions become more durable and more legitimate."
    ]
  },
  {
    id: 2,
    slug: "the-soft-power-of-k-pop-in-latin-america",
    title: "The Soft Power of K-Pop in Latin America",
    author: "Liam Chen",
    degree: "BA (Global Studies / Spanish)",
    abstract:
      "Tracing the unexpected cultural bridges built by digital fandoms and their impact on diplomatic relations.",
    category: "Culture",
    readTime: "12 min read",
    issue: "Vol. 04",
    issueSlug: "vol-04-our-futures",
    publishedAt: "2023-07-04",
    body: [
      "Digital fan cultures now influence state-level narratives about trade, tourism, and cultural legitimacy.",
      "This case shows how soft power can emerge from distributed online publics rather than official cultural institutions."
    ]
  },
  {
    id: 3,
    slug: "alumni-speak-from-global-studies-to-the-un",
    title: "Alumni Speak: From Global Studies to the UN",
    author: "Nomad Editorial",
    degree: "Interview",
    abstract:
      "A conversation with 2019 graduate Aroha Smith about her pathway into international diplomacy.",
    category: "Interview",
    readTime: "15 min read",
    issue: "Vol. 03",
    issueSlug: "vol-03-crossing-boundaries",
    publishedAt: "2022-08-16",
    body: [
      "Career pathways into diplomacy are rarely linear. They are built through internships, language learning, and sustained regional knowledge.",
      "Global Studies training proved useful because it combined policy literacy with grounded cultural analysis."
    ]
  }
];

export const FEATURED_ANALYSIS_OVERRIDES = [
  {
    id: "featured-2021-trafficked-in-plain-sight",
    title: "Trafficked in Plain Sight: North Korean Women in China's Shadow Economy",
    issueYear: "2021"
  },
  {
    id: "featured-2023-global-hyperlocal",
    title: "Why the Global Is Always Hyperlocal",
    issueYear: "2023"
  },
  {
    id: "featured-2023-beyond-the-binary",
    title: "Beyond the Binary: Rethinking Colonisation and Decolonisation Globally",
    issueYear: "2023"
  }
];

export const TEAM_MEMBERS = [
  { role: "Editor-in-Chief", name: "Dulmi", major: "" }
];

export const SITE_SETTINGS = {
  siteTitle: "Nomad Journal",
  siteTagline: "Connecting the local to the global.",
  contactEmail: "contact@nomad.ac.nz",
  submissionEmail: "editor@nomadjournal.ac.nz",
  instagramUrl: "",
  linkedInUrl: "",
  homeHero: {
    badge: "Global Studies Journal",
    titleLeading: "Analyzing the",
    titleEmphasisOne: "local",
    titleMiddle: "within the",
    titleEmphasisTwo: "global",
    description:
      "Nomad is the independent, student-led publication of the University of Auckland. We showcase undergraduate research that connects personal realities to systemic forces."
  },
  mission: {
    subtitle: "Why Nomad Exists",
    title: "Beyond Assessment",
    paragraphs: [
      "Students produce major research projects near the end of their degree, but those projects often do not get read beyond assessment.",
      "Nomad was created to bring that work into public view. We are a living archive of how the student body interprets global change year over year."
    ],
    archiveCaption: "Archive: The University of Auckland",
    archiveImageUrl:
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=900&q=60"
  },
  footer: {
    summary:
      "The independent, student-led undergraduate publication of Global Studies at the University of Auckland. Connecting the local to the global."
  },
  defaultSeo: {
    title: "Nomad Journal",
    description: "Student-led Global Studies publication.",
    ogImageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=60"
  }
};

export const ABOUT_PAGE = {
  subtitle: "About Us",
  title: "Connecting Communities",
  paragraphs: [
    "Nomad is an independent, student-led undergraduate publication tied to Global Studies at the University of Auckland. Our main purpose is to showcase student academic work and connect the Global Studies community - students, staff, alumni, and prospective students.",
    "Nomad functions as a public mirror of the programme. It demonstrates the interdisciplinary identity of Global Studies by showcasing work across different majors and area studies. It reinforces the idea that the degree is not only theoretical - it generates analysis of real global issues with local-to-global framing."
  ],
  boardYearLabel: "2026 Editorial Board"
};

export const PAST_EDITORIAL_TEAMS = [
  {
    year: "2025",
    roles: [
      { label: "Editor-in-Chief", names: ["Oliver Meade"] },
      {
        label: "Editors",
        names: [
          "Fleur Buckrell",
          "Seth Quinlivan-Potts",
          "Arama Laborde",
          "Kiri Littlejohn",
          "Samuel Clarke",
          "Grace Lockwood",
          "Freda Prak",
          "Zachary Penn"
        ]
      },
      { label: "Cover Design", names: ["Oliver Meade"] }
    ]
  },
  {
    year: "2024",
    roles: [
      { label: "Editor-in-Chief", names: ["Victor Wei"] },
      { label: "Executive Editors", names: ["Charlotte Parker", "Jessica Cordes", "Siena Thompson"] },
      {
        label: "Editors",
        names: ["Albert Nguyen", "Ayla Yeoman", "Isla Patricia Killalea", "Frances Bobbitt", "Ruby Sattler", "Ofa Soakimi"]
      },
      { label: "Cover Design", names: ["Siena Thompson"] }
    ]
  },
  {
    year: "2023",
    roles: [
      { label: "Editor-in-Chief", names: ["Ayla Yeoman"] },
      {
        label: "Editors",
        names: [
          "Chris Bae",
          "Donovan Kelso",
          "Frances Bobbitt",
          "Harim Kim",
          "Jess Cordes",
          "Lydia Hayden",
          "Ofa Soakimi",
          "Ruby Sattler",
          "Sarah Dreadon",
          "Siena Thompson"
        ]
      },
      { label: "Cover Design", names: ["Chris Bae", "Siena Thompson"] }
    ]
  },
  {
    year: "2022",
    roles: [
      { label: "Editor-in-Chief", names: ["Samantha Fei"] },
      { label: "Executive Editors", names: ["Jade Cross", "Victor Wei"] },
      {
        label: "Academic Editors",
        names: ["Jessica Cordes", "Shanaya Crasto", "Jade Cross", "Margo Esler", "Charlotte Parker"]
      },
      { label: "Creative Editors", names: ["Yvette Brennan", "Katalina Chung", "Victor Wei"] },
      { label: "Graphic Designers", names: ["Maddie McHardy", "Samantha Fei", "Siena Thompson"] },
      { label: "Cover Design", names: ["Siena Thompson"] }
    ]
  },
  {
    year: "2021",
    roles: [
      { label: "Editor-in-Chief", names: ["Kimberly Thio"] },
      { label: "Executive Editors", names: ["Eli Pettersen", "Jade Cross", "Samantha Fei", "Victor Wei"] },
      { label: "Graphic & Cover Design", names: ["Samantha Fei"] }
    ]
  }
];

export const CONTRIBUTE_PAGE = {
  heading: "Contribute to Nomad",
  intro:
    "We welcome thoughtful, globally oriented writing from any University of Auckland student. Nomad is a platform for intelligent discourse, not just a student blog.",
  sectionHeading: "What we look for",
  sectionCopy:
    "A good submission engages thoughtfully with global themes, offering original and critical insight into issues that connect local and international contexts. We publish academic essays, adapted coursework (Capstones, Global 300), interviews, and analytical reflections.",
  processHeading: "The Editorial Process",
  processCopy:
    "Nomad operates on a curated model. If your abstract or draft is selected, you will be paired with an editor to refine your argument, tone, and formatting before publication. This is a collaborative process designed to strengthen your academic voice.",
  guidelinesHeading: "Submission Guidelines",
  guidelines: [
    { key: "length", label: "Length", copy: "1,000 - 2,500 words." },
    { key: "format", label: "Format", copy: "Word document (.docx)." },
    { key: "details", label: "Details", copy: "Title page must include name and degree." },
    { key: "referencing", label: "Referencing", copy: "APA 7th Edition style is mandatory." }
  ],
  submissionSubjectTemplate: "NOMAD SUBMISSION - [Last Name] - [Short Title]"
};
