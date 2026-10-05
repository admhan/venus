"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function marquerCommeLu(feedbackId: string) {
  const supabase = await createClient();
  await supabase.from("feedback_prive").update({ lu: true }).eq("id", feedbackId);
  revalidatePath("/dashboard/feedback");
}
