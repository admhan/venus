export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Venus. Tous droits réservés.</p>
        <div className="flex gap-6">
          <a href="mailto:contact@venus.app" className="hover:text-zinc-900">
            contact@venus.app
          </a>
        </div>
      </div>
    </footer>
  );
}
