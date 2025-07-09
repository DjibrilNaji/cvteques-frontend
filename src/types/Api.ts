export type ApiError = {
  response?: { data?: { customMessage?: string } };
  message?: string;
};

export type ApiResponse = {
  token: string;
  customMessage: string;
};
