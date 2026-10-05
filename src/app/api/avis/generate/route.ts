import { NextResponse } from "next/server";
import { z } from "zod";
import { generateReview } from "@/lib/ai/generateReview";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const bodySchema = z.object({
  entrepriseId: z.string(),
  entrepriseNom: z.string(),
  langue: z.string().default("fr"),
  noteInterne: z.number().int().min(1).max(5),
  questions: z.array(
    z.object({
      id: z.string(),
      texte: z.string(),
      type: z.enum(["choix_unique", "choix_multiple", "texte_libre", "note"]),
    })
  ),
  reponses: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { entrepriseId, entrepriseNom, langue, noteInterne, questions, reponses } = parsed.data;

  const avisGenere = await generateReview({
    entrepriseNom,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: questions as any,
    reponses,
    langue,
  });

  let sessionId = "demo";

  if (isSupabaseConfigured() && entrepriseId !== "demo") {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("avis_sessions")
      .insert({
        entreprise_id: entrepriseId,
        langue,
        reponses,
        note_interne: noteInterne,
        avis_genere: avisGenere,
        statut: "avis_genere",
      })
      .select("id")
      .single();

    if (data) sessionId = data.id;
  }

  return NextResponse.json({ sessionId, avis: avisGenere });
}
