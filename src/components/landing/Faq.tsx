import { getDict, type Locale } from "@/lib/i18n";

export function Faq({ locale }: { locale: Locale }) {
  const dict = getDict(locale).faq;

  return (
    <section id="faq" className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-nuit sm:text-4xl">{dict.title}</h2>

        <div className="mt-12 divide-y divide-zinc-200">
          {dict.items.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="text-base font-semibold text-nuit">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
