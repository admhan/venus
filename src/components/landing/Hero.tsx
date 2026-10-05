import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-100">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            Fait pour les commerces de proximité
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Transformez chaque client satisfait en avis Google
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">
            Vos clients n&apos;écrivent jamais spontanément un avis, même quand ils sont ravis.
            Starnote leur pose quelques questions simples juste après leur passage, et une IA
            rédige pour eux un avis sincère, prêt à publier sur votre fiche Google en un clic.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/inscription"
              className="flex h-12 items-center justify-center rounded-full bg-ink-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Créer la page de mon établissement
            </Link>
            <a
              href="#comment-ca-marche"
              className="flex h-12 items-center justify-center rounded-full border border-ink-200 px-8 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              Voir comment ça marche
            </a>
          </div>
          <p className="mt-6 text-xs text-ink-400">
            Sans engagement de durée. Votre page est en ligne moins d&apos;une minute après paiement.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-[2rem] border border-ink-200 bg-white shadow-xl shadow-brand-200/50">
            <div className="bg-ink-900 px-6 py-8 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-ink-400">Finest Lash Studio</p>
              <p className="mt-2 text-lg font-medium">Comment s&apos;est passée votre visite ?</p>
            </div>
            <div className="space-y-3 p-6">
              {["Extensions de cils", "Rehaussement de cils", "Sourcils"].map((option) => (
                <div
                  key={option}
                  className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-700"
                >
                  {option}
                </div>
              ))}
              <div className="flex h-11 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                Suivant →
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-ink-200 bg-white px-5 py-4 shadow-lg">
            <p className="text-xs text-ink-400">Avis généré en</p>
            <p className="text-2xl font-semibold text-ink-900">8 sec</p>
          </div>
        </div>
      </div>
    </section>
  );
}
