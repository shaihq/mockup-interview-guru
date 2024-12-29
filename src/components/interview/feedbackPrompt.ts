export const generateFeedbackPrompt = (
  role: string,
  questions: { question: string; answer: string }[],
  userAnswers: string[]
) => {
  return `As a senior ${role} interviewer with strict evaluation criteria, critically analyze these responses:

  Questions and Answers:
  ${questions
    .map(
      (q, i) => `
    Q${i + 1}: ${q.question}
    User's Answer: ${userAnswers[i]}
    Expected Answer: ${q.answer}
    
    Evaluation Criteria:
    - Technical Accuracy (35%): Assess correctness and depth of technical knowledge
    - Problem-Solving (25%): Evaluate approach, methodology, and critical thinking
    - Communication (40%): Evaluate based on:
      * Clarity & Structure (15%): How well-organized and clear the response is
      * Technical Communication (10%): Ability to explain complex concepts
      * Professionalism (10%): Tone, formality, and appropriateness
      * Completeness (5%): Thoroughness of response
  `
    )
    .join("\n")}

  Provide an extremely detailed and critical evaluation in this exact JSON format:
  {
    "interviewSummary": {
      "duration": "30 minutes",
      "difficulty": "Intermediate",
      "type": "${role} Technical Interview"
    },
    "score": <strict score between 0-100, deduct points for any imprecision or vagueness>,
    "strengths": [
      "<specific strength with concrete example from answers>",
      "<another specific strength with example>"
    ],
    "improvements": [
      "<detailed improvement area with specific example from answer>",
      "<another specific improvement with example and suggested correction>"
    ],
    "skillAnalysis": {
      "technical": "<critical analysis of technical competency with specific examples>",
      "domain": "<detailed evaluation of domain expertise with examples>",
      "methodology": "<thorough analysis of approach with specific improvements>"
    },
    "softSkills": {
      "communication": <score 0-100 based on clarity, structure, and completeness of responses>,
      "articulation": <score 0-100 based on ability to explain technical concepts clearly>,
      "problemSolving": <score 0-100 with emphasis on structured approach>,
      "professionalCommunication": <score 0-100 based on tone and formality>,
      "adaptability": <score 0-100 based on flexibility in approach to different questions>,
      "detailOrientation": <score 0-100 based on thoroughness and precision in responses>
    },
    "questionAnswers": [
      {
        "question": "<question text>",
        "userAnswer": "<user's answer>",
        "feedback": "<specific, actionable feedback with examples of better responses>",
        "communicationFeedback": "<specific feedback on how the answer was communicated>",
        "score": <strict score 0-100>
      }
    ],
    "recommendations": {
      "skillBased": [
        "<specific skill to improve with concrete learning objective>",
        "<another specific skill with measurable goal>"
      ],
      "resources": [
        "<specific resource with explanation of relevance>",
        "<another specific resource with expected learning outcome>"
      ],
      "interviewTips": [
        "<specific interview technique to improve with example>",
        "<another specific technique with situation-based advice>"
      ]
    },
    "overallFeedback": "<comprehensive analysis highlighting critical gaps and specific next steps>"
  }`;
};