import { Progress } from "@/components/ui/progress";

interface InterviewSummary {
  duration: string;
  difficulty: string;
  type: string;
}

interface FeedbackSummaryProps {
  interviewSummary: InterviewSummary;
  score: number;
  overallFeedback: string;
}

const FeedbackSummary = ({ interviewSummary, score, overallFeedback }: FeedbackSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Interview Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-medium">Duration</p>
            <p>{interviewSummary.duration}</p>
          </div>
          <div>
            <p className="font-medium">Difficulty</p>
            <p>{interviewSummary.difficulty}</p>
          </div>
          <div>
            <p className="font-medium">Type</p>
            <p>{interviewSummary.type}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative inline-flex items-center justify-center">
            <Progress value={score} className="w-32 h-32 rounded-full" />
            <span className={`absolute text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
        <p className="text-gray-700 text-center">{overallFeedback}</p>
      </div>
    </>
  );
};

export default FeedbackSummary;