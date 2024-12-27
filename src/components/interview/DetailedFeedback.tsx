import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import FeedbackSummary from "./feedback/FeedbackSummary";
import SkillAnalysis from "./feedback/SkillAnalysis";
import SoftSkills from "./feedback/SoftSkills";
import QuestionAnalysis from "./feedback/QuestionAnalysis";
import Recommendations from "./feedback/Recommendations";

interface InterviewSummary {
  duration: string;
  difficulty: string;
  type: string;
}

interface SkillAnalysis {
  technical: string;
  domain: string;
  methodology: string;
}

interface SoftSkills {
  communication: number;
  confidence: number;
  problemSolving: number;
}

interface QuestionAnswer {
  question: string;
  userAnswer: string;
  feedback: string;
  score: number;
}

interface Recommendations {
  skillBased: string[];
  resources: string[];
  interviewTips: string[];
}

interface FeedbackData {
  interviewSummary: InterviewSummary;
  score: number;
  strengths: string[];
  improvements: string[];
  skillAnalysis: SkillAnalysis;
  softSkills: SoftSkills;
  questionAnswers: QuestionAnswer[];
  recommendations: Recommendations;
  overallFeedback: string;
}

interface DetailedFeedbackProps {
  feedbackData: FeedbackData;
}

const DetailedFeedback = ({ feedbackData }: DetailedFeedbackProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('feedback-report');
    const opt = {
      margin: 1,
      filename: 'interview-feedback.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      });
    }
  };

  const handleStartOver = () => {
    navigate(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div id="feedback-report">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Interview Feedback Report</h2>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="secondary" onClick={handleStartOver}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
          
          <FeedbackSummary 
            interviewSummary={feedbackData.interviewSummary}
            score={feedbackData.score}
            overallFeedback={feedbackData.overallFeedback}
          />
          
          <SkillAnalysis skillAnalysis={feedbackData.skillAnalysis} />
          
          <SoftSkills softSkills={feedbackData.softSkills} />
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Strengths</h3>
              <ul className="list-disc pl-6">
                {feedbackData.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
              <ul className="list-disc pl-6">
                {feedbackData.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>

          <QuestionAnalysis questionAnswers={feedbackData.questionAnswers} />
          
          <Recommendations recommendations={feedbackData.recommendations} />
        </Card>
      </div>
    </div>
  );
};

export default DetailedFeedback;
