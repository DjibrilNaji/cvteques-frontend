"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useCustomMutation } from "@/client/hook/useCustomMutation";
import { uploadCV } from "@/client/services/intervenantCV";
import { UploadCVZone } from "./UploadCVZone";
import { PendingCV } from "./PendingCV";
import { UploadedCV } from "./UploadedCV";

export function ProfileCV() {
  const [pendingCV, setPendingCV] = useState<File | null>(null);
  const [uploadedCV, setUploadedCV] = useState<{
    name: string;
    date: string;
  } | null>(null);

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

  const { isPending, mutate } = useCustomMutation(
    async (values: FormData) => await uploadCV(values),
    {
      onSuccess: (data) => {
        toast.success(data.customMessage);
        setUploadedCV({
          name: pendingCV!.name,
          date: new Date().toLocaleDateString("fr-FR"),
        });
        setPendingCV(null);
      },
      onError: (error) => {
        alert("Erreur lors de l'upload : " + error);
      },
    }
  );

  const confirmCVUpload = () => {
    if (!pendingCV) return;
    const formData = new FormData();
    formData.append("file", pendingCV);
    mutate(formData);
  };

  const replaceCV = () => {
    setUploadedCV(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CV</CardTitle>
        <CardDescription>Téléchargez votre CV au format PDF</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedCV && !pendingCV && (
          <UploadCVZone onFileSelected={handleCVSelection} />
        )}
        {pendingCV && (
          <PendingCV
            fileName={pendingCV.name}
            isLoading={isPending}
            onUpload={confirmCVUpload}
          />
        )}
        {uploadedCV && (
          <UploadedCV
            name={uploadedCV.name}
            date={uploadedCV.date}
            onReplace={replaceCV}
          />
        )}
      </CardContent>
    </Card>
  );
}
