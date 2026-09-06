import { Mail, MapPin, Phone, Building2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti e prenotazione appuntamento",
  description:
    "Chiama lo 031 522914 o prenota in WhatsApp. Sed e showroom in Viale Varese 53, Como.",
  alternates: { canonical: "/contatti" },
};

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contatti Noto G.",
    url: `${SITE.base}/contatti`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.showroom.address,
        postalCode: SITE.showroom.cap,
        addressLocality: SITE.showroom.city,
      },
    },
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-soft">Parlaci</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">Contatti</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Prenota un appuntamento su WhatsApp o vieni a trovarci in sede: siamo qui per te.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-line/60 bg-panel/60 p-8">
              <h2 className="font-display text-xl font-semibold text-white">Scrivici</h2>
              <p className="mt-2 text-sm text-slate-500">Rispondiamo in orario d’ufficio.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line/60 bg-panel/60 p-8">
              <h2 className="font-display text-xl font-semibold text-white">I nostri riferimenti</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-brand-soft" />
                  <a href={SITE.showroom.mapsLink} target="_blank" rel="noopener" className="text-slate-300 hover:text-white">
                    {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-soft" />
                  <a href={SITE.phoneHref} className="text-slate-300 hover:text-white">{SITE.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-soft" />
                  <a href={`mailto:${SITE.email}`} className="text-slate-300 hover:text-white">{SITE.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Building2 size={18} className="text-brand-soft" />
                  <span className="text-slate-300">{SITE.showroom.hours}</span>
                </li>
              </ul>
              <div className="mt-8 overflow-hidden rounded-xl border border-line/60">
                <iframe title="Mappa sede" src={SITE.showroom.mapsUrl} className="h-64 w-full" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
