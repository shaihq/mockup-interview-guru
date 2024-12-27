interface SkillAnalysisProps {
  skillAnalysis: {
    technical: string;
    domain: string;
    methodology: string;
  };
}

const SkillAnalysis = ({ skillAnalysis }: SkillAnalysisProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Skill Analysis</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Technical Skills</h4>
          <p className="text-gray-700">{skillAnalysis.technical}</p>
        </div>
        <div>
          <h4 className="font-medium">Domain Knowledge</h4>
          <p className="text-gray-700">{skillAnalysis.domain}</p>
        </div>
        <div>
          <h4 className="font-medium">Methodology</h4>
          <p className="text-gray-700">{skillAnalysis.methodology}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;