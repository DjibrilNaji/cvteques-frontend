import { ApiResponse, LoginResponse } from "@/types/Api";
import { LoginRequest } from "@/types/LoginRequest";
import { RegisterRequest } from "@/types/RegisterRequest";
import axiosClient from "@/utils/axiosInstance";
import routes from "../routes";

export const register = async (
  registerRequest: RegisterRequest
): Promise<ApiResponse> => {
  const response = await axiosClient.post(
    routes.api.auth.register,
    registerRequest,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosClient.post(routes.api.auth.login, loginRequest, {
    withCredentials: true,
  });

  return response.data;
};
