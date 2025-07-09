import { UserDto } from "@/types/User";
import routes from "../routes";
import axiosClient from "../utils/axiosInstance";

export const getUser = async (email: string): Promise<UserDto> => {
  const response = await axiosClient.get(routes.api.user(email), {
    withCredentials: true,
  });

  return response.data.data;
};
