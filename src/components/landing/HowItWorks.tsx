const ETAPES = [
  {
    numero: "01",
    titre: "Vous créez votre questionnaire",
    description:
      "5 questions génériques pensées pour votre secteur sont pré-remplies. Modifiez-les en quelques minutes depuis votre tableau de bord.",
  },
  {
    numero: "02",
    titre: "Vos clients y répondent en 30 secondes",
    description:
      "QR code en caisse, lien par SMS, ou tag NFC sur le comptoir : vos clients répondent à chaud, sur leur téléphone, sans créer de compte.",
  },
  {
    numero: "03",
    titre: "L'IA rédige un avis pour eux",
    description:
      "À partir de leurs réponses, Starnote génère un avis naturel et sincère, jamais deux fois identique. Le client peut le modifier avant de le publier.",
  },
  {
    numero: "04",
    titre: "Un clic pour publier sur Google",
    description:
      "L'avis est copié automatiquement et votre fiche Google Business s'ouvre directement. Le client n'a plus qu'à coller et valider.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Quatre étapes, zéro friction pour votre client, et un flux d&apos;avis Google
            constant pour votre établissement.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((etape) => (
            <div key={etape.numero}>
              <p className="text-sm font-semibold text-signal">{etape.numero}</p>
              <h3 className="mt-3 text-lg font-semibold text-nuit">{etape.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{etape.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
