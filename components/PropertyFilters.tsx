"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/PropertyCard";
import { formatPrice } from "@/lib/format";

const STEP = 10000;
const ECO_CLASSES = ["A4", "A3", "A2", "A1"];

/** Slider bounds follow the catalogue, so no listing can fall outside the range. */
function priceBounds(properties: Property[]) {
  const prices = properties.map((p) => p.price).filter((price) => Number.isFinite(price) && price > 0);
  if (!prices.length) return { min: 0, max: 0 };
  const min = Math.floor(Math.min(...prices) / STEP) * STEP;
  const max = Math.ceil(Math.max(...prices) / STEP) * STEP;
  return { min: Math.max(0, min), max: Math.max(max, min + STEP) };
}

export function PropertyFilters({ properties }: { properties: Property[] }) {
  const cities = Array.from(new Set(properties.map((p) => p.city)));
  const types = Array.from(new Set(properties.map((p) => p.propertyType)));
  const bounds = useMemo(() => priceBounds(properties), [properties]);

  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [minArea, setMinArea] = useState(0);
  const [maxP, setMaxP] = useState(bounds.max);
  const [ecoOnly, setEcoOnly] = useState(false);
  const [knownMax, setKnownMax] = useState(bounds.max);

  // Keep the cap pinned to the top of the range when the catalogue changes,
  // otherwise a newly published listing would sit above the current filter.
  if (knownMax !== bounds.max) {
    setKnownMax(bounds.max);
    setMaxP(bounds.max);
  }

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          (!city || p.city === city) &&
          (!type || p.propertyType === type) &&
          p.area >= minArea &&
          (bounds.max === 0 || p.price <= maxP) &&
          (!ecoOnly || ECO_CLASSES.includes(p.energyClass))
      ),
    [properties, city, type, minArea, maxP, ecoOnly, bounds.max]
  );

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-4 border-y border-line/70 bg-night/90 px-4 py-4 shadow-xl shadow-black/15 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <select aria-label="Filtra per città" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-md border border-line bg-panel px-3 py-2.5 text-sm text-slate-200">
            <option value="">Tutte le città</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select aria-label="Filtra per tipologia" value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-line bg-panel px-3 py-2.5 text-sm text-slate-200">
            <option value="">Tutte le tipologie</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={minArea}
            onChange={(e) => setMinArea(Number(e.target.value))}
            aria-label="Filtra per superficie minima"
            className="rounded-md border border-line bg-panel px-3 py-2.5 text-sm text-slate-200"
          >
            <option value={0}>Superficie min.</option>
            <option value={60}>≥ 60 m²</option>
            <option value={90}>≥ 90 m²</option>
            <option value={120}>≥ 120 m²</option>
            <option value={150}>≥ 150 m²</option>
          </select>
          {bounds.max > 0 && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Fino a</span>
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                step={STEP}
                value={maxP}
                onChange={(e) => setMaxP(Number(e.target.value))}
                className="w-36 accent-brand"
                aria-label="Prezzo massimo"
              />
              <span className="w-24 font-semibold text-white">{formatPrice(maxP)}</span>
            </div>
          )}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={ecoOnly} onChange={(e) => setEcoOnly(e.target.checked)} className="h-4 w-4 accent-accent-green" />
            Classe energetica A
          </label>
          <span className="text-sm text-slate-500" role="status">{filtered.length} risultati</span>
        </div>
      </div>

      {filtered.length ? (
        <div className="mx-auto mt-8 grid max-w-7xl gap-6 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl py-16 text-center text-slate-500">
          Nessun immobile corrisponde ai filtri. Modifica i criteri o contattaci: ne arrivano sempre di nuovi.
        </div>
      )}
    </div>
  );
}
