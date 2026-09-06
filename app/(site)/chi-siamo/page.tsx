import Image from "next/image";
import { ShieldCheck, Users, Award } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo — Noto G. costruzioni e ristrutturazioni",
  description:
    "Impresa familiare fondata nel 1990 da Giacomo Noto. Oggi gestita da Giuseppe, Giovanni e Giada con oltre 30 anni di esperienza e un team di 30 dipendenti.",
  alternates: { canonical: "/chi-siamo" },
};

export default function ChiSiamoPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Chi siamo — Noto G.",
    url: `${SITE.base}/chi-siamo`,
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="relative overflow-hidden">
        <Image src="/works/lavori2.jpg" alt="Team Noto G al lavoro" fill priority className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-panel/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-soft">
              <Users size={13} /> Chi siamo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold text-white">
              Un&apos;impresa a conduzione familiare, da Giacomo a Giuseppe, Giovanni e Giada.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-slate-300">
              Fondata nel 1990 come impresa artigiana, Noto G. diventa S.r.l. nel 2006. Oggi
              guidiamo un team di oltre 30 dipendenti con attenzione alla qualità dei materiali e
              al rispetto delle normative.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-display text-4xl font-bold text-white">La nostra storia</h2>
            <div className="mt-6 space-y-4 text-slate-400">
              <p>
                Nel corso di oltre 30 anni, la famiglia Noto ha consolidato la propria presenza sul
                territorio unendo spirito imprenditoriale, serietà, qualità, competenza,
                disponibilità e professionalità.
              </p>
              <p>
                Investimenti costanti nelle migliori attrezzature e qualità dei materiali hanno
                permesso alla Noto G. di essere un&apos;azienda fortemente strutturata e
                basata su solide fondamenta.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter to={30} suffix="+" />
                </p>
                <p className="text-sm text-slate-500">dipendenti specializzati</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter to={30} suffix="+" />
                </p>
                <p className="text-sm text-slate-500">anni di esperienza</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter to={1990} />
                </p>
                <p className="text-sm text-slate-500">anno di fondazione</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line/60 bg-panel/60 p-7">
              <h3 className="font-display text-xl font-semibold text-white">Certificazioni</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Award size={18} className="mt-0.5 text-gold" /> UNI EN ISO 9001 — gestione qualità
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <ShieldCheck size={18} className="mt-0.5 text-brand-soft" /> SOA categoria OG1
                </li>
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <Image src="/certs/cea.png" alt="CEA 2023" width={110} height={44} className="h-11 w-auto rounded bg-white p-1" />
                <Image src="/certs/iso.png" alt="ISO 9001" width={80} height={44} className="h-11 w-auto rounded bg-white p-1" />
                <Image src="/certs/soa.png" alt="SOA" width={80} height={44} className="h-11 w-auto rounded bg-white p-1" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
