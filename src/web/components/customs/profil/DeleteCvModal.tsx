import { Button } from "@/web/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/web/components/ui/dialog";
import { useCustomMutation } from "@/web/hook/useCustomMutation";
import { deleteCV } from "@/web/services/intervenantCV";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteCvModalProps {
  intervenantId: number;
  onSuccess: () => void;
}

export function DeleteCvModal({
  intervenantId,
  onSuccess,
}: DeleteCvModalProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCustomMutation(
    async () => await deleteCV(intervenantId),
    {
      onSuccess: async (data) => {
        console.log("CV deletion successful:", data);
        await queryClient.invalidateQueries({ queryKey: ["user"] });

        toast.success(data.customMessage);

        onSuccess();
      },
    }
  );

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-red-700 text-white hover:bg-red-800 hover:text-white"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Supprimer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer le CV</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-red-700 text-white hover:bg-red-800 hover:text-white"
                disabled={isPending}
                onClick={mutate}
              >
                Supprimer
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
