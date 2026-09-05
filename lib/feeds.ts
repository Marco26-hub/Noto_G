import type { Property } from "./types";
import { SITE } from "./site";

const ON_MARKET = new Set(["disponibile", "riservato"]);

function imageUrl(base: string, img: string) {
  return img.startsWith("http") ? img : `${base}${img}`;
}

// ---------------- Immobiliare.it (formato CSV separato da ";") ----------------

const IMMOBILIARE_COLUMNS = [
  "ID",
  "Riferimento",
  "Titolo",
  "Contratto",
  "Tipologia",
  "Prezzo",
  "SpeseCondominio",
  "Superficie",
  "Vani",
  "Bagni",
  "Piano",
  "Piani_totali",
  "Anno_costruzione",
  "Classe_energetica",
  "IPE",
  "Citta",
  "Provincia",
  "Indirizzo",
  "CAP",
  "Latitudine",
  "Longitudine",
  "Stato",
  "Nuova_costruzione",
  "Ascensore",
  "Riscaldamento",
  "Condizioni_immobile",
  "Caratteristiche",
  "Descrizione",
  "URL_foto",
  "URL_annuncio",
  "Telefono",
  "Email",
];

function csvEscape(v: string) {
  return `"${v.replace(/"/g, '""')}"`;
}

export function toImmobiliareCsv(props: Property[], base: string): string {
  const rows = props
    .filter((p) => ON_MARKET.has(p.status))
    .map((p) =>
      [
        p.id,
        p.reference,
        p.title,
        "Vendita",
        p.propertyType,
        String(p.price),
        p.expenses ? String(p.expenses) : "",
        String(p.area),
        String(p.rooms),
        String(p.bathrooms),
        p.floor ?? "",
        p.totalFloors ? String(p.totalFloors) : "",
        p.yearBuilt ? String(p.yearBuilt) : "",
        p.energyClass ?? "",
        p.epgValue ? String(p.epgValue) : "",
        p.city,
        p.province,
        p.address,
        p.zip,
        p.latitude?.toString() ?? "",
        p.longitude?.toString() ?? "",
        p.status,
        p.newConstruction ? "Si" : "No",
        p.elevator ? "Si" : "No",
        p.heating ?? "",
        p.condition ?? "",
        p.amenities.join(", "),
        p.description.replace(/\s+/g, " "),
        p.images.map((img) => imageUrl(base, img)).join("|"),
        `${base}/vendita/${p.id}`,
        SITE.phone,
        SITE.email,
      ]
        .map(csvEscape)
        .join(";")
    );
  return [IMMOBILIARE_COLUMNS.map(csvEscape).join(";"), ...rows].join("\n");
}

// ---------------- Idealista (XML) ----------------

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function toIdealistaXml(props: Property[], base: string): string {
  const items = props
    .filter((p) => ON_MARKET.has(p.status))
    .map(
      (p) => `
  <property>
    <id>${p.id}</id>
    <operation>sell</operation>
    <property_type>${esc(p.propertyType)}</property_type>
    <title><![CDATA[${p.title}]]></title>
    <description><![CDATA[<p>${esc(p.description.replace(/\n+/g, "</p><p>"))}</p>]]></description>
    <price>${p.price}</price>
    <currency>EUR</currency>
    <rooms>${p.rooms}</rooms>
    <bathrooms>${p.bathrooms}</bathrooms>
    <surface>${p.area}</surface>
    ${p.floor ? `<floor>${esc(p.floor)}</floor>` : ""}
    ${p.energyClass ? `<energy_certification><code>${p.energyClass}</code></energy_certification>` : ""}
    <location>
      <address>${esc(p.address)}</address>
      <city>${esc(p.city)}</city>
      <province>${esc(p.province)}</province>
      <zipcode>${esc(p.zip)}</zipcode>
      <country>IT</country>
      ${p.latitude && p.longitude ? `<coordinates><latitude>${p.latitude}</latitude><longitude>${p.longitude}</longitude></coordinates>` : ""}
    </location>
    ${p.images.length ? `<media>${p.images.map((img, i) => `<photo${i === 0 ? ' primary="true"' : ""}><src>${imageUrl(base, img)}</src></photo>`).join("")}</media>` : ""}
    <url>${base}/vendita/${p.id}</url>
    <status>${p.status === "riservato" ? "reserved" : "available"}</status>
  </property>`
    );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<idealistaFeed>${items.join("\n")}\n</idealistaFeed>\n`;
}

// ---------------- Master JSON + CSV generico ----------------

export function toMasterJson(props: Property[], base: string): string {
  return JSON.stringify(
    props.map((p) => ({
      ...p,
      imageUrls: p.images.map((img) => imageUrl(base, img)),
      url: `${base}/vendita/${p.id}`,
    })),
    null,
    2
  );
}
