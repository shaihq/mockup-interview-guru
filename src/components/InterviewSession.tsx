import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface InterviewSessionProps {
  resume: File;
  interviewerResume: File;
  role: string;
  round: string;
  genAI: GoogleGenerativeAI;
}

interface Question {
  question: string;
  answer: string;
}

const InterviewSession = ({
  resume,
  interviewerResume,
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
  const { toast } = useToast();

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As a design interviewer for the role of ${role} in the ${round} round, generate 5 relevant interview questions. Format the response as a JSON array of objects with 'question' and 'answer' properties. The questions should be specific to design principles, process, and problem-solving.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response
      const parsedQuestions = JSON.parse(text);
      setQuestions(parsedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = async () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please provide an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      // Generate final feedback
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Evaluate this design interview response and provide feedback:
          Question: ${questions[currentQuestionIndex].question}
          Candidate's Answer: ${userAnswer}
          Expected Answer: ${questions[currentQuestionIndex].answer}
          
          Provide a score out of 100 and specific suggestions for improvement.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setFeedback(response.text());
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
    return (
      <div className="interview-container text-center">
        <p>Preparing your interview questions...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="interview-container">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>
          <div className="whitespace-pre-wrap">{feedback}</div>
          <Button
            className="mt-6"
            onClick={() => window.location.reload()}
          >
            Start New Interview
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="interview-container">
      <Card className="question-card">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mb-4">{questions[currentQuestionIndex].question}</p>
        <Textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="mb-4"
          rows={6}
        />
        <Button onClick={handleNextQuestion}>
          {currentQuestionIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}
        </Button>
      </Card>
    </div>
  );
};

export default InterviewSession;