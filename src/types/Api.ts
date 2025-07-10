import { Role } from "./User";

export type ApiError = {
  response?: { data?: { customMessage?: string } };
  message?: string;
};

export type ApiResponse = {
  customMessage: string;
};

export type LoginResponse = ApiResponse & {
  role: Role;
  token: string;
};
