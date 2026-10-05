import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { slugifier } from "@/lib/slug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugDemande = slugifier(searchParams.get("slug") || "");

  if (!slugDemande) {
    return NextResponse.json({ disponible: false, slug: slugDemande });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ disponible: true, slug: slugDemande });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("entreprises")
    .select("id")
    .eq("slug", slugDemande)
    .maybeSingle();

  return NextResponse.json({ disponible: !data, slug: slugDemande });
}
