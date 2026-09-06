import { SITE } from "@/lib/site";

export const revalidate = 3600;

/**
 * Served from a route handler rather than public/ so the links are absolute and
 * follow NEXT_PUBLIC_SITE_URL, and the company facts stay in one place.
 */
export async function GET() {
  const body = `# ${SITE.name} — Costruzioni e Ristrutturazioni

> Impresa edile familiare a Como dal ${SITE.since}. Vendita immobili di nuova costruzione e ristrutturati, ristrutturazioni chiavi in mano, showroom a Como.

## Pagine principali

- [Home](${SITE.base}/) — panoramica azienda, servizi e immobili in evidenza
- [Immobili in vendita](${SITE.base}/vendita) — annunci con foto, prezzi, filtri e richiesta visita
- [Ristrutturazioni](${SITE.base}/ristrutturazioni) — servizi chiavi in mano, bonus edilizia, certificazioni
- [Showroom Como](${SITE.base}/showroom) — ${SITE.showroom.address}: finiture, cucine e prenotazioni
- [Chi siamo](${SITE.base}/chi-siamo) — storia familiare dal ${SITE.since} e certificazioni ISO 9001 / SOA OG1
- [Contatti](${SITE.base}/contatti) — telefono ${SITE.phone}, email ${SITE.email}, WhatsApp e modulo

## Dati chiave

- Fondazione: ${SITE.since} (Giacomo Noto) — S.r.l. dal 2006
- Gestione: Giuseppe, Giovanni e Giada Noto
- Team: oltre 40 professionisti specializzati
- Certificazioni: UNI EN ISO 9001, SOA OG1
- Sede/Showroom: ${SITE.showroom.address}, ${SITE.showroom.cap} ${SITE.showroom.city}
- Orari: ${SITE.showroom.hours}
- Contatti: ${SITE.phone} · ${SITE.email}
- Social: ${SITE.social.facebook} · ${SITE.social.instagram}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
