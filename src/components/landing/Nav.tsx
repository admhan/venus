import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-2xl">
          <Logo symbole />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 sm:flex">
          <a href="#comment-ca-marche" className="hover:text-ink-900">
            Comment ça marche
          </a>
          <a href="#tarifs" className="hover:text-ink-900">
            Tarifs
          </a>
          <a href="#faq" className="hover:text-ink-900">
            FAQ
          </a>
        </nav>
        <Link
          href="/inscription"
          className="rounded-full bg-ink-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          Démarrer
        </Link>
      </div>
    </header>
  );
}
