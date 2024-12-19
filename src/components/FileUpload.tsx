import { UploadCloud } from "lucide-react";

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
    <div className="file-input-wrapper">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="flex flex-col items-center">
        <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default FileUpload;