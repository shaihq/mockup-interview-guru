import { RecommendationsData } from "./types";

interface RecommendationsProps {
  recommendations: RecommendationsData;
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          Skill Recommendations
        </h3>
        <ul className="list-disc pl-6">
          {recommendations.skillBased.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Resources</h3>
        <ul className="list-disc pl-6">
          {recommendations.resources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          Interview Tips
        </h3>
        <ul className="list-disc pl-6">
          {recommendations.interviewTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;