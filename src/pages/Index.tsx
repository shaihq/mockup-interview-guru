import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import InterviewSession from "@/components/InterviewSession";
import { createGeminiClient } from "@/utils/geminiConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GEMINI_API_KEY = "AIzaSyAyZXZUJ5irogLkCclIE-1jKhKZKOiedUM";

const Index = () => {
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState("5");
  const [difficulty, setDifficulty] = useState("intermediate");
  const { toast } = useToast();

  const handleStartInterview = () => {
    if (!role || !round || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before starting the interview.",
        variant: "destructive",
      });
      return;
    }
    setIsInterviewStarted(true);
  };

  if (isInterviewStarted) {
    return (
      <InterviewSession
        jobDescription={jobDescription}
        role={role}
        round={round}
        genAI={createGeminiClient(GEMINI_API_KEY)}
        questionCount={parseInt(questionCount)}
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Design Mock Interview Portal</h1>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="role">Role you're applying for</Label>
            <Input
              id="role"
              placeholder="e.g. Senior Product Designer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="round">Interview Round</Label>
            <Input
              id="round"
              placeholder="e.g. Design Challenge, Portfolio Review"
              value={round}
              onChange={(e) => setRound(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="7">7 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="jd">Job Description</Label>
            <Textarea
              id="jd"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleStartInterview}
          >
            Start Mock Interview
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;