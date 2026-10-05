import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { BoutonMarquerLu } from "@/components/dashboard/BoutonMarquerLu";

export default async function PageFeedback() {
  if (!isSupabaseConfigured()) return null;

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
      <h1 className="text-2xl font-semibold text-zinc-900">Feedback privé</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Les retours des clients insatisfaits, envoyés uniquement à vous, jamais sur Google.
      </p>

      <div className="mt-8 space-y-4">
        {!feedbacks || feedbacks.length === 0 ? (
          <p className="text-sm text-zinc-400">Aucun feedback pour le moment.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.id}
              className={`rounded-2xl border p-6 ${fb.lu ? "border-zinc-200 bg-white" : "border-violet-200 bg-violet-50"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-zinc-700">{fb.message}</p>
                {!fb.lu && <BoutonMarquerLu feedbackId={fb.id} />}
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                {new Date(fb.created_at).toLocaleDateString("fr-FR", {
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
