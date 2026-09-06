import { NextResponse } from "next/server";
import { getProperties } from "@/lib/db";
import { hasValidFeedKey } from "@/lib/auth";
import { toImmobiliareCsv, toIdealistaXml, toMasterJson } from "@/lib/feeds";
import { SITE } from "@/lib/site";

export async function GET(req: Request, ctx: RouteContext<"/api/feed/[portal]">) {
  const { portal } = await ctx.params;
  const { searchParams } = new URL(req.url);
  if (!hasValidFeedKey(searchParams.get("key"))) {
    return NextResponse.json({ ok: false, error: "Chiave feed non valida" }, { status: 403 });
  }
  const props = await getProperties();
  const base = SITE.base;

  if (portal === "immobiliare") {
    return new NextResponse(toImmobiliareCsv(props, base), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="immobiliare.csv"`,
      },
    });
  }
  if (portal === "idealista") {
    return new NextResponse(toIdealistaXml(props, base), {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "content-disposition": `attachment; filename="idealista.xml"`,
      },
    });
  }
  if (portal === "json") {
    return new NextResponse(toMasterJson(props, base), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  return NextResponse.json({ ok: false, error: "Portale non supportato" }, { status: 404 });
}
