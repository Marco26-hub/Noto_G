"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const password = String(new FormData(e.currentTarget).get("password") || "");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      setError("");
      router.push("/admin");
      router.refresh();
      return;
    }
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    setError(body?.error || "Password non corretta.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-night px-4">
      <form
        onSubmit={submit}
        method="post"
        className="w-full max-w-sm rounded-2xl border border-line bg-panel p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-soft">
          <Lock size={22} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-white">Area riservata</h1>
        <p className="mt-1 text-sm text-slate-500">Accedi al pannello Noto G.</p>
        <label className="mt-6 block text-xs text-slate-400">Password</label>
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="mt-1 w-full rounded-xl border border-line bg-night px-4 py-3 text-sm text-white"
          placeholder="••••••••"
        />
        {error && <p className="mt-2 text-sm text-accent-red" role="alert">{error}</p>}
        <button
          disabled={loading}
          className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Accesso…" : "Accedi"}
        </button>
        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
        >
          <ArrowLeft size={13} /> Torna al sito
        </Link>
      </form>
    </div>
  );
}
