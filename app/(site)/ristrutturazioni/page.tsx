import { CheckCircle2, Hammer, CalendarClock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ORGANIZATION_ID, SITE, WEBSITE_ID, waLink } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ristrutturazioni chiavi in mano a Como",
  description:
    "Ristrutturazioni chiavi in mano a Como per appartamenti, ville e spazi professionali: progetto, pratiche, cantiere, impianti e finiture.",
  alternates: { canonical: "/ristrutturazioni" },
  openGraph: {
    title: "Ristrutturazioni chiavi in mano a Como",
    description: "Un solo referente per progetto, pratiche, cantiere, impianti e finiture.",
    url: "/ristrutturazioni",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noto G. — Costruzioni e ristrutturazioni a Como" }],
  },
};

const STEPS = [
  { n: "01", t: "Sopralluogo gratuito", d: "Valutiamo con te obiettivi, pratiche ed aspetti tecnici senza impegno." },
  { n: "02", t: "Progetto e preventivo", d: "Ti proponiamo soluzioni costruttive ed economiche ottimali." },
  { n: "03", t: "Cantiere coordinato", d: "Un unico referente, squadre specializzate, cantieri puliti e sicuri." },
  { n: "04", t: "Consegna chiavi in mano", d: "Collaudo, documentazione e assistenza post-vendita." },
];

const FEATURES = [
  "Riqualificazione energetica e documentazione tecnica",
  "Recupero e consolidamenti strutturali",
  "Adeguamenti funzionali e impianti",
  "Cappotto, finestrature, impermeabilizzazioni",
  "SOA OG1 e UNI EN ISO 9001",
  "Gestione completa pratiche e direzione lavori",
];

const FAQ = [
  {
    q: "Quanto dura una ristrutturazione?",
    a: "Dipende da superficie, stato dell'immobile, opere strutturali e autorizzazioni. Dopo sopralluogo e progetto definiamo fasi, priorità e un cronoprogramma coerente con l'intervento.",
  },
  {
    q: "Posso accedere alle agevolazioni edilizie?",
    a: "La possibilità dipende dall'intervento, dall'immobile e dalla normativa vigente. Possiamo coordinare la documentazione tecnica necessaria; la verifica fiscale va fatta con il proprio consulente.",
  },
  {
    q: "Gestite anche impianti e scelta dei materiali?",
    a: "Sì. Coordiniamo opere edili, impianti, serramenti, pavimenti e finiture. Lo showroom di Como permette di confrontare materiali e soluzioni in continuità con il progetto.",
  },
];

export default function RistrutturazioniPage() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE.base}/ristrutturazioni#servizio`,
      name: "Ristrutturazioni chiavi in mano a Como",
      description: metadata.description,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
      serviceType: "Ristrutturazioni civili e industriali chiavi in mano",
      url: `${SITE.base}/ristrutturazioni`,
      isPartOf: { "@id": WEBSITE_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <section className="theme-always-dark relative min-h-[62svh] overflow-hidden border-b border-line/60">
        <Image src="/uploads/demo/reno1.jpg" alt="Ristrutturazioni Noto G" fill priority className="object-cover opacity-60 [filter:saturate(.7)_contrast(1.08)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/60 to-night/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/25" />
        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-4 py-20 sm:px-6 lg:px-8">
          <div>
          <Reveal>
            <p className="section-kicker section-kicker-gold">
              <Hammer size={13} /> Ristrutturazioni
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.08] text-white sm:text-6xl">
              Ristrutturazioni chiavi in mano a Como.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              Un solo referente per sopralluogo, progetto, pratiche, cantiere, impianti e
              finiture. Ogni fase viene coordinata con responsabilità diretta.
            </p>
          </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-kicker">Ambiti di intervento</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold text-white">
            Case, condomini e spazi professionali a Como e provincia.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">
            Interveniamo su appartamenti, ville, edifici condominiali e immobili commerciali,
            dalle opere interne alla riqualificazione completa. Il progetto definisce priorità,
            lavorazioni e finiture prima dell&rsquo;apertura del cantiere.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 border-t border-line/70 pt-8 md:grid-cols-3">
          {[
            ["Ridistribuzione degli spazi", "Demolizioni, nuove partizioni, adeguamenti funzionali e coordinamento degli impianti."],
            ["Involucro e prestazioni", "Cappotti, serramenti, impermeabilizzazioni e interventi di riqualificazione energetica."],
            ["Interni e finiture", "Pavimenti, rivestimenti, bagni, cucine e materiali coordinati con il progetto."],
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          ))}
        </div>
        <Link href="/showroom" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-soft hover:text-white">
          Scopri lo showroom di Como <ArrowRight size={16} />
        </Link>
      </section>

      <section className="border-t border-line/60 bg-ink/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-kicker">Il metodo</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white">Come lavoriamo</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.1 * i}>
              <div className="premium-panel h-full rounded-lg p-6">
                <span className="font-display text-3xl font-semibold text-brand-soft">{s.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="border-y border-line/60 bg-ink/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="section-kicker">Competenze tecniche</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-white">Cosa realizziamo</h2>
              <ul className="mt-8 space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent-green" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink("Ciao Noto G! Vorrei un preventivo gratuito di ristrutturazione.")}
                target="_blank"
                rel="noopener"
                className="button-whatsapp mt-9"
              >
                <CalendarClock size={16} /> Preventivo gratuito
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="media-frame relative overflow-hidden">
                <Image src="/uploads/demo/reno2.jpg" alt="Cantiere Noto G" width={900} height={700} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-sm font-semibold text-white">Lavoro in corso · Como</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-kicker">Prima di iniziare</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white">FAQ ristrutturazioni</h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={0.05 * i}>
              <details className="premium-panel rounded-lg px-6 py-5">
                <summary className="cursor-pointer font-display text-base font-semibold text-white">{f.q}</summary>
                <p className="mt-3 text-sm text-slate-400">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
