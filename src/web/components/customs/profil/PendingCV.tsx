import { FileTextIcon, LoaderCircleIcon } from "lucide-react";

type PendingCVProps = {
  fileName: string;
  isLoading: boolean;
  onUpload: () => void;
  onDelete: () => void;
};

export function PendingCV({
  fileName,
  isLoading,
  onUpload,
  onDelete,
}: PendingCVProps) {
  return (
    <div className="flex flex-col gap-4 ">
      <div
        className="flex flex-col gap-2 border border-yellow-400 rounded-md p-4 bg-yellow-50 overflow-hidden"
        title={fileName}
      >
        <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm truncate">
          <FileTextIcon className="text-yellow-500" size={18} />
          <span className="truncate">{fileName}</span>
        </div>
      </div>

      <div className="flex justify-end items-center w-full gap-2 ">
        <button
          onClick={onUpload}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md bg-yellow-600 text-white text-sm font-medium px-3 py-1.5 hover:bg-yellow-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-fit self-start"
        >
          {isLoading && <LoaderCircleIcon className="animate-spin" size={16} />}
          {isLoading ? "En cours..." : "Uploader CV"}
        </button>

        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-md bg-red-700 text-white text-sm font-medium px-3 py-1.5 hover:bg-yellow-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-fit self-start"
        >
          Supprimer CV
        </button>
      </div>
    </div>
  );
}
