import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithRetry } from "./geminiConfig";

export const generateInterviewQuestions = async (
  genAI: GoogleGenerativeAI,
  jobDescription: string,
  role: string,
  difficulty: string = "mid"
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const difficultyPrompts = {
    entry: "Focus on fundamental concepts and basic scenarios. Questions should be suitable for candidates with 0-2 years of experience.",
    mid: "Include moderate complexity scenarios. Questions should be suitable for candidates with 3-5 years of experience.",
    senior: "Include complex scenarios and system design questions. Questions should be suitable for candidates with 6-10 years of experience.",
    lead: "Focus on leadership, system design, and strategic thinking. Questions should be suitable for candidates with 10+ years of experience.",
  };

  const prompt = `As an experienced ${role} interviewer, generate 5 interview questions based on this job description:

${jobDescription}

${difficultyPrompts[difficulty as keyof typeof difficultyPrompts]}

Consider these aspects:
1. Technical knowledge
2. Problem-solving ability
3. Design thinking
4. Communication skills
5. Past experience

Format each question with an ideal answer for evaluation. Return the response as a JSON array of objects, each with 'question' and 'answer' properties.

The questions should be challenging but answerable in 2-3 minutes each.`;

  try {
    const result = await generateWithRetry(model, prompt);
    const response = await result.response;
    const text = response.text();
    
    // Find the JSON array in the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error) {
    console.error("Error in question generation:", error);
    throw new Error("Failed to generate interview questions");
  }
};