import Link from "next/link";
import Image from "next/image";
import { getProperties } from "@/lib/db";
import { formatPrice, statusLabel } from "@/lib/format";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const props = getProperties();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Immobili in vendita</h1>
          <p className="text-sm text-slate-500">{props.length} annunci gestiti</p>
        </div>
        <Link
          href="/admin/immobili/nuovo"
          className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:brightness-110"
        >
          <Plus size={16} /> Nuovo immobile
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Immobile</th>
              <th className="px-4 py-3">Rif.</th>
              <th className="px-4 py-3">Città</th>
              <th className="px-4 py-3">Prezzo</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {props.map((p) => (
              <tr key={p.id} className="bg-panel/40 hover:bg-panel/70">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-ink">
                      {p.images[0] && <Image src={p.images[0]} alt="" fill className="object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-white">{p.title}</p>
                      <p className="text-xs text-slate-500">
                        {p.propertyType} · {p.area} m²
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400">{p.reference}</td>
                <td className="px-4 py-3 text-slate-400">{p.city}</td>
                <td className="px-4 py-3 font-semibold text-white">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      p.status === "disponibile"
                        ? "bg-accent-green/15 text-accent-green"
                        : p.status === "riservato"
                          ? "bg-gold/15 text-gold"
                          : "bg-accent-red/15 text-accent-red"
                    }`}
                  >
                    {statusLabel(p.status)}
                  </span>
                  {p.featured && <span className="ml-2 text-xs text-brand-soft">★ in evidenza</span>}
                </td>
                <td className="px-4 py-3 text-slate-400">{p.images.length}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/immobili/${p.id}`}
                      className="rounded-lg border border-line p-2 text-slate-300 hover:bg-white/5"
                      aria-label="Modifica"
                    >
                      <Pencil size={15} />
                    </Link>
                    <DeleteButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!props.length && (
          <p className="px-6 py-12 text-center text-slate-500">
            Nessun immobile. Clicca «Nuovo immobile» per iniziare.
          </p>
        )}
      </div>
    </div>
  );
}
