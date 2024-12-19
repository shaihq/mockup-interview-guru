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
      const prompt = `You are a design interviewer conducting an interview for the role of ${role} in the ${round} round. Generate exactly 5 relevant interview questions that focus on design principles, process, and problem-solving. For each question, also provide an ideal answer that would demonstrate strong design thinking. Return the response in this exact format (no markdown, just pure JSON):
      [
        {
          "question": "What is your design process?",
          "answer": "A strong answer would include..."
        },
        // ... (4 more similar objects)
      ]`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const parsedQuestions = JSON.parse(text);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length === 5) {
          setQuestions(parsedQuestions);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (parseError) {
        console.error("Parse error:", parseError);
        toast({
          title: "Error",
          description: "Failed to parse interview questions. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
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
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `As a design interviewer, evaluate this response for the role of ${role}:
          Question: ${questions[currentQuestionIndex].question}
          Candidate's Answer: ${userAnswer}
          Expected Answer: ${questions[currentQuestionIndex].answer}
          
          Provide a detailed evaluation including:
          1. A score out of 100
          2. What was done well
          3. Areas for improvement
          4. Specific suggestions to enhance the answer`;
        
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
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Preparing your interview questions...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto p-4">
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
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
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