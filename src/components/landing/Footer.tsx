export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Starnote. Tous droits réservés.</p>
        <div className="flex gap-6">
          <a href="mailto:contact@getstarnote.com" className="hover:text-nuit">
            contact@getstarnote.com
          </a>
        </div>
      </div>
    </footer>
  );
}
