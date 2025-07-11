import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { DeleteCvModal } from "./DeleteCvModal";

type UploadedCVProps = {
  name: string;
  url: string;
  date: string;
  intervenantId: number;
  onDeleteSuccess: () => void;
};

export function UploadedCV({
  name,
  url,
  date,
  intervenantId,
  onDeleteSuccess,
}: UploadedCVProps) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2 border border-green-400 rounded-md p-4 bg-green-50 overflow-hidden">
        <div className="flex items-center gap-2 text-green-800 font-medium text-sm truncate">
          <FileTextIcon className="text-green-500" size={18} />
          <span className="truncate">{name}</span>
        </div>
        <span className="text-green-600 text-sm">Téléchargé le {date}</span>
      </div>

      <div className="flex justify-end items-center w-full gap-2 ">
        <Link href={`http://localhost:8080/${url}`} target="_blank">
          <Button className="bg-green-700 text-white hover:bg-green-800 hover:text-white text-sm">
            Voir
          </Button>
        </Link>

        <DeleteCvModal
          intervenantId={intervenantId}
          onSuccess={onDeleteSuccess}
        />
      </div>
    </div>
  );
}
