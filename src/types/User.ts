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

export interface Cv {
  id: number;
  title: string;
  url: string;
  intervenantId: number;
  updatedAt: Date;
}

export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  school?: School | null;
  cv?: Cv | null;
}
