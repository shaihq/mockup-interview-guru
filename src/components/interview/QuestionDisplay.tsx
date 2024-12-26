import { useState, useEffect } from "react";
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
  isGeneratingFeedback?: boolean;
}

const MAX_CHAR_LIMIT = 500;

const generateTip = (question: string | undefined) => {
  if (!question) return "Context → Approach → Solution → Impact → Learnings";
  
  const questionLower = question.toLowerCase();
  if (questionLower.includes("design system")) {
    return "Research → Analysis → Components → Implementation → Testing";
  } else if (questionLower.includes("user research")) {
    return "Problem → Methods → Participants → Findings → Actions";
  } else if (questionLower.includes("workflow")) {
    return "Current State → Pain Points → Solutions → Validation → Impact";
  } else if (questionLower.includes("challenge")) {
    return "Context → Problem → Approach → Solution → Results";
  } else {
    return "Context → Approach → Solution → Impact → Learnings";
  }
};

const QuestionDisplay = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  onNext,
  isGeneratingFeedback = false,
}: QuestionDisplayProps) => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    setTip(generateTip(currentQuestion));
  }, [currentQuestion]);

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
          <p className="mb-4">{currentQuestion || "Loading question..."}</p>
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
              <p>💡 Tip: {tip}</p>
            </div>
          </div>
          <Button onClick={onNext} disabled={isGeneratingFeedback}>
            {questionNumber === totalQuestions ? (
              <>
                {isGeneratingFeedback ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Report...
                  </>
                ) : (
                  "Finish Interview"
                )}
              </>
            ) : (
              "Next Question"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionDisplay;