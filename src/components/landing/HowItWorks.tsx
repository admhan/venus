import Link from "next/link";
import { getDict, localizedHref, type Locale, type Dictionary } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { Etoiles } from "@/components/landing/Etoiles";

type DictHowItWorks = Dictionary["howItWorks"];

export function HowItWorks({ locale }: { locale: Locale }) {
  const dict = getDict(locale).howItWorks;
  const note = getDict(locale).hero.afterRating;
  const visuels = [
    <Presentoir key="1" dict={dict} />,
    <TelephoneQuestion key="2" dict={dict} />,
    <TelephoneAvis key="3" dict={dict} note={note} />,
  ];

  return (
    <section id="comment-ca-marche" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-signal">{dict.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-nuit sm:text-5xl">{dict.title}</h2>
          <p className="mt-4 text-lg text-zinc-600">{dict.description}</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-x-[16%] top-[22px] hidden h-0.5 bg-zinc-200 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-8">
            {dict.steps.map((etape, i) => (
              <li key={etape.titre} className="flex flex-col items-center gap-7 text-center">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-bold text-white ${
                    i === dict.steps.length - 1 ? "bg-signal" : "bg-nuit"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex h-[380px] w-[240px] items-end justify-center overflow-hidden rounded-[28px] bg-glacier">
                  {visuels.at(i)}
                </div>
                <div className="max-w-xs">
                  <h3 className="text-xl font-bold text-nuit">{etape.titre}</h3>
                  <p className="mt-2 leading-relaxed text-zinc-600">{etape.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-3xl bg-glacier p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-7 w-7 shrink-0 text-signal" aria-hidden="true">
              <path d="M4 5h16v11H9l-5 4V5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="leading-relaxed text-zinc-700">
              <strong className="text-nuit">{dict.privateTitle}</strong> {dict.privateText}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="flex h-12 items-center justify-center rounded-full border-[1.5px] border-nuit bg-white px-6 text-sm font-semibold text-nuit hover:bg-zinc-50"
            >
              {dict.ctaDemo}
            </Link>
            <Link
              href={localizedHref(locale, "/inscription")}
              className="flex h-12 items-center justify-center rounded-full bg-nuit px-6 text-sm font-semibold text-white hover:bg-signal"
            >
              {dict.ctaPrimary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Presentoir({ dict }: { dict: DictHowItWorks }) {
  return (
    <div className="flex h-[300px] w-[184px] flex-col items-center gap-3 rounded-t-2xl bg-nuit px-4 pt-5 text-center text-white shadow-2xl shadow-nuit/20">
      <div className="flex items-center gap-1.5 text-sm font-bold">
        <Logo variant="sombre" className="h-[18px] w-[18px]" />
        starnote
      </div>
      <p className="text-base font-bold leading-tight">{dict.standTitle}</p>
      <div className="rounded-lg bg-white p-2.5">
        <QrDecoratif />
      </div>
      <p className="text-[11px] text-etoile">{dict.standScan}</p>
    </div>
  );
}

function CadreTelephone({ entreprise, children }: { entreprise: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[340px] w-[190px] flex-col overflow-hidden rounded-t-[30px] border-[7px] border-b-0 border-nuit bg-white text-left shadow-2xl shadow-nuit/20">
      <div className="bg-signal px-3 pb-2.5 pt-4 text-[11px] font-medium text-white">{entreprise}</div>
      {children}
    </div>
  );
}

function TelephoneQuestion({ dict }: { dict: DictHowItWorks }) {
  return (
    <CadreTelephone entreprise={dict.phoneBusiness}>
      <div className="h-[3px] bg-glacier">
        <div className="h-[3px] w-3/5 bg-signal" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="mb-1 text-[13.5px] font-bold leading-snug text-nuit">{dict.phoneQuestion}</p>
        {dict.phoneOptions.map((option, i) => (
          <div
            key={option}
            className={`rounded-lg border-[1.5px] px-2.5 py-2 text-[11.5px] ${
              i === 0 ? "border-nuit bg-nuit text-white" : "border-zinc-200 text-zinc-700"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </CadreTelephone>
  );
}

function TelephoneAvis({ dict, note }: { dict: DictHowItWorks; note: string }) {
  return (
    <div className="relative">
      <CadreTelephone entreprise={dict.phoneBusiness}>
        <div className="flex flex-col gap-2.5 p-3">
          <p className="text-xs font-bold text-nuit">{dict.phoneReviewTitle}</p>
          <p className="rounded-lg border-[1.5px] border-zinc-200 p-2.5 text-[11px] leading-relaxed text-zinc-700">
            {dict.phoneReviewText}
          </p>
          <div className="flex h-9 items-center justify-center rounded-full bg-signal text-[11.5px] font-bold text-white">
            {dict.phoneCopy}
          </div>
        </div>
      </CadreTelephone>
      <div className="absolute -right-6 top-6 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 shadow-lg">
        <span className="text-[13px] font-extrabold text-nuit">{note}</span>
        <Etoiles />
      </div>
    </div>
  );
}

/** Motif de QR code décoratif (non scannable), pour illustrer le présentoir. */
function QrDecoratif() {
  const modules = [
    [9, 1, 2, 2], [8, 4, 1, 3], [11, 5, 2, 1], [9, 8, 3, 3], [1, 9, 2, 1], [4, 8, 2, 2],
    [14, 9, 2, 2], [18, 8, 2, 3], [13, 12, 1, 2], [9, 13, 2, 2], [15, 14, 3, 1], [19, 13, 1, 3],
    [9, 17, 1, 3], [12, 16, 2, 2], [15, 18, 2, 2], [18, 17, 2, 1], [6, 11, 1, 2], [2, 11, 3, 1],
  ];
  const reperes = [
    [0, 0],
    [14, 0],
    [0, 14],
  ];
  return (
    <svg viewBox="0 0 21 21" className="h-[84px] w-[84px]" shapeRendering="crispEdges" aria-hidden="true">
      {reperes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#0B1B33" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#FFFFFF" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#0B1B33" />
        </g>
      ))}
      {modules.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="#0B1B33" />
      ))}
    </svg>
  );
}
