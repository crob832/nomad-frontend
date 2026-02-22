import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const issueDocs = [
  {
    _id: "issue-vol4",
    _type: "issue",
    title: "Vol. 04: Our Futures",
    slug: { _type: "slug", current: "vol-04-our-futures" },
    volume: 4,
    year: "2023",
    theme: "Speculative futures, climate anxiety, and hope.",
    coverTint: "bg-emerald-900",
    featured: true,
    publishedAt: "2023-07-01T00:00:00.000Z"
  },
  {
    _id: "issue-vol3",
    _type: "issue",
    title: "Vol. 03: Crossing Boundaries",
    slug: { _type: "slug", current: "vol-03-crossing-boundaries" },
    volume: 3,
    year: "2022",
    theme: "Transnationalism, migration, and fluid identities.",
    coverTint: "bg-orange-800",
    featured: false,
    publishedAt: "2022-07-01T00:00:00.000Z"
  },
  {
    _id: "issue-vol2",
    _type: "issue",
    title: "Vol. 02: Systems of Power",
    slug: { _type: "slug", current: "vol-02-systems-of-power" },
    volume: 2,
    year: "2022",
    theme: "Analyzing hegemonic structures in the Pacific.",
    coverTint: "bg-slate-800",
    featured: false,
    publishedAt: "2022-03-01T00:00:00.000Z"
  },
  {
    _id: "issue-vol1",
    _type: "issue",
    title: "Vol. 01: Inception",
    slug: { _type: "slug", current: "vol-01-inception" },
    volume: 1,
    year: "2021",
    theme: "The inaugural edition of Nomad.",
    coverTint: "bg-stone-800",
    featured: false,
    publishedAt: "2021-07-01T00:00:00.000Z"
  }
];

const articleDocs = [
  {
    _id: "article-urban-resilience",
    _type: "article",
    title: "Urban Resilience in the Pacific Century",
    slug: { _type: "slug", current: "urban-resilience-in-the-pacific-century" },
    authorName: "Elena Rata",
    authorDegree: "BA (Global Studies / Politics)",
    abstract:
      "An examination of how Suva and Auckland are adapting infrastructure for rising sea levels through indigenous knowledge frameworks.",
    category: "Environment",
    readTime: "8 min read",
    issue: { _type: "reference", _ref: "issue-vol4" },
    featured: true,
    publishedAt: "2023-07-08T00:00:00.000Z",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Resilience in Pacific urban contexts is not only an engineering question. It is also a governance question rooted in land, memory, and social trust."
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "When climate adaptation plans are built with local communities rather than around them, infrastructure decisions become more durable and more legitimate."
          }
        ]
      }
    ]
  },
  {
    _id: "article-kpop-soft-power",
    _type: "article",
    title: "The Soft Power of K-Pop in Latin America",
    slug: { _type: "slug", current: "the-soft-power-of-k-pop-in-latin-america" },
    authorName: "Liam Chen",
    authorDegree: "BA (Global Studies / Spanish)",
    abstract:
      "Tracing the unexpected cultural bridges built by digital fandoms and their impact on diplomatic relations.",
    category: "Culture",
    readTime: "12 min read",
    issue: { _type: "reference", _ref: "issue-vol4" },
    featured: true,
    publishedAt: "2023-07-04T00:00:00.000Z",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Digital fan cultures now influence state-level narratives about trade, tourism, and cultural legitimacy."
          }
        ]
      }
    ]
  },
  {
    _id: "article-alumni-speak",
    _type: "article",
    title: "Alumni Speak: From Global Studies to the UN",
    slug: { _type: "slug", current: "alumni-speak-from-global-studies-to-the-un" },
    authorName: "Nomad Editorial",
    authorDegree: "Interview",
    abstract:
      "A conversation with 2019 graduate Aroha Smith about her pathway into international diplomacy.",
    category: "Interview",
    readTime: "15 min read",
    issue: { _type: "reference", _ref: "issue-vol3" },
    featured: true,
    publishedAt: "2022-08-16T00:00:00.000Z",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Career pathways into diplomacy are rarely linear. They are built through internships, language learning, and sustained regional knowledge."
          }
        ]
      }
    ]
  }
];

const teamDocs = [
  {
    _id: "team-dulmi",
    _type: "teamMember",
    name: "Dulmi",
    role: "Editor-in-Chief",
    major: "",
    displayOrder: 1,
    active: true
  }
];

const singletonDocs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Nomad Journal",
    siteTagline: "Connecting the local to the global.",
    contactEmail: "contact@nomad.ac.nz",
    submissionEmail: "editor@nomadjournal.ac.nz",
    footerSummary:
      "The independent, student-led undergraduate publication of Global Studies at the University of Auckland. Connecting the local to the global.",
    homeHero: {
      _type: "homeHero",
      badge: "Global Studies Journal",
      titleLeading: "Analyzing the",
      titleEmphasisOne: "local",
      titleMiddle: "within the",
      titleEmphasisTwo: "global",
      description:
        "Nomad is the independent, student-led publication of the University of Auckland. We showcase undergraduate research that connects personal realities to systemic forces."
    },
    mission: {
      _type: "mission",
      subtitle: "Why Nomad Exists",
      title: "Beyond Assessment",
      paragraphs: [
        "Students produce major research projects near the end of their degree, but those projects often do not get read beyond assessment.",
        "Nomad was created to bring that work into public view. We are a living archive of how the student body interprets global change year over year."
      ],
      archiveCaption: "Archive: Global Studies Cohort, 2023"
    },
    defaultSeo: {
      _type: "defaultSeo",
      title: "Nomad Journal",
      description: "Student-led Global Studies publication."
    }
  },
  {
    _id: "pageAbout",
    _type: "pageAbout",
    subtitle: "About Us",
    title: "Connecting Communities",
    paragraphs: [
      "Nomad is an independent, student-led undergraduate publication tied to Global Studies at the University of Auckland. Our main purpose is to showcase student academic work and connect the Global Studies community - students, staff, alumni, and prospective students.",
      "Nomad functions as a public mirror of the programme. It demonstrates the interdisciplinary identity of Global Studies by showcasing work across different majors and area studies. It reinforces the idea that the degree is not only theoretical - it generates analysis of real global issues with local-to-global framing."
    ],
    boardYearLabel: "2026 Editorial Board"
  },
  {
    _id: "pageContribute",
    _type: "pageContribute",
    heading: "Contribute to Nomad",
    intro:
      "We welcome thoughtful, globally oriented writing from any University of Auckland student. Nomad is a platform for intelligent discourse, not just a student blog.",
    sectionHeading: "What we look for",
    sectionCopy:
      "A good submission engages thoughtfully with global themes, offering original and critical insight into issues that connect local and international contexts. We publish academic essays, adapted coursework (Capstones, Global 300), interviews, and analytical reflections.",
    guidelinesHeading: "Submission Guidelines",
    guidelines: [
      { _type: "guidelineItem", key: "length", label: "Length", copy: "1,000 - 2,500 words." },
      { _type: "guidelineItem", key: "format", label: "Format", copy: "Word document (.docx)." },
      {
        _type: "guidelineItem",
        key: "details",
        label: "Details",
        copy: "Title page must include name and degree."
      },
      {
        _type: "guidelineItem",
        key: "referencing",
        label: "Referencing",
        copy: "APA 7th Edition style is mandatory."
      }
    ],
    processHeading: "The Editorial Process",
    processCopy:
      "Nomad operates on a curated model. If your abstract or draft is selected, you will be paired with an editor to refine your argument, tone, and formatting before publication. This is a collaborative process designed to strengthen your academic voice.",
    submissionSubjectTemplate: "NOMAD SUBMISSION - [Last Name] - [Short Title]",
    submissionEmail: "editor@nomadjournal.ac.nz"
  }
];

async function upsertDocuments(docs) {
  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`Seeded ${doc._type}: ${doc._id}`);
  }
}

async function run() {
  await upsertDocuments(issueDocs);
  await upsertDocuments(articleDocs);
  await upsertDocuments(teamDocs);
  await upsertDocuments(singletonDocs);
}

run()
  .then(() => {
    console.log("CMS seed complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
