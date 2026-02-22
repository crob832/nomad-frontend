import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const ISSUES_DIR = path.join(process.cwd(), "issues");

function safePdfName(input) {
  if (!input) {
    return null;
  }

  const base = path.basename(input);
  if (base !== input) {
    return null;
  }

  if (!/\.pdf$/i.test(base)) {
    return null;
  }

  return base;
}

export async function GET(request) {
  const url = new URL(request.url);
  const name = safePdfName(url.searchParams.get("name"));

  if (!name) {
    return NextResponse.json({ message: "Invalid file name." }, { status: 400 });
  }

  const filePath = path.join(ISSUES_DIR, name);

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${name}"`,
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch {
    return NextResponse.json({ message: "Issue file not found." }, { status: 404 });
  }
}
