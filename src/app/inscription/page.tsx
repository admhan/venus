"use client";

import { Logo } from "@/components/brand/Logo";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { slugifier } from "@/lib/slug";

type Periodicite = "mensuel" | "annuel";

export default function PageInscription() {
  return (
    <Suspense>
      <FormulaireInscription />
    </Suspense>
  );
}

function FormulaireInscription() {
  const searchParams = useSearchParams();
  const periodiciteInitiale: Periodicite =
    searchParams.get("periodicite") === "annuel" ? "annuel" : "mensuel";

  const [nom, setNom] = useState("");
  const [slugManuel, setSlugManuel] = useState<string | null>(null);
  const [email, setEmail] = useState("");
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

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, slug, email, periodicite }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErreur(data.error || "Une erreur est survenue.");
        setChargement(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setErreur("Impossible de contacter le serveur de paiement.");
      setChargement(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-8 shadow-sm">
        <Logo symbole className="mb-6 text-xl" />
        <h1 className="text-xl font-semibold text-ink-900">Créer votre page Starnote</h1>
        <p className="mt-1 text-sm text-ink-500">
          {periodicite === "annuel" ? "600€/an" : "60€/mois"} TTC, sans engagement.
        </p>

        <div className="mt-4 flex rounded-full border border-ink-200 bg-ink-100 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setPeriodicite("mensuel")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              periodicite === "mensuel" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
            }`}
          >
            Mensuel — 60€/mois
          </button>
          <button
            type="button"
            onClick={() => setPeriodicite("annuel")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              periodicite === "annuel" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
            }`}
          >
            Annuel — 600€/an
          </button>
        </div>

        <form onSubmit={demarrerPaiement} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink-700">Nom de l&apos;établissement</label>
            <input
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Finest Lash Studio"
              className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-ink-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink-700">Adresse de votre page</label>
            <div className="mt-1.5 flex items-center rounded-xl border border-ink-200 px-4 py-2.5 text-sm">
              <span className="text-ink-400">getstarnote.com/</span>
              <input
                required
                value={slug}
                onChange={(e) => setSlugManuel(slugifier(e.target.value))}
                className="flex-1 outline-none"
              />
            </div>
            {slug && disponible === false && (
              <p className="mt-1 text-xs text-red-600">Ce lien est déjà pris.</p>
            )}
            {slug && disponible === true && (
              <p className="mt-1 text-xs text-emerald-600">Disponible</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-ink-700">E-mail professionnel</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@entreprise.fr"
              className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm focus:border-ink-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-ink-400">
              Vous recevrez un lien de connexion à votre tableau de bord à cette adresse après paiement.
            </p>
          </div>

          {erreur && <p className="text-sm text-red-600">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement || disponible === false}
            className="flex h-12 w-full items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white disabled:opacity-50"
          >
            {chargement ? "Redirection vers le paiement…" : "Continuer vers le paiement"}
          </button>
        </form>
      </div>
    </div>
  );
}
