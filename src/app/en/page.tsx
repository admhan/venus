import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Trust } from "@/components/landing/Trust";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export default function HomeEn() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav locale="en" />
      <main className="flex-1">
        <Hero locale="en" />
        <HowItWorks locale="en" />
        <Trust locale="en" />
        <Pricing locale="en" />
        <Faq locale="en" />
      </main>
      <Footer locale="en" />
    </div>
  );
}
