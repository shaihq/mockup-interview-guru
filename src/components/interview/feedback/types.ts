export interface InterviewSummary {
  duration: string;
  difficulty: string;
  type: string;
}

export interface SkillAnalysis {
  technical: string;
  domain: string;
  methodology: string;
}

export interface SoftSkillDetail {
  score: number;
  feedback: string;
  examples: string[];
}

export interface SoftSkills {
  communication: SoftSkillDetail;
  articulation: SoftSkillDetail;
  problemSolving: SoftSkillDetail;
  professionalCommunication: SoftSkillDetail;
  adaptability: SoftSkillDetail;
  detailOrientation: SoftSkillDetail;
}

export interface QuestionAnswer {
  question: string;
  userAnswer: string;
  feedback: string;
  communicationFeedback: string;
  score: number;
  tips: string;
}

export interface RecommendationsData {
  skillBased: string[];
  resources: string[];
  interviewTips: string[];
}

export interface FeedbackData {
  interviewSummary: InterviewSummary;
  score: number;
  strengths: string[];
  improvements: string[];
  skillAnalysis: SkillAnalysis;
  softSkills: SoftSkills;
  questionAnswers: QuestionAnswer[];
  recommendations: RecommendationsData;
  overallFeedback: string;
}