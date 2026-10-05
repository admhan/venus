import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const bodySchema = z.object({
  entrepriseId: z.string(),
  noteInterne: z.number().int().min(1).max(5),
  message: z.string().min(1),
  langue: z.string().default("fr"),
  reponses: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { entrepriseId, noteInterne, message, langue, reponses } = parsed.data;

  if (!isSupabaseConfigured() || entrepriseId === "demo") {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createAdminClient();

  const { data: session } = await supabase
    .from("avis_sessions")
    .insert({
      entreprise_id: entrepriseId,
      langue,
      reponses,
      note_interne: noteInterne,
      statut: "feedback_prive",
    })
    .select("id")
    .single();

  if (session) {
    await supabase.from("feedback_prive").insert({
      avis_session_id: session.id,
      entreprise_id: entrepriseId,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
