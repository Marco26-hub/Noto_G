import { getPublicProperties } from "@/lib/db";
import { SITE } from "@/lib/site";
import { PropertyFilters } from "@/components/PropertyFilters";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Immobili in vendita a Como e provincia",
  description:
    "Appartamenti, attici, ville e nuove costruzioni in vendita a Como e provincia. Prezzi, foto, planimetrie e visite su appuntamento.",
  alternates: { canonical: "/vendita" },
};

export default async function VenditaPage() {
  const properties = await getPublicProperties();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Immobili in vendita — Noto G.",
    url: `${SITE.base}/vendita`,
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
    </div>
  );
}
