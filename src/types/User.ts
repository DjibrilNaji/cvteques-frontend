export type Role = "INTERVENANT" | "ECOLE";

export enum Roles {
  INTERVENANT = "INTERVENANT",
  ECOLE = "ECOLE",
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  school?: School | null;
}

export interface School {
  id: number;
  name: string;
}
