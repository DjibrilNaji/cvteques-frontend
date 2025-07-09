import { Button } from "@/web/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

type UploadedCVProps = {
  name: string;
  date: string;
  onReplace: () => void;
};

export function UploadedCV({ name, date, onReplace }: UploadedCVProps) {
  return (
    <div className="flex items-center justify-between border border-green-400 rounded-md p-4 bg-green-50">
      <div>
        <p className="text-green-800 font-medium">{name}</p>
        <p className="text-green-600 text-sm">Téléchargé le {date}</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" /> Voir
        </Button>
        <Button variant="outline" size="sm" onClick={onReplace}>
          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
        </Button>
      </div>
    </div>
  );
}
