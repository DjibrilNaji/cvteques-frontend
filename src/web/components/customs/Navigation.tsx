"use client";

import { useCustomQuery } from "@/client/hook/useCustomMutation";
import { useAuth } from "@/client/provider/AuthProvider";
import routes from "@/client/routes";
import { getUser } from "@/client/services/user";
import { Roles } from "@/types/User";
import { Button } from "@/web/components/ui/button";
import { BookOpen, LogOut, Menu, School, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, email, logout } = useAuth();

  const { data: user, isLoading } = useCustomQuery(["user", email], () =>
    getUser(email)
  );

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn || !user) {
    return (
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={routes.home} className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                CVTech
              </span>
            </Link>
            <div className="flex space-x-2 sm:space-x-4">
              <Link href={routes.login}>
                <Button variant="ghost" size="sm" className="text-sm">
                  Connexion
                </Button>
              </Link>
              <Link href={routes.register}>
                <Button size="sm" className="text-sm">
                  S&apos;inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={routes.home} className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              CVTech
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user.role === Roles.ECOLE && (
              <Link href={routes.cvs}>
                <Button
                  variant={pathname === routes.cvs ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                  size="sm"
                >
                  <School className="h-4 w-4" />
                  <span>Liste des CVs</span>
                </Button>
              </Link>
            )}

            <Link href={routes.profile}>
              <Button
                variant={pathname === routes.profile ? "default" : "ghost"}
                className="flex items-center space-x-2"
                size="sm"
              >
                <User className="h-4 w-4" />
                <span>Mon Compte</span>
              </Button>
            </Link>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden lg:block">
                {user.firstName} {user.lastName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 flex flex-col gap-2">
              {user.role === Roles.ECOLE && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={pathname === "/dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <School className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}

              <Link
                href={routes.profile}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={pathname === routes.profile ? "default" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Mon Compte
                </Button>
              </Link>

              <div className="pt-2 border-t flex flex-col gap-2">
                <p className="text-sm text-gray-600 px-3 py-2">
                  {user.firstName} {user.lastName}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
