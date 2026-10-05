import type { Entreprise, Question } from "@/lib/types/db";
import { QUESTIONS_GENERIQUES_INSTITUT_BEAUTE } from "@/lib/types/db";

/**
 * Entreprise de démonstration utilisée tant que Supabase n'est pas configuré
 * (voir README) ou que le slug demandé n'existe pas en base.
 */
export function entrepriseDemo(slug: string): Entreprise {
  return {
    id: "demo",
    user_id: null,
    slug,
    nom: "Finest Lash Studio (démo)",
    logo_url: null,
    couleur_primaire: "#7C3AED",
    google_review_url: "https://www.google.com/maps",
    email_contact: "demo@venus.app",
    stripe_customer_id: null,
    stripe_subscription_id: null,
    statut: "actif",
    seuil_note_positive: 4,
    created_at: new Date().toISOString(),
  };
}

export function questionsDemo(entrepriseId: string): Question[] {
  return QUESTIONS_GENERIQUES_INSTITUT_BEAUTE.map((q, i) => ({
    id: `demo-q${i + 1}`,
    entreprise_id: entrepriseId,
    created_at: new Date().toISOString(),
    ...q,
  }));
}
