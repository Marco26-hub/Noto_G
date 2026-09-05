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
      <div className="rounded-2xl border border-accent-green/40 bg-accent-green/10 p-6 text-accent-green">
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
          <label className="mb-1 block text-xs text-slate-400">Nome e cognome *</label>
          <input name="name" required className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Mario Rossi" defaultValue={propertyRef ? `Richiesta rif. ${propertyRef}` : undefined} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Email *</label>
          <input type="email" name="email" required className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="mario@esempio.it" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs text-slate-400">Telefono</label>
        <input name="phone" className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="+39 ..." />
      </div>
      <div>
        <label className="mb-1 block text-xs text-slate-400">Tipo di richiesta</label>
        <select name="type" className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm">
          <option value="contatto">Richiesta generale</option>
          <option value="appuntamento">Prenota appuntamento</option>
          <option value="immobile">Info su un immobile</option>
        </select>
      </div>
      {(propertyRef || new Date().getDate() >= 1) && (
        <div>
          <label className="mb-1 block text-xs text-slate-400">Data preferita (appuntamento)</label>
          <input type="date" name="date" className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm" />
        </div>
      )}
      <div>
        <label className="mb-1 block text-xs text-slate-400">Messaggio *</label>
        <textarea name="message" required rows={5} className="w-full rounded-xl border border-line bg-panel/80 px-4 py-3 text-sm placeholder-slate-500" placeholder="Scrivi il tuo messaggio..." />
      </div>
      {err && <p className="text-sm text-accent-red">{err}</p>}
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110">
        <Send size={16} /> Invia messaggio
      </button>
      <p className="text-xs text-slate-500">Inviando il messaggio accetti di essere ricontattato/a da Noto G.</p>
    </form>
  );
}
