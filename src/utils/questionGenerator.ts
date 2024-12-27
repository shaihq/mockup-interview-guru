import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithRetry } from "@/utils/geminiConfig";

interface Question {
  question: string;
  answer: string;
}

export const generateInterviewQuestions = async (
  genAI: GoogleGenerativeAI,
  jobDescription: string,
  role: string,
  questionCount: number = 5,
  difficulty: string = "intermediate"
): Promise<Question[]> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are conducting a ${difficulty}-level technical interview for a ${role} position.
  Based on this job description: "${jobDescription}"
  
  Generate ${questionCount} highly specific and challenging interview questions with detailed model answers.
  Focus on real-world scenarios and practical challenges.
  
  For beginner level: Focus on fundamental concepts and basic problem-solving
  For intermediate level: Include system design and complex workflow scenarios
  For advanced level: Focus on architecture decisions, trade-offs, and enterprise-level challenges
  
  Make questions very specific to the role and avoid generic questions.
  Include questions about:
  - Technical skills specific to ${role}
  - Problem-solving methodology
  - System design and architecture
  - Past project experiences
  - Decision-making processes
  
  Format the response as a JSON array with this exact structure:
  [{"question": "Detailed question here", "answer": "Comprehensive answer including evaluation criteria"}]
  
  Each answer should include:
  - Key points that must be covered
  - Common pitfalls to avoid
  - Best practices to mention
  - Examples or scenarios to illustrate
  `;
  
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
    .slice(0, questionCount);
  
  if (validQuestions.length === 0) {
    throw new Error("No valid questions found in response");
  }
  
  return validQuestions;
};