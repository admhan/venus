import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { Logo } from "@/components/Logo";
import { getDict, localizedHref, type Locale } from "@/lib/i18n";

export async function DashboardShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const dict = getDict(locale).dashboardLayout;

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-sm font-medium text-amber-900">{dict.notConfigured}</p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(localizedHref(locale, "/connexion"));

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!entreprise) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-nuit">{dict.noEntrepriseTitle}</p>
          <p className="mt-2 text-sm text-zinc-500">{dict.noEntrepriseDescription}</p>
          <Link
            href={localizedHref(locale, "/inscription")}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-nuit px-6 text-sm font-semibold text-white"
          >
            {dict.noEntrepriseCta}
          </Link>
        </div>
      </div>
    );
  }

  const liensNav = [
    { href: localizedHref(locale, "/dashboard"), label: dict.overview },
    { href: localizedHref(locale, "/dashboard/questions"), label: dict.questions },
    { href: localizedHref(locale, "/dashboard/feedback"), label: dict.feedback },
    { href: localizedHref(locale, "/dashboard/parametres"), label: dict.parametres },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-2 text-sm font-bold text-nuit">
          <Logo />
          starnote
        </div>
        <p className="mt-6 text-sm font-semibold text-nuit">{entreprise.nom}</p>
        <p className="mt-1 text-xs text-zinc-400">getstarnote.com/{entreprise.slug}</p>
        <nav className="mt-8 flex flex-col gap-1">
          {liensNav.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-nuit"
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
