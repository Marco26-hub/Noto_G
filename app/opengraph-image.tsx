import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Noto G. — Costruzioni e ristrutturazioni a Como";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const heroSrc = `data:image/jpeg;base64,${await readFile(
  join(process.cwd(), "public/works/drone.jpg"),
  "base64"
)}`;
const logoSrc = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public/brand/logo.png"),
  "base64"
)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#08090d",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={heroSrc}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "rgba(8,9,13,.34)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 870,
            display: "flex",
            background: "rgba(8,9,13,.78)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 62px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 326,
              height: 98,
              borderRadius: 8,
              background: "rgba(255,255,255,.94)",
              overflow: "hidden",
            }}
          >
            <img src={logoSrc} alt="Noto G." style={{ width: 326, height: 163, objectFit: "cover" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: "#aeb4ff",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <span style={{ display: "flex", width: 42, height: 3, background: "#4545f0" }} />
              Impresa familiare dal 1990
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 58, lineHeight: 1.04, fontWeight: 700 }}>
              Costruzioni e ristrutturazioni a Como.
            </div>
            <div style={{ display: "flex", marginTop: 22, color: "#d7dbe3", fontSize: 25 }}>
              Esperienza di cantiere. Un solo referente. Cura delle finiture.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 22,
              borderTop: "1px solid rgba(255,255,255,.24)",
              color: "#e8eaf0",
              fontSize: 20,
            }}
          >
            <span>Viale Varese 53 · Como</span>
            <span style={{ color: "#aeb4ff", fontWeight: 700 }}>notog.it</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
