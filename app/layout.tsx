import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_ID, SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.base),
  title: {
    default: "Noto G. — Costruzioni e Ristrutturazioni a Como",
    template: "%s | Noto G. Como",
  },
  description:
    "Impresa edile a Como dal 1990. Costruzioni, ristrutturazioni chiavi in mano, manutenzioni, showroom e immobili in vendita.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE.name,
    title: "Noto G. — Costruzioni e ristrutturazioni a Como",
    description:
      "Impresa edile familiare a Como dal 1990: costruzioni, ristrutturazioni chiavi in mano e immobili in vendita.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noto G. — Costruzioni e ristrutturazioni a Como",
    description: "Impresa edile familiare a Como dal 1990.",
  },
  alternates: { canonical: "/" },
  other: { "geo.region": "IT-CO", "geo.placename": "Como" },
};

export const viewport: Viewport = {
  themeColor: "#08090d",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  alternateName: "Noto G Costruzioni",
  legalName: SITE.name,
  description: SITE.description,
  url: SITE.base,
  logo: `${SITE.base}/brand/logo.png`,
  image: `${SITE.base}/works/drone.jpg`,
  foundingDate: "1990",
  founder: { "@type": "Person", name: "Giacomo Noto" },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 40 },
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.showroom.streetAddress,
    postalCode: SITE.showroom.cap,
    addressLocality: SITE.showroom.city,
    addressRegion: "CO",
    addressCountry: "IT",
  },
  areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:30",
      closes: "18:00",
    },
  ],
  knowsAbout: [
    "Costruzioni civili e industriali",
    "Ristrutturazioni chiavi in mano",
    "Manutenzioni edili",
    "Riqualificazione energetica",
    "Finiture per interni",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      areaServed: SITE.areaServed,
      availableLanguage: ["Italian"],
    },
  ],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${display.variable} h-full`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{let t;try{t=sessionStorage.getItem('noto-theme')}catch{}const h=new Date().getHours();document.documentElement.dataset.theme=t==='day'||t==='night'?t:(h>=7&&h<19?'day':'night')})()",
          }}
        />
      </head>
      <body className="min-h-full bg-night text-slate-100 antialiased">
        <JsonLd data={orgLd} />
        <ScrollProgress />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
