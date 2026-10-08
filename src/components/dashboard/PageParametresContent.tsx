import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { ParametresForm } from "@/components/dashboard/ParametresForm";
import { getDict, type Locale } from "@/lib/i18n";
import type { Entreprise } from "@/lib/types/db";

export async function PageParametresContent({ locale }: { locale: Locale }) {
  if (!isSupabaseConfigured()) return null;
  const dict = getDict(locale).dashboardParametres;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("*")
    .eq("user_id", user!.id)
    .single<Entreprise>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-nuit">{dict.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{dict.description}</p>

      <div className="mt-8">
        <ParametresForm entreprise={entreprise!} locale={locale} />
      </div>
    </div>
  );
}
