import { ApiError } from "@/types/Api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCustomMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, ApiError, TVariables>
) {
  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onError: (error: ApiError, variables, context) => {
      let errorMessage = "Une erreur inattendue est survenue.";

      if (error.response?.data?.customMessage) {
        errorMessage = error.response.data.customMessage;
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Problème de connexion. Vérifiez votre réseau.";
      } else if (error.message?.includes("timeout")) {
        errorMessage =
          "Le serveur met trop de temps à répondre. Réessayez plus tard.";
      }

      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
}
