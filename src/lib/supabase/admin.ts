import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé service_role — contourne la RLS.
 * Usage strictement serveur : webhooks Stripe, soumission du questionnaire public,
 * génération d'avis IA. Ne jamais importer depuis un composant client.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
