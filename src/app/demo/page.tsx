import type { Metadata } from "next";
import { entrepriseDemo, questionsDemo } from "@/lib/demo-entreprise";
import { Questionnaire } from "@/components/questionnaire/Questionnaire";

export const metadata: Metadata = {
  title: "Starnote — Démo",
  robots: { index: false },
};

/**
 * Démo publique du questionnaire, liée depuis la landing (« Essayez comme un client »).
 * Utilise toujours l'établissement fictif, même quand Supabase est configuré :
 * l'id "demo" fait que rien n'est enregistré en base.
 */
export default function PageDemo() {
  const entreprise = entrepriseDemo("demo");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 py-10">
      <Questionnaire entreprise={entreprise} questions={questionsDemo(entreprise.id)} />
    </div>
  );
}
