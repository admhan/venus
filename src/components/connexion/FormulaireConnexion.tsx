"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

export function FormulaireConnexion({ locale }: { locale: Locale }) {
  const dict = getDict(locale).connexion;
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
        error.message === "Invalid login credentials" ? dict.errorInvalidCredentials : error.message
      );
      return;
    }
    router.push(localizedHref(locale, "/dashboard"));
    router.refresh();
  }

  async function demanderReinitialisation() {
    if (!email) {
      setErreur(dict.errorEmailRequired);
      return;
    }
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        localizedHref(locale, "/auth/reinitialiser-mot-de-passe")
      )}`,
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
          <p className="text-sm font-medium text-amber-900">{dict.notConfigured}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-nuit">{dict.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{dict.subtitle}</p>

        {lienEnvoye ? (
          <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            {dict.resetLinkSent} {email}. {dict.resetLinkSentSuffix}
          </p>
        ) : (
          <form onSubmit={seConnecter} className="mt-6 space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.emailPlaceholder}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none"
            />
            <input
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder={dict.passwordPlaceholder}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none"
            />
            {erreur && <p className="text-sm text-red-600">{erreur}</p>}
            <button
              type="submit"
              disabled={chargement}
              className="flex h-11 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white disabled:opacity-50"
            >
              {chargement ? dict.submitLoading : dict.submit}
            </button>
            <button
              type="button"
              onClick={demanderReinitialisation}
              disabled={chargement}
              className="w-full text-center text-xs font-medium text-signal hover:text-nuit disabled:opacity-50"
            >
              {dict.forgotPassword}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
