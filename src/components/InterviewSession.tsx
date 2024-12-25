import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithRetry } from "@/utils/geminiConfig";
import DetailedFeedback from "./interview/DetailedFeedback";

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
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are an interviewer for a ${role} position conducting a ${round} round interview.
      Based on this job description: "${jobDescription}"
      
      Generate 5 relevant technical interview questions with their ideal answers.
      
      Format your response as a valid JSON array with exactly this structure:
      [
        {
          "question": "Question text here",
          "answer": "Expected answer details here"
        }
      ]
      
      Ensure the response is properly escaped JSON without any special characters or line breaks in the strings.`;
      
      const result = await generateWithRetry(model, prompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanedText = text.replace(/[\n\r\t]/g, ' ').trim();
      console.log("Cleaned response:", cleanedText);
      
      try {
        const parsedQuestions = JSON.parse(cleanedText);
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
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
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

    const newUserAnswers = [...userAnswers, userAnswer];
    setUserAnswers(newUserAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `As an interviewer for the role of ${role}, evaluate these responses:

        Questions and Answers:
        ${questions.map((q, i) => `
          Q${i + 1}: ${q.question}
          User's Answer: ${newUserAnswers[i]}
          Expected Answer: ${q.answer}
        `).join('\n')}

        Provide a detailed evaluation in this exact JSON format:
        {
          "score": <overall score between 0-100>,
          "strengths": ["<strength1>", "<strength2>", ...],
          "improvements": ["<improvement1>", "<improvement2>", ...],
          "suggestions": ["<specific suggestion1>", "<specific suggestion2>", ...],
          "overallFeedback": "<detailed paragraph of feedback>",
          "softSkills": {
            "communication": <score 0-100>,
            "confidence": <score 0-100>,
            "problemSolving": <score 0-100>
          },
          "questionAnswers": [
            {
              "question": "<question text>",
              "userAnswer": "<user's answer>",
              "feedback": "<specific feedback for this answer>",
              "score": <score 0-100>
            }
          ]
        }`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const cleanedResponse = response.text().replace(/[\n\r\t]/g, ' ').trim();
        setFeedback(cleanedResponse);
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
    try {
      const feedbackData = JSON.parse(feedback);
      return <DetailedFeedback feedbackData={feedbackData} />;
    } catch (error) {
      return (
        <div className="max-w-3xl mx-auto p-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Error Processing Feedback</h2>
            <p>There was an error processing the interview feedback. Please try again.</p>
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
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className="space-y-4">
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
        </div>
      </Card>
    </div>
  );
};

export default InterviewSession;