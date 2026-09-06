import { getPublicProperties } from "@/lib/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ORGANIZATION_ID, SITE, WEBSITE_ID } from "@/lib/site";
import { PropertyFilters } from "@/components/PropertyFilters";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import type { Metadata } from "next";

// Prerendered and refreshed on demand after an admin edit
// (see lib/revalidate.ts); the interval is the safety net.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Immobili in vendita a Como e provincia",
  description:
    "Appartamenti, attici, ville e nuove costruzioni in vendita a Como e provincia. Prezzi, foto, planimetrie e visite su appuntamento.",
  alternates: { canonical: "/vendita" },
  openGraph: {
    title: "Immobili in vendita a Como e provincia",
    description: "Nuove costruzioni e immobili ristrutturati con foto, dati essenziali e contatto diretto.",
    url: "/vendita",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noto G. — Immobili a Como e provincia" }],
  },
};

export default async function VenditaPage() {
  const properties = await getPublicProperties();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.base}/vendita#catalogo`,
    name: "Immobili in vendita — Noto G.",
    url: `${SITE.base}/vendita`,
    isPartOf: { "@id": WEBSITE_ID },
    provider: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: properties.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.base}/vendita/${p.id}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <JsonLd data={ld} />
      <Reveal>
        <p className="section-kicker">Proprietà selezionate</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold text-white sm:text-6xl">
          Immobili in vendita a Como e provincia.
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-slate-400">
          Nuove costruzioni e immobili ristrutturati, presentati con informazioni essenziali e
          contatto diretto. Filtra la selezione e prenota una visita.
        </p>
      </Reveal>

      <div className="mt-10">
        <PropertyFilters properties={properties} />
      </div>

      <section className="mt-20 border-t border-line/70 pt-16">
        <Reveal>
          <p className="section-kicker">Acquisto diretto</p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Informazioni chiare prima della visita.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">
            Ogni scheda raccoglie prezzo, superficie, classe energetica, caratteristiche e
            immagini disponibili. Indica il riferimento dell&rsquo;immobile per ricevere un
            riscontro preciso dal team Noto G.
          </p>
          <Link href="/contatti" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-soft hover:text-white">
            Contatta Noto G. a Como <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
