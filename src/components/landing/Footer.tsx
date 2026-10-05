import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink-500 sm:flex-row">
        <div className="flex items-center gap-4">
          <Logo className="text-lg" />
          <p>© {new Date().getFullYear()} Starnote. Tous droits réservés.</p>
        </div>
        <div className="flex gap-6">
          <a href="mailto:contact@getstarnote.com" className="hover:text-ink-900">
            contact@getstarnote.com
          </a>
        </div>
      </div>
    </footer>
  );
}
