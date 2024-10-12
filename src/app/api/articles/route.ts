import { NextResponse } from "next/server";
import { getArticleInfoList } from "@/api/notion";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  try {
    const { articles, nextCursor } = await getArticleInfoList(cursor as string);
    return NextResponse.json({ articles, nextCursor });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
