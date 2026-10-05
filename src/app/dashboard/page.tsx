import Link from "next/link";
import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { getSiteUrl } from "@/lib/site-url";
import { LienPartage } from "@/components/dashboard/LienPartage";
import type { Entreprise } from "@/lib/types/db";

export default async function PageVueEnsemble() {
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

  const lien = `${getSiteUrl()}/${entreprise!.slug}`;
  const qrCodeDataUrl = await QRCode.toDataURL(lien, {
    margin: 1,
    color: { dark: "#18181b", light: "#ffffff" },
  });

  const { count: totalSessions } = await supabase
    .from("avis_sessions")
    .select("*", { count: "exact", head: true })
    .eq("entreprise_id", entreprise!.id);

  const { count: totalPublies } = await supabase
    .from("avis_sessions")
    .select("*", { count: "exact", head: true })
    .eq("entreprise_id", entreprise!.id)
    .eq("statut", "copie_google");

  const { count: totalFeedback } = await supabase
    .from("feedback_prive")
    .select("*", { count: "exact", head: true })
    .eq("entreprise_id", entreprise!.id)
    .eq("lu", false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-zinc-900">Vue d&apos;ensemble</h1>

      {!entreprise!.google_review_url && (
        <div className="mt-6 flex items-start justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Lien d&apos;avis Google non configuré
            </p>
            <p className="mt-1 text-sm text-amber-800">
              Tant que ce lien n&apos;est pas renseigné, vos clients atterrissent sur une recherche Google
              générique au lieu de votre fiche — ajoutez-le dans les paramètres pour un parcours sans friction.
            </p>
          </div>
          <Link
            href="/dashboard/parametres"
            className="shrink-0 rounded-full bg-amber-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Configurer
          </Link>
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Questionnaires démarrés" valeur={totalSessions ?? 0} />
        <StatCard label="Avis publiés sur Google" valeur={totalPublies ?? 0} />
        <StatCard label="Feedback privé non lu" valeur={totalFeedback ?? 0} />
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8">
        <h2 className="text-base font-semibold text-zinc-900">Partager le questionnaire</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Affichez le QR code en caisse, ou partagez le lien par SMS après chaque visite.
        </p>

        <div className="mt-6 flex items-start gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrCodeDataUrl} alt="QR code du questionnaire" className="h-40 w-40 rounded-xl border border-zinc-100" />
          <div className="flex-1">
            <LienPartage lien={lien} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, valeur }: { label: string; valeur: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-3xl font-semibold text-zinc-900">{valeur}</p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </div>
  );
}
