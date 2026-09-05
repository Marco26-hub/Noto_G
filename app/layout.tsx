import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.base),
  title: {
    default: "Noto G. — Costruzioni e Ristrutturazioni a Como",
    template: "%s | Noto G. Como",
  },
  description:
    "Impresa di costruzioni e ristrutturazioni a Como dal 1990. Immobili in vendita, ristrutturazioni chiavi in mano e showroom a Como.",
  keywords: [
    "noto g", "notog", "impresa edile como", "costruzioni como",
    "ristrutturazioni como", "appartamenti in vendita como",
    "showroom como", "ristrutturazione chiavi in mano",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE.name,
    images: [{ url: "/brand/logo.png" }],
  },
  alternates: { canonical: "/" },
  other: { "geo.region": "IT-CO", "geo.placename": "Como" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "ConstructionCompany",
  name: SITE.name,
  alternateName: "Noto G Costruzioni",
  url: SITE.base,
  logo: `${SITE.base}/brand/logo.png`,
  foundingDate: "1990",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.showroom.address,
    postalCode: SITE.showroom.cap,
    addressLocality: SITE.showroom.city,
    addressCountry: "IT",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "sales",
      areaServed: "IT",
      availableLanguage: ["it"],
    },
  ],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="min-h-full bg-night text-slate-100 antialiased">
        <JsonLd data={orgLd} />
        <ScrollProgress />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
