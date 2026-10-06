"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export default function PageConnexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [lienEnvoye, setLienEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function seConnecter(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });

    setChargement(false);
    if (error) {
      setErreur(
        error.message === "Invalid login credentials"
          ? "E-mail ou mot de passe incorrect."
          : error.message
      );
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function demanderReinitialisation() {
    if (!email) {
      setErreur("Renseignez votre e-mail ci-dessus pour recevoir le lien de réinitialisation.");
      return;
    }
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reinitialiser-mot-de-passe`,
    });

    setChargement(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setLienEnvoye(true);
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-sm font-medium text-amber-900">
            Supabase n&apos;est pas encore configuré. Ajoutez vos variables d&apos;environnement
            pour activer la connexion (voir README).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-nuit">Connexion</h1>
        <p className="mt-1 text-sm text-zinc-500">Accédez à votre tableau de bord Starnote.</p>

        {lienEnvoye ? (
          <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            Un lien de réinitialisation a été envoyé à {email}. Vérifiez votre boîte de réception.
          </p>
        ) : (
          <form onSubmit={seConnecter} className="mt-6 space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@entreprise.fr"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none"
            />
            <input
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none"
            />
            {erreur && <p className="text-sm text-red-600">{erreur}</p>}
            <button
              type="submit"
              disabled={chargement}
              className="flex h-11 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white disabled:opacity-50"
            >
              {chargement ? "Connexion…" : "Se connecter"}
            </button>
            <button
              type="button"
              onClick={demanderReinitialisation}
              disabled={chargement}
              className="w-full text-center text-xs font-medium text-signal hover:text-nuit disabled:opacity-50"
            >
              Mot de passe oublié ?
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
