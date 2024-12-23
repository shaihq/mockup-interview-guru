export const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text);
    };
    reader.readAsText(file);
  });
};

export const generatePersonalizedPrompt = (
  candidateResume: string,
  interviewerResume: string,
  role: string,
  round: string
): string => {
  return `You are conducting a design interview for the role of ${role} in the ${round} round. 
  
  Here is the candidate's resume: ${candidateResume}
  
  You are taking on the persona of the interviewer with this background: ${interviewerResume}
  
  Based on both resumes, generate exactly 5 relevant interview questions that:
  1. Connect to the candidate's specific experience
  2. Reflect your perspective as the interviewer based on your background
  3. Focus on design principles, process, and problem-solving
  4. Are relevant to the ${role} position
  
  Return the response in this exact format (no markdown, just pure JSON):
  [
    {
      "question": "Given your experience with [specific project from resume], how would you approach...",
      "answer": "A strong answer would include..."
    },
    // ... 4 more similar objects
  ]`;
};