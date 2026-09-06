import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { AtSign, Camera, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/70 bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="brand-logo-window">
              <Image src="/brand/logo.png" alt="Noto G." fill sizes="176px" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Costruzioni, ristrutturazioni e immobili a Como. Esperienza di cantiere dal {SITE.since}.
            </p>
            <div className="mt-4 flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="rounded-md border border-line/70 p-2 text-slate-300 transition-colors hover:border-brand-soft hover:text-white">
                <AtSign size={18} />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="rounded-md border border-line/70 p-2 text-slate-300 transition-colors hover:border-brand-soft hover:text-white">
                <Camera size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-400">Azienda</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="text-slate-300 hover:text-white" href="/vendita">Immobili in vendita</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/ristrutturazioni">Ristrutturazioni</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/showroom">Showroom Como</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/chi-siamo">Chi siamo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-400">Servizi</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Costruzioni civili e industriali</li>
              <li>Manutenzioni civili e industriali</li>
              <li>Pronto intervento</li>
              <li>Riqualificazioni energetiche</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-400">Contatti</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-soft" />
                <a href={SITE.showroom.mapsLink} target="_blank" rel="noopener" className="hover:text-white">
                  {SITE.showroom.address}, {SITE.showroom.cap} {SITE.showroom.city}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand-soft" />
                <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-brand-soft" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} Noto G. S.r.l. — Tutti i diritti riservati.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-brand-soft" />
            <span>Impresa italiana</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
