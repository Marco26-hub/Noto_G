import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProperties, upsertProperty, newId } from "@/lib/db";
import type { Property } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json(await getProperties());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Partial<Property> | null;
  if (!body || !body.title || !body.price) {
    return NextResponse.json({ ok: false, error: "Titolo e prezzo sono obbligatori." }, { status: 400 });
  }
  const now = new Date().toISOString();
  const prop: Property = {
    id: body.id || newId(),
    reference: body.reference || `NG-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
    title: body.title,
    description: body.description || "",
    propertyType: body.propertyType || "Appartamento",
    contract: "vendita",
    price: Number(body.price),
    city: body.city || "Como",
    address: body.address || "",
    zip: body.zip || "22100",
    province: body.province || "CO",
    latitude: body.latitude ?? undefined,
    longitude: body.longitude ?? undefined,
    rooms: Number(body.rooms ?? 1),
    bathrooms: Number(body.bathrooms ?? 1),
    area: Number(body.area ?? 0),
    floor: body.floor,
    totalFloors: body.totalFloors ? Number(body.totalFloors) : undefined,
    yearBuilt: body.yearBuilt ? Number(body.yearBuilt) : undefined,
    energyClass: body.energyClass || "C",
    epgValue: body.epgValue ? Number(body.epgValue) : undefined,
    heating: body.heating,
    condition: body.condition,
    expenses: body.expenses ? Number(body.expenses) : undefined,
    status: (body.status as Property["status"]) || "disponibile",
    featured: !!body.featured,
    newConstruction: !!body.newConstruction,
    elevator: !!body.elevator,
    amenities: body.amenities || [],
    images: body.images || [],
    createdAt: now,
    updatedAt: now,
  };
  await upsertProperty(prop);
  return NextResponse.json(prop, { status: 201 });
}
