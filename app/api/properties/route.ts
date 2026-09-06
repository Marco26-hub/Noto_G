import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProperties, upsertProperty, newId, StorageError } from "@/lib/db";
import { buildProperty } from "@/lib/property-input";
import { revalidateListings } from "@/lib/revalidate";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json(await getProperties());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body.title !== "string" || !body.title.trim() || !Number(body.price)) {
    return NextResponse.json({ ok: false, error: "Titolo e prezzo sono obbligatori." }, { status: 400 });
  }
  const property = buildProperty(body, { id: newId(), createdAt: new Date().toISOString() });
  try {
    await upsertProperty(property);
  } catch (error) {
    return storageFailure(error);
  }
  revalidateListings(property.id);
  return NextResponse.json(property, { status: 201 });
}

function storageFailure(error: unknown) {
  if (error instanceof StorageError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
  }
  throw error;
}
