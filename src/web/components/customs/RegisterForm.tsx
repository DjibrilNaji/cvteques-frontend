"use client";

import {
  useCustomMutation,
  useCustomQuery,
} from "@/client/hook/useCustomMutation";
import { register } from "@/client/services/auth";
import { getSchools } from "@/client/services/school";
import { RegisterFormType } from "@/types/Form";
import { Roles, School } from "@/types/User";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/web/components/ui/select";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormType>;
}

export default function RegisterForm({ form }: RegisterFormProps) {
  const [schoolOptions, setSchoolOptions] = useState<School[]>([]);
  const watchRole = form.watch("role");
  const router = useRouter();

  const { data: dynamicSchools } = useCustomQuery(["schools"], getSchools);

  useEffect(() => {
    if (dynamicSchools) {
      setSchoolOptions(dynamicSchools);
    }
  }, [dynamicSchools]);

  const { isPending, mutate } = useCustomMutation(
    async (values: RegisterFormType) => await register(values),
    {
      onSuccess: (data) => {
        toast.success(data.customMessage);
        router.push("/login");
      },
    }
  );

  const onSubmit = (data: RegisterFormType) => mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Je suis</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Roles.INTERVENANT}>
                      Intervenant
                    </SelectItem>
                    <SelectItem value={Roles.ECOLE}>
                      De l&apos;équipe pédagogique
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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
                <Input type="email" {...field} placeholder="exemple@mail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchRole === Roles.ECOLE && (
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;école</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez une école" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolOptions.map((school) => (
                        <SelectItem key={school.id} value={String(school.id)}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
