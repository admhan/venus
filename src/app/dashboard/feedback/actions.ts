"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { localizedHref, type Locale } from "@/lib/i18n";

export async function marquerCommeLu(feedbackId: string, locale: Locale = "fr") {
  const supabase = await createClient();
  await supabase.from("feedback_prive").update({ lu: true }).eq("id", feedbackId);
  revalidatePath(localizedHref(locale, "/dashboard/feedback"));
}
