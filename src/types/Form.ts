import z from "zod";

export const registerFormSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe ≥ 6 caractères"),
  role: z.enum(["INTERVENANT", "ECOLE"], {
    errorMap: () => ({ message: "Rôle invalide" }),
  }),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe ≥ 6 caractères"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
