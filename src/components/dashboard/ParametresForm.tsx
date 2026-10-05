"use client";

import { useState, useTransition } from "react";
import { sauvegarderParametres } from "@/app/dashboard/parametres/actions";
import type { Entreprise } from "@/lib/types/db";

export function ParametresForm({ entreprise }: { entreprise: Entreprise }) {
  const [nom, setNom] = useState(entreprise.nom);
  const [couleur, setCouleur] = useState(entreprise.couleur_primaire);
  const [googleUrl, setGoogleUrl] = useState(entreprise.google_review_url || "");
  const [email, setEmail] = useState(entreprise.email_contact);
  const [seuil, setSeuil] = useState(entreprise.seuil_note_positive);
  const [isPending, startTransition] = useTransition();
  const [sauvegarde, setSauvegarde] = useState(false);

  function enregistrer(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await sauvegarderParametres({
        nom,
        couleur_primaire: couleur,
        google_review_url: googleUrl,
        email_contact: email,
        seuil_note_positive: seuil,
      });
      setSauvegarde(true);
      setTimeout(() => setSauvegarde(false), 2000);
    });
  }

  return (
    <form onSubmit={enregistrer} className="max-w-xl space-y-6">
      <div>
        <label className="text-sm font-medium text-ink-700">Nom de l&apos;établissement</label>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">Couleur de marque</label>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            type="color"
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
            className="h-10 w-14 rounded-lg border border-ink-200"
          />
          <input
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
            className="flex-1 rounded-xl border border-ink-200 px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">Lien direct vers votre fiche d&apos;avis Google</label>
        <input
          value={googleUrl}
          onChange={(e) => setGoogleUrl(e.target.value)}
          placeholder="https://g.page/r/..."
          className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">E-mail de contact</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">
          Note minimale pour orienter vers Google ({seuil}/5)
        </label>
        <input
          type="range"
          min={1}
          max={5}
          value={seuil}
          onChange={(e) => setSeuil(Number(e.target.value))}
          className="mt-1.5 w-full"
        />
        <p className="mt-1 text-xs text-ink-400">
          En dessous de cette note, le client est orienté vers le feedback privé plutôt que vers Google.
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Enregistrement…" : sauvegarde ? "Enregistré ✓" : "Enregistrer"}
      </button>
    </form>
  );
}
