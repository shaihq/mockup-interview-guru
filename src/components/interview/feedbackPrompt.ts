export const generateFeedbackPrompt = (
  role: string,
  questions: { question: string; answer: string }[],
  userAnswers: string[]
) => {
  return `As a senior technical interviewer for the role of ${role}, conduct a rigorous evaluation of these responses using strict criteria:

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

  Provide a detailed, critical evaluation in this exact JSON format:
  {
    "interviewSummary": {
      "duration": "30 minutes",
      "difficulty": "Intermediate",
      "type": "${role} Technical Interview"
    },
    "score": <strict score between 0-100, deduct points for missing key concepts>,
    "strengths": ["<specific strength with example>", "<specific strength with example>", ...],
    "improvements": ["<detailed improvement area with specific example>", "<detailed improvement area with specific example>", ...],
    "skillAnalysis": {
      "technical": "<critical analysis of technical competency with specific examples>",
      "domain": "<detailed evaluation of domain expertise with specific examples>",
      "methodology": "<thorough analysis of approach and methodology with specific examples>"
    },
    "softSkills": {
      "communication": <strict score 0-100>,
      "confidence": <strict score 0-100>,
      "problemSolving": <strict score 0-100>
    },
    "questionAnswers": [
      {
        "question": "<question text>",
        "userAnswer": "<user's answer>",
        "feedback": "<detailed critique with specific examples of what was missing or could be improved>",
        "score": <strict score 0-100>
      }
    ],
    "recommendations": {
      "skillBased": ["<specific skill to improve with actionable steps>", "<specific skill to improve with actionable steps>"],
      "resources": ["<specific resource with description>", "<specific resource with description>"],
      "interviewTips": ["<specific interview technique to improve>", "<specific interview technique to improve>"]
    },
    "overallFeedback": "<comprehensive, critical feedback paragraph highlighting specific areas for improvement>"
  }

  Evaluation Guidelines:
  - Be extremely thorough and critical in the evaluation
  - Deduct points for any missing key concepts or incomplete answers
  - Provide specific examples in all feedback
  - Focus on actionable improvements
  - Be strict with scoring - a perfect score should be rare
  - Consider both technical accuracy and communication clarity`;
};