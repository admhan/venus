import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

export function Nav({ locale }: { locale: Locale }) {
  const dict = getDict(locale).nav;
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={localizedHref(locale, "/")} className="flex items-center gap-2 text-lg font-bold tracking-tight text-nuit">
          <Logo />
          starnote
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 sm:flex">
          <a href="#comment-ca-marche" className="hover:text-nuit">
            {dict.howItWorks}
          </a>
          <a href="#tarifs" className="hover:text-nuit">
            {dict.pricing}
          </a>
          <a href="#faq" className="hover:text-nuit">
            {dict.faq}
          </a>
          <Link href={localizedHref(otherLocale, "/")} className="hover:text-nuit">
            {dict.switchTo}
          </Link>
        </nav>
        <Link
          href={localizedHref(locale, "/inscription")}
          className="rounded-full bg-nuit px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-signal"
        >
          {dict.start}
        </Link>
      </div>
    </header>
  );
}
