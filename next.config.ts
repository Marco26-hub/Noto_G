import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      // Vecchie rotte WordPress / URL comuni
      { source: "/servizi", destination: "/ristrutturazioni", permanent: true },
      { source: "/ristrutturazione", destination: "/ristrutturazioni", permanent: true },
      { source: "/costruzioni", destination: "/", permanent: true },
      { source: "/showroom-como", destination: "/showroom", permanent: true },
      { source: "/showroom-como/home", destination: "/showroom", permanent: true },
      { source: "/contattaci", destination: "/contatti", permanent: true },
      { source: "/contacts", destination: "/contatti", permanent: true },
      { source: "/azienda", destination: "/chi-siamo", permanent: true },
      { source: "/immobili", destination: "/vendita", permanent: true },
      { source: "/immobili-in-vendita", destination: "/vendita", permanent: true },
      { source: "/appartamenti-in-vendita", destination: "/vendita", permanent: true },
      { source: "/feed", destination: "/api/feed/immobiliare", permanent: false },
      { source: "/comments/feed", destination: "/api/feed/xml", permanent: false },
      { source: "/xmlrpc.php", destination: "/", permanent: true },
      { source: "/wp-json", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
