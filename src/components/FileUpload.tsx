import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  accept: string;
  onChange: (file: File) => void;
  label: string;
}

const FileUpload = ({ accept, onChange, label }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <Card className="p-6 border-2 border-dashed hover:border-primary/50 transition-colors">
      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center">
          <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </label>
    </Card>
  );
};

export default FileUpload;