import { GoogleGenAI } from "@google/genai";
import type { Question } from "@/lib/types/db";

interface GenerateReviewParams {
  entrepriseNom: string;
  questions: Question[];
  reponses: Record<string, string | string[]>;
  langue: string;
}

function formatReponses(questions: Question[], reponses: Record<string, string | string[]>) {
  return questions
    .filter((q) => q.type !== "note")
    .map((q) => {
      const reponse = reponses[q.id];
      if (!reponse || (Array.isArray(reponse) && reponse.length === 0)) return null;
      const valeur = Array.isArray(reponse) ? reponse.join(", ") : reponse;
      return `- ${q.texte} : ${valeur}`;
    })
    .filter(Boolean)
    .join("\n");
}

// gemini-3.8-flash est actuellement instable (503 "high demand" fréquents, et renvoie
// parfois des réponses tronquées d'une seule phrase même quand il répond). En attendant
// que Google stabilise ce modèle, on le relègue en second essai derrière flash-lite.
const MODELE_REPLI = "gemini-3.8-flash";

// Une réponse plus courte que ça n'a jamais respecté la consigne "3 à 5 phrases" du
// prompt — on la traite comme un échec et on tente le modèle suivant plutôt que de
// publier un avis tronqué.
const LONGUEUR_MIN_AVIS = 60;

/**
 * Génère un avis Google à partir des réponses d'un client.
 * Modèle interchangeable via AI_MODEL (défaut: gemini-flash-lite-latest).
 * Sans clé API configurée (environnement de démo), retourne un avis gabarit.
 */
export async function generateReview({
  entrepriseNom,
  questions,
  reponses,
  langue,
}: GenerateReviewParams): Promise<string> {
  const contexte = formatReponses(questions, reponses);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return genererAvisDemo(entrepriseNom, contexte, langue);
  }

  const langueCible = langue === "en" ? "English" : "français";
  const modele = process.env.AI_MODEL || "gemini-flash-lite-latest";
  const client = new GoogleGenAI({ apiKey });

  const prompt = {
    contents: `Établissement : ${entrepriseNom}\n\nRéponses du client :\n${contexte}\n\nRédige l'avis Google.`,
    config: {
      temperature: 0.9,
      maxOutputTokens: 220,
      systemInstruction:
        "Tu rédiges des avis Google à la première personne, comme un vrai client qui écrit vite fait depuis son téléphone, pas comme un rédacteur professionnel. " +
        "Choisis UN OU DEUX détails précis dans les réponses du client et développe seulement ceux-là — ignore le reste plutôt que de tout caser. " +
        "Interdiction stricte de suivre un plan fixe du type accueil puis résultat puis recommandation : varie complètement la structure et le point de départ d'un avis à l'autre. " +
        "Interdiction de commencer par \"Je suis ravie\", \"Je suis absolument ravie\" ou toute variante de cette formule. " +
        "Interdiction de terminer par \"je recommande les yeux fermés\" ou une formule de clôture similaire plus d'une fois sur trois. " +
        "Varie aussi la longueur : parfois 2 phrases courtes et directes suffisent, parfois 4-5 avec plus de détail. N'allonge jamais artificiellement. " +
        "Reste crédible et spécifique à ce qui a été répondu, jamais générique, jamais dithyrambique. " +
        `Réponds uniquement en ${langueCible}, sans guillemets ni préambule.`,
    },
  };

  for (const modeleEssaye of [modele, MODELE_REPLI]) {
    try {
      const response = await client.models.generateContent({ model: modeleEssaye, ...prompt });
      const texte = response.text?.trim();
      if (texte && texte.length >= LONGUEUR_MIN_AVIS) return texte;
      console.error(`generateReview: réponse trop courte de ${modeleEssaye}`, texte);
    } catch (error) {
      console.error(`generateReview: appel Gemini (${modeleEssaye}) échoué`, error);
    }
  }

  return genererAvisDemo(entrepriseNom, contexte, langue);
}

function genererAvisDemo(entrepriseNom: string, contexte: string, langue: string): string {
  if (langue === "en") {
    return (
      `Great experience at ${entrepriseNom}! The team was attentive and the result was exactly ` +
      `what I was hoping for. I'll definitely be back and would recommend it to anyone nearby.\n\n` +
      `[Mode démo — connectez une clé GEMINI_API_KEY pour une génération réelle]`
    );
  }

  return (
    `Très belle expérience chez ${entrepriseNom} ! L'équipe a été à l'écoute et le résultat est à la hauteur ` +
    `de mes attentes. Un accueil chaleureux du début à la fin, je recommande sans hésiter.\n\n` +
    `[Mode démo — connectez une clé GEMINI_API_KEY pour une génération réelle]\n${contexte ? `\nRéponses prises en compte :\n${contexte}` : ""}`
  );
}
