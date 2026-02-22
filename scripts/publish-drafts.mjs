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

function sanitizeDocForWrite(doc, newId) {
  const clone = { ...doc, _id: newId };
  delete clone._rev;
  delete clone._createdAt;
  delete clone._updatedAt;
  return clone;
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
  const drafts = await client.fetch('*[_id in path("drafts.**")]');

  if (!Array.isArray(drafts) || drafts.length === 0) {
    console.log("No drafts found.");
    return;
  }

  for (const draft of drafts) {
    const publishedId = draft._id.replace(/^drafts\./, "");
    const publishedDoc = sanitizeDocForWrite(draft, publishedId);

    await client.transaction().createOrReplace(publishedDoc).delete(draft._id).commit();
    console.log(`Published ${draft._type}: ${publishedId}`);
  }

  console.log(`Published ${drafts.length} draft document(s).`);
}

run().catch((error) => {
  console.error("Failed to publish drafts:", error);
  process.exit(1);
});
