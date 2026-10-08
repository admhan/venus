import Link from "next/link";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";
import { Etoiles } from "@/components/landing/Etoiles";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDict(locale).hero;

  return (
    <section className="bg-glacier">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-20 lg:flex-row lg:items-center lg:py-28">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-signal">
            {dict.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-nuit sm:text-5xl lg:text-6xl">
            {dict.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{dict.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizedHref(locale, "/inscription")}
              className="flex h-12 items-center justify-center rounded-full bg-nuit px-8 text-sm font-semibold text-white transition-colors hover:bg-signal"
            >
              {dict.ctaPrimary}
            </Link>
            <Link
              href="/demo"
              className="flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-nuit bg-white px-8 text-sm font-semibold text-nuit transition-colors hover:bg-zinc-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <rect x="6" y="2.5" width="12" height="19" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {dict.ctaDemo}
            </Link>
          </div>
          <p className="mt-6 text-xs text-zinc-500">{dict.note}</p>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-md pb-10 pt-4">
            <div className="origin-top scale-95 rounded-2xl bg-white/70 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{dict.beforeLabel}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-nuit/70">{dict.businessName}</p>
                  <p className="text-xs text-zinc-500">{dict.businessMeta}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-nuit/70">{dict.beforeRating}</p>
                  <p className="text-xs text-zinc-500">{dict.beforeCount}</p>
                </div>
              </div>
            </div>

            <div className="my-1 flex justify-center text-signal" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-7 w-7">
                <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="rounded-2xl border-2 border-signal bg-white p-6 shadow-xl shadow-nuit/10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-signal">{dict.afterLabel}</p>
                <span className="rounded-full bg-glacier px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600">
                  {dict.exampleTag}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-nuit">{dict.businessName}</p>
                  <p className="text-xs text-zinc-500">{dict.businessMeta}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold leading-none text-nuit">{dict.afterRating}</p>
                  <Etoiles className="mt-1 justify-end" />
                  <p className="mt-1 text-xs font-semibold text-nuit">{dict.afterCount}</p>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-glacier px-4 py-3 text-sm leading-relaxed text-zinc-700">
                {dict.recentReview} <span className="text-zinc-500">· {dict.recentReviewWhen}</span>
              </p>
            </div>

            <div className="absolute bottom-0 -left-2 rounded-2xl bg-nuit px-5 py-3 text-white shadow-lg sm:-left-4">
              <p className="text-2xl font-extrabold">{dict.statValue}</p>
              <p className="text-xs text-etoile">{dict.statLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
