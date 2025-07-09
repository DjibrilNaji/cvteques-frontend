import { ApiResponse } from "@/types/Api";
import routes from "../routes";
import axiosClient from "../utils/axiosInstance";

export const uploadCV = async (formData: FormData): Promise<ApiResponse> => {
  const response = await axiosClient.post(routes.api.upload, formData, {
    withCredentials: true,
  });

  return response.data;
};
