import Stripe from "stripe";

export function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("STRIPE_SECRET_KEY manquante");
  return new Stripe(apiKey);
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_ID_MENSUEL &&
      process.env.STRIPE_PRICE_ID_ANNUEL
  );
}

export function getPriceId(periodicite: "mensuel" | "annuel"): string {
  const id =
    periodicite === "annuel"
      ? process.env.STRIPE_PRICE_ID_ANNUEL
      : process.env.STRIPE_PRICE_ID_MENSUEL;
  if (!id) throw new Error(`STRIPE_PRICE_ID_${periodicite.toUpperCase()} manquante`);
  return id;
}
