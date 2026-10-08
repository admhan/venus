import Link from "next/link";
import { getDict, localizedHref } from "@/lib/i18n";

export default function PageInscriptionSuccesEn() {
  const dict = getDict("en").inscriptionSucces;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-nuit">{dict.title}</h1>
        <p className="mt-3 text-sm text-zinc-500">{dict.description}</p>
        <Link
          href={localizedHref("en", "/connexion")}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white"
        >
          {dict.cta}
        </Link>
      </div>
    </div>
  );
}
