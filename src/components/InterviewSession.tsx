import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DetailedFeedback from "./interview/DetailedFeedback";
import { handleFeedbackGeneration } from "./interview/feedbackHandler";
import QuestionDisplay from "./interview/QuestionDisplay";
import LoadingState from "./interview/LoadingState";
import { generateInterviewQuestions } from "@/utils/questionGenerator";

interface InterviewSessionProps {
  jobDescription: string;
  role: string;
  round: string;
  genAI: GoogleGenerativeAI;
}

interface Question {
  question: string;
  answer: string;
}

const InterviewSession = ({
  jobDescription,
  role,
  round,
  genAI,
}: InterviewSessionProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        setIsLoading(true);
        const generatedQuestions = await generateInterviewQuestions(genAI, jobDescription, role);
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error("Error generating questions:", error);
        toast({
          title: "Error",
          description: "Failed to generate questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();
  }, []);

  const handleNextQuestion = async () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please provide an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    const newUserAnswers = [...userAnswers, userAnswer];
    setUserAnswers(newUserAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      try {
        const feedbackResult = await handleFeedbackGeneration(
          role,
          questions,
          newUserAnswers,
          genAI
        );
        setFeedback(feedbackResult);
        setIsFinished(true);
      } catch (error) {
        console.error("Error generating feedback:", error);
        toast({
          title: "Error",
          description: "Failed to generate feedback. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isFinished) {
    try {
      const feedbackData = JSON.parse(feedback);
      return <DetailedFeedback feedbackData={feedbackData} />;
    } catch (error) {
      console.error("Feedback parse error:", error);
      return (
        <div className="max-w-3xl mx-auto p-4">
          <div className="p-6 bg-red-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-700">Error Processing Feedback</h2>
            <p className="text-red-600">There was an error processing the interview feedback. Please try again.</p>
            <button
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Start New Interview
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <QuestionDisplay
      currentQuestion={questions[currentQuestionIndex]?.question}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      userAnswer={userAnswer}
      onAnswerChange={setUserAnswer}
      onNext={handleNextQuestion}
    />
  );
};

export default InterviewSession;