import keywordExtractor from "keyword-extractor";
import { NextRequest, NextResponse } from "next/server";

function generateTagsFromTitle(title: string) {
  const extractionResult = keywordExtractor.extract(title, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  return extractionResult.slice(0, 10);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const tags = generateTagsFromTitle(title);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
