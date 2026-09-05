import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Hammer, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { getPublicProperties } from "@/lib/db";
import { SITE, waLink } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { PropertyCard } from "@/components/PropertyCard";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

const SERVICES = [
  { icon: Building2, title: "Costruzioni civili e industriali", desc: "Nuove residenze, complessi commerciali e opere industriali, pubbliche e private." },
  { icon: Hammer, title: "Ristrutturazioni chiavi in mano", desc: "Riqualificazioni energetiche, recupero e consolidamenti strutturali, adeguamenti funzionali." },
  { icon: ShieldCheck, title: "Pronto intervento e manutenzioni", desc: "Manutenzioni civili e industriali, prevenzione antincendio, certificazioni SOA OG1 e ISO 9001." },
];

const FAQ = [
  {
    q: "Dove si trova lo showroom Noto G. a Como?",
    a: "In Viale Varese 53, angolo via Borsieri, 22100 Como. Aperto dal lunedì al venerdì 8.30–12.30 e 13.30–18.00, sabato su appuntamento. Puoi prenotare su WhatsApp.",
  },
  {
    q: "Come prenoto un appuntamento per vedere gli immobili in vendita?",
    a: "Scrivici su WhatsApp con il pulsante verde in basso, oppure chiama lo 031 522914. Prenotiamo sopralluoghi e visite in showroom anche lo stesso giorno.",
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

export default function HomePage() {
  const properties = getPublicProperties();
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  const homeLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Noto G. — Costruzioni e Ristrutturazioni a Como",
      description:
        "Impresa edile familiare dal 1990: vendita immobili, ristrutturazioni chiavi in mano e showroom a Como.",
      url: SITE.base,
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
      <section className="relative -mt-18 flex min-h-[92vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/works/drone.jpg"
            alt="Cantiere Noto G visto dal drone"
            fill
            priority
            className="hero-kenburns object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-transparent to-night/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-panel/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-soft backdrop-blur">
              <Sparkles size={13} /> Dal {SITE.since} · Impresa familiare
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Costruiamo e ristrutturiamo <span className="gradient-text">il futuro</span> delle tue case.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Noto G. è l&rsquo;impresa edile familiare leader a Como: vendita di immobili di nuova
              costruzione, ristrutturazioni chiavi in mano e showroom dedicato ai clienti.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/vendita"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand/40 transition-transform hover:scale-[1.03]"
              >
                Immobili in vendita <ArrowRight size={17} />
              </Link>
              <a
                href={waLink("Ciao Noto G! Vorrei prenotare un sopralluogo gratuito.")}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-accent-green/50 bg-accent-green/10 px-7 py-3.5 text-sm font-bold text-accent-green transition hover:bg-accent-green/20"
              >
                <Phone size={16} /> Sopralluogo gratuito
              </a>
              <Link
                href="/ristrutturazioni"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Ristrutturazioni
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: 30, s: "+", label: "anni di esperienza" },
              { n: 3500, s: "", label: "collaboratori" },
              { n: 30, s: "+", label: "dipendenti specializzati" },
              { n: 1990, s: "", label: "anno di fondazione" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i}>
                <div className="border-l border-brand/30 pl-4">
                  <p className="font-display text-3xl font-bold text-white">
                    <Counter to={stat.n} suffix={stat.s} />
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-soft">I servizi</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl">
            Tre servizi. Un&rsquo;unica qualità artigiana.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={0.12 * i}>
              <div className="group h-full rounded-2xl border border-line/60 bg-panel/60 p-7 transition-all hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-soft transition group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-green">Vendita</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                Immobili in evidenza a Como e provincia
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
      <div className="overflow-hidden border-y border-line/60 py-5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-10 font-display text-lg font-semibold uppercase tracking-widest text-slate-500" aria-hidden={copy === 1}>
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
            <div className="relative overflow-hidden rounded-3xl border border-line/60">
              <Image src="/uploads/demo/showroom1.jpg" alt="Showroom Noto G a Como" width={900} height={620} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-night/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Showroom · Como
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Visita lo showroom</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Tocchi finali e scelte di qualità nel cuore di Como.
            </h2>
            <p className="mt-4 text-slate-400">
              In nostro showroom in {SITE.showroom.address} trovi rivestimenti, cucine, finiture e
              un team pronto a guidarti nella ristrutturazione del tuo immobile.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><MapPin size={15} className="text-brand-soft" /> {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-brand-soft" /> {SITE.showroom.hours}</li>
            </ul>
            <a
              href={waLink("Ciao Noto G! Vorrei prenotare una visita in showroom a Como.")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-bold text-night transition hover:brightness-110"
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
            <h2 className="font-display text-4xl font-bold text-white">Domande frequenti</h2>
            <p className="mt-3 text-slate-400">Risposte rapide per organizzare subito la tua visita.</p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={0.06 * i}>
                <details className="group rounded-xl border border-line/60 bg-panel/60 px-6 py-4 open:border-brand/50">
                  <summary className="cursor-pointer list-none font-display text-base font-semibold text-white marker:hidden group-open:text-brand-soft">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Chiedici cosa ti serve: noi lo realizziamo.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink("Ciao Noto G! Vorrei prenotare un appuntamento.")}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-accent-green px-8 py-4 text-sm font-bold text-night transition hover:brightness-110"
              >
                Scrivici su WhatsApp
              </a>
              <Link href="/contatti" className="rounded-full border border-line px-8 py-4 text-sm font-bold text-slate-200 hover:bg-white/5">
                Vai ai contatti
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
