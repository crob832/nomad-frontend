import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  draftMode().disable();
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || "/";

  return NextResponse.redirect(new URL(slug, url.origin));
}
