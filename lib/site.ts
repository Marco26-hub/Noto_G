export const SITE = {
  name: "Noto G. S.r.l.",
  tagline: "Costruzioni — Ristrutturazioni",
  since: 1990,
  phone: "031 522914",
  phoneHref: "tel:031522914",
  email: "info@notog.it",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  showroom: {
    address: "Viale Varese 53, angolo via Borsieri",
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

export function waLink(message: string) {
  return SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
    : SITE.phoneHref;
}
