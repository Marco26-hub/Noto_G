"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/vendita", label: "Vendita" },
  { href: "/ristrutturazioni", label: "Ristrutturazioni" },
  { href: "/showroom", label: "Showroom" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "glass" : ""}`}>
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="Noto G." width={150} height={34} className="h-9 w-auto" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={waLink(`Ciao Noto G! Vorrei prenotare un appuntamento in showroom a Como.`)}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition-transform hover:scale-105"
          >
            Prenota appuntamento
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-slate-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-line/40 lg:hidden">
          <ul className="flex flex-col px-4 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 px-4">
              <a
                href={waLink(`Ciao Noto G! Vorrei prenotare un appuntamento.`)}
                target="_blank"
                rel="noopener"
                className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Prenota appuntamento
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
