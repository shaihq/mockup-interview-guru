import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface InterviewSummary {
  duration: string;
  difficulty: string;
  type: string;
}

interface SkillAnalysis {
  technical: string;
  domain: string;
  methodology: string;
}

interface SoftSkills {
  communication: number;
  confidence: number;
  problemSolving: number;
}

interface QuestionAnswer {
  question: string;
  userAnswer: string;
  feedback: string;
  score: number;
}

interface Recommendations {
  skillBased: string[];
  resources: string[];
  interviewTips: string[];
}

interface FeedbackData {
  interviewSummary: InterviewSummary;
  score: number;
  strengths: string[];
  improvements: string[];
  skillAnalysis: SkillAnalysis;
  softSkills: SoftSkills;
  questionAnswers: QuestionAnswer[];
  recommendations: Recommendations;
  overallFeedback: string;
}

interface DetailedFeedbackProps {
  feedbackData: FeedbackData;
}

const DetailedFeedback = ({ feedbackData }: DetailedFeedbackProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Interview Feedback Report</h2>
        
        {/* Interview Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Interview Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Duration</p>
              <p>{feedbackData.interviewSummary.duration}</p>
            </div>
            <div>
              <p className="font-medium">Difficulty</p>
              <p>{feedbackData.interviewSummary.difficulty}</p>
            </div>
            <div>
              <p className="font-medium">Type</p>
              <p>{feedbackData.interviewSummary.type}</p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex items-center justify-center">
              <Progress value={feedbackData.score} className="w-32 h-32 rounded-full" />
              <span className={`absolute text-4xl font-bold ${getScoreColor(feedbackData.score)}`}>
                {feedbackData.score}
              </span>
            </div>
          </div>
          <p className="text-gray-700 text-center">{feedbackData.overallFeedback}</p>
        </div>

        {/* Skill Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Skill Analysis</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Technical Skills</h4>
              <p className="text-gray-700">{feedbackData.skillAnalysis.technical}</p>
            </div>
            <div>
              <h4 className="font-medium">Domain Knowledge</h4>
              <p className="text-gray-700">{feedbackData.skillAnalysis.domain}</p>
            </div>
            <div>
              <h4 className="font-medium">Methodology</h4>
              <p className="text-gray-700">{feedbackData.skillAnalysis.methodology}</p>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Soft Skills Evaluation</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Communication</label>
              <Progress value={feedbackData.softSkills.communication} className="h-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Confidence</label>
              <Progress value={feedbackData.softSkills.confidence} className="h-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Problem Solving</label>
              <Progress value={feedbackData.softSkills.problemSolving} className="h-2" />
            </div>
          </div>
        </div>

        {/* Strengths & Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Strengths</h3>
            <ul className="list-disc pl-6">
              {feedbackData.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
            <ul className="list-disc pl-6">
              {feedbackData.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Detailed Question Analysis</h3>
          {feedbackData.questionAnswers.map((qa, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Question {index + 1}</h4>
                <span className={`px-2 py-1 rounded ${getScoreColor(qa.score)} bg-opacity-10`}>
                  Score: {qa.score}
                </span>
              </div>
              <p className="mb-2 font-medium">{qa.question}</p>
              <p className="mb-2 text-gray-600">Your Answer: {qa.userAnswer}</p>
              <p className="text-sm text-gray-700">Feedback: {qa.feedback}</p>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Skill Recommendations</h3>
            <ul className="list-disc pl-6">
              {feedbackData.recommendations.skillBased.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Resources</h3>
            <ul className="list-disc pl-6">
              {feedbackData.recommendations.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Interview Tips</h3>
            <ul className="list-disc pl-6">
              {feedbackData.recommendations.interviewTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailedFeedback;