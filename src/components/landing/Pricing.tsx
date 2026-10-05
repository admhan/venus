import Link from "next/link";

const INCLUS = [
  "Page questionnaire personnalisée à votre marque",
  "5 questions génériques pré-remplies, modifiables à volonté",
  "Génération d'avis par IA illimitée",
  "QR code et lien de partage prêts à l'emploi",
  "Feedback privé pour les clients insatisfaits",
  "Tableau de bord et statistiques",
];

export function Pricing() {
  return (
    <section id="tarifs" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Un tarif simple, par établissement
        </h2>
        <p className="mt-4 text-lg text-ink-600">
          Pas de frais cachés, pas d&apos;engagement de durée.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-ink-200 bg-ink-50 p-10 text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-ink-900">60€</span>
              <span className="text-ink-500">/ mois</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">TTC, par établissement</p>

            <ul className="mt-8 space-y-3">
              {INCLUS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/inscription?periodicite=mensuel"
              className="mt-10 flex h-12 w-full items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Créer ma page maintenant
            </Link>
          </div>

          <div className="rounded-3xl border border-brand-200 bg-brand-50 p-10 text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-ink-900">600€</span>
              <span className="text-ink-500">/ an</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">TTC, par établissement — 2 mois offerts</p>

            <ul className="mt-8 space-y-3">
              {INCLUS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/inscription?periodicite=annuel"
              className="mt-10 flex h-12 w-full items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Créer ma page maintenant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
