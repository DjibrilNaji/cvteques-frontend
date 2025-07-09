export type Role = "INTERVENANT" | "ECOLE";

export enum Roles {
  INTERVENANT = "INTERVENANT",
  ECOLE = "ECOLE",
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  school?: School | null;
}

export interface School {
  id: number;
  name: string;
}
