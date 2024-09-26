import keywordExtractor from "keyword-extractor";
import { NextRequest, NextResponse } from "next/server";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import nlp from "compromise";
import axios from "axios";

// Initialize Wink NLP model
const wink = winkNLP(model);

// Step 1: Generate keywords from text using Wink NLP
function generateNLPKeywords(title: string): string[] {
  const doc = wink.readDoc(title);
  const terms = doc
    .tokens()
    .filter((token) => {
      const pos = token.out(wink.its.pos);
      return pos === "NOUN" || pos === "VERB"; // Filter nouns and verbs
    })
    .out();
  return terms.map((term) => term.toLowerCase()).slice(0, 30); // Get top 30 terms
}

// Step 2: Keyword extraction using `keyword-extractor`
function generateExtractedKeywords(title: string): string[] {
  const extractionResult = keywordExtractor.extract(title, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });
  return extractionResult.map((keyword) => keyword.toLowerCase()).slice(0, 30); // Get top 30 keywords
}

// Step 3: Generate key phrases using Compromise
function generateCompromiseKeywords(title: string): string[] {
  const doc = nlp(title);
  return doc
    .nouns()
    .out("array")
    .map((noun: string) => noun.toLowerCase())
    .slice(0, 30); // Get top 30 nouns
}

// Step 4: Fetch suggestions from Google Suggest API
async function fetchGoogleSuggestions(query: string): Promise<string[]> {
  try {
    const response = await axios.get(
      `http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
        query
      )}`
    );
    const suggestions = response.data[1]; // Extract suggestions from the response
    return suggestions.map((suggestion: string) => suggestion.toLowerCase());
  } catch (error) {
    console.error("Failed to fetch suggestions from Google", error);
    return [];
  }
}

// Step 5: Combine all sources and remove duplicates
async function generateAccurateTags(title: string): Promise<string[]> {
  const nlpKeywords = generateNLPKeywords(title);
  const extractedKeywords = generateExtractedKeywords(title);
  const compromiseKeywords = generateCompromiseKeywords(title);
  const googleSuggestions = await fetchGoogleSuggestions(title);

  // Combine all keywords and remove duplicates
  const combinedKeywords = [
    ...new Set([
      ...nlpKeywords,
      ...extractedKeywords,
      ...compromiseKeywords,
      ...googleSuggestions,
    ]),
  ];
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

    const tags = await generateAccurateTags(title);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
