import Image from "next/image";
import { CalendarClock, MapPin, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showroom Noto G. a Como",
  description:
    "In Viale Varese 53, Como: lo showroom Noto G. con finiture, cucine, rivestimenti e supporto tecnico per la tua ristrutturazione.",
  alternates: { canonical: "/showroom" },
};

export default function ShowroomPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "Showroom Noto G. Como",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.showroom.address,
      postalCode: SITE.showroom.cap,
      addressLocality: SITE.showroom.city,
    },
    url: `${SITE.base}/showroom`,
  };

  const waMessage = "Ciao Noto G! Vorrei prenotare una visita in showroom a Como per la scelta di finiture e materiali.";

  return (
    <>
      <JsonLd data={ld} />
      <section className="relative overflow-hidden">
        <Image src="/uploads/demo/showroom1.jpg" alt="Interno showroom Noto G" fill priority className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-panel/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-soft">
              <MapPin size={13} /> Showroom Como
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold text-white">
              Lo showroom dove scegli le finiture della tua nuova casa.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-slate-300">
              Cucine, bagni, rivestimenti e materiali premiati sul territorio. Scegli cosa vive,
              toccalo e sperimenta la tua nuova casa prima dei cantieri.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/60">
                <Image src="/uploads/demo/showroom1.jpg" alt="Angolo showroom" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/60">
                <Image src="/uploads/demo/showroom2.jpg" alt="Moodboard showroom" fill className="object-cover" />
              </div>
            </div>
            <Reveal>
              <div className="rounded-2xl border border-line/60 bg-panel/60 p-6">
                <h2 className="font-display text-xl font-semibold text-white">Informazioni utili</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2"><MapPin size={15} className="text-brand-soft" /> {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}</li>
                  <li className="flex items-start gap-2"><Phone size={15} className="text-brand-soft" /> {SITE.showroom.hours}</li>
                </ul>
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-bold text-night hover:brightness-110"
                >
                  <CalendarClock size={15} /> Prenota su WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line/60 bg-panel/60 p-6">
              <h2 className="font-display text-xl font-semibold text-white">Dove siamo</h2>
              <p className="mt-2 text-sm text-slate-400">Angolo via Borsieri, parcheggio lato col fronte su Viale Varese.</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-line/60">
                <iframe title="Mappa showroom" src={SITE.showroom.mapsUrl} className="h-72 w-full" loading="lazy" />
              </div>
              <a href={SITE.showroom.mapsLink} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-soft">
                Apri Google Maps <MapPin size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
