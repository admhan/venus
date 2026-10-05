import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { entrepriseDemo, questionsDemo } from "@/lib/demo-entreprise";
import { Questionnaire } from "@/components/questionnaire/Questionnaire";
import type { Entreprise, Question } from "@/lib/types/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function chargerEntreprise(slug: string): Promise<{ entreprise: Entreprise; questions: Question[] } | null> {
  if (!isSupabaseConfigured()) {
    const entreprise = entrepriseDemo(slug);
    return { entreprise, questions: questionsDemo(entreprise.id) };
  }

  const supabase = createAdminClient();

  const { data: entreprise } = await supabase
    .from("entreprises")
    .select("*")
    .eq("slug", slug)
    .eq("statut", "actif")
    .maybeSingle();

  if (!entreprise) return null;

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("entreprise_id", entreprise.id)
    .order("ordre", { ascending: true });

  return { entreprise, questions: questions ?? [] };
}

export default async function PageEntreprise({ params }: PageProps) {
  const { slug } = await params;
  const donnees = await chargerEntreprise(slug);

  if (!donnees) notFound();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-100 px-4 py-10">
      <Questionnaire entreprise={donnees.entreprise} questions={donnees.questions} />
    </div>
  );
}
