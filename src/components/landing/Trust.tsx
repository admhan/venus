import { getDict, type Locale } from "@/lib/i18n";

const ICONES = [
  <path key="bouclier" d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3zM8.5 12l2.5 2.5 4.5-5" />,
  <path key="unique" d="M7 4h10M7 9h10M7 14h6M17 14l2 2 3-3M4 19h9" />,
  <path key="pinceau" d="M4 20c2 0 4-1 4-4l9-9-3-3-9 9c-3 0-4 2-4 4zM14 4l3 3" />,
  <path key="qr" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" />,
];

export function Trust({ locale }: { locale: Locale }) {
  const dict = getDict(locale).trust;

  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-nuit sm:text-4xl">{dict.title}</h2>
          <p className="mt-4 text-lg text-zinc-600">{dict.description}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.points.map((point, i) => {
            const enAvant = i === 0;
            return (
              <div
                key={point.titre}
                className={`flex flex-col gap-3.5 rounded-2xl p-7 ${
                  enAvant ? "bg-nuit text-white" : "border border-zinc-200 bg-white"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    enAvant ? "bg-etoile/20 text-etoile" : "bg-glacier text-signal"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONES.at(i)}
                  </svg>
                </span>
                <h3 className={`text-lg font-bold ${enAvant ? "text-white" : "text-nuit"}`}>{point.titre}</h3>
                <p className={`text-[15px] leading-relaxed ${enAvant ? "text-etoile" : "text-zinc-600"}`}>
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
