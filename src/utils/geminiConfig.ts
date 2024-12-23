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
    const result = await model.generateContent(prompt);
    return result;
  } catch (error: any) {
    if (error?.status === 429 && retryCount < MAX_RETRIES) {
      await sleep(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      return generateWithRetry(model, prompt, retryCount + 1);
    }
    throw error;
  }
};