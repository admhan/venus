const POINTS = [
  {
    titre: "Les avis négatifs ne disparaissent jamais",
    description:
      "Un client mécontent est orienté vers un formulaire de feedback privé envoyé directement à votre établissement, jamais bloqué ni caché de Google. Conforme aux règles Google et à la législation sur les avis en ligne.",
  },
  {
    titre: "Des avis qui ne se ressemblent pas",
    description:
      "Chaque avis généré est unique, rédigé à partir des réponses propres à chaque client. Pas de texte copié-collé qui ferait tiquer Google.",
  },
  {
    titre: "QR code, NFC ou simple lien",
    description:
      "Diffusez votre questionnaire comme vous le souhaitez : affichette avec QR code en caisse, tag NFC sans contact, ou lien envoyé par SMS après le rendez-vous.",
  },
  {
    titre: "Un tableau de bord pour piloter",
    description:
      "Questions personnalisables, taux de complétion, volume d'avis généré, feedback privé centralisé : tout est visible en un coup d'œil.",
  },
];

export function Trust() {
  return (
    <section className="bg-ink-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Pensé pour durer, pas pour tricher
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Beaucoup d&apos;outils similaires jouent avec les limites des règles Google. Starnote est
            construit pour rester dans les clous, sur le long terme.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {POINTS.map((point) => (
            <div key={point.titre} className="rounded-2xl border border-ink-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-ink-900">{point.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
