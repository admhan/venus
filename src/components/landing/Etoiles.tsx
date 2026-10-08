const CHEMIN_ETOILE =
  "M12 2.5l2.95 6.1 6.7.92-4.88 4.66 1.2 6.64L12 17.6l-5.97 3.22 1.2-6.64L2.35 9.52l6.7-.92z";

/** Cinq étoiles jaunes façon note Google, purement décoratives. */
export function Etoiles({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-px ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5">
          <path d={CHEMIN_ETOILE} fill="#F4B400" />
        </svg>
      ))}
    </span>
  );
}
