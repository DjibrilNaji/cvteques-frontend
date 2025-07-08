"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [userRole, setUserRole] = useState<string>("");

  const router = useRouter();

  const [pendingCV, setPendingCV] = useState<File | null>(null);
  const [uploadedCV, setUploadedCV] = useState<{
    name: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role || "eleve");
  }, [router]);

  const handleCVSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Merci de sélectionner un fichier PDF.");
        return;
      }
      setPendingCV(file);
    }
  };

  // Confirmer l'upload (simulé)
  const confirmCVUpload = () => {
    if (!pendingCV) return;
    setUploadedCV({
      name: pendingCV.name,
      date: new Date().toLocaleDateString("fr-FR"),
    });
    setPendingCV(null);
  };

  // Remplacer le CV : réinitialise tout pour permettre un nouvel upload
  const replaceCV = () => {
    setUploadedCV(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              Mon Profil
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="cv">Onglet pour le CV mdr</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil Personnel</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Dupont" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="jean.dupont@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                  </div>
                </div>

                <Button>Sauvegarder les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cv" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CV</CardTitle>
                <CardDescription>
                  Téléchargez votre CV au format PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Zone d'upload cliquable entière */}
                {!uploadedCV && !pendingCV && (
                  <label
                    htmlFor="cv-upload"
                    className="border border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Déposez votre CV au format PDF
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ou cliquez ici pour sélectionner un fichier
                    </p>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleCVSelection}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Bouton de confirmation d'upload */}
                {pendingCV && (
                  <div className="flex items-center justify-between border border-yellow-400 rounded-md p-4 bg-yellow-50">
                    <span className="text-yellow-700 font-medium">
                      {pendingCV.name}
                    </span>
                    <Button variant="default" onClick={confirmCVUpload}>
                      Uploader mon CV
                    </Button>
                  </div>
                )}

                {/* Affichage du CV uploadé */}
                {uploadedCV && (
                  <div className="flex items-center justify-between border border-green-400 rounded-md p-4 bg-green-50">
                    <div>
                      <p className="text-green-800 font-medium">
                        {uploadedCV.name}
                      </p>
                      <p className="text-green-600 text-sm">
                        Téléchargé le {uploadedCV.date}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" onClick={replaceCV}>
                        Supprimer
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
