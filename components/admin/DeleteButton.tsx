"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function del() {
    if (!confirm("Eliminare questo immobile? Le foto caricate verranno rimosse.")) return;
    setBusy(true);
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }
  return (
    <button
      onClick={del}
      disabled={busy}
      className="rounded-lg border border-line p-2 text-accent-red hover:bg-accent-red/10 disabled:opacity-50"
      aria-label="Elimina"
    >
      <Trash2 size={15} />
    </button>
  );
}
