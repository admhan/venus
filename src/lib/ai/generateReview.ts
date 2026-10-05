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

// Modèle de repli si AI_MODEL est indisponible (Gemini renvoie régulièrement des 503
// "high demand" sur les modèles flash récents) — évite de retomber sur l'avis gabarit
// pour un simple pic de charge transitoire chez Google.
const MODELE_REPLI = "gemini-flash-lite-latest";

/**
 * Génère un avis Google à partir des réponses d'un client.
 * Modèle interchangeable via AI_MODEL (défaut: gemini-3.8-flash, le moins cher chez Google).
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
  const modele = process.env.AI_MODEL || "gemini-3.8-flash";
  const client = new GoogleGenAI({ apiKey });

  const prompt = {
    contents: `Établissement : ${entrepriseNom}\n\nRéponses du client :\n${contexte}\n\nRédige l'avis Google.`,
    config: {
      temperature: 0.9,
      maxOutputTokens: 220,
      systemInstruction:
        "Tu rédiges des avis Google à la première personne pour des clients d'établissements locaux. " +
        "Le ton est naturel, chaleureux et spécifique à l'expérience décrite, jamais générique ni exagéré. " +
        "3 à 5 phrases maximum. Jamais de formules toutes faites répétées d'un avis à l'autre. " +
        `Réponds uniquement en ${langueCible}, sans guillemets ni préambule.`,
    },
  };

  for (const modeleEssaye of [modele, MODELE_REPLI]) {
    try {
      const response = await client.models.generateContent({ model: modeleEssaye, ...prompt });
      const texte = response.text?.trim();
      if (texte) return texte;
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
