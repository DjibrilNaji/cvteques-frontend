"use client";

import { Button } from "@/web/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/web/components/ui/tabs";
import Link from "next/link";

import { ProfileCV } from "@/web/components/customs/profil/ProfileCV";
import { ProfileGeneralInfo } from "@/web/components/customs/profil/ProfileGeneralInfo";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
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
            <TabsTrigger value="cv">CV</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <ProfileGeneralInfo />
          </TabsContent>

          <TabsContent value="cv" className="space-y-6">
            <ProfileCV />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
