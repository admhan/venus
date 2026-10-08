import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { BoutonMarquerLu } from "@/components/dashboard/BoutonMarquerLu";
import { getDict, type Locale } from "@/lib/i18n";

export async function PageFeedbackContent({ locale }: { locale: Locale }) {
  if (!isSupabaseConfigured()) return null;
  const dict = getDict(locale).dashboardFeedback;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("id")
    .eq("user_id", user!.id)
    .single();

  const { data: feedbacks } = await supabase
    .from("feedback_prive")
    .select("*")
    .eq("entreprise_id", entreprise!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-nuit">{dict.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{dict.description}</p>

      <div className="mt-8 space-y-4">
        {!feedbacks || feedbacks.length === 0 ? (
          <p className="text-sm text-zinc-400">{dict.empty}</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.id}
              className={`rounded-2xl border p-6 ${fb.lu ? "border-zinc-200 bg-white" : "border-etoile bg-glacier"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-zinc-700">{fb.message}</p>
                {!fb.lu && <BoutonMarquerLu feedbackId={fb.id} locale={locale} />}
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                {new Date(fb.created_at).toLocaleDateString(dict.dateLocale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
