import { SITE } from "@/lib/site";

export const revalidate = 3600;

/**
 * Served from a route handler rather than public/ so the links are absolute and
 * follow NEXT_PUBLIC_SITE_URL, and the company facts stay in one place.
 */
export async function GET() {
  const body = `# ${SITE.name} — Costruzioni e Ristrutturazioni

> ${SITE.description}

Noto G. è stata fondata da Giacomo Noto nel ${SITE.since}, è diventata S.r.l. nel 2006 ed è oggi guidata da Giuseppe, Giovanni e Giada Noto. Opera principalmente a Como e provincia con una squadra di oltre 40 professionisti specializzati.

## Pagine principali

- [Home](${SITE.base}/) — panoramica azienda, servizi e immobili in evidenza
- [Immobili in vendita](${SITE.base}/vendita) — annunci con foto, prezzi, filtri e richiesta visita
- [Ristrutturazioni](${SITE.base}/ristrutturazioni) — sopralluogo, progetto, pratiche, cantiere, impianti e finiture
- [Showroom Como](${SITE.base}/showroom) — ${SITE.showroom.address}: materiali, finiture e appuntamenti
- [Chi siamo](${SITE.base}/chi-siamo) — storia familiare dal ${SITE.since} e certificazioni ISO 9001 / SOA OG1
- [Contatti](${SITE.base}/contatti) — telefono ${SITE.phone}, email ${SITE.email}, WhatsApp e modulo

## Dati chiave

- Fondazione: ${SITE.since} (Giacomo Noto) — S.r.l. dal 2006
- Gestione: Giuseppe, Giovanni e Giada Noto
- Team: oltre 40 professionisti specializzati
- Certificazioni: UNI EN ISO 9001, SOA OG1
- Servizi: costruzioni civili e industriali, ristrutturazioni chiavi in mano, manutenzioni, riqualificazione energetica e coordinamento delle finiture
- Area servita: ${SITE.areaServed}
- Sede/Showroom: ${SITE.showroom.address}, ${SITE.showroom.cap} ${SITE.showroom.city}
- Orari: ${SITE.showroom.hours}
- Contatti: ${SITE.phone} · ${SITE.email}
- Social: ${SITE.social.facebook} · ${SITE.social.instagram}

## Nota sulle informazioni

Per disponibilità, prezzi e caratteristiche degli immobili fa fede la singola scheda aggiornata sul sito. Agevolazioni fiscali e requisiti tecnici dipendono dall'intervento e dalla normativa vigente.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
