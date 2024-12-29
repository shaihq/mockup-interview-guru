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
    - Technical Accuracy (30%): Assess correctness and depth of technical knowledge
    - Problem-Solving (20%): Evaluate approach, methodology, and critical thinking
    - Communication (50%): Evaluate based on:
      * Clarity & Structure (15%): How well-organized and clear the response is
      * Technical Communication (15%): Ability to explain complex concepts
      * Professionalism (10%): Tone, formality, and appropriateness
      * Completeness (10%): Thoroughness of response

    Communication Assessment Guidelines:
    - Clarity & Structure: Look for logical flow, clear introduction/conclusion, use of examples
    - Technical Communication: Evaluate use of proper terminology, ability to simplify complex concepts
    - Professionalism: Check for appropriate tone, level of formality, and industry-standard language
    - Completeness: Assess whether all aspects of the question are addressed
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
      "communication": {
        "score": <score 0-100>,
        "feedback": "<detailed analysis of communication effectiveness>",
        "examples": ["<positive example>", "<area for improvement>"]
      },
      "articulation": {
        "score": <score 0-100>,
        "feedback": "<analysis of technical concept explanation>",
        "examples": ["<effective explanation>", "<unclear explanation>"]
      },
      "problemSolving": {
        "score": <score 0-100>,
        "feedback": "<evaluation of structured approach>",
        "examples": ["<good problem breakdown>", "<missed opportunity>"]
      },
      "professionalCommunication": {
        "score": <score 0-100>,
        "feedback": "<assessment of tone and formality>",
        "examples": ["<professional response>", "<informal language used>"]
      },
      "adaptability": {
        "score": <score 0-100>,
        "feedback": "<analysis of flexibility in responses>",
        "examples": ["<good adaptation>", "<rigid approach>"]
      },
      "detailOrientation": {
        "score": <score 0-100>,
        "feedback": "<evaluation of thoroughness>",
        "examples": ["<comprehensive answer>", "<overlooked detail>"]
      }
    },
    "questionAnswers": [
      {
        "question": "<question text>",
        "userAnswer": "<user's answer>",
        "feedback": "<specific, actionable feedback with examples of better responses>",
        "communicationFeedback": "<specific feedback on how the answer was communicated>",
        "score": <strict score 0-100>,
        "tips": "<dynamic tips based on question content and user's response style>"
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