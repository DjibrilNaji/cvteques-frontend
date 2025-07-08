import { Role } from "./User";

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  schoolId?: number;
}
