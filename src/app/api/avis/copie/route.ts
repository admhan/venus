import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const bodySchema = z.object({
  sessionId: z.string(),
  avisFinal: z.string(),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { sessionId, avisFinal } = parsed.data;

  if (!isSupabaseConfigured() || sessionId === "demo") {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createAdminClient();
  await supabase
    .from("avis_sessions")
    .update({ statut: "copie_google", avis_final: avisFinal, updated_at: new Date().toISOString() })
    .eq("id", sessionId);

  return NextResponse.json({ ok: true });
}
