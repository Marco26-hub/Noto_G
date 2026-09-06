"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

type Props = { propertyRef?: string; propertyTitle?: string };

export function ContactForm({ propertyRef, propertyTitle }: Props) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const prefilledMessage = propertyRef
    ? `Buongiorno, sono interessato all'immobile rif. ${propertyRef}${propertyTitle ? ` — ${propertyTitle}` : ""}. Vorrei maggiori informazioni e prenotare una visita.`
    : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          type: String(form.get("type") || (propertyRef ? "immobile" : "contatto")),
          date: String(form.get("date") || ""),
          message: String(form.get("message") || ""),
          propertyRef,
          website: String(form.get("website") || ""),
          url: String(form.get("url") || ""),
        }),
      });
      if (res.ok) {
        setSent(true);
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setErr(body?.error || "Invio non riuscito. Riprova.");
    } catch {
      setErr("Invio non riuscito. Controlla la connessione e riprova.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-accent-green/40 bg-accent-green/10 p-6 text-accent-green" role="status">
        Messaggio inviato. Ti ricontattiamo entro ore lavorative.{" "}
        {propertyRef ? `Riferimento: ${propertyRef}.` : "Grazie!"}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-4">
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <input name="url" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-slate-400">Nome e cognome *</label>
          <input id="contact-name" name="name" autoComplete="name" required className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Mario Rossi" />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-slate-400">Email *</label>
          <input id="contact-email" type="email" name="email" autoComplete="email" required className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="mario@esempio.it" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-medium text-slate-400">Telefono</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="+39 ..." />
      </div>
      <div>
        <label htmlFor="contact-type" className="mb-1.5 block text-xs font-medium text-slate-400">Tipo di richiesta</label>
        <select id="contact-type" name="type" defaultValue={propertyRef ? "immobile" : "contatto"} className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm">
          <option value="contatto">Richiesta generale</option>
          <option value="appuntamento">Prenota appuntamento</option>
          <option value="immobile">Info su un immobile</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-date" className="mb-1.5 block text-xs font-medium text-slate-400">Data preferita (appuntamento)</label>
        <input id="contact-date" type="date" name="date" className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-slate-400">Messaggio *</label>
        <textarea id="contact-message" name="message" required rows={5} defaultValue={prefilledMessage} className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Descrivi brevemente il progetto o la richiesta..." />
      </div>
      {err && (
        <div className="space-y-2 text-sm text-accent-red" role="alert">
          <p>{err}</p>
          <p className="text-slate-400">
            Puoi contattarci direttamente al{" "}
            <a href={SITE.phoneHref} className="text-brand-soft underline">{SITE.phone}</a>{" "}
            oppure{" "}
            <a href={waLink("Ciao Noto G! Vorrei informazioni.")} target="_blank" rel="noopener noreferrer" className="text-brand-soft underline">
              su WhatsApp
            </a>.
          </p>
        </div>
      )}
      <button type="submit" disabled={busy} className="button-primary w-full disabled:opacity-60">
        <Send size={16} /> {busy ? "Invio…" : "Invia messaggio"}
      </button>
      <p className="text-xs text-slate-500">I dati saranno usati esclusivamente per ricontattarti in merito alla richiesta.</p>
    </form>
  );
}
