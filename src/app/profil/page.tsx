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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [userRole, setUserRole] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "Node.js",
    "TypeScript",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Développeur Frontend",
      company: "TechCorp",
      duration: "2022 - 2024",
      description: "Développement d'applications React",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    setUserRole(role || "eleve");
  }, [router]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    setExperiences([...experiences, newExp]);
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Glissez-déposez votre CV ici
                  </p>
                  <p className="text-sm text-gray-500 mb-4">ou</p>
                  <Button variant="outline">Parcourir les fichiers</Button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">
                        CV_Jean_Dupont.pdf
                      </p>
                      <p className="text-sm text-green-600">
                        Téléchargé le 15/01/2024
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        Remplacer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
