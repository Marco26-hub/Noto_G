import Image from "next/image";
import { ShieldCheck, Users, Award } from "lucide-react";
import { ORGANIZATION_ID, SITE } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo — Noto G. costruzioni e ristrutturazioni",
  description:
    "Impresa familiare fondata nel 1990 da Giacomo Noto. Oggi gestita da Giuseppe, Giovanni e Giada con oltre 35 anni di esperienza e più di 40 professionisti.",
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    title: "Noto G.: impresa edile familiare a Como dal 1990",
    description: "Storia, squadra e certificazioni dell'impresa guidata dalla famiglia Noto.",
    url: "/chi-siamo",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noto G. — Impresa familiare dal 1990" }],
  },
};

export default function ChiSiamoPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE.base}/chi-siamo#pagina`,
    name: "Chi siamo — Noto G.",
    url: `${SITE.base}/chi-siamo`,
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: `${SITE.base}/works/lavori2.jpg`,
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="theme-always-dark relative min-h-[62svh] overflow-hidden border-b border-line/60">
        <Image src="/works/lavori2.jpg" alt="Team Noto G al lavoro" fill priority className="object-cover opacity-60 [filter:saturate(.68)_contrast(1.08)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/60 to-night/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/25" />
        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-4 py-20 sm:px-6 lg:px-8">
          <div>
          <Reveal>
            <p className="section-kicker">
              <Users size={13} /> Chi siamo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.08] text-white sm:text-6xl">
              Una famiglia d&rsquo;impresa. Una struttura costruita nel tempo.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-slate-300">
              Fondata nel 1990 come impresa artigiana, Noto G. diventa S.r.l. nel 2006. Oggi
              la seconda generazione guida una squadra di oltre 40 professionisti, con attenzione
              alla qualità dei materiali e al rispetto delle normative.
            </p>
          </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="section-kicker">Radici e continuità</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white">La nostra storia</h2>
            <div className="mt-6 space-y-4 text-slate-400">
              <p>
                Giacomo Noto fonda l&rsquo;attività nel 1990. Nel 2006 l&rsquo;impresa diventa
                Noto G. S.r.l.; oggi Giuseppe, Giovanni e Giada proseguono il percorso familiare
                con una struttura composta da oltre 40 professionisti specializzati.
              </p>
              <p>
                Competenze interne, attrezzature e controllo dei materiali permettono di seguire
                costruzioni, ristrutturazioni e manutenzioni con continuità tra progetto e cantiere.
                Le certificazioni UNI EN ISO 9001 e SOA OG1 documentano il sistema qualità e la
                qualificazione per le opere edili.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter to={40} suffix="+" />
                </p>
                <p className="text-sm text-slate-500">professionisti in squadra</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-white">
                  <Counter to={35} suffix="+" />
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
            <div className="premium-panel rounded-lg p-7">
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

      <section className="border-t border-line/60 bg-ink/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker">Competenze integrate</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold text-white">
              Una struttura per coordinare lavori complessi.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 border-t border-line/70 pt-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Costruzioni</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Opere civili, commerciali e industriali per committenti pubblici e privati.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Ristrutturazioni</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Progettazione, pratiche, impianti, opere edili e finiture coordinate da un unico referente.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Manutenzioni</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Interventi programmati, specialistici e urgenti per immobili civili e industriali.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
