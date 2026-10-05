const ETOILE = "M12 1C12.8 8 16 11.2 23 12 16 12.8 12.8 16 12 23 11.2 16 8 12.8 1 12 8 11.2 11.2 8 12 1Z";
const BULLE =
  "M18 14h64a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H44L26 90V74h-8A10 10 0 0 1 8 64V24a10 10 0 0 1 10-10z";
const ETOILE_BULLE = "M50 24C51.2 36 55 40 66 44 55 48 51.2 52 50 64 48.8 52 45 48 34 44 45 40 48.8 36 50 24Z";

interface LogoProps {
  /** "clair" pour un logo posé sur fond bleu nuit. */
  ton?: "sombre" | "clair";
  /** Affiche le symbole (bulle + étoile) devant le mot. */
  symbole?: boolean;
  className?: string;
}

/**
 * Logo Starnote : le mot « starnote » dont l'accent du « e » final est une étoile
 * (« starnoté » en français). La taille suit la taille de police héritée.
 */
export function Logo({ ton = "sombre", symbole = false, className = "" }: LogoProps) {
  const couleurTexte = ton === "clair" ? "text-white" : "text-ink-900";
  const couleurEtoile = ton === "clair" ? "#9DB8E3" : "#2F5597";
  const couleurBulle = ton === "clair" ? "#FFFFFF" : "#0B1B33";

  return (
    <span
      role="img"
      aria-label="Starnote"
      className={`inline-flex items-center gap-[0.3em] font-bold tracking-tight ${couleurTexte} ${className}`}
    >
      {symbole && (
        <svg viewBox="0 0 100 100" className="h-[1.05em] w-[1.05em] shrink-0" aria-hidden="true">
          <path d={BULLE} fill="none" stroke={couleurBulle} strokeWidth="8" strokeLinejoin="round" />
          <path d={ETOILE_BULLE} fill={couleurEtoile} />
        </svg>
      )}
      <span aria-hidden="true" className="leading-none">
        starnot
        <span className="relative inline-block">
          e
          <svg
            viewBox="0 0 24 24"
            className="absolute left-1/2 top-[-0.24em] h-[0.34em] w-[0.34em] -translate-x-[30%] rotate-12"
          >
            <path d={ETOILE} fill={couleurEtoile} />
          </svg>
        </span>
      </span>
    </span>
  );
}
