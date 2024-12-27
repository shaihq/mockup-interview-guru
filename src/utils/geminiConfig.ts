import { GoogleGenerativeAI } from "@google/generative-ai";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createGeminiClient = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

export const generateWithRetry = async (
  model: any,
  prompt: string,
  retryCount = 0
): Promise<any> => {
  try {
    // Optimized configuration for faster and more focused responses
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.8,
      maxOutputTokens: 8192,
      candidateCount: 1,
      stopSequences: ["</response>"],
    };

    // Use structured format for better response handling
    const result = await model.generateContent({
      contents: [{ 
        role: "user", 
        parts: [{ text: prompt }]
      }],
      generationConfig,
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE",
        },
      ],
    });

    return result;
  } catch (error: any) {
    console.error("Generation error:", error);
    
    if (error?.status === 429 && retryCount < MAX_RETRIES) {
      await sleep(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      return generateWithRetry(model, prompt, retryCount + 1);
    }
    throw error;
  }
};