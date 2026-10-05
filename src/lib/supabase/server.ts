import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Client Supabase pour Server Components / Route Handlers (respecte la RLS, lié à la session). */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component : le middleware se charge du refresh de session.
          }
        },
      },
    }
  );
}
