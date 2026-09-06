"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { waLink } from "@/lib/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/vendita", label: "Vendita" },
  { href: "/ristrutturazioni", label: "Ristrutturazioni" },
  { href: "/showroom", label: "Showroom" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isOverDarkHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${isOverDarkHero ? "nav-over-dark" : "glass"}`}>
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="brand-logo-window" aria-label="Noto G. - Home">
          <Image src="/brand/logo.png" alt="Noto G." fill sizes="(max-width: 639px) 172px, 210px" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`nav-link rounded-md px-3 py-2 text-sm font-semibold transition-colors ${pathname === item.href ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={waLink(`Ciao Noto G! Vorrei prenotare un appuntamento in showroom a Como.`)}
            target="_blank"
            rel="noopener"
            className="button-primary min-h-10 px-4 py-2"
          >
            Prenota <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="rounded-md border border-line/70 bg-night/70 p-2 text-slate-200"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                className="button-primary w-full"
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
