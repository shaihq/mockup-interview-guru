import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onDownload: () => void;
  onStartOver: () => void;
}

const ActionButtons = ({ onDownload, onStartOver }: ActionButtonsProps) => {
  return (
    <div className="mb-6 space-x-4 text-center action-buttons">
      <Button onClick={onDownload} className="mr-4">
        Download PDF
      </Button>
      <Button onClick={onStartOver} variant="outline">
        Start New Interview
      </Button>
    </div>
  );
};

export default ActionButtons;