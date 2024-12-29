import { InterviewSummary } from "./types";

interface InterviewSummarySectionProps {
  summary: InterviewSummary;
}

const InterviewSummarySection = ({ summary }: InterviewSummarySectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Interview Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-medium">Duration</p>
          <p>{summary.duration}</p>
        </div>
        <div>
          <p className="font-medium">Difficulty</p>
          <p>{summary.difficulty}</p>
        </div>
        <div>
          <p className="font-medium">Type</p>
          <p>{summary.type}</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewSummarySection;