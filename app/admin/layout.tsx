import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { Home, Rss, Inbox } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen bg-night">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-sm font-bold text-white">
              Noto G. <span className="text-brand-soft">Admin</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <NavLink href="/admin" icon={<Home size={15} />} label="Immobili" />
              <NavLink href="/admin/feed" icon={<Rss size={15} />} label="Feed portali" />
              <NavLink href="/admin/lead" icon={<Inbox size={15} />} label="Lead" />
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white">
      {icon} {label}
    </Link>
  );
}
