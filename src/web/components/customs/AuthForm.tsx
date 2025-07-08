"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// 📐 Schéma de validation
const authSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe ≥ 6 caractères"),
  role: z.string().optional(),
});
type AuthFormData = z.infer<typeof authSchema>;

// Variantes Framer Motion
const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = (data: AuthFormData) =>
    console.log(isLogin ? "Connexion" : "Inscription", data);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg p-6 sm:p-8 rounded-xl w-full max-w-md"
        layout
        initial={variants.hidden}
        animate={variants.visible}
        exit={variants.exit}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      >
        {/* Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <Button
            variant={isLogin ? "ghost" : "outline"}
            className="flex-1 rounded-l-lg"
            onClick={() => {
              setIsLogin(false);
              form.clearErrors();
            }}
          >
            Inscription
          </Button>
          <Button
            variant={isLogin ? "outline" : "ghost"}
            className="flex-1 rounded-r-lg"
            onClick={() => {
              setIsLogin(true);
              form.clearErrors();
            }}
          >
            Connexion
          </Button>
        </div>

        {/* Animated form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jean" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dupont" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="•••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLogin && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôle</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisissez un rôle" />
                        </SelectTrigger>
                        <SelectContent className="min-w-0">
                          <SelectItem value="eleve">Élève</SelectItem>
                          <SelectItem value="intervenant">
                            Intervenant
                          </SelectItem>
                          <SelectItem value="ecole">École</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              variant={isLogin ? "default" : "default"}
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
