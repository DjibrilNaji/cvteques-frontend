"use client";

import { useAuth } from "@/provider/AuthProvider";
import { personalInfoFormSchema, PersonalInfoFormType } from "@/types/Form";
import { Roles, UserDto } from "@/types/User";
import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import { useCustomMutation } from "@/web/hook/useCustomMutation";
import { updateUser } from "@/web/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Edit,
  LoaderCircleIcon,
  Save,
  School,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PersonalInfoProps {
  user: UserDto;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();

  const watchRole = user.role;

  const router = useRouter();
  const { logout } = useAuth();

  const form = useForm<PersonalInfoFormType>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  const handleCancel = () => {
    setEditMode(false);
    form.reset({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  };

  const { isPending, mutate } = useCustomMutation(
    async (values: PersonalInfoFormType) =>
      await updateUser(user.email, values),
    {
      onSuccess: async (data, variables) => {
        await queryClient.invalidateQueries({ queryKey: ["user", user.email] });

        toast.success(data.customMessage);

        if (variables.email !== user.email) {
          logout();
          router.replace("/login");
        }
        setEditMode(false);
      },
    }
  );

  const onSubmit = (data: PersonalInfoFormType) => {
    mutate(data);
  };

  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  Informations personnelles
                </CardTitle>
                <CardDescription className="text-sm">
                  Modifiez vos données de profil
                </CardDescription>
              </div>
            </div>
            {!editMode ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
                className="w-full sm:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            ) : (
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isPending && (
                    <LoaderCircleIcon
                      className="-ms-1 animate-spin"
                      size={16}
                    />
                  )}
                  <Save className="h-4 w-4 mr-2" /> Sauvegarder
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
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
                        <Input
                          {...field}
                          disabled={!editMode}
                          className={!editMode ? "bg-gray-50" : ""}
                        />
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
                        <Input
                          {...field}
                          disabled={!editMode}
                          className={!editMode ? "bg-gray-50" : ""}
                        />
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
                      <Input
                        type="email"
                        {...field}
                        disabled={!editMode}
                        className={!editMode ? "bg-gray-50" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  {watchRole === Roles.INTERVENANT ? (
                    <>
                      <Briefcase className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Intervenant
                      </span>
                    </>
                  ) : (
                    <>
                      <School className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">
                        École{" : "}
                      </span>

                      <span className="text-sm font-medium text-gray-500">
                        {user.school?.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
