const CHEMIN_BULLE =
  "M18 14h64a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H44L26 90V74h-8A10 10 0 0 1 8 64V24a10 10 0 0 1 10-10z";
const CHEMIN_ETOILE =
  "M50 24C51.2 36 55 40 66 44 55 48 51.2 52 50 64 48.8 52 45 48 34 44 45 40 48.8 36 50 24Z";

export function Logo({ variant = "clair", className }: { variant?: "clair" | "sombre"; className?: string }) {
  const bulle = variant === "sombre" ? "#FFFFFF" : "#0B1B33";
  const etoile = variant === "sombre" ? "#9DB8E3" : "#2F5597";

  return (
    <svg viewBox="0 0 100 100" width="26" height="26" aria-hidden="true" className={className}>
      <path d={CHEMIN_BULLE} fill="none" stroke={bulle} strokeWidth="9" strokeLinejoin="round" />
      <path d={CHEMIN_ETOILE} fill={etoile} />
    </svg>
  );
}
