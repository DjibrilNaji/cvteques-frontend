import { Upload } from "lucide-react";
import { ChangeEvent } from "react";

interface DeleteCvModalProps {
  handleCVSelection: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FileZone({ handleCVSelection }: DeleteCvModalProps) {
  return (
    <label
      htmlFor="cv-upload"
      className="border border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer flex flex-col items-center justify-center"
    >
      <Upload className="h-12 w-12 text-gray-400 mb-2" />
      <p className="text-sm text-gray-600">Déposez votre CV au format PDF</p>
      <p className="text-xs text-gray-500 mt-1">
        ou cliquez ici pour sélectionner un fichier
      </p>
      <input
        id="cv-upload"
        type="file"
        accept=".pdf"
        onChange={handleCVSelection}
        className="hidden"
      />
    </label>
  );
}
