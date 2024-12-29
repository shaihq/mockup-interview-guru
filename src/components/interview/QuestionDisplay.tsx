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
  if (!question) return "";
  
  const questionLower = question.toLowerCase();
  
  // Design Process Questions
  if (questionLower.includes("design process") || questionLower.includes("methodology")) {
    return "Framework: Define → Research → Ideate → Prototype → Test → Iterate";
  }
  
  // User Research Questions
  if (questionLower.includes("user research") || questionLower.includes("usability")) {
    return "Methods → Participants → Key Findings → Insights → Impact";
  }
  
  // Design System Questions
  if (questionLower.includes("design system") || questionLower.includes("component")) {
    return "Problem → Principles → Structure → Implementation → Documentation";
  }
  
  // Collaboration Questions
  if (questionLower.includes("team") || questionLower.includes("collaborat") || questionLower.includes("stakeholder")) {
    return "Context → Roles → Communication → Challenges → Resolution";
  }
  
  // Problem-Solving Questions
  if (questionLower.includes("challenge") || questionLower.includes("problem") || questionLower.includes("difficult")) {
    return "Situation → Task → Action → Result → Learning";
  }
  
  // Project Questions
  if (questionLower.includes("project") || questionLower.includes("case study")) {
    return "Overview → Goals → Process → Outcome → Impact";
  }
  
  // Leadership Questions
  if (questionLower.includes("lead") || questionLower.includes("manage") || questionLower.includes("mentor")) {
    return "Role → Vision → Strategy → Execution → Results";
  }
  
  // Technical Questions
  if (questionLower.includes("technical") || questionLower.includes("tool") || questionLower.includes("software")) {
    return "Tool Selection → Implementation → Best Practices → Optimization → Results";
  }
  
  // Metrics & Impact Questions
  if (questionLower.includes("metric") || questionLower.includes("impact") || questionLower.includes("success")) {
    return "Goals → Metrics → Implementation → Results → Business Impact";
  }
  
  // Default structure for other questions
  return "Context → Approach → Implementation → Results → Learning";
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