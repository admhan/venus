const QUESTIONS = [
  {
    q: "Est-ce que les avis générés sont faux ?",
    r: "Non. Chaque avis est rédigé à partir de réponses réellement données par un client qui a visité votre établissement, et il peut le modifier avant de le publier. Starnote aide à la rédaction, pas à la fabrication d'avis.",
  },
  {
    q: "Que se passe-t-il si un client n'est pas satisfait ?",
    r: "Il est orienté vers un formulaire de feedback privé qui vous est envoyé directement, plutôt que vers Google. Il n'est jamais empêché de laisser un avis public s'il le souhaite.",
  },
  {
    q: "Puis-je changer les questions posées à mes clients ?",
    r: "Oui, entièrement, depuis votre tableau de bord. 5 questions génériques adaptées à votre secteur sont pré-remplies pour démarrer rapidement.",
  },
  {
    q: "Combien de temps pour être en ligne ?",
    r: "Votre page est créée automatiquement dès la confirmation du paiement, généralement en moins d'une minute.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-ink-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Questions fréquentes
        </h2>

        <div className="mt-12 divide-y divide-ink-200">
          {QUESTIONS.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="text-base font-semibold text-ink-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
