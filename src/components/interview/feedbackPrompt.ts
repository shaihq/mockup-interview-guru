export const generateFeedbackPrompt = (
  role: string,
  questions: { question: string; answer: string }[],
  userAnswers: string[]
) => {
  return `As an interviewer for the role of ${role}, evaluate these responses:

  Questions and Answers:
  ${questions
    .map(
      (q, i) => `
    Q${i + 1}: ${q.question}
    User's Answer: ${userAnswers[i]}
    Expected Answer: ${q.answer}
  `
    )
    .join("\n")}

  Provide a detailed evaluation in this exact JSON format:
  {
    "interviewSummary": {
      "duration": "30 minutes",
      "difficulty": "Intermediate",
      "type": "${role} Technical Interview"
    },
    "score": <overall score between 0-100>,
    "strengths": ["<strength1>", "<strength2>", ...],
    "improvements": ["<improvement1>", "<improvement2>", ...],
    "skillAnalysis": {
      "technical": "<detailed technical skill analysis>",
      "domain": "<domain knowledge analysis>",
      "methodology": "<methodology and approach analysis>"
    },
    "softSkills": {
      "communication": <score 0-100>,
      "confidence": <score 0-100>,
      "problemSolving": <score 0-100>
    },
    "questionAnswers": [
      {
        "question": "<question text>",
        "userAnswer": "<user's answer>",
        "feedback": "<specific feedback for this answer>",
        "score": <score 0-100>
      }
    ],
    "recommendations": {
      "skillBased": ["<skill recommendation1>", "<skill recommendation2>"],
      "resources": ["<resource1>", "<resource2>"],
      "interviewTips": ["<tip1>", "<tip2>"]
    },
    "overallFeedback": "<comprehensive feedback paragraph>"
  }`;
};