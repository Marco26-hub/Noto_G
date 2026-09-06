import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Hammer, MapPin, Phone, ShieldCheck } from "lucide-react";
import { getPublicProperties } from "@/lib/db";
import { ORGANIZATION_ID, SITE, WEBSITE_ID, waLink } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { PropertyCard } from "@/components/PropertyCard";
import { JsonLd } from "@/components/JsonLd";

// Prerendered and refreshed on demand after an admin edit
// (see lib/revalidate.ts); the interval is the safety net.
export const revalidate = 600;

const SERVICES = [
  { icon: Building2, title: "Costruzioni civili e industriali", desc: "Progetti residenziali, commerciali e industriali gestiti con struttura, competenze e controllo." },
  { icon: Hammer, title: "Ristrutturazioni chiavi in mano", desc: "Un solo referente per progettazione, pratiche, cantiere, impianti e scelta delle finiture." },
  { icon: ShieldCheck, title: "Manutenzioni e pronto intervento", desc: "Interventi programmati e urgenti per immobili civili e industriali, secondo standard certificati." },
];

const CREDENTIALS = [
  { value: "1990", label: "anno di fondazione" },
  { value: "40+", label: "professionisti in squadra" },
  { value: "ISO 9001", label: "sistema qualità" },
  { value: "SOA OG1", label: "opere edili certificate" },
];

const FAQ = [
  {
    q: "Dove si trova lo showroom Noto G. a Como?",
    a: "In Viale Varese 53, angolo via Borsieri, 22100 Como. Aperto dal lunedì al venerdì 8.30–12.30 e 13.30–18.00, sabato su appuntamento. Puoi prenotare su WhatsApp.",
  },
  {
    q: "Come prenoto un appuntamento per vedere gli immobili in vendita?",
    a: "Scrivici su WhatsApp con il pulsante verde in basso, oppure chiama lo 031 522914. Concordiamo insieme data e orario per sopralluoghi e visite in showroom.",
  },
  {
    q: "Il preventivo di ristrutturazione è gratuito?",
    a: "Sì, sopralluoghi, consulenze e preventivi sono gratuiti. Contattaci via email o WhatsApp per bloccare il tuo sopralluogo.",
  },
  {
    q: "Quali garanzie e certificazioni ha Noto G.?",
    a: "Siamo certificati UNI EN ISO 9001 per la qualità e SOA nella categoria OG1 per lavori in ambito pubblico.",
  },
];

export default async function HomePage() {
  const properties = await getPublicProperties();
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  const homeLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE.shortName,
      alternateName: "Noto G Costruzioni",
      url: SITE.base,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "it-IT",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.base}/#home`,
      name: "Noto G. — Costruzioni e Ristrutturazioni a Como",
      description:
        "Impresa edile familiare dal 1990: vendita immobili, ristrutturazioni chiavi in mano e showroom a Como.",
      url: SITE.base,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: `${SITE.base}/works/drone.jpg`,
      inLanguage: "it-IT",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={homeLd} />

      {/* HERO */}
      <section className="theme-always-dark relative -mt-18 flex min-h-[82svh] items-end overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <Image
            src="/works/drone.jpg"
            alt="Cantiere Noto G visto dal drone"
            fill
            priority
            className="hero-kenburns object-cover opacity-80 [filter:saturate(.72)_contrast(1.08)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/20 to-night/55" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-16">
          <Reveal>
            <p className="section-kicker">
              Impresa familiare a Como
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Costruzioni e ristrutturazioni <span className="gradient-text">a Como.</span>
              <br />Dal {SITE.since}.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Esperienza di cantiere, gestione diretta e cura delle finiture. Dalla nuova
              costruzione alla ristrutturazione chiavi in mano, fino alla scelta dei materiali
              nel nostro showroom.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/vendita"
                className="button-primary"
              >
                Scopri gli immobili <ArrowRight size={17} />
              </Link>
              <a
                href={waLink("Ciao Noto G! Vorrei prenotare un sopralluogo gratuito.")}
                target="_blank"
                rel="noopener"
                className="button-whatsapp"
              >
                <Phone size={16} /> Sopralluogo gratuito
              </a>
              <Link
                href="/ristrutturazioni"
                className="button-secondary"
              >
                Ristrutturazioni
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      <section className="border-b border-line/70 bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 border-x border-line/70 sm:grid-cols-4">
            {CREDENTIALS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i}>
                <div className="min-h-24 border-b border-r border-line/70 px-4 py-5 sm:border-b-0 lg:px-6">
                  <p className="font-display text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="section-kicker">Competenze</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-white sm:text-5xl">
            Dalla struttura all&rsquo;ultimo dettaglio.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={0.12 * i}>
              <div className="premium-panel group h-full rounded-lg p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/30 bg-brand/10 text-brand-soft transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <s.icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* IMMOBILI IN EVIDENZA */}
      <section className="border-y border-line/60 bg-ink/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="section-kicker">Immobili</p>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold text-white sm:text-5xl">
                Una selezione di proprietà a Como e provincia.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/vendita" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-soft hover:text-white">
                Tutti gli annunci <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={0.12 * i}>
                <PropertyCard p={p} />
              </Reveal>
            ))}
            {!featured.length && (
              <p className="col-span-3 text-slate-400">Gli immobili in evidenza compariranno qui. Aggiungili dal pannello admin.</p>
            )}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-line/60 bg-panel/35 py-5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-10 font-display text-base font-medium uppercase tracking-[0.16em] text-slate-500" aria-hidden={copy === 1}>
              {["Acquedotti", "Appartamenti", "Ville", "Condomini", "Cascine", "Negozi", "Piscine", "Uffici", "Complesso residenziale", "Pronto intervento"].map((w) => (
                <span key={w} className="flex items-center gap-3">
                  {w} <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SHOWROOM TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="media-frame relative overflow-hidden">
              <Image src="/uploads/demo/showroom1.jpg" alt="Showroom Noto G a Como" width={900} height={620} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-md border border-white/15 bg-night/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Showroom · Como
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="section-kicker section-kicker-gold">Showroom Como</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              Materiali, finiture, scelte consapevoli.
            </h2>
            <p className="mt-4 text-slate-400">
              Nel nostro showroom in {SITE.showroom.address} trovi rivestimenti, cucine e finiture.
              Il team ti accompagna nelle scelte tecniche ed estetiche, in continuità con il cantiere.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><MapPin size={15} className="text-brand-soft" /> {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-brand-soft" /> {SITE.showroom.hours}</li>
            </ul>
            <a
              href={waLink("Ciao Noto G! Vorrei prenotare una visita in showroom a Como.")}
              target="_blank"
              rel="noopener"
              className="button-whatsapp mt-8"
            >
              <Phone size={15} /> Prenota in showroom
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ (AEO) */}
      <section className="border-t border-line/60 bg-ink/50">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker">Informazioni</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white">Domande frequenti</h2>
            <p className="mt-3 text-slate-400">Informazioni utili prima di una visita o di un sopralluogo.</p>
          </Reveal>
          <div className="mt-10 divide-y divide-line/70 border-y border-line/70">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={0.06 * i}>
                <details className="group px-1 py-5 sm:px-3">
                  <summary className="cursor-pointer list-none font-display text-base font-semibold text-white marker:hidden transition-colors group-open:text-brand-soft">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-brand/35 bg-panel">
        <div className="absolute inset-y-0 left-0 w-1 bg-brand" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">
              Il tuo progetto merita un confronto concreto.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">Raccontaci l&rsquo;immobile, le esigenze e i tempi. Partiamo da lì.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink("Ciao Noto G! Vorrei prenotare un appuntamento.")}
                target="_blank"
                rel="noopener"
                className="button-whatsapp"
              >
                Scrivici su WhatsApp
              </a>
              <Link href="/contatti" className="button-secondary">
                Vai ai contatti
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
