"use client";

import Spinner from "@/web/components/customs/utils/Spinner";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/web/components/ui/table";
import { useCustomQuery } from "@/web/hook/useCustomMutation";
import { getCVs } from "@/web/services/intervenantCV";
import { Eye } from "lucide-react";
import { useState } from "react";

export default function CVList() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useCustomQuery(["cvs"], getCVs);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">
            Une erreur est survenue
          </h2>
          <p className="text-sm">
            Il n&apos;y a pas de CVs disponibles pour le moment. Veuillez
            réessayer plus tard ou contacter l&apos;administrateur si vous
            pensez qu&apos;il s&apos;agit d&apos;une erreur.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !data) return <Spinner />;

  const filtered = data.filter((cv) =>
    `${cv.firstname} ${cv.lastname} ${cv.title}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (data)
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Liste des CVs</h1>

        <Input
          placeholder="Rechercher un nom, prénom ou titre de CV..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>CV</TableHead>
              <TableHead>Date d&apos;upload</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((cv) => (
              <TableRow key={cv.id}>
                <TableCell>{cv.firstname}</TableCell>
                <TableCell>{cv.lastname}</TableCell>
                <TableCell>{cv.title}</TableCell>
                <TableCell>
                  {new Date(cv.updatedAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <a
                    href={`http://localhost:8080/${cv.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> Voir
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
}
