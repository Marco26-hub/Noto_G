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
      <section className="relative min-h-[62svh] overflow-hidden border-b border-line/60">
        <Image src="/uploads/demo/showroom1.jpg" alt="Interno showroom Noto G" fill priority className="object-cover opacity-65 [filter:saturate(.76)_contrast(1.05)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/60 to-night/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/25" />
        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-4 py-20 sm:px-6 lg:px-8">
          <div>
          <Reveal>
            <p className="section-kicker">
              <MapPin size={13} /> Showroom Como
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.08] text-white sm:text-6xl">
              Le finiture si scelgono dal vivo.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-slate-300">
              Cucine, bagni, rivestimenti e materiali da vedere e confrontare con il supporto
              del nostro team, prima e durante il cantiere.
            </p>
          </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="media-frame relative aspect-[4/3] overflow-hidden">
                <Image src="/uploads/demo/showroom1.jpg" alt="Angolo showroom" fill className="object-cover" />
              </div>
              <div className="media-frame relative aspect-[4/3] overflow-hidden">
                <Image src="/uploads/demo/showroom2.jpg" alt="Moodboard showroom" fill className="object-cover" />
              </div>
            </div>
            <Reveal>
              <div className="premium-panel rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold text-white">Informazioni utili</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2"><MapPin size={15} className="text-brand-soft" /> {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}</li>
                  <li className="flex items-start gap-2"><Phone size={15} className="text-brand-soft" /> {SITE.showroom.hours}</li>
                </ul>
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener"
                  className="button-whatsapp mt-6"
                >
                  <CalendarClock size={15} /> Prenota su WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="premium-panel rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold text-white">Dove siamo</h2>
              <p className="mt-2 text-sm text-slate-400">Angolo via Borsieri, con accesso da Viale Varese.</p>
              <div className="mt-5 overflow-hidden rounded-md border border-line/60">
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
