import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateFeedbackPrompt } from "./feedbackPrompt";

export const handleFeedbackGeneration = async (
  role: string,
  questions: { question: string; answer: string }[],
  userAnswers: string[],
  genAI: GoogleGenerativeAI
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = generateFeedbackPrompt(role, questions, userAnswers);
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response received from the API");
    }

    // Find the JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const cleanedResponse = jsonMatch[0]
      .replace(/[\n\r\t]/g, ' ')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/:\s*,/g, ': null,') // Handle empty values
      .trim();
    
    // Validate JSON structure
    JSON.parse(cleanedResponse); // This will throw if invalid
    return cleanedResponse;
  } catch (error) {
    console.error("Error in feedback generation:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate valid feedback: ${error.message}`);
    }
    throw new Error("Failed to generate valid feedback");
  }
};