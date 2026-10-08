"use client";

import { useState, useTransition } from "react";
import { sauvegarderQuestions } from "@/app/dashboard/questions/actions";
import { getDict, type Locale } from "@/lib/i18n";
import type { TypeQuestion } from "@/lib/types/db";

interface QuestionLocale {
  texte: string;
  type: TypeQuestion;
  options: string[] | null;
}

export function QuestionsEditor({
  questionsInitiales,
  locale,
}: {
  questionsInitiales: QuestionLocale[];
  locale: Locale;
}) {
  const dict = getDict(locale).dashboardQuestions;
  const [questions, setQuestions] = useState<QuestionLocale[]>(questionsInitiales);
  const [isPending, startTransition] = useTransition();
  const [sauvegarde, setSauvegarde] = useState(false);

  function mettreAJour(index: number, patch: Partial<QuestionLocale>) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  function ajouterQuestion() {
    setQuestions((prev) => [...prev, { texte: "", type: "choix_unique", options: ["Option 1"] }]);
  }

  function supprimerQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function deplacer(index: number, direction: -1 | 1) {
    setQuestions((prev) => {
      const cible = index + direction;
      if (cible < 0 || cible >= prev.length) return prev;
      const copie = [...prev];
      [copie[index], copie[cible]] = [copie[cible], copie[index]];
      return copie;
    });
  }

  function sauvegarderTout() {
    startTransition(async () => {
      await sauvegarderQuestions(questions, locale);
      setSauvegarde(true);
      setTimeout(() => setSauvegarde(false), 2000);
    });
  }

  return (
    <div>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <input
                value={question.texte}
                onChange={(e) => mettreAJour(index, { texte: e.target.value })}
                placeholder={dict.textPlaceholder}
                className="flex-1 border-b border-transparent text-sm font-medium text-nuit focus:border-zinc-300 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button onClick={() => deplacer(index, -1)} className="text-xs text-zinc-400 hover:text-zinc-700">
                  {dict.moveUp}
                </button>
                <button onClick={() => deplacer(index, 1)} className="text-xs text-zinc-400 hover:text-zinc-700">
                  {dict.moveDown}
                </button>
                <button onClick={() => supprimerQuestion(index)} className="text-xs text-red-500 hover:text-red-700">
                  {dict.remove}
                </button>
              </div>
            </div>

            <select
              value={question.type}
              onChange={(e) => {
                const type = e.target.value as TypeQuestion;
                mettreAJour(index, {
                  type,
                  options: type === "choix_unique" || type === "choix_multiple" ? question.options || ["Option 1"] : null,
                });
              }}
              className="mt-3 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600"
            >
              {Object.entries(dict.typeLabels).map(([valeur, label]) => (
                <option key={valeur} value={valeur}>
                  {label}
                </option>
              ))}
            </select>

            {(question.type === "choix_unique" || question.type === "choix_multiple") && (
              <div className="mt-3 space-y-2">
                {(question.options || []).map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      value={option}
                      onChange={(e) => {
                        const options = [...(question.options || [])];
                        options[oIndex] = e.target.value;
                        mettreAJour(index, { options });
                      }}
                      className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm"
                    />
                    <button
                      onClick={() => {
                        const options = (question.options || []).filter((_, i) => i !== oIndex);
                        mettreAJour(index, { options });
                      }}
                      className="text-xs text-zinc-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    mettreAJour(index, {
                      options: [
                        ...(question.options || []),
                        `${dict.optionPrefix} ${(question.options?.length || 0) + 1}`,
                      ],
                    })
                  }
                  className="text-xs font-medium text-signal hover:text-nuit"
                >
                  {dict.addOption}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={ajouterQuestion}
          className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {dict.addQuestion}
        </button>
        <button
          onClick={sauvegarderTout}
          disabled={isPending}
          className="rounded-full bg-nuit px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isPending ? dict.saving : sauvegarde ? dict.saved : dict.save}
        </button>
      </div>
    </div>
  );
}
