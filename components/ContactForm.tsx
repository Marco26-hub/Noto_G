"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Props = { propertyRef?: string };

export function ContactForm({ propertyRef }: Props) {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      type: String(form.get("type") || "contatto"),
      date: String(form.get("date") || ""),
      message: String(form.get("message") || ""),
      propertyRef,
    };
    // honeypot
    if (String(form.get("website")) || String(form.get("url"))) {
      setSent(true);
      return;
    }
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSent(true);
      setErr("");
    } else {
      setErr(res.status === 400 ? "Completa tutti i campi obbligati." : "Invio non riuscito. Riprova.");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="url" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-slate-400">Nome e cognome *</label>
          <input id="contact-name" name="name" autoComplete="name" required className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Mario Rossi" defaultValue={propertyRef ? `Richiesta rif. ${propertyRef}` : undefined} />
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
        <select id="contact-type" name="type" className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm">
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
        <textarea id="contact-message" name="message" required rows={5} className="w-full rounded-md border border-line bg-ink/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Descrivi brevemente il progetto o la richiesta..." />
      </div>
      {err && <p className="text-sm text-accent-red" role="alert">{err}</p>}
      <button type="submit" className="button-primary w-full">
        <Send size={16} /> Invia messaggio
      </button>
      <p className="text-xs text-slate-500">I dati saranno usati esclusivamente per ricontattarti in merito alla richiesta.</p>
    </form>
  );
}
