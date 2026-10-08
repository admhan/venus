import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { getDict } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dict = getDict(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();
  return (
    <html lang={locale} className={`${schibstedGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
