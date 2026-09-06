export const SITE = {
  name: "Noto G. S.r.l.",
  shortName: "Noto G.",
  description:
    "Impresa edile familiare a Como dal 1990, specializzata in costruzioni, ristrutturazioni chiavi in mano, manutenzioni e immobili in vendita.",
  tagline: "Costruzioni — Ristrutturazioni",
  since: 1990,
  phone: "031 522914",
  phoneHref: "tel:031522914",
  email: "info@notog.it",
  areaServed: "Como e provincia",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  showroom: {
    address: "Viale Varese 53, angolo via Borsieri",
    streetAddress: "Viale Varese 53",
    city: "Como",
    cap: "22100",
    mapsUrl:
      "https://www.google.com/maps?q=Viale+Varese+53,+22100+Como&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Viale+Varese+53+22100+Como",
    hours: "Lun – Ven 8.30 – 12.30 / 13.30 – 18.00 · Sab su appuntamento",
  },
  social: {
    facebook: "https://www.facebook.com/NotoG.Srl/",
    instagram: "https://www.instagram.com/notog_costruzioni/",
  },
  base: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const ORGANIZATION_ID = `${SITE.base}/#azienda`;
export const WEBSITE_ID = `${SITE.base}/#sito`;

export function waLink(message: string) {
  return SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
    : SITE.phoneHref;
}
