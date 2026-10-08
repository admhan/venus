import { getDict, type Locale } from "@/lib/i18n";

export function Trust({ locale }: { locale: Locale }) {
  const dict = getDict(locale).trust;

  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600">{dict.description}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {dict.points.map((point) => (
            <div key={point.titre} className="rounded-2xl border border-zinc-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-nuit">{point.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
