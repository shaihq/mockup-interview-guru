import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import InterviewSession from "@/components/InterviewSession";
import { createGeminiClient } from "@/utils/geminiConfig";
import { Clipboard } from "lucide-react";

const GEMINI_API_KEY = "AIzaSyAyZXZUJ5irogLkCclIE-1jKhKZKOiedUM";

const Index = () => {
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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
    return (
      <InterviewSession
        jobDescription={jobDescription}
        role={role}
        round={round}
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