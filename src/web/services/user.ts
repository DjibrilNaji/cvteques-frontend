import { UserDto } from "@/types/User";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const getUser = async (email: string): Promise<UserDto> => {
  const response = await axiosClient.get(routes.api.user(email), {
    withCredentials: true,
  });

  return response.data.data;
};
