import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const LIENS_NAV = [
  { href: "/dashboard", label: "Vue d'ensemble" },
  { href: "/dashboard/questions", label: "Questions" },
  { href: "/dashboard/feedback", label: "Feedback privé" },
  { href: "/dashboard/parametres", label: "Paramètres" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-sm font-medium text-amber-900">
            Supabase n&apos;est pas encore configuré. Ajoutez vos variables d&apos;environnement
            pour activer le tableau de bord (voir README).
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!entreprise) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-zinc-900">Aucun établissement actif</p>
          <p className="mt-2 text-sm text-zinc-500">
            Votre page sera créée automatiquement dès la confirmation du paiement.
          </p>
          <Link
            href="/inscription"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white"
          >
            Voir les tarifs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white p-6">
        <p className="text-sm font-semibold text-zinc-900">{entreprise.nom}</p>
        <p className="mt-1 text-xs text-zinc-400">venus.app/{entreprise.slug}</p>
        <nav className="mt-8 flex flex-col gap-1">
          {LIENS_NAV.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {lien.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
