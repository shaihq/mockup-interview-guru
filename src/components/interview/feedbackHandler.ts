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
    
    // Find the JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const cleanedResponse = jsonMatch[0]
      .replace(/[\n\r\t]/g, ' ')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .trim();
    
    // Validate JSON structure
    JSON.parse(cleanedResponse); // This will throw if invalid
    return cleanedResponse;
  } catch (error) {
    console.error("Error in feedback generation:", error);
    throw new Error("Failed to generate valid feedback");
  }
};