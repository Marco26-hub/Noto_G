import { feedKey } from "@/lib/auth";
import { getProperties } from "@/lib/db";
import { SITE } from "@/lib/site";
import { CopyUrl } from "@/components/admin/CopyUrl";
import { FileDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const key = feedKey();
  const total = (await getProperties()).filter((p) => p.status !== "venduto").length;
  const base = SITE.base;

  const feeds = [
    {
      name: "Immobiliare.it",
      desc: "CSV pronto per l'importazione multipla: prezzi, caratteristiche, foto e contatti.",
      url: `${base}/api/feed/immobiliare?key=${key}`,
      file: "immobiliare.csv",
    },
    {
      name: "Idealista",
      desc: "Feed XML nel formato Idealista con annunci, posizione e galleria foto.",
      url: `${base}/api/feed/idealista?key=${key}`,
      file: "idealista.xml",
    },
    {
      name: "Backup JSON",
      desc: "Esportazione completa di tutti gli immobili (anche venduti) in formato JSON.",
      url: `${base}/api/feed/json?key=${key}`,
      file: "immobili.json",
    },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-white">Feed per i portali</h1>
      <p className="mt-1 text-sm text-slate-500">
        {total} annunci disponibili nei feed. Incolla l&apos;URL nel back-office del portale oppure scarica il file e caricalo a mano.
      </p>

      <div className="mt-8 space-y-4">
        {feeds.map((f) => (
          <div key={f.name} className="rounded-2xl border border-line bg-panel/60 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">{f.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{f.desc}</p>
              </div>
              <a
                href={f.url}
                download={f.file}
                className="flex shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white hover:brightness-110"
              >
                <FileDown size={15} /> Scarica {f.file}
              </a>
            </div>
            <div className="mt-4">
              <CopyUrl url={f.url} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-xl border border-line/60 bg-panel/40 p-4 text-xs text-slate-500">
        Gli URL contengono la chiave segreta del feed: condividili solo con i portali. Per cambiarli,
        aggiorna la variabile <code className="text-brand-soft">FEED_KEY</code> nel file <code className="text-brand-soft">.env.local</code>.
      </p>
    </div>
  );
}
