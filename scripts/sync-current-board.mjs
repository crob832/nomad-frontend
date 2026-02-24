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

async function run() {
  await client
    .patch("pageAbout")
    .set({ boardYearLabel: "2026 Editorial Board" })
    .setIfMissing({
      subtitle: "About Us",
      title: "Connecting Communities",
      paragraphs: []
    })
    .commit();

  const teamIds = await client.fetch('*[_type=="teamMember"]._id');
  for (const id of teamIds) {
    if (id !== "team-dulmi") {
      await client.patch(id).set({ active: false }).commit();
    }
  }

  await client.createOrReplace({
    _id: "team-dulmi",
    _type: "teamMember",
    name: "Dulmi De Silva",
    role: "Editor-in-Chief",
    major: "",
    displayOrder: 1,
    active: true
  });

  console.log("Updated board label to 2026 and set only Dulmi De Silva as active team member.");
}

run().catch((error) => {
  console.error("Failed to sync current board:", error);
  process.exit(1);
});
