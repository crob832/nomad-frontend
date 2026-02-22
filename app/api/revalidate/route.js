import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function isAuthorized(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  return Boolean(process.env.SANITY_REVALIDATE_SECRET && token === process.env.SANITY_REVALIDATE_SECRET);
}

function tagsFromPayload(payload) {
  const tags = new Set();
  tags.add("settings");

  if (payload?._type === "issue") {
    tags.add("issues");
  }
  if (payload?._type === "article") {
    tags.add("articles");
    tags.add("featured-articles");
  }
  if (payload?._type === "teamMember") {
    tags.add("team");
  }
  if (payload?._type === "pageAbout") {
    tags.add("about");
  }
  if (payload?._type === "pageContribute") {
    tags.add("contribute");
  }

  return Array.from(tags);
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, message: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const tags = tagsFromPayload(payload);

  tags.forEach((tag) => revalidateTag(tag));
  revalidatePath("/");
  revalidatePath("/issues");
  revalidatePath("/about");
  revalidatePath("/contribute");

  if (payload?.slug?.current) {
    if (payload?._type === "issue") {
      revalidatePath(`/issues/${payload.slug.current}`);
    }
    if (payload?._type === "article") {
      revalidatePath(`/articles/${payload.slug.current}`);
    }
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    type: payload?._type || null,
    slug: payload?.slug?.current || null
  });
}
