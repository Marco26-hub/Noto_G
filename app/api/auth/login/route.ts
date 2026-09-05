import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { passwordMatches, sessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !passwordMatches(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
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
