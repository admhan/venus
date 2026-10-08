import { dictFr } from "@/dictionaries/fr";
import { dictEn } from "@/dictionaries/en";

export type Locale = "fr" | "en";

export type Dictionary = typeof dictFr;

export function getDict(locale: Locale): Dictionary {
  return locale === "en" ? dictEn : dictFr;
}

export function localizedHref(locale: Locale, path: string): string {
  if (locale !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}
