import { Progress } from "@/components/ui/progress";

interface SoftSkillsProps {
  softSkills: {
    communication: number;
    confidence: number;
    problemSolving: number;
  };
}

const SoftSkills = ({ softSkills }: SoftSkillsProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Soft Skills Evaluation</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Communication</label>
          <Progress value={softSkills.communication} className="h-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Confidence</label>
          <Progress value={softSkills.confidence} className="h-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Problem Solving</label>
          <Progress value={softSkills.problemSolving} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;