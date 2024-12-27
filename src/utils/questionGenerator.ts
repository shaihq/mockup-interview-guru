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
  
  Format the response EXACTLY as a JSON array with this structure:
  [
    {
      "question": "detailed question text",
      "answer": "comprehensive answer including key points and evaluation criteria"
    }
  ]
  
  Each answer MUST include:
  - Key points that must be covered
  - Common pitfalls to avoid
  - Best practices to mention
  - Examples or scenarios to illustrate
  
  DO NOT include any text outside the JSON array.`;
  
  try {
    const result = await generateWithRetry(model, prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response received from the API");
    }

    // Find the JSON array in the response using a more robust regex
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      console.error("Raw API response:", text);
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
    
    // Validate each question object
    const validQuestions = parsedQuestions
      .filter((q): q is Question => {
        const isValid = 
          typeof q === 'object' && 
          q !== null && 
          typeof q.question === 'string' && 
          typeof q.answer === 'string' &&
          q.question.trim() !== '' && 
          q.answer.trim() !== '';
        
        if (!isValid) {
          console.warn("Invalid question object:", q);
        }
        return isValid;
      })
      .slice(0, questionCount);
    
    if (validQuestions.length === 0) {
      console.error("Parsed response:", parsedQuestions);
      throw new Error("No valid questions found in response");
    }
    
    if (validQuestions.length < questionCount) {
      console.warn(`Only generated ${validQuestions.length} valid questions out of ${questionCount} requested`);
    }
    
    return validQuestions;
  } catch (error) {
    console.error("Error in question generation:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
    throw new Error("Failed to generate questions");
  }
};