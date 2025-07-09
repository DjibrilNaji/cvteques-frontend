import { Button } from "@/web/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

type PendingCVProps = {
  fileName: string;
  isLoading: boolean;
  onUpload: () => void;
};

export function PendingCV({ fileName, isLoading, onUpload }: PendingCVProps) {
  return (
    <div className="flex items-center justify-between border border-yellow-400 rounded-md p-4 bg-yellow-50">
      <span className="text-yellow-700 font-medium">{fileName}</span>
      <Button variant="default" onClick={onUpload} disabled={isLoading}>
        {isLoading && (
          <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />
        )}
        Uploader mon CV
      </Button>
    </div>
  );
}
