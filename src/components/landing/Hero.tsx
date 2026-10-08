import Link from "next/link";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDict(locale).hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-glacier via-white to-white">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <span className="inline-flex items-center rounded-full bg-glacier px-3 py-1 text-xs font-semibold text-signal">
            {dict.badge}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-nuit sm:text-5xl">
            {dict.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">{dict.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={localizedHref(locale, "/inscription")}
              className="flex h-12 items-center justify-center rounded-full bg-nuit px-8 text-sm font-semibold text-white transition-colors hover:bg-signal"
            >
              {dict.ctaPrimary}
            </Link>
            <a
              href="#comment-ca-marche"
              className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
            >
              {dict.ctaSecondary}
            </a>
          </div>
          <p className="mt-6 text-xs text-zinc-400">{dict.note}</p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-xl shadow-etoile/30">
            <div className="bg-nuit px-6 py-8 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-etoile">{dict.cardBusiness}</p>
              <p className="mt-2 text-lg font-medium">{dict.cardQuestion}</p>
            </div>
            <div className="space-y-3 p-6">
              {dict.cardOptions.map((option) => (
                <div
                  key={option}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
                >
                  {option}
                </div>
              ))}
              <div className="flex h-11 items-center justify-center rounded-full bg-signal text-sm font-semibold text-white">
                {dict.cardNext}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-lg">
            <p className="text-xs text-zinc-400">{dict.cardGeneratedLabel}</p>
            <p className="text-2xl font-semibold text-nuit">{dict.cardGeneratedTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
