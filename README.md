# Noto G. — Sito ufficiale

Sito moderno per **Noto G. S.r.l.** (costruzioni e ristrutturazioni, Como) con:

- **Vendita**: annunci immobili con foto, filtri (città, tipologia, prezzo, superficie, classe energetica), pagina dettaglio con galleria e mappa
- **Admin** (`/admin`): gestione completa degli immobili (crea, modifica, elimina, carica foto), inbox delle richieste, export feed per i portali
- **Feed portali**: CSV per Immobiliare.it, XML per Idealista, JSON di backup — accessibili via URL con chiave segreta
- **Ristrutturazioni, Showroom Como, Chi siamo, Contatti** con form e pulsante WhatsApp
- **SEO/GEO/AEO**: JSON-LD (Organization, FAQPage, Residence…), sitemap.xml, robots.txt, llms.txt, redirect 301 delle vecchie pagine

## Avvio

```bash
npm install
cp .env.example .env.local   # modifica password, segreto, WhatsApp
npm run dev                  # http://localhost:3000
```

Produzione:

```bash
npm run build && npm run start
```

## Admin

- URL: `/admin` (login su `/login`)
- Password: variabile `ADMIN_PASSWORD` in `.env.local` (default di sviluppo: `notog2026` — **cambiarla**)
- Dati salvati in `data/properties.json` e `data/leads.json`; foto in `public/uploads/`

## Feed portali

Dopo il login, vai su **Admin → Feed portali**. Trovi:

| Portale | URL | Formato |
|---|---|---|
| Immobiliare.it | `/api/feed/immobiliare?key=…` | CSV |
| Idealista | `/api/feed/idealista?key=…` | XML |
| Backup | `/api/feed/json?key=…` | JSON |

La chiave è `FEED_KEY` in `.env.local` (se assente, derivata da `ADMIN_SECRET`).

## Variabili ambiente

Vedi `.env.example`: `ADMIN_PASSWORD`, `ADMIN_SECRET`, `FEED_KEY`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SITE_URL`.

## Note deploy

Consigliato un VPS/Node server (PM2/Docker): l'upload foto scrive su disco in `public/uploads/`. Su hosting serverless (Vercel) il filesystem è effimero — servirebbe uno storage esterno.
