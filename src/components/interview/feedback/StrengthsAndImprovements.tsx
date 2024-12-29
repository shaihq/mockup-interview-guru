interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

const StrengthsAndImprovements = ({
  strengths,
  improvements,
}: StrengthsAndImprovementsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Strengths</h3>
        <ul className="list-disc pl-6">
          {strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-orange-600 mb-2">
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-6">
          {improvements.map((improvement, index) => (
            <li key={index}>{improvement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrengthsAndImprovements;