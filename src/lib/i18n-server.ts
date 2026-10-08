import { headers } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getRequestLocale(): Promise<Locale> {
  const headersList = await headers();
  return headersList.get("x-locale") === "en" ? "en" : "fr";
}
