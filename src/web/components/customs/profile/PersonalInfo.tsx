"use client";

import { Roles, UserDto } from "@/types/User";
import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import { Briefcase, Edit, Save, School, User, X } from "lucide-react";
import { useState } from "react";

interface PersonalInfoProps {
  user: UserDto;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  const [editMode, setEditMode] = useState(false);

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
                  onClick={() => setEditMode(false)}
                  className="flex-1 sm:flex-none"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex-1 sm:flex-none">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={user.firstname}
                disabled={!editMode}
                className={editMode ? "" : "bg-gray-50"}
              />
            </div>

            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={user.lastname}
                disabled={!editMode}
                className={editMode ? "" : "bg-gray-50"}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled={!editMode}
              className={editMode ? "" : "bg-gray-50"}
            />
          </div>

          {user.role === Roles.INTERVENANT && (
            <div>
              <Label htmlFor="schoolName">Nom de l&apos;école</Label>
              <Input
                id="schoolName"
                value={user.school?.name}
                disabled={!editMode}
                className={editMode ? "" : "bg-gray-50"}
              />
            </div>
          )}

          <div className="flex items-center space-x-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              {user.role === Roles.INTERVENANT ? (
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
                    École
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
