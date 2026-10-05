import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { QuestionsEditor } from "@/components/dashboard/QuestionsEditor";
import { QUESTIONS_GENERIQUES_INSTITUT_BEAUTE } from "@/lib/types/db";

export default async function PageQuestions() {
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

  const { data: questions } = await supabase
    .from("questions")
    .select("texte, type, options")
    .eq("entreprise_id", entreprise!.id)
    .order("ordre", { ascending: true });

  const questionsInitiales =
    questions && questions.length > 0
      ? questions
      : QUESTIONS_GENERIQUES_INSTITUT_BEAUTE.map(({ texte, type, options }) => ({ texte, type, options }));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-zinc-900">Questions</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Ces questions sont posées à vos clients, dans l&apos;ordre, juste après leur visite.
      </p>

      <div className="mt-8">
        <QuestionsEditor questionsInitiales={questionsInitiales} />
      </div>
    </div>
  );
}
