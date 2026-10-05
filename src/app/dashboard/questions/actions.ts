"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TypeQuestion } from "@/lib/types/db";

interface QuestionInput {
  texte: string;
  type: TypeQuestion;
  options: string[] | null;
}

export async function sauvegarderQuestions(questions: QuestionInput[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!entreprise) throw new Error("Entreprise introuvable");

  await supabase.from("questions").delete().eq("entreprise_id", entreprise.id);

  if (questions.length > 0) {
    await supabase.from("questions").insert(
      questions.map((q, i) => ({
        entreprise_id: entreprise.id,
        ordre: i + 1,
        texte: q.texte,
        type: q.type,
        options: q.options,
      }))
    );
  }

  revalidatePath("/dashboard/questions");
}
