import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminConfigured, passwordMatches, sessionToken, COOKIE_NAME } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  if (!adminConfigured()) {
    console.error("Login rifiutato: ADMIN_PASSWORD e ADMIN_SECRET non sono impostate.");
    return NextResponse.json(
      { ok: false, error: "Pannello non configurato: imposta ADMIN_PASSWORD e ADMIN_SECRET." },
      { status: 503 }
    );
  }

  const limit = rateLimit(`login:${clientIp(req)}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Troppi tentativi. Riprova più tardi." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !passwordMatches(password)) {
    return NextResponse.json({ ok: false, error: "Password non corretta." }, { status: 401 });
  }

  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return NextResponse.json({ ok: true });
}
