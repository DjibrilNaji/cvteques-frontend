import { Role } from "./User";

export type ApiError = {
  response?: { data?: { customMessage?: string } };
  message?: string;
};

export type ApiResponse = {
  token: string;
  customMessage: string;
};

export type LoginResponse = ApiResponse & {
  role: Role;
  token: string;
};
