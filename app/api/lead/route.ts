import { NextResponse } from "next/server";
import { addLead, newId } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { Lead } from "@/lib/types";

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const limit = rateLimit(`lead:${clientIp(req)}`, MAX_PER_WINDOW, WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Hai già inviato diverse richieste. Riprova più tardi o chiamaci." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  // Honeypot: only a bot fills these, so accept the request and drop it.
  if (text(body.website, 200) || text(body.url, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 120);
  const message = text(body.message, 4000);
  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "Controlla nome, email e messaggio." }, { status: 400 });
  }

  const lead: Lead = {
    id: newId(),
    name,
    email,
    phone: text(body.phone, 30) || undefined,
    type: body.type === "appuntamento" || body.type === "immobile" ? body.type : "contatto",
    date: text(body.date, 20) || undefined,
    propertyRef: text(body.propertyRef, 30) || undefined,
    message,
    createdAt: new Date().toISOString(),
  };

  const [stored, notified] = await Promise.all([addLead(lead), notifyNewLead(lead)]);

  // Neither the inbox nor the mailbox has the message: say so rather than
  // showing a success screen for a request that was lost.
  if (!stored && !notified) {
    return NextResponse.json(
      { ok: false, error: "Non siamo riusciti a registrare la richiesta." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, id: lead.id, stored, notified });
}
