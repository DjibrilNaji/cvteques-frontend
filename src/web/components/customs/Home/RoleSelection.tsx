"use client";

import { Roles } from "@/types/User";
import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import routes from "@/web/routes";
import { ArrowRight, School, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RoleSelection() {
  const [hoveredCard, setHoveredCard] = useState<Roles | null>(null);

  return (
    <>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Rejoignez notre communauté
        </h2>
        <p className="text-base sm:text-lg text-gray-600 px-4">
          Choisissez votre profil et commencez dès maintenant
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
            hoveredCard === Roles.INTERVENANT
              ? "scale-105 border-green-200 shadow-2xl"
              : "border-gray-200"
          }`}
          onMouseEnter={() => setHoveredCard(Roles.INTERVENANT)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Intervenant
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Partagez votre expertise avec les écoles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <ul className="space-y-2 sm:space-y-3 text-gray-600">
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Créez votre profil professionnel</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Uploadez et gérez votre CV</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Connectez-vous avec les écoles</span>
              </li>
            </ul>
            <div className="pt-2 sm:pt-4">
              <Link href={routes.register}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 sm:py-3">
                  S&apos;inscrire comme intervenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
            hoveredCard === Roles.ECOLE
              ? "scale-105 border-blue-200 shadow-2xl"
              : "border-gray-200"
          }`}
          onMouseEnter={() => setHoveredCard(Roles.ECOLE)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <School className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              École
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Trouvez les meilleurs intervenants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <ul className="space-y-2 sm:space-y-3 text-gray-600">
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span>Accédez à la base de données des CVs</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span>Recherchez par compétences</span>
              </li>
              <li className="flex items-center space-x-2 text-sm sm:text-base">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span>Contactez directement les intervenants</span>
              </li>
            </ul>
            <div className="pt-2 sm:pt-4">
              <Link href={routes.register}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base py-2 sm:py-3">
                  S&apos;inscrire comme école
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
