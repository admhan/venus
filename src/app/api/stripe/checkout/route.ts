import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured, getPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { getSiteUrl } from "@/lib/site-url";
import { slugifier } from "@/lib/slug";

const bodySchema = z.object({
  nom: z.string().min(1),
  slug: z.string().min(1),
  email: z.string().email(),
  periodicite: z.enum(["mensuel", "annuel"]),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe n'est pas encore configuré côté serveur." },
      { status: 503 }
    );
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const slug = slugifier(parsed.data.slug);
  const { nom, email, periodicite } = parsed.data;

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: existant, error } = await supabase
      .from("entreprises")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("checkout: vérification slug échouée", error.message);
      return NextResponse.json({ error: "Vérification indisponible, réessayez." }, { status: 503 });
    }

    if (existant) {
      return NextResponse.json({ error: "Ce lien est déjà pris." }, { status: 409 });
    }
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: getPriceId(periodicite), quantity: 1 }],
    metadata: { nom, slug, email, periodicite },
    success_url: `${siteUrl}/inscription/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/inscription`,
  });

  return NextResponse.json({ url: session.url });
}
