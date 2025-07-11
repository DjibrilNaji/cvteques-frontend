import { ApiResponse } from "@/types/Api";
import { PersonalInfoFormType } from "@/types/Form";
import { UserDto } from "@/types/User";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const getUser = async (email: string): Promise<UserDto> => {
  const response = await axiosClient.get(routes.api.user(email), {
    withCredentials: true,
  });

  return response.data.data;
};

export const updateUser = async (
  email: string,
  data: PersonalInfoFormType
): Promise<ApiResponse> => {
  const response = await axiosClient.patch(routes.api.user(email), data, {
    withCredentials: true,
  });

  return response.data;
};
