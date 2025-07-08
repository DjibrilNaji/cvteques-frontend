"use client";

import { useCustomMutation } from "@/client/hook/useCustomMutation";
import { login } from "@/client/services/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormType } from "@/types/Form";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormProps {
  form: UseFormReturn<LoginFormType>;
}
export default function LoginForm({ form }: LoginFormProps) {
  const router = useRouter();

  const { isPending, mutate } = useCustomMutation(
    async (values: LoginFormType) => await login(values),
    {
      onSuccess: (data) => {
        toast.success(data.customMessage);
        router.push("/profil");
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

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending && (
            <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />
          )}
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
