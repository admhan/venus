import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { getSiteUrl } from "@/lib/site-url";
import { QUESTIONS_GENERIQUES_INSTITUT_BEAUTE } from "@/lib/types/db";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secretWebhook = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secretWebhook) {
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, secretWebhook);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await provisionnerEntreprise(session);
  }

  return NextResponse.json({ received: true });
}

async function provisionnerEntreprise(session: Stripe.Checkout.Session) {
  if (!isSupabaseConfigured()) {
    console.error("Webhook Stripe: Supabase non configuré, entreprise non provisionnée");
    return;
  }

  const { nom, slug, email, googleReviewUrl } = session.metadata || {};
  if (!nom || !slug || !email) {
    console.error("Webhook Stripe: métadonnées manquantes sur la session", session.id);
    return;
  }

  const supabase = createAdminClient();

  const { data: entrepriseExistante, error: lookupError } = await supabase
    .from("entreprises")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (lookupError) throw new Error(`Lookup entreprise échoué: ${lookupError.message}`);
  if (entrepriseExistante) return;

  const { data: invitation, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/callback`,
  });
  if (inviteError) console.error("Webhook Stripe: invitation échouée", inviteError.message);

  const { data: entreprise, error: insertError } = await supabase
    .from("entreprises")
    .insert({
      user_id: invitation?.user?.id ?? null,
      slug,
      nom,
      email_contact: email,
      google_review_url: googleReviewUrl || null,
      stripe_customer_id: String(session.customer ?? ""),
      stripe_subscription_id: String(session.subscription ?? ""),
      statut: "actif",
    })
    .select("id")
    .single();

  if (insertError || !entreprise) {
    throw new Error(`Création entreprise échouée: ${insertError?.message}`);
  }

  const { error: questionsError } = await supabase.from("questions").insert(
    QUESTIONS_GENERIQUES_INSTITUT_BEAUTE.map((q) => ({
      entreprise_id: entreprise.id,
      ...q,
    }))
  );
  if (questionsError) {
    console.error("Webhook Stripe: insertion questions échouée", questionsError.message);
  }
}
