"use client";

import { useCustomMutation } from "@/client/hook/useCustomMutation";
import { useAuth } from "@/client/provider/AuthProvider";
import routes from "@/client/routes";
import { login } from "@/client/services/auth";
import { LoginFormType } from "@/types/Form";
import { Button } from "@/web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import Cookies from "js-cookie";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormProps {
  form: UseFormReturn<LoginFormType>;
}

export default function LoginForm({ form }: LoginFormProps) {
  const router = useRouter();
  const { setIsLoggedIn, setEmail } = useAuth();

  const { isPending, mutate } = useCustomMutation(
    async (values: LoginFormType) => await login(values),
    {
      onSuccess: (data) => {
        if (data.token) {
          Cookies.set("token", data.token, {
            expires: 7,
            sameSite: "Lax",
          });
        }
        setIsLoggedIn(true);
        setEmail(form.getValues("email"));

        toast.success(data.customMessage);
        router.push(routes.home);
      },
    }
  );

  const onSubmit = (data: LoginFormType) => mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="exemple@mail.com" />
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
                <Input type="password" {...field} placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />
          )}
          {isPending ? "Inscription..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
