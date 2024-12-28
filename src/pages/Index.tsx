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

const difficultyLevels = [
  { value: "entry", label: "Entry Level", experience: "0-2 years" },
  { value: "mid", label: "Mid Level", experience: "3-5 years" },
  { value: "senior", label: "Senior Level", experience: "6-10 years" },
  { value: "lead", label: "Lead Level", experience: "10+ years" },
];

const Index = () => {
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
    } catch (error) {
      toast({
        title: "Paste Error",
        description: "Unable to access clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const handleStartInterview = () => {
    if (!role || !round || !jobDescription || !difficulty) {
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
        difficulty={difficulty}
        genAI={createGeminiClient(GEMINI_API_KEY)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Design Mock Interview Portal
        </h1>

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
            <Label htmlFor="difficulty">Experience Level</Label>
            <Select onValueChange={setDifficulty} value={difficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div>{level.label}</div>
                      <div className="text-sm text-gray-500">
                        {level.experience}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="jd">Job Description</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePaste}
                className="text-sm"
              >
                Paste
              </Button>
            </div>
            <Textarea
              id="jd"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleStartInterview}>
            Start Mock Interview
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;