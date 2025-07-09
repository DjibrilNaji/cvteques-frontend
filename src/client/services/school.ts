import { School } from "@/types/User";
import routes from "../routes";
import axiosClient from "../utils/axiosInstance";

export const getSchools = async (): Promise<School[]> => {
  const response = await axiosClient.get(routes.api.schools, {
    withCredentials: true,
  });

  return response.data;
};
