import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { LOCAL_IMAGE_ASSETS } from "@/lib/localAssets";

const ASSETS_DIR = path.join(process.cwd(), "images");

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

function getAssetFileName(key) {
  if (!key) {
    return null;
  }

  return LOCAL_IMAGE_ASSETS[key] || null;
}

export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const fileName = getAssetFileName(key);

  if (!fileName) {
    return NextResponse.json({ message: "Unknown asset key." }, { status: 400 });
  }

  const absolutePath = path.join(ASSETS_DIR, fileName);
  const extension = path.extname(fileName).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";

  try {
    const buffer = await fs.readFile(absolutePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch {
    return NextResponse.json({ message: "Asset not found." }, { status: 404 });
  }
}
