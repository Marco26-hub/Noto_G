import { ENERGY_CLASSES } from "./format";
import type { Property, PropertyStatus } from "./types";

const STATUSES: PropertyStatus[] = ["disponibile", "riservato", "venduto"];
const MAX_IMAGES = 40;
const MAX_AMENITIES = 40;

function clamp(value: string, max: number) {
  return value.trim().slice(0, max);
}

function str(value: unknown, max: number, fallback = ""): string {
  return typeof value === "string" ? clamp(value, max) : fallback;
}

function optStr(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = clamp(value, max);
  return trimmed || undefined;
}

function num(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function optNum(value: unknown): number | undefined {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Images are rendered through next/image, which only accepts the hosts listed
 * in next.config.ts. Anything else is dropped here so a malformed payload
 * cannot break the public listing pages at render time.
 */
function isAllowedImage(value: unknown): value is string {
  if (typeof value !== "string" || !value) return false;
  if (value.startsWith("/uploads/") || value.startsWith("/works/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function images(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  return value.filter(isAllowedImage).slice(0, MAX_IMAGES);
}

function amenities(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => clamp(item, 60))
    .filter(Boolean)
    .slice(0, MAX_AMENITIES);
}

function status(value: unknown, fallback: PropertyStatus): PropertyStatus {
  return STATUSES.includes(value as PropertyStatus) ? (value as PropertyStatus) : fallback;
}

function energyClass(value: unknown, fallback: string): string {
  return (ENERGY_CLASSES as readonly string[]).includes(value as string) ? (value as string) : fallback;
}

function defaultReference() {
  return `NG-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;
}

/**
 * Builds a Property from untrusted JSON. Every field is read explicitly, so a
 * request cannot inject unknown keys or overwrite server-owned ones (`id`,
 * `contract`, `createdAt`, `updatedAt`).
 *
 * `existing` supplies the current value of each field on an update; without it
 * the defaults for a brand new listing apply. Optional fields are cleared when
 * the payload sends an empty value, which is how the admin form removes them.
 */
export function buildProperty(
  body: Record<string, unknown>,
  identity: { id: string; createdAt: string },
  existing?: Property
): Property {
  const now = new Date().toISOString();
  return {
    id: identity.id,
    reference: str(body.reference, 40, existing?.reference ?? defaultReference()),
    title: str(body.title, 180, existing?.title ?? ""),
    description: str(body.description, 8000, existing?.description ?? ""),
    propertyType: str(body.propertyType, 60, existing?.propertyType ?? "Appartamento"),
    contract: "vendita",
    price: num(body.price, existing?.price ?? 0),
    city: str(body.city, 80, existing?.city ?? "Como"),
    address: str(body.address, 160, existing?.address ?? ""),
    zip: str(body.zip, 10, existing?.zip ?? "22100"),
    province: str(body.province, 10, existing?.province ?? "CO"),
    latitude: optNum(body.latitude),
    longitude: optNum(body.longitude),
    rooms: num(body.rooms, existing?.rooms ?? 1),
    bathrooms: num(body.bathrooms, existing?.bathrooms ?? 1),
    area: num(body.area, existing?.area ?? 0),
    floor: optStr(body.floor, 30),
    totalFloors: optNum(body.totalFloors),
    yearBuilt: optNum(body.yearBuilt),
    energyClass: energyClass(body.energyClass, existing?.energyClass ?? "C"),
    epgValue: optNum(body.epgValue),
    heating: optStr(body.heating, 80),
    condition: optStr(body.condition, 80),
    expenses: optNum(body.expenses),
    status: status(body.status, existing?.status ?? "disponibile"),
    featured: typeof body.featured === "boolean" ? body.featured : !!existing?.featured,
    newConstruction:
      typeof body.newConstruction === "boolean" ? body.newConstruction : !!existing?.newConstruction,
    elevator: typeof body.elevator === "boolean" ? body.elevator : !!existing?.elevator,
    amenities: amenities(body.amenities, existing?.amenities ?? []),
    images: images(body.images, existing?.images ?? []),
    createdAt: identity.createdAt,
    updatedAt: now,
  };
}
