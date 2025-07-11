"use client";

import RegisterForm from "@/web/components/customs/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import routes from "@/web/routes";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <Link href="/" className="flex justify-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </Link>
          <div>
            <CardTitle className="text-2xl font-bold">Inscription</CardTitle>
            <CardDescription className="text-base mt-2">
              Rejoignez la communauté CVTech
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <div className="text-center space-y-4 pt-4 border-t mt-4">
            <p className="text-sm text-gray-600">
              Déjà inscrit ?{" "}
              <Link
                href={routes.login}
                className="text-blue-600 hover:underline font-medium"
              >
                Se connecter
              </Link>
            </p>
            <Link
              href={routes.home}
              className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
