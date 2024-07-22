import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function tryParseJSON(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Initial JSON parse failed, attempting to fix the JSON string");
      // Attempt to extract the JSON object from the text
      const match = text.match(/\[.*?\]/s);
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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Provide a list of 10 scientific, historical, or widely accepted concepts that were taught as factual or true and TAUGHT IN SCHOOLS up to ${year} (inclusive) but have been ENTIRELY disproven or completely revised AFTER ${year}. Please do not include any facts that were outdated in or before that year, only the ones considered outdated after that year. Display each result as follows (please do not give the json markdown codeblock syntax, just output json as plaintext):

oldConcept: Brief description of the concept as understood and taught in schools up to ${year}
newUnderstanding: Current understanding or replacement concept
yearRevised: Approximate year when the significant change in understanding occurred (must be after ${year})
explanation: Brief explanation of the evidence or discoveries that led to the complete disproof or revision
implications: Notable implications or consequences of this change in understanding

IMPORTANT CRITERIA:
1. ONLY include facts that were taught as true in schools up to ${year} and were ENTIRELY disproven or completely revised AFTER ${year}.
2. Do not include partially revised concepts or those still under debate.
3. Prioritize examples that have had significant impacts on their respective fields or on society at large.
4. Include only changes that are widely accepted by the relevant scientific or academic communities.
5. Only include facts that have been thoroughly peer-reviewed or verified through multiple independent studies or sources.
6. Avoid controversial or still-debated topics.
7. Focus on clear-cut cases where the previous understanding has been definitively overturned or substantially modified.

PROVIDE THE RESULTS IN THE EXACT FORMAT SPECIFIED ABOVE AS A JSON ARRAY, WITHOUT ANY ADDITIONAL TEXT OR CODEBLOCK FORMATTING.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  const parsedData = tryParseJSON(text);

  if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
    return parsedData;
  } else {
    console.error('Failed to parse or extract valid JSON from the response');
    const parsedData = JSON.parse(jsonString);
    console.log('Parsed data:', parsedData);
    console.log(text);
    return [];
  }
}
