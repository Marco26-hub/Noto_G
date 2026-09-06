"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteLeadButton({ id }: { id: string }) {
  const router = useRouter();
  async function del() {
    if (!confirm("Eliminare questa richiesta?")) return;
    await fetch(`/api/lead/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button onClick={del} className="rounded-lg border border-line p-2 text-slate-400 hover:bg-accent-red/10 hover:text-accent-red" aria-label="Elimina">
      <Trash2 size={14} />
    </button>
  );
}
