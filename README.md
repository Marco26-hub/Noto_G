# Noto G. — Sito ufficiale

Sito moderno per **Noto G. S.r.l.** (costruzioni e ristrutturazioni, Como) con:

- **Vendita**: annunci immobili con foto, filtri (città, tipologia, prezzo, superficie, classe energetica), pagina dettaglio con galleria, mappa e modulo richiesta informazioni
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

## Variabili ambiente

Tutte documentate in `.env.example`.

| Variabile | Obbligatoria | A cosa serve |
|---|---|---|
| `ADMIN_PASSWORD` | **sì in produzione** | Password di `/admin` |
| `ADMIN_SECRET` | **sì in produzione** | Firma della sessione admin, deriva `FEED_KEY` |
| `NEXT_PUBLIC_SITE_URL` | consigliata | URL pubblico per SEO, feed, sitemap, llms.txt |
| `NEXT_PUBLIC_WHATSAPP` | consigliata | Numero dei pulsanti WhatsApp |
| `DATABASE_URL` | **sì in serverless** | Postgres/Neon per immobili e richieste |
| `BLOB_READ_WRITE_TOKEN` | sì per l'upload foto | Vercel Blob |
| `FEED_KEY` | no | Chiave feed esplicita (default: derivata da `ADMIN_SECRET`) |
| `RESEND_API_KEY`, `LEAD_NOTIFY_FROM`, `LEAD_NOTIFY_TO` | no | Notifica email a ogni richiesta ricevuta |

> **Senza `ADMIN_PASSWORD` e `ADMIN_SECRET` il pannello admin resta chiuso in produzione**: i valori di sviluppo sono pubblici in questo repository, quindi non vengono usati come fallback quando `NODE_ENV=production`. Il login risponde `503` finché non sono impostate.

## Admin

- URL: `/admin` (login su `/login`)
- Il login è limitato a 8 tentativi ogni 10 minuti per IP
- Dati in Postgres se `DATABASE_URL` è impostata, altrimenti in `data/properties.json` e `data/leads.json`
- Foto su Vercel Blob se `BLOB_READ_WRITE_TOKEN` è impostato

## Archiviazione e deploy

Il progetto funziona in due modalità:

1. **Con `DATABASE_URL`** (consigliata, incluso Vercel): immobili e richieste su Postgres/Neon, foto su Vercel Blob. Lo schema viene creato al primo avvio e `data/properties.json` viene usato come seed iniziale.
2. **Senza `DATABASE_URL`** (solo VPS/Node con disco scrivibile): tutto su file in `data/` e `public/uploads/`.

> Su hosting serverless il filesystem è di sola lettura. Senza `DATABASE_URL` le richieste dal form **non** vengono salvate: in quel caso l'API risponde `503` e il modulo mostra telefono e WhatsApp come alternativa, invece di fingere un invio riuscito. Configura `DATABASE_URL` oppure le variabili `RESEND_*` per non perdere contatti.

## Feed portali

Dopo il login, vai su **Admin → Feed portali**. Trovi:

| Portale | URL | Formato |
|---|---|---|
| Immobiliare.it | `/api/feed/immobiliare?key=…` | CSV |
| Idealista | `/api/feed/idealista?key=…` | XML |
| Backup | `/api/feed/json?key=…` | JSON |

La chiave è `FEED_KEY` in `.env.local` (se assente, derivata da `ADMIN_SECRET`).

## Cache

Le pagine pubbliche (`/`, `/vendita`, `/vendita/[id]`, `sitemap.xml`) sono prerenderizzate e rigenerate ogni 10 minuti. Ogni salvataggio o eliminazione dall'admin le invalida subito (`lib/revalidate.ts`), quindi le modifiche compaiono online senza attendere l'intervallo.
