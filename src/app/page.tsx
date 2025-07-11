"use client";

import { useAuth } from "@/provider/AuthProvider";
import RoleSelection from "@/web/components/customs/Home/RoleSelection";
import { Button } from "@/web/components/ui/button";
import routes from "@/web/routes";
import { BookOpen, Database, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="relative overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              CV<span className="text-blue-600">Tech</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              La plateforme qui connecte les intervenants qualifiés avec les
              écoles
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto mb-8 sm:mb-12 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Connexion Directe
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Mettez en relation écoles et intervenants qualifiés
            </p>
          </div>
          <div className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Base de Données
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Accédez à une large base de CVs d&apos;experts
            </p>
          </div>
          <div className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Sécurisé
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Plateforme sécurisée et professionnelle
            </p>
          </div>
        </div>

        {!isLoggedIn && (
          <>
            <RoleSelection />
            <div className="text-center mt-8 sm:mt-12">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Déjà inscrit ?
              </p>
              <Link href={routes.login}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm sm:text-base px-6 sm:px-8"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
