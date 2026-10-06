"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PageReinitialiserMotDePasse() {
  const router = useRouter();
  const [motDePasse, setMotDePasse] = useState("");
  const [enregistre, setEnregistre] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function enregistrerMotDePasse(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: motDePasse });

    setChargement(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setEnregistre(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-nuit">Nouveau mot de passe</h1>
        <p className="mt-1 text-sm text-zinc-500">Choisissez un nouveau mot de passe pour votre compte.</p>

        {enregistre ? (
          <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            Mot de passe mis à jour. Redirection vers votre tableau de bord…
          </p>
        ) : (
          <form onSubmit={enregistrerMotDePasse} className="mt-6 space-y-4">
            <input
              type="password"
              required
              minLength={8}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="8 caractères minimum"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none"
            />
            {erreur && <p className="text-sm text-red-600">{erreur}</p>}
            <button
              type="submit"
              disabled={chargement}
              className="flex h-11 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white disabled:opacity-50"
            >
              {chargement ? "Enregistrement…" : "Enregistrer le mot de passe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
