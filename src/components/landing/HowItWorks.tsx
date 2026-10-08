import { getDict, type Locale } from "@/lib/i18n";

export function HowItWorks({ locale }: { locale: Locale }) {
  const dict = getDict(locale).howItWorks;

  return (
    <section id="comment-ca-marche" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600">{dict.description}</p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((etape) => (
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
