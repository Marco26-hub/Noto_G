import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteProperty, getProperty, upsertProperty, StorageError } from "@/lib/db";
import { buildProperty } from "@/lib/property-input";
import { revalidateListings } from "@/lib/revalidate";

export async function GET(_req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  // Admin-only: the payload includes listings the public site hides (venduto).
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const property = await getProperty(id);
  if (!property) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json(property);
}

export async function PUT(req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const existing = await getProperty(id);
  if (!existing) return NextResponse.json({ ok: false }, { status: 404 });
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const updated = buildProperty(body, { id, createdAt: existing.createdAt }, existing);
  if (!updated.title || !updated.price) {
    return NextResponse.json({ ok: false, error: "Titolo e prezzo sono obbligatori." }, { status: 400 });
  }
  try {
    await upsertProperty(updated);
  } catch (error) {
    return storageFailure(error);
  }
  revalidateListings(id);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/properties/[id]">) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  let ok: boolean;
  try {
    ok = await deleteProperty(id);
  } catch (error) {
    return storageFailure(error);
  }
  if (ok) revalidateListings(id);
  return NextResponse.json({ ok });
}

function storageFailure(error: unknown) {
  if (error instanceof StorageError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
  }
  throw error;
}
