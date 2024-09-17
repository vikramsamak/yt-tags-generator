import keywordExtractor from "keyword-extractor";
import { NextRequest, NextResponse } from "next/server";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

// Initialize Wink NLP model
const nlp = winkNLP(model);

// Step 1: Generate keywords from text using wink-nlp
function generateNLPKeywords(title: string): string[] {
  const doc = nlp.readDoc(title);
  const terms = doc
    .tokens()
    .filter((token) => {
      const pos = token.out(nlp.its.pos);
      return pos === "NOUN" || pos === "VERB"; // Filter nouns and verbs
    })
    .out();
  return terms.slice(0, 30); // Get top 30 terms
}

// Step 2: Keyword extraction using `keyword-extractor`
function generateExtractedKeywords(title: string): string[] {
  const extractionResult = keywordExtractor.extract(title, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  return extractionResult.slice(0, 30); // Get top 30 keywords
}

// Step 3: Combine both approaches and remove duplicates
function generateAccurateTags(title: string): string[] {
  const nlpKeywords = generateNLPKeywords(title);
  const extractedKeywords = generateExtractedKeywords(title);

  // Combine both and remove duplicates
  const combinedKeywords = [...new Set([...nlpKeywords, ...extractedKeywords])];
  return combinedKeywords.slice(0, 30); // Return top 30 combined tags
}

// Next.js API route for generating tags
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const tags = generateAccurateTags(title);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
