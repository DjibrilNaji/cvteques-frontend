export type ApiError = {
  response?: { data?: { customMessage?: string } };
  message?: string;
};

export type ApiResponse = {
  customMessage: string;
};
