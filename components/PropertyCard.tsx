import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Ruler, ArrowUpRight, Zap } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatPrice, statusLabel } from "@/lib/format";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      href={`/vendita/${p.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-line/60 bg-panel transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.images[0] || "/works/lavori2.jpg"}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${p.status === "disponibile" ? "bg-accent-green text-night" : "bg-gold text-night"}`}>
            {statusLabel(p.status)}
          </span>
          {p.newConstruction && (
            <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Nuovo
            </span>
          )}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-night/80 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
          {formatPrice(p.price)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-brand-soft">{p.propertyType} · {p.city}</p>
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-white group-hover:text-brand-soft">
              {p.title}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-soft" size={20} />
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><BedDouble size={15} /> {p.rooms}</span>
          <span className="flex items-center gap-1.5"><Bath size={15} /> {p.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Ruler size={15} /> {p.area} m²</span>
          <span className="ml-auto flex items-center gap-1 font-semibold" title={`Classe energetica ${p.energyClass}`}>
            <Zap size={14} /> {p.energyClass}
          </span>
        </div>
      </div>
    </Link>
  );
}
