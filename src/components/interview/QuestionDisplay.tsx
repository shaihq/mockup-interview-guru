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

const QuestionDisplay = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  onNext,
}: QuestionDisplayProps) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {questionNumber} of {totalQuestions}
        </h2>
        <div className="space-y-4">
          <p className="mb-4">{currentQuestion}</p>
          <Textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="mb-4"
            rows={6}
          />
          <Button onClick={onNext}>
            {questionNumber === totalQuestions ? "Finish Interview" : "Next Question"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionDisplay;