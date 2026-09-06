import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/auth";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX = 10 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: "Storage immagini non configurato" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) return NextResponse.json({ ok: false, error: "Richiesta non valida" }, { status: 400 });

  try {
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        maximumSizeInBytes: MAX,
        addRandomSuffix: true,
      }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Blob upload failed", error);
    return NextResponse.json({ ok: false, error: "Upload non riuscito" }, { status: 500 });
  }
}
