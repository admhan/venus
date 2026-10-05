import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { ParametresForm } from "@/components/dashboard/ParametresForm";
import type { Entreprise } from "@/lib/types/db";

export default async function PageParametres() {
  if (!isSupabaseConfigured()) return null;

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
      <h1 className="text-2xl font-semibold text-ink-900">Paramètres</h1>
      <p className="mt-1 text-sm text-ink-500">Branding et comportement de votre page.</p>

      <div className="mt-8">
        <ParametresForm entreprise={entreprise!} />
      </div>
    </div>
  );
}
