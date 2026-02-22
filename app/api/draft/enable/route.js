import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") || "/";

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid preview secret." }, { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(slug, url.origin));
}
