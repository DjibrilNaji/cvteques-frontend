import { ApiResponse } from "@/types/Api";
import { CvListItem } from "@/types/Cv";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const uploadCV = async (
  formData: FormData,
  intervenantId: number
): Promise<ApiResponse> => {
  const response = await axiosClient.post(
    routes.api.cvs.upload(intervenantId),
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const deleteCV = async (intervenantId: number): Promise<ApiResponse> => {
  const response = await axiosClient.delete(
    routes.api.cvs.delete(intervenantId),
    { withCredentials: true }
  );

  return response.data;
};

export const getCVs = async (): Promise<CvListItem[]> => {
  const response = await axiosClient.get(routes.api.cvs.get, {
    withCredentials: true,
  });

  return response.data;
};
