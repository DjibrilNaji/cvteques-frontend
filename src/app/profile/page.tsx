"use client";

import { useAuth } from "@/provider/AuthProvider";
import { Roles } from "@/types/User";
import { FileZone } from "@/web/components/customs/profil/FileZone";
import { PendingCV } from "@/web/components/customs/profil/PendingCV";
import { UploadedCV } from "@/web/components/customs/profil/UploadedCV";
import PersonalInfo from "@/web/components/customs/profile/PersonalInfo";
import Spinner from "@/web/components/customs/utils/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import {
  useCustomMutation,
  useCustomQuery,
} from "@/web/hook/useCustomMutation";
import { uploadCV } from "@/web/services/intervenantCV";
import { getUser } from "@/web/services/user";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [pendingCV, setPendingCV] = useState<File | null>(null);
  const [uploadedCV, setUploadedCV] = useState<{
    name: string;
    date: string;
  } | null>(null);

  const { role, email } = useAuth();

  const {
    data: user,
    isLoading,
    refetch,
  } = useCustomQuery(["user", email], () => getUser(email));

  const { mutate, isPending } = useCustomMutation(
    async (values: FormData) => await uploadCV(values, user!.id),
    {
      onSuccess: (data) => {
        console.log("CV upload successful:", data);

        toast.success(data.customMessage);
        setUploadedCV({
          name: pendingCV!.name,
          date: new Date().toLocaleDateString("fr-FR"),
        });
        setPendingCV(null);
        refetch();
      },
    }
  );

  useEffect(() => {
    if (user?.cv) {
      setUploadedCV({
        name: user.cv.title,
        date: new Date(user.cv.updatedAt).toLocaleDateString("fr-FR"),
      });
    }
  }, [user?.cv]);

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

  const confirmCVUpload = () => {
    if (!pendingCV) return;
    const formData = new FormData();
    formData.append("file", pendingCV);
    mutate(formData);
  };

  if (isLoading) return <Spinner />;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Profil non trouvé</h2>
          <p className="text-sm">
            Nous n&apos;avons pas pu trouver les informations de
            l&apos;utilisateur. Veuillez vérifier l&apos;URL ou réessayer plus
            tard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Mon Compte
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Gérez vos informations personnelles et votre CV
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <PersonalInfo user={user} />

          {role === Roles.INTERVENANT && (
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl">
                        Mon CV
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Gérez votre CV
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!uploadedCV && !pendingCV && (
                    <FileZone handleCVSelection={handleCVSelection} />
                  )}

                  {pendingCV && (
                    <PendingCV
                      fileName={pendingCV.name}
                      isLoading={isPending}
                      onUpload={confirmCVUpload}
                      onDelete={() => setPendingCV(null)}
                    />
                  )}
                  {uploadedCV && (
                    <UploadedCV
                      name={uploadedCV.name}
                      date={uploadedCV.date}
                      intervenantId={user.id}
                      onDeleteSuccess={() => setUploadedCV(null)}
                    />
                  )}

                  <p className="text-xs text-gray-500 mt-4">
                    Formats acceptés : PDF uniquement (max 5MB)
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
