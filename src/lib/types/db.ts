export type StatutEntreprise = "en_attente_paiement" | "actif" | "suspendu";
export type TypeQuestion = "choix_unique" | "choix_multiple" | "texte_libre" | "note";
export type StatutAvisSession =
  | "en_cours"
  | "avis_genere"
  | "copie_google"
  | "feedback_prive"
  | "abandonne";

export interface Entreprise {
  id: string;
  user_id: string | null;
  slug: string;
  nom: string;
  logo_url: string | null;
  couleur_primaire: string;
  google_review_url: string | null;
  email_contact: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  statut: StatutEntreprise;
  seuil_note_positive: number;
  created_at: string;
}

export interface Question {
  id: string;
  entreprise_id: string;
  ordre: number;
  texte: string;
  type: TypeQuestion;
  options: string[] | null;
  created_at: string;
}

export interface AvisSession {
  id: string;
  entreprise_id: string;
  langue: string;
  reponses: Record<string, string | string[]>;
  note_interne: number | null;
  avis_genere: string | null;
  avis_final: string | null;
  statut: StatutAvisSession;
  created_at: string;
  updated_at: string;
}

export interface FeedbackPrive {
  id: string;
  avis_session_id: string;
  entreprise_id: string;
  message: string;
  lu: boolean;
  created_at: string;
}

/** 5 questions génériques pré-remplies pour un institut de beauté à la création d'une entreprise. */
export const QUESTIONS_GENERIQUES_INSTITUT_BEAUTE: Array<
  Pick<Question, "ordre" | "texte" | "type" | "options">
> = [
  {
    ordre: 1,
    texte: "Qu'avez-vous fait lors de votre venue ?",
    type: "choix_multiple",
    options: ["Extensions de cils", "Rehaussement de cils", "Sourcils", "Autre soin"],
  },
  {
    ordre: 2,
    texte: "Comment évaluez-vous l'accueil et le confort du salon ?",
    type: "choix_unique",
    options: ["Excellent", "Très bon", "Correct", "Décevant"],
  },
  {
    ordre: 3,
    texte: "Que pensez-vous du résultat final ?",
    type: "choix_unique",
    options: ["Exactement ce que je voulais", "Très satisfait(e)", "Satisfait(e)", "Pas convaincu(e)"],
  },
  {
    ordre: 4,
    texte: "Recommanderiez-vous ce salon à un(e) proche ?",
    type: "note",
    options: null,
  },
  {
    ordre: 5,
    texte: "Un mot en plus sur votre expérience ? (facultatif)",
    type: "texte_libre",
    options: null,
  },
];
