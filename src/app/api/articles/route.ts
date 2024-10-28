import { NextResponse } from "next/server";
import { getArticleInfoList } from "@/api/notion";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const role = searchParams.get("role");

  try {
    const { articles, nextCursor } = await getArticleInfoList(
      cursor as string,
      false,
      role as string | undefined
    );
    return NextResponse.json({ articles, nextCursor });
  } catch (error) {
    console.error("API Error:", error);
  }
}
