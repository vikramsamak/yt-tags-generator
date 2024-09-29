import { ApiResponse } from "@/types/Types";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const res: ApiResponse = await axios.get(
      process.env.YT_TAG_API_URL as string,
      {
        params: { title },
      }
    );

    return NextResponse.json({ tags: res.data.tags });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
