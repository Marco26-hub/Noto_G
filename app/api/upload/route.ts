import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { isAuthenticated } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const MAX = 10 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "FormData atteso" }, { status: 400 });
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) return NextResponse.json({ ok: false, error: "Nessun file" }, { status: 400 });

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const urls: string[] = [];
  for (const file of files) {
    if (!ALLOWED.has(file.type) || file.size > MAX) continue;
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/avif" ? "avif" : file.type === "image/gif" ? "gif" : "jpg";
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buffer);
    urls.push(`/uploads/${name}`);
  }
  return NextResponse.json({ urls });
}
