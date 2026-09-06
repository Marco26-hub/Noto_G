"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, Trash2, Upload } from "lucide-react";
import type { Property } from "@/lib/types";
import { ENERGY_CLASSES } from "@/lib/format";
import { upload } from "@vercel/blob/client";

const TYPES = ["Appartamento", "Attico", "Loft", "Bilocale", "Trilocale", "Quadrilocale", "Villa", "Villetta a schiera", "Casa indipendente", "Rustico", "Box/Garage", "Ufficio", "Negozio", "Terreno"];
const CONDITIONS = ["Nuova costruzione", "Ristrutturata", "Da ristrutturare", "Buone condizioni"];

export function PropertyForm({ initial }: { initial?: Property }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Property>>(
    initial ?? {
      title: "",
      description: "",
      propertyType: "Appartamento",
      price: 0,
      city: "Como",
      address: "",
      zip: "22100",
      province: "CO",
      rooms: 2,
      bathrooms: 1,
      area: 0,
      energyClass: "C",
      status: "disponibile",
      featured: false,
      newConstruction: false,
      elevator: false,
      amenities: [],
      images: [],
    }
  );
  const [amenitiesText, setAmenitiesText] = useState(initial?.amenities.join(", ") ?? "");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof Property>(key: K, value: Property[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const blobs = await Promise.all(
        Array.from(files).map((file) =>
          upload(`properties/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/upload",
            multipart: file.size > 4 * 1024 * 1024,
          })
        )
      );
      setForm((current) => ({
        ...current,
        images: [...(current.images ?? []), ...blobs.map((blob) => blob.url)],
      }));
    } catch {
      setError("Upload fallito. Usa JPG, PNG, WebP o AVIF fino a 10 MB.");
    } finally {
      setUploading(false);
    }
  }

  function moveImage(i: number, dir: -1 | 1) {
    const imgs = [...(form.images ?? [])];
    const j = i + dir;
    if (j < 0 || j >= imgs.length) return;
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    set("images", imgs);
  }

  function removeImage(i: number) {
    const imgs = [...(form.images ?? [])];
    imgs.splice(i, 1);
    set("images", imgs);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const payload = {
      ...form,
      amenities: amenitiesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: Number(form.price || 0),
      area: Number(form.area || 0),
      rooms: Number(form.rooms || 0),
      bathrooms: Number(form.bathrooms || 0),
      latitude: form.latitude ? Number(form.latitude) : undefined,
      longitude: form.longitude ? Number(form.longitude) : undefined,
    };
    const res = await fetch(initial ? `/api/properties/${initial.id}` : "/api/properties", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error || "Salvataggio non riuscito. Controlla i campi.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const input = "w-full rounded-xl border border-line bg-night px-4 py-2.5 text-sm text-white placeholder-slate-600";
  const label = "mb-1 block text-xs font-medium text-slate-400";

  return (
    <form onSubmit={save} className="space-y-8">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft size={15} /> Indietro
        </button>
        <button disabled={busy} className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:brightness-110 disabled:opacity-50">
          {busy ? "Salvataggio…" : initial ? "Salva modifiche" : "Pubblica immobile"}
        </button>
      </div>
      {error && <p className="rounded-xl bg-accent-red/10 px-4 py-3 text-sm text-accent-red">{error}</p>}

      <section className="rounded-2xl border border-line bg-panel/60 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Dati principali</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Titolo annuncio *</label>
            <input className={input} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Descrizione</label>
            <textarea className={input} rows={5} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div>
            <label className={label}>Riferimento</label>
            <input className={input} value={form.reference ?? ""} onChange={(e) => set("reference", e.target.value)} placeholder="es. NG-2026-05" />
          </div>
          <div>
            <label className={label}>Tipologia</label>
            <select className={input} value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Prezzo (€) *</label>
            <input type="number" className={input} value={form.price ?? 0} onChange={(e) => set("price", Number(e.target.value))} required />
          </div>
          <div>
            <label className={label}>Spese condominio (€/mese)</label>
            <input type="number" className={input} value={form.expenses ?? ""} onChange={(e) => set("expenses", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className={label}>Stato</label>
            <select className={input} value={form.status} onChange={(e) => set("status", e.target.value as Property["status"])}>
              <option value="disponibile">Disponibile</option>
              <option value="riservato">Riservato</option>
              <option value="venduto">Venduto</option>
            </select>
          </div>
          <div className="flex items-end gap-6 pb-2">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-brand" />
              In evidenza
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={!!form.newConstruction} onChange={(e) => set("newConstruction", e.target.checked)} className="h-4 w-4 accent-brand" />
              Nuova costruzione
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={!!form.elevator} onChange={(e) => set("elevator", e.target.checked)} className="h-4 w-4 accent-brand" />
              Ascensore
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-panel/60 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Posizione</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Città</label>
            <input className={input} value={form.city ?? ""} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div>
            <label className={label}>Provincia</label>
            <input className={input} value={form.province ?? ""} onChange={(e) => set("province", e.target.value)} />
          </div>
          <div>
            <label className={label}>Indirizzo</label>
            <input className={input} value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} />
          </div>
          <div>
            <label className={label}>CAP</label>
            <input className={input} value={form.zip ?? ""} onChange={(e) => set("zip", e.target.value)} />
          </div>
          <div>
            <label className={label}>Latitudine (opzionale)</label>
            <input className={input} value={form.latitude ?? ""} onChange={(e) => set("latitude", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className={label}>Longitudine (opzionale)</label>
            <input className={input} value={form.longitude ?? ""} onChange={(e) => set("longitude", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-panel/60 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Caratteristiche tecniche</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-4">
          <div>
            <label className={label}>Locali</label>
            <input type="number" className={input} value={form.rooms ?? 0} onChange={(e) => set("rooms", Number(e.target.value))} />
          </div>
          <div>
            <label className={label}>Bagni</label>
            <input type="number" className={input} value={form.bathrooms ?? 0} onChange={(e) => set("bathrooms", Number(e.target.value))} />
          </div>
          <div>
            <label className={label}>Superficie (m²)</label>
            <input type="number" className={input} value={form.area ?? 0} onChange={(e) => set("area", Number(e.target.value))} />
          </div>
          <div>
            <label className={label}>Piano</label>
            <input className={input} value={form.floor ?? ""} onChange={(e) => set("floor", e.target.value)} />
          </div>
          <div>
            <label className={label}>Piani totali</label>
            <input type="number" className={input} value={form.totalFloors ?? ""} onChange={(e) => set("totalFloors", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className={label}>Anno costruzione</label>
            <input type="number" className={input} value={form.yearBuilt ?? ""} onChange={(e) => set("yearBuilt", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className={label}>Classe energetica</label>
            <select className={input} value={form.energyClass} onChange={(e) => set("energyClass", e.target.value)}>
              {ENERGY_CLASSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>IPE (kWh/m²a)</label>
            <input type="number" className={input} value={form.epgValue ?? ""} onChange={(e) => set("epgValue", e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className={label}>Riscaldamento</label>
            <input className={input} value={form.heating ?? ""} onChange={(e) => set("heating", e.target.value)} />
          </div>
          <div>
            <label className={label}>Condizioni</label>
            <select className={input} value={form.condition ?? ""} onChange={(e) => set("condition", e.target.value)}>
              <option value="">—</option>
              {CONDITIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Caratteristiche (separate da virgola)</label>
            <input className={input} value={amenitiesText} onChange={(e) => setAmenitiesText(e.target.value)} placeholder="Terrazzo, Giardino, Box doppio…" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-panel/60 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Foto</h2>
        <p className="text-xs text-slate-500">La prima foto diventa la copertina dell&apos;annuncio.</p>
        <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line px-4 py-8 text-sm text-slate-400 hover:border-brand hover:text-brand-soft">
          <Upload size={18} /> {uploading ? "Caricamento…" : "Carica foto (JPG, PNG, WebP — max 10 MB)"}
          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => uploadFiles(e.target.files)} disabled={uploading} />
        </label>
        {!!form.images?.length && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {form.images.map((img, i) => (
              <div key={img + i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <Image src={img} alt="" fill className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                    <Star size={10} /> Copertina
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-night/70 p-1 opacity-0 transition group-hover:opacity-100">
                  <button type="button" onClick={() => moveImage(i, -1)} className="rounded bg-panel p-1 text-white" aria-label="Sposta a sinistra">
                    <ArrowLeft size={13} />
                  </button>
                  <button type="button" onClick={() => removeImage(i)} className="rounded bg-accent-red p-1 text-white" aria-label="Rimuovi">
                    <Trash2 size={13} />
                  </button>
                  <button type="button" onClick={() => moveImage(i, 1)} className="rounded bg-panel p-1 text-white" aria-label="Sposta a destra">
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </form>
  );
}
