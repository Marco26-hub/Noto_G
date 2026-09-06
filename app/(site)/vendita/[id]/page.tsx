import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bath, BedDouble, Building2, Mail, MapPin, MessageCircle, Ruler, ShieldCheck, Zap } from "lucide-react";
import { getProperties, getProperty } from "@/lib/db";
import { ORGANIZATION_ID, SITE, WEBSITE_ID, waLink } from "@/lib/site";
import { energyColor, formatPrice, statusLabel } from "@/lib/format";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyCard } from "@/components/PropertyCard";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

// Regenerated on demand after an admin edit (see lib/revalidate.ts); the
// interval is the safety net if a revalidation is ever missed.
export const revalidate = 600;

// Prerender the current catalogue; listings published later are generated on
// first request and then cached the same way.
export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.filter((p) => p.status !== "venduto").map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/vendita/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const p = await getProperty(id);
  if (!p || p.status === "venduto") {
    return { title: "Immobile non trovato", robots: { index: false, follow: false } };
  }
  const description = p.description.replace(/\s+/g, " ").slice(0, 155);
  return {
    title: `${p.title} — ${p.city} · ${p.reference}`,
    description,
    alternates: { canonical: `/vendita/${p.id}` },
    openGraph: {
      title: `${p.title} — ${p.city}`,
      description,
      url: `/vendita/${p.id}`,
      images: [{ url: p.images[0] || "/works/drone.jpg", alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} — ${p.city}`,
      description,
      images: [p.images[0] || "/works/drone.jpg"],
    },
  };
}

export default async function PropertyDetail(props: PageProps<"/vendita/[id]">) {
  const { id } = await props.params;
  const p = await getProperty(id);
  if (!p || p.status === "venduto") return notFound();

  const others = (await getProperties())
    .filter((x) => x.id !== p.id && x.status !== "venduto")
    .slice(0, 3);

  const propertyUrl = `${SITE.base}/vendita/${p.id}`;
  const residence = {
    "@type": "Residence",
    name: p.title,
    description: p.description,
    url: propertyUrl,
    image: p.images.map((i) => (i.startsWith("http") ? i : `${SITE.base}${i}`)),
    address: {
      "@type": "PostalAddress",
      streetAddress: p.address,
      addressLocality: p.city,
      postalCode: p.zip,
      addressCountry: "IT",
    },
    geo:
      p.latitude && p.longitude
        ? { "@type": "GeoCoordinates", latitude: p.latitude, longitude: p.longitude }
        : undefined,
  };
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "@id": `${propertyUrl}#annuncio`,
      name: p.title,
      description: p.description,
      url: propertyUrl,
      datePosted: p.createdAt,
      dateModified: p.updatedAt,
      image: residence.image,
      isPartOf: { "@id": WEBSITE_ID },
      about: residence,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "EUR",
        availability:
          p.status === "disponibile"
            ? "https://schema.org/InStock"
            : "https://schema.org/LimitedAvailability",
        url: propertyUrl,
        seller: { "@id": ORGANIZATION_ID },
        itemOffered: residence,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.base },
        { "@type": "ListItem", position: 2, name: "Immobili in vendita", item: `${SITE.base}/vendita` },
        { "@type": "ListItem", position: 3, name: p.title, item: propertyUrl },
      ],
    },
  ];

  const waMessage = `Ciao Noto G! Mi piace l'immobile rif. ${p.reference} "${p.title}" a ${p.city} (${formatPrice(p.price)}). Vorrei prenotare una visita.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <JsonLd data={ld} />
      <Link href="/vendita" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={15} /> Tutti gli annunci
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-soft">
          Rif. {p.reference}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${p.status === "disponibile" ? "bg-accent-green/15 text-accent-green" : "bg-gold/20 text-gold"}`}>
          {statusLabel(p.status)}
        </span>
        {p.newConstruction && <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Nuovo</span>}
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <PropertyGallery images={p.images} title={p.title} />

          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{p.title}</h1>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-400">
            <MapPin size={15} className="mt-0.5 text-brand-soft" /> {p.address}, {p.city} ({p.province})
          </p>

          <div className="premium-panel mt-6 grid grid-cols-2 gap-4 rounded-lg p-5 sm:grid-cols-4">
            <Stat icon={<BedDouble size={18} />} label={`${p.rooms} locali`} />
            <Stat icon={<Bath size={18} />} label={`${p.bathrooms} bagni`} />
            <Stat icon={<Ruler size={18} />} label={`${p.area} m²`} />
            <Stat
              icon={<Zap size={18} style={{ color: energyColor(p.energyClass) }} />}
              label={`Classe ${p.energyClass}`}
            />
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-white">Descrizione</h2>
            <p className="mt-3 whitespace-pre-line text-slate-400">{p.description}</p>
          </div>

          {!!p.amenities.length && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-white">Caratteristiche</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.amenities.map((a) => (
                  <li key={a} className="rounded-md border border-line/70 bg-panel/50 px-3 py-1.5 text-sm text-slate-300">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-white">Posizione</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-line/60">
              <iframe
                title={`Mappa ${p.address}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${p.address}, ${p.city}`)}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-12" id="richiedi-info">
            <h2 className="font-display text-xl font-semibold text-white">Richiedi informazioni</h2>
            <p className="mt-2 text-sm text-slate-500">
              Scrivici per questo immobile: la richiesta arriva con il riferimento {p.reference} già allegato.
            </p>
            <div className="premium-panel mt-5 rounded-lg p-6">
              <ContactForm propertyRef={p.reference} propertyTitle={p.title} />
            </div>
          </div>
        </div>

        <aside>
          <div className="premium-panel sticky top-24 rounded-lg p-6">
            <p className="text-3xl font-bold text-white">{formatPrice(p.price)}</p>
            {p.expenses ? (
              <p className="mt-1 text-sm text-slate-400">Spese condominio: {formatPrice(p.expenses)}/mese</p>
            ) : null}
            <div className="mt-6 space-y-3">
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noopener"
                className="button-whatsapp w-full"
              >
                <MessageCircle size={17} /> WhatsApp la visita
              </a>
              <a href="#richiedi-info" className="button-secondary w-full">
                <Mail size={16} /> Richiedi informazioni
              </a>
              <p className="text-center text-xs text-slate-500">Rispondiamo in orario d’ufficio, anche su WhatsApp.</p>
            </div>
            <div className="mt-6 border-t border-line/60 pt-5 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-brand-soft" /> Vendita gestita da Noto G.
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Building2 size={15} className="text-brand-soft" /> {SITE.phone}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-white">Annunci simili</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <PropertyCard key={o.id} p={o} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <span className="text-brand-soft">{icon}</span>
      {label}
    </div>
  );
}
