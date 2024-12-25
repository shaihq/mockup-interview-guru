import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/FileUpload";
import InterviewSession from "@/components/InterviewSession";
import { createGeminiClient } from "@/utils/geminiConfig";

const GEMINI_API_KEY = "AIzaSyAyZXZUJ5irogLkCclIE-1jKhKZKOiedUM";

const Index = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [interviewerResume, setInterviewerResume] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const { toast } = useToast();

  const handleStartInterview = () => {
    if (!resume || !interviewerResume || !role || !round) {
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
        resume={resume}
        interviewerResume={interviewerResume}
        role={role}
        round={round}
        genAI={createGeminiClient(GEMINI_API_KEY)}
      />
    );
  }

  return (
    <div className="interview-container">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Design Mock Interview Portal</h1>
        
        <div className="space-y-6">
          <div>
            <Label>Your Resume (PDF)</Label>
            <FileUpload
              accept=".pdf"
              onChange={(file) => setResume(file)}
              label="Upload your resume"
            />
          </div>

          <div>
            <Label>Interviewer's Resume (PDF)</Label>
            <FileUpload
              accept=".pdf"
              onChange={(file) => setInterviewerResume(file)}
              label="Upload interviewer's resume"
            />
          </div>

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