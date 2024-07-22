import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function tryParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Initial JSON parse failed, attempting to fix the JSON string");
    // Try to extract the JSON object from the text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON");
      }
    }
    return null;
  }
}

export async function generateContent(year) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Provide a list of 5 scientific, historical, or widely accepted concepts that were considered factual or true in ${year} AND WERE TAUGHT IN SCHOOLS but have since been conclusively disproven or significantly revised. Return the results in the following JSON format:

  {
    "results": [
      {
        "oldConcept": "Brief description of the concept as understood in ${year}",
        "newUnderstanding": "Current understanding or replacement concept",
        "yearRevised": "Approximate year when the significant change in understanding occurred",
        "explanation": "Brief explanation of the evidence or discoveries that led to the revision",
        "implications": "Notable implications or consequences of this change in understanding"
      }
    ]
  }

  ONLY PRESENT 10 SPECIFIC FACTS WHICH HAVE been verifiable false now, but were taught in schools as true in that year, and may have now have changed our understanding across various fields, including natural sciences, medical sciences, social sciences, historical interpretations, and technological assumptions. Prioritize examples that have had significant impacts on their respective fields or on society at large. ONLY OUTPUT THE JSON DIRECTLY, DO NOT USE CODEBLOCK SYNTAX OR FORMATTING BEFORE.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  const parsedData = tryParseJSON(text);
  
  if (parsedData && parsedData.results) {
    return parsedData;
  } else {
    console.error('Failed to parse or extract valid JSON from the response');
    return { results: [] };
  }
}