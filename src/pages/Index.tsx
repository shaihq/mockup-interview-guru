import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InterviewSession from "@/components/InterviewSession";
import { createGeminiClient } from "@/utils/geminiConfig";
import { Clipboard } from "lucide-react";

const GEMINI_API_KEY = "AIzaSyAyZXZUJ5irogLkCclIE-1jKhKZKOiedUM";

const difficultyLevels = [
  { value: "entry", label: "Entry Level (0-2 years)", promptModifier: "basic" },
  { value: "mid", label: "Mid Level (2-5 years)", promptModifier: "intermediate" },
  { value: "senior", label: "Senior Level (5+ years)", promptModifier: "advanced" },
  { value: "lead", label: "Lead Level (8+ years)", promptModifier: "expert" },
];

const Index = () => {
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [difficulty, setDifficulty] = useState("mid");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      toast({
        title: "Success",
        description: "Job description pasted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to paste from clipboard",
        variant: "destructive",
      });
    }
  };

  if (isInterviewStarted) {
    const selectedDifficulty = difficultyLevels.find(d => d.value === difficulty);
    return (
      <InterviewSession
        jobDescription={jobDescription}
        role={role}
        round={round}
        difficulty={selectedDifficulty?.promptModifier || "intermediate"}
        genAI={createGeminiClient(GEMINI_API_KEY)}
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

          <div>
            <Label htmlFor="difficulty">Experience Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              This will adjust the difficulty of interview questions
            </p>
          </div>

          <div>
            <Label htmlFor="jd">Job Description</Label>
            <div className="relative">
              <Textarea
                id="jd"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2"
                onClick={handlePaste}
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Paste
              </Button>
            </div>
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