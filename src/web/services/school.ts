import { School } from "@/types/User";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const getSchools = async (): Promise<School[]> => {
  const response = await axiosClient.get(routes.api.schools, {
    withCredentials: true,
  });

  return response.data;
};
