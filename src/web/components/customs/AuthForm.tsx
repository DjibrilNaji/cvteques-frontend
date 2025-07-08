"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  loginFormSchema,
  LoginFormType,
  registerFormSchema,
  RegisterFormType,
} from "@/types/Form";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const clearErrors = () => {
    if (isLogin) {
      loginForm.clearErrors();
    } else {
      registerForm.clearErrors();
    }
  };

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
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <Button
            variant={isLogin ? "ghost" : "outline"}
            className="flex-1 rounded-l-lg cursor-pointer"
            onClick={() => {
              setIsLogin(false);
              clearErrors();
            }}
          >
            Inscription
          </Button>
          <Button
            variant={isLogin ? "outline" : "ghost"}
            className="flex-1 rounded-r-lg cursor-pointer"
            onClick={() => {
              setIsLogin(true);
              clearErrors();
            }}
          >
            Connexion
          </Button>
        </div>
        {isLogin ? (
          <LoginForm form={loginForm} />
        ) : (
          <RegisterForm form={registerForm} />
        )}
      </motion.div>
    </div>
  );
}
