"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { slugifier } from "@/lib/slug";
import { createClient } from "@/lib/supabase/client";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

type Periodicite = "mensuel" | "annuel";

export function FormulaireInscription({ locale }: { locale: Locale }) {
  return (
    <Suspense>
      <Formulaire locale={locale} />
    </Suspense>
  );
}

function Formulaire({ locale }: { locale: Locale }) {
  const dict = getDict(locale).inscription;
  const searchParams = useSearchParams();
  const periodiciteInitiale: Periodicite =
    searchParams.get("periodicite") === "annuel" ? "annuel" : "mensuel";

  const [nom, setNom] = useState("");
  const [slugManuel, setSlugManuel] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [periodicite, setPeriodicite] = useState<Periodicite>(periodiciteInitiale);
  const [disponible, setDisponible] = useState<boolean | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const slug = slugManuel ?? slugifier(nom);

  useEffect(() => {
    if (!slug) return;
    const timeout = setTimeout(() => {
      fetch(`/api/slug-disponible?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => setDisponible(data.disponible))
        .catch(() => setDisponible(null));
    }, 400);
    return () => clearTimeout(timeout);
  }, [slug]);

  async function demarrerPaiement(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const supabase = createClient();
    const { data: inscriptionAuth, error: erreurAuth } = await supabase.auth.signUp({
      email,
      password: motDePasse,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          localizedHref(locale, "/dashboard")
        )}`,
      },
    });

    if (erreurAuth || !inscriptionAuth.user) {
      setErreur(
        erreurAuth?.message === "User already registered"
          ? dict.errorAccountExists
          : erreurAuth?.message || dict.errorGenericAccount
      );
      setChargement(false);
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          slug,
          email,
          periodicite,
          googleReviewUrl,
          userId: inscriptionAuth.user.id,
          locale,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErreur(data.error || dict.errorGeneric);
        setChargement(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setErreur(dict.errorPaymentServer);
      setChargement(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-nuit">{dict.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {periodicite === "annuel" ? `${dict.priceYearly}${dict.perYear}` : `${dict.priceMonthly}${dict.perMonth}`}{" "}
          {dict.priceNote}
        </p>

        <div className="mt-4 flex rounded-full border border-zinc-200 bg-zinc-100 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setPeriodicite("mensuel")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              periodicite === "mensuel" ? "bg-white text-nuit shadow-sm" : "text-zinc-500"
            }`}
          >
            {dict.monthlyLabel}
          </button>
          <button
            type="button"
            onClick={() => setPeriodicite("annuel")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              periodicite === "annuel" ? "bg-white text-nuit shadow-sm" : "text-zinc-500"
            }`}
          >
            {dict.yearlyLabel}
          </button>
        </div>

        <form onSubmit={demarrerPaiement} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700">{dict.nomLabel}</label>
            <input
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder={dict.nomPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">{dict.googleUrlLabel}</label>
            <input
              required
              value={googleReviewUrl}
              onChange={(e) => setGoogleReviewUrl(e.target.value)}
              placeholder={dict.googleUrlPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-zinc-400">{dict.googleUrlHelp}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">{dict.slugLabel}</label>
            <div className="mt-1.5 flex items-center rounded-xl border border-zinc-200 px-4 py-2.5 text-sm">
              <span className="text-zinc-400">{dict.slugDomain}</span>
              <input
                required
                value={slug}
                onChange={(e) => setSlugManuel(slugifier(e.target.value))}
                className="flex-1 outline-none"
              />
            </div>
            {slug && disponible === false && (
              <p className="mt-1 text-xs text-red-600">{dict.slugTaken}</p>
            )}
            {slug && disponible === true && (
              <p className="mt-1 text-xs text-emerald-600">{dict.slugAvailable}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">{dict.emailLabel}</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.emailPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-zinc-400">{dict.emailHelp}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">{dict.passwordLabel}</label>
            <input
              required
              type="password"
              minLength={8}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder={dict.passwordPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-zinc-400">{dict.passwordHelp}</p>
          </div>

          {erreur && <p className="text-sm text-red-600">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement || disponible === false}
            className="flex h-12 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white disabled:opacity-50"
          >
            {chargement ? dict.submitLoading : dict.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
