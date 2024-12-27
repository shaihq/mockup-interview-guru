interface QuestionAnswer {
  question: string;
  userAnswer: string;
  feedback: string;
  score: number;
}

interface QuestionAnalysisProps {
  questionAnswers: QuestionAnswer[];
}

const QuestionAnalysis = ({ questionAnswers }: QuestionAnalysisProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Detailed Question Analysis</h3>
      {questionAnswers.map((qa, index) => (
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
  );
};

export default QuestionAnalysis;