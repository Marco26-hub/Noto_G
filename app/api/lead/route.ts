import { NextResponse } from "next/server";
import { addLead, newId } from "@/lib/db";
import type { Lead } from "@/lib/types";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<Lead> | null;
  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const lead: Lead = {
    id: newId(),
    name: body.name.slice(0, 120),
    email: body.email.slice(0, 120),
    phone: body.phone?.slice(0, 30),
    type: body.type === "appuntamento" || body.type === "immobile" ? body.type : "contatto",
    date: body.date?.slice(0, 20),
    propertyRef: body.propertyRef?.slice(0, 30),
    message: body.message.slice(0, 4000),
    createdAt: new Date().toISOString(),
  };
  addLead(lead);
  return NextResponse.json({ ok: true });
}
