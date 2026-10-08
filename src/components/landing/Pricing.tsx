import Link from "next/link";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

export function Pricing({ locale }: { locale: Locale }) {
  const dict = getDict(locale).pricing;

  return (
    <section id="tarifs" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-nuit sm:text-4xl">{dict.title}</h2>
        <p className="mt-4 text-lg text-zinc-600">{dict.description}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-10 text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-nuit">{dict.monthly.price}</span>
              <span className="text-zinc-500">{dict.monthly.period}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{dict.monthly.note}</p>

            <ul className="mt-8 space-y-3">
              {dict.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-0.5 text-signal">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={localizedHref(locale, "/inscription?periodicite=mensuel")}
              className="mt-10 flex h-12 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white transition-colors hover:bg-signal"
            >
              {dict.cta}
            </Link>
          </div>

          <div className="rounded-3xl border border-etoile bg-glacier p-10 text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-nuit">{dict.yearly.price}</span>
              <span className="text-zinc-500">{dict.yearly.period}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{dict.yearly.note}</p>

            <ul className="mt-8 space-y-3">
              {dict.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-0.5 text-signal">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={localizedHref(locale, "/inscription?periodicite=annuel")}
              className="mt-10 flex h-12 w-full items-center justify-center rounded-full bg-signal text-sm font-semibold text-white transition-colors hover:bg-nuit"
            >
              {dict.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
