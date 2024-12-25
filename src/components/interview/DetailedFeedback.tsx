import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FeedbackData {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  overallFeedback: string;
  softSkills: {
    communication: number;
    confidence: number;
    problemSolving: number;
  };
  questionAnswers: {
    question: string;
    userAnswer: string;
    feedback: string;
    score: number;
  }[];
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
        
        {/* Overview Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex items-center justify-center">
              <Progress value={feedbackData.score} className="w-32 h-32 rounded-full" />
              <span className={`absolute text-4xl font-bold ${getScoreColor(feedbackData.score)}`}>
                {feedbackData.score}
              </span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{feedbackData.overallFeedback}</p>
        </div>

        {/* Soft Skills Evaluation */}
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

        {/* Question-Answer Breakdown */}
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

        {/* Improvement Suggestions */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Recommendations</h3>
          <ul className="list-disc pl-6">
            {feedbackData.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default DetailedFeedback;