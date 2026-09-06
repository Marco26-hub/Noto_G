import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteProperty, getProperty, upsertProperty } from "@/lib/db";
import type { Property } from "@/lib/types";

export async function GET(_req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  const { id } = await ctx.params;
  const p = await getProperty(id);
  if (!p) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json(p);
}

export async function PUT(req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const existing = await getProperty(id);
  if (!existing) return NextResponse.json({ ok: false }, { status: 404 });
  const body = (await req.json().catch(() => null)) as Partial<Property> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });
  const updated: Property = {
    ...existing,
    ...body,
    id,
    price: body.price ? Number(body.price) : existing.price,
    area: body.area ? Number(body.area) : existing.area,
    rooms: body.rooms ? Number(body.rooms) : existing.rooms,
    bathrooms: body.bathrooms ? Number(body.bathrooms) : existing.bathrooms,
    updatedAt: new Date().toISOString(),
  };
  await upsertProperty(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const ok = await deleteProperty(id);
  return NextResponse.json({ ok });
}
