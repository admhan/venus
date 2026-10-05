"use client";

import { useMemo, useState } from "react";
import type { Entreprise, Question } from "@/lib/types/db";

interface QuestionnaireProps {
  entreprise: Entreprise;
  questions: Question[];
}

type Phase = "questions" | "chargement" | "avis" | "feedback" | "feedback_envoye" | "merci";
type Langue = "fr" | "en";

const TEXTES = {
  fr: {
    suivant: "Suivant →",
    plusieursChoix: "Plusieurs choix possibles",
    facultatif: "facultatif",
    champTexte: "Votre réponse…",
    chargement: "Génération de votre avis…",
    avisTitre: "Voici votre avis, vous pouvez le modifier",
    copierOuvrir: "Copier et ouvrir Google",
    merciTitreGoogle: "Merci beaucoup !",
    merciTexteGoogle: "Collez l'avis sur la page Google qui vient de s'ouvrir pour le publier.",
    feedbackTitre: "Qu'est-ce qui n'a pas convenu ?",
    feedbackSousTitre:
      "Votre retour est envoyé directement à l'établissement pour qu'il puisse s'améliorer.",
    feedbackPlaceholder: "Dites-nous ce qui pourrait être amélioré…",
    envoyer: "Envoyer",
    merciTitreFeedback: "Merci pour votre retour",
    merciTexteFeedback: "L'établissement en a été informé directement.",
    note1: "Pas du tout",
    note5: "Avec plaisir",
  },
  en: {
    suivant: "Next →",
    plusieursChoix: "Multiple choices possible",
    facultatif: "optional",
    champTexte: "Your answer…",
    chargement: "Generating your review…",
    avisTitre: "Here's your review, feel free to edit it",
    copierOuvrir: "Copy and open Google",
    merciTitreGoogle: "Thank you so much!",
    merciTexteGoogle: "Paste the review on the Google page that just opened to publish it.",
    feedbackTitre: "What didn't go well?",
    feedbackSousTitre: "Your feedback is sent directly to the business so they can improve.",
    feedbackPlaceholder: "Tell us what could be improved…",
    envoyer: "Send",
    merciTitreFeedback: "Thanks for your feedback",
    merciTexteFeedback: "The business has been notified directly.",
    note1: "Not at all",
    note5: "Gladly",
  },
} as const;

export function Questionnaire({ entreprise, questions }: QuestionnaireProps) {
  const [langue, setLangue] = useState<Langue>("fr");
  const [stepIndex, setStepIndex] = useState(0);
  const [reponses, setReponses] = useState<Record<string, string | string[]>>({});
  const [phase, setPhase] = useState<Phase>("questions");
  const [avisGenere, setAvisGenere] = useState("");
  const [sessionId, setSessionId] = useState("demo");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const t = TEXTES[langue];
  const questionActuelle = questions[stepIndex];
  const progress = questions.length ? ((stepIndex + 1) / questions.length) * 100 : 0;

  const noteInterne = useMemo(() => {
    const questionNote = questions.find((q) => q.type === "note");
    if (!questionNote) return 5;
    const reponse = reponses[questionNote.id];
    const valeur = Array.isArray(reponse) ? reponse[0] : reponse;
    const n = Number(valeur);
    return Number.isFinite(n) && n >= 1 && n <= 5 ? n : 5;
  }, [questions, reponses]);

  async function terminerQuestionnaire(reponsesFinales: Record<string, string | string[]>) {
    const questionNote = questions.find((q) => q.type === "note");
    const reponseNote = questionNote ? reponsesFinales[questionNote.id] : undefined;
    const valeurNote = Number(Array.isArray(reponseNote) ? reponseNote[0] : reponseNote);
    const note = Number.isFinite(valeurNote) && valeurNote >= 1 && valeurNote <= 5 ? valeurNote : 5;

    if (note < entreprise.seuil_note_positive) {
      setPhase("feedback");
      return;
    }

    setPhase("chargement");

    try {
      const res = await fetch("/api/avis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entrepriseId: entreprise.id,
          entrepriseNom: entreprise.nom,
          langue,
          noteInterne: note,
          questions: questions.map((q) => ({ id: q.id, texte: q.texte, type: q.type })),
          reponses: reponsesFinales,
        }),
      });
      const data = await res.json();
      setAvisGenere(data.avis);
      setSessionId(data.sessionId);
      setPhase("avis");
    } catch {
      setPhase("questions");
    }
  }

  function repondreEtAvancer(valeur: string | string[]) {
    const nouvellesReponses = { ...reponses, [questionActuelle.id]: valeur };
    setReponses(nouvellesReponses);

    if (stepIndex + 1 < questions.length) {
      setStepIndex(stepIndex + 1);
    } else {
      terminerQuestionnaire(nouvellesReponses);
    }
  }

  async function copierEtOuvrirGoogle() {
    await navigator.clipboard.writeText(avisGenere);
    fetch("/api/avis/copie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, avisFinal: avisGenere }),
    }).catch(() => {});
    window.open(entreprise.google_review_url || "https://www.google.com/search?q=avis+google", "_blank");
    setPhase("merci");
  }

  async function envoyerFeedback() {
    if (!feedbackMessage.trim()) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entrepriseId: entreprise.id,
        noteInterne,
        message: feedbackMessage,
        langue,
        reponses,
      }),
    }).catch(() => {});
    setPhase("feedback_envoye");
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-ink-200 bg-white shadow-xl">
      <div
        className="flex items-center justify-between px-6 py-7 text-white"
        style={{ backgroundColor: entreprise.couleur_primaire }}
      >
        <p className="text-base font-medium">{entreprise.nom}</p>
        <div className="flex gap-1 text-xs">
          <button
            onClick={() => setLangue("fr")}
            className={`rounded px-2 py-1 ${langue === "fr" ? "bg-white/20" : "opacity-60"}`}
          >
            FR
          </button>
          <button
            onClick={() => setLangue("en")}
            className={`rounded px-2 py-1 ${langue === "en" ? "bg-white/20" : "opacity-60"}`}
          >
            EN
          </button>
        </div>
      </div>

      {phase === "questions" && questionActuelle && (
        <>
          <div className="h-1 w-full bg-ink-100">
            <div
              className="h-1 transition-all"
              style={{ width: `${progress}%`, backgroundColor: entreprise.couleur_primaire }}
            />
          </div>
          <div className="p-6">
            <EtapeQuestion
              question={questionActuelle}
              reponseActuelle={reponses[questionActuelle.id]}
              texte={t}
              onRepondre={repondreEtAvancer}
            />
          </div>
        </>
      )}

      {phase === "chargement" && (
        <div className="flex flex-col items-center gap-4 p-14 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-ink-900" />
          <p className="text-sm text-ink-500">{t.chargement}</p>
        </div>
      )}

      {phase === "avis" && (
        <div className="p-6">
          <p className="mb-3 text-sm font-medium text-ink-900">{t.avisTitre}</p>
          <textarea
            value={avisGenere}
            onChange={(e) => setAvisGenere(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-xl border border-ink-200 p-4 text-sm text-ink-700 focus:border-ink-400 focus:outline-none"
          />
          <button
            onClick={copierEtOuvrirGoogle}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: entreprise.couleur_primaire }}
          >
            {t.copierOuvrir}
          </button>
        </div>
      )}

      {phase === "feedback" && (
        <div className="p-6">
          <p className="text-base font-semibold text-ink-900">{t.feedbackTitre}</p>
          <p className="mt-1 text-sm text-ink-500">{t.feedbackSousTitre}</p>
          <textarea
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            rows={5}
            placeholder={t.feedbackPlaceholder}
            className="mt-4 w-full resize-none rounded-xl border border-ink-200 p-4 text-sm text-ink-700 focus:border-ink-400 focus:outline-none"
          />
          <button
            onClick={envoyerFeedback}
            disabled={!feedbackMessage.trim()}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-white disabled:opacity-40"
            style={{ backgroundColor: entreprise.couleur_primaire }}
          >
            {t.envoyer}
          </button>
        </div>
      )}

      {phase === "merci" && (
        <div className="p-10 text-center">
          <p className="text-lg font-semibold text-ink-900">{t.merciTitreGoogle}</p>
          <p className="mt-2 text-sm text-ink-500">{t.merciTexteGoogle}</p>
        </div>
      )}

      {phase === "feedback_envoye" && (
        <div className="p-10 text-center">
          <p className="text-lg font-semibold text-ink-900">{t.merciTitreFeedback}</p>
          <p className="mt-2 text-sm text-ink-500">{t.merciTexteFeedback}</p>
        </div>
      )}
    </div>
  );
}

function EtapeQuestion({
  question,
  reponseActuelle,
  texte,
  onRepondre,
}: {
  question: Question;
  reponseActuelle: string | string[] | undefined;
  texte: (typeof TEXTES)["fr"] | (typeof TEXTES)["en"];
  onRepondre: (valeur: string | string[]) => void;
}) {
  const [selectionMultiple, setSelectionMultiple] = useState<string[]>(
    Array.isArray(reponseActuelle) ? reponseActuelle : []
  );
  const [texteLibre, setTexteLibre] = useState(typeof reponseActuelle === "string" ? reponseActuelle : "");

  if (question.type === "choix_unique") {
    return (
      <div>
        <h2 className="text-lg font-semibold text-ink-900">{question.texte}</h2>
        <div className="mt-5 space-y-3">
          {(question.options || []).map((option) => (
            <button
              key={option}
              onClick={() => onRepondre(option)}
              className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-left text-sm text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-100"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "choix_multiple") {
    return (
      <div>
        <h2 className="text-lg font-semibold text-ink-900">{question.texte}</h2>
        <p className="mt-1 text-xs text-ink-400">{texte.plusieursChoix}</p>
        <div className="mt-5 space-y-3">
          {(question.options || []).map((option) => {
            const selectionne = selectionMultiple.includes(option);
            return (
              <button
                key={option}
                onClick={() =>
                  setSelectionMultiple((prev) =>
                    selectionne ? prev.filter((o) => o !== option) : [...prev, option]
                  )
                }
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  selectionne
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-200 bg-ink-50 text-ink-700 hover:border-ink-300"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onRepondre(selectionMultiple)}
          disabled={selectionMultiple.length === 0}
          className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white disabled:opacity-30"
        >
          {texte.suivant}
        </button>
      </div>
    );
  }

  if (question.type === "note") {
    return (
      <div>
        <h2 className="text-lg font-semibold text-ink-900">{question.texte}</h2>
        <div className="mt-6 flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onRepondre(String(n))}
              className="flex h-12 flex-1 items-center justify-center rounded-xl border border-ink-200 text-base font-semibold text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-ink-400">
          <span>{texte.note1}</span>
          <span>{texte.note5}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">{question.texte}</h2>
      <p className="mt-1 text-xs text-ink-400">{texte.facultatif}</p>
      <textarea
        value={texteLibre}
        onChange={(e) => setTexteLibre(e.target.value)}
        rows={4}
        placeholder={texte.champTexte}
        className="mt-5 w-full resize-none rounded-xl border border-ink-200 p-4 text-sm text-ink-700 focus:border-ink-400 focus:outline-none"
      />
      <button
        onClick={() => onRepondre(texteLibre)}
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white"
      >
        {texte.suivant}
      </button>
    </div>
  );
}
