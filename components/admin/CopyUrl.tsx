"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyUrl({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-night px-4 py-2.5 text-left text-xs text-slate-400 hover:border-brand/60"
    >
      <span className="truncate">{url}</span>
      {done ? <Check size={15} className="text-accent-green" /> : <Copy size={15} />}
    </button>
  );
}
