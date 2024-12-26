import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithRetry } from "@/utils/geminiConfig";

interface Question {
  question: string;
  answer: string;
}

export const generateInterviewQuestions = async (
  genAI: GoogleGenerativeAI,
  jobDescription: string,
  role: string
): Promise<Question[]> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are an interviewer for a ${role} position.
  Based on this job description: "${jobDescription}"
  
  Generate 5 relevant technical interview questions with their ideal answers.
  Format the response as a JSON array with this exact structure:
  [{"question": "First question here", "answer": "First answer here"},{"question": "Second question here", "answer": "Second answer here"}]`;
  
  const result = await generateWithRetry(model, prompt);
  const response = await result.response;
  const text = response.text();
  
  const jsonMatch = text.match(/\[.*\]/s);
  if (!jsonMatch) {
    throw new Error("No valid JSON array found in response");
  }
  
  const cleanedText = jsonMatch[0]
    .replace(/[\n\r\t]/g, ' ')
    .replace(/,\s*]/g, ']')
    .replace(/\s+/g, ' ')
    .trim();
  
  const parsedQuestions = JSON.parse(cleanedText);
  
  if (!Array.isArray(parsedQuestions)) {
    throw new Error("Response is not an array");
  }
  
  const validQuestions = parsedQuestions
    .filter(q => 
      typeof q === 'object' && 
      q !== null && 
      typeof q.question === 'string' && 
      typeof q.answer === 'string' &&
      q.question.trim() !== '' && 
      q.answer.trim() !== ''
    )
    .slice(0, 5);
  
  if (validQuestions.length === 0) {
    throw new Error("No valid questions found in response");
  }
  
  return validQuestions;
};