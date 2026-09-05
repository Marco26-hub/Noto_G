import { getLeads } from "@/lib/db";
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton";
import { CalendarClock, Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = getLeads();
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-white">Richieste ricevute</h1>
      <p className="mt-1 text-sm text-slate-500">{leads.length} messaggi dal sito.</p>

      <div className="mt-8 space-y-4">
        {leads.map((l) => (
          <div key={l.id} className="rounded-2xl border border-line bg-panel/60 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{l.name}</p>
                <p className="text-xs text-slate-500">
                  {new Date(l.createdAt).toLocaleString("it-IT")} · {l.type}
                  {l.propertyRef ? ` · rif. ${l.propertyRef}` : ""}
                </p>
              </div>
              <DeleteLeadButton id={l.id} />
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-slate-300">{l.message}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
              <a href={`mailto:${l.email}`} className="flex items-center gap-1 hover:text-white">
                <Mail size={13} /> {l.email}
              </a>
              {l.phone && (
                <a href={`tel:${l.phone}`} className="flex items-center gap-1 hover:text-white">
                  <Phone size={13} /> {l.phone}
                </a>
              )}
              {l.date && (
                <span className="flex items-center gap-1">
                  <CalendarClock size={13} /> {l.date}
                </span>
              )}
            </div>
          </div>
        ))}
        {!leads.length && (
          <p className="rounded-2xl border border-line bg-panel/40 px-6 py-12 text-center text-slate-500">
            Nessuna richiesta per ora. Le richieste del form contatti appariranno qui.
          </p>
        )}
      </div>
    </div>
  );
}
