"use client";

import { useCustomMutation } from "@/client/hook/useCustomMutation";
import { register } from "@/client/services/auth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterFormType } from "@/types/Form";
import { Roles } from "@/types/User";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormType>;
}

export default function RegisterForm({ form }: RegisterFormProps) {
  const router = useRouter();

  const { isPending, mutate } = useCustomMutation(
    async (values: RegisterFormType) => await register(values),
    {
      onSuccess: (data) => {
        toast.success(data.customMessage);
        router.push("/profil");
      },
    }
  );

  const onSubmit = (data: RegisterFormType) => mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
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
            name="lastname"
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez un rôle" />
                  </SelectTrigger>
                  <SelectContent className="min-w-0">
                    <SelectItem value={Roles.INTERVENANT}>
                      Intervenant
                    </SelectItem>
                    <SelectItem value={Roles.ECOLE}>École</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          {isPending && (
            <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />
          )}
          S&apos;inscrire
        </Button>
      </form>
    </Form>
  );
}
