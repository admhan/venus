import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-nuit">
          <Logo />
          starnote
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 sm:flex">
          <a href="#comment-ca-marche" className="hover:text-nuit">
            Comment ça marche
          </a>
          <a href="#tarifs" className="hover:text-nuit">
            Tarifs
          </a>
          <a href="#faq" className="hover:text-nuit">
            FAQ
          </a>
        </nav>
        <Link
          href="/inscription"
          className="rounded-full bg-nuit px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-signal"
        >
          Démarrer
        </Link>
      </div>
    </header>
  );
}
