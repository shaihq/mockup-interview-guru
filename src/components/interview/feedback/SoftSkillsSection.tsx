import { Progress } from "@/components/ui/progress";
import { SoftSkills } from "./types";

interface SoftSkillsSectionProps {
  softSkills: SoftSkills;
}

const SoftSkillsSection = ({ softSkills }: SoftSkillsSectionProps) => {
  const renderSkill = (
    label: string,
    description: string,
    skill: { score: number; feedback: string; examples: string[] }
  ) => (
    <div>
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium mb-2">{label}</label>
        <div className="relative w-full">
          <Progress value={skill.score} className="h-2" />
          <span className="absolute right-0 -top-6 text-sm">
            {skill.score}%
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <p className="text-sm text-gray-700 mt-2">{skill.feedback}</p>
      <div className="mt-2 space-y-1">
        {skill.examples.map((example, index) => (
          <p
            key={index}
            className={`text-sm ${
              index === 0 ? "text-green-600" : "text-orange-600"
            }`}
          >
            {example}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Soft Skills Evaluation</h3>
      <div className="space-y-6">
        {renderSkill(
          "Communication",
          "Clarity and structure of responses",
          softSkills.communication
        )}
        {renderSkill(
          "Technical Articulation",
          "Ability to explain technical concepts",
          softSkills.articulation
        )}
        {renderSkill(
          "Problem Solving",
          "Approach to solving complex problems",
          softSkills.problemSolving
        )}
        {renderSkill(
          "Professional Communication",
          "Tone and professionalism",
          softSkills.professionalCommunication
        )}
        {renderSkill(
          "Adaptability",
          "Flexibility in approach",
          softSkills.adaptability
        )}
        {renderSkill(
          "Detail Orientation",
          "Thoroughness and precision",
          softSkills.detailOrientation
        )}
      </div>
    </div>
  );
};

export default SoftSkillsSection;