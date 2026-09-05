"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5"
    >
      <LogOut size={15} /> Esci
    </button>
  );
}
