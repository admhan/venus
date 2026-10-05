import { createBrowserClient } from "@supabase/ssr";

/** Client Supabase pour les composants navigateur (respecte la RLS). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
