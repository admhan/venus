import Link from "next/link";

export default function PageInscriptionSucces() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-nuit">Paiement confirmé</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Votre page est en cours de création. Connectez-vous avec l&apos;e-mail et le mot de
          passe choisis à l&apos;inscription pour accéder à votre tableau de bord et configurer
          vos questions.
        </p>
        <Link
          href="/connexion"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-nuit text-sm font-semibold text-white"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
