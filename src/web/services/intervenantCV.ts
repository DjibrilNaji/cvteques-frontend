import { ApiResponse } from "@/types/Api";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const uploadCV = async (
  formData: FormData,
  intervenantId: number
): Promise<ApiResponse> => {
  const response = await axiosClient.post(
    routes.api.upload(intervenantId),
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const deleteCV = async (intervenantId: number): Promise<ApiResponse> => {
  const response = await axiosClient.delete(routes.api.delete(intervenantId), {
    withCredentials: true,
  });

  return response.data;
};
