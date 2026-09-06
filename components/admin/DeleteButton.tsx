"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function del() {
    if (!confirm("Eliminare questo immobile? Le foto caricate verranno rimosse.")) return;
    setBusy(true);
    setError("");
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error || "Eliminazione non riuscita.");
    } else {
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={del}
        disabled={busy}
        className="rounded-lg border border-line p-2 text-accent-red hover:bg-accent-red/10 disabled:opacity-50"
        aria-label="Elimina"
      >
        <Trash2 size={15} />
      </button>
      {error && <span className="max-w-48 text-right text-xs text-accent-red" role="alert">{error}</span>}
    </div>
  );
}
