import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface QuestionDisplayProps {
  currentQuestion: string;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
}

const MAX_CHAR_LIMIT = 500; // Reasonable limit for API processing

const QuestionDisplay = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  onNext,
}: QuestionDisplayProps) => {
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHAR_LIMIT) {
      onAnswerChange(text);
    }
  };

  const remainingChars = MAX_CHAR_LIMIT - userAnswer.length;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {questionNumber} of {totalQuestions}
        </h2>
        <div className="space-y-4">
          <p className="mb-4">{currentQuestion}</p>
          <div className="space-y-2">
            <Textarea
              value={userAnswer}
              onChange={handleAnswerChange}
              placeholder="Type your answer here..."
              className="mb-2"
              rows={6}
              maxLength={MAX_CHAR_LIMIT}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <p>Characters remaining: {remainingChars}</p>
              <p>💡 Tip: Focus on providing a clear, concise framework or methodology in your answer</p>
            </div>
          </div>
          <Button onClick={onNext}>
            {questionNumber === totalQuestions ? "Finish Interview" : "Next Question"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionDisplay;