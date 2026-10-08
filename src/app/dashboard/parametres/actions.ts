"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { localizedHref, type Locale } from "@/lib/i18n";

interface ParametresInput {
  nom: string;
  couleur_primaire: string;
  google_review_url: string;
  email_contact: string;
  seuil_note_positive: number;
}

export async function sauvegarderParametres(params: ParametresInput, locale: Locale = "fr") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  await supabase.from("entreprises").update(params).eq("user_id", user.id);

  revalidatePath(localizedHref(locale, "/dashboard/parametres"));
  revalidatePath(localizedHref(locale, "/dashboard"));
}
