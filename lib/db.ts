import "server-only";

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { del } from "@vercel/blob";
import type { Lead, Property } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PROPERTIES_FILE = path.join(DATA_DIR, "properties.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

let sql: NeonQueryFunction<false, false> | undefined;
let schemaReady: Promise<void> | undefined;

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

function database() {
  if (!process.env.DATABASE_URL) return undefined;
  sql ??= neon(process.env.DATABASE_URL);
  return sql;
}

async function ensureSchema() {
  const db = database();
  if (!db) return;
  schemaReady ??= (async () => {
    await db`CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL
    )`;
    await db`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    )`;
    await db`CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`;

    const seeded = await db`SELECT value FROM app_meta WHERE key = 'properties_seeded'`;
    if (!seeded.length) {
      const seed = readJson<Property[]>(PROPERTIES_FILE, []);
      for (const property of seed) {
        await db`INSERT INTO properties (id, data, created_at, updated_at)
          VALUES (${property.id}, ${JSON.stringify(property)}::jsonb, ${property.createdAt}, ${property.updatedAt})
          ON CONFLICT (id) DO NOTHING`;
      }
      await db`INSERT INTO app_meta (key, value) VALUES ('properties_seeded', ${new Date().toISOString()})
        ON CONFLICT (key) DO NOTHING`;
    }
  })().catch((error) => {
    schemaReady = undefined;
    throw error;
  });
  await schemaReady;
}

async function deleteImages(images: string[]) {
  const blobs = images.filter((image) => image.startsWith("https://") && image.includes("blob.vercel-storage.com"));
  if (blobs.length && process.env.BLOB_READ_WRITE_TOKEN) {
    await del(blobs).catch(() => undefined);
  }
  if (!database()) {
    for (const image of images) {
      if (!image.startsWith("/uploads/") || image.startsWith("/uploads/demo/")) continue;
      try {
        fs.rmSync(path.join(process.cwd(), "public", image));
      } catch {
        // The image may already have been removed.
      }
    }
  }
}

export function newId() {
  return crypto.randomBytes(6).toString("hex");
}

export async function getProperties(): Promise<Property[]> {
  const db = database();
  if (!db) return readJson<Property[]>(PROPERTIES_FILE, []);
  try {
    await ensureSchema();
    const rows = await db`SELECT data FROM properties ORDER BY created_at DESC`;
    return rows.map((row) => row.data as Property);
  } catch (error) {
    console.error("Database unavailable; serving bundled property data.", error);
    return readJson<Property[]>(PROPERTIES_FILE, []);
  }
}

export async function getPublicProperties(): Promise<Property[]> {
  return (await getProperties())
    .filter((property) => property.status !== "venduto")
    .sort((a, b) => (a.featured === b.featured ? b.createdAt.localeCompare(a.createdAt) : a.featured ? -1 : 1));
}

export async function getProperty(id: string): Promise<Property | undefined> {
  return (await getProperties()).find((property) => property.id === id);
}

export async function upsertProperty(property: Property): Promise<Property> {
  const db = database();
  if (!db) {
    const list = await getProperties();
    const index = list.findIndex((item) => item.id === property.id);
    const previous = index >= 0 ? list[index] : undefined;
    if (index >= 0) list[index] = property;
    else list.unshift(property);
    writeJson(PROPERTIES_FILE, list);
    await deleteImages(previous?.images.filter((image) => !property.images.includes(image)) ?? []);
    return property;
  }

  await ensureSchema();
  const previous = await getProperty(property.id);
  await db`INSERT INTO properties (id, data, created_at, updated_at)
    VALUES (${property.id}, ${JSON.stringify(property)}::jsonb, ${property.createdAt}, ${property.updatedAt})
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`;
  await deleteImages(previous?.images.filter((image) => !property.images.includes(image)) ?? []);
  return property;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const db = database();
  const property = await getProperty(id);
  if (!property) return false;
  if (!db) {
    writeJson(PROPERTIES_FILE, (await getProperties()).filter((item) => item.id !== id));
  } else {
    await ensureSchema();
    await db`DELETE FROM properties WHERE id = ${id}`;
  }
  await deleteImages(property.images);
  return true;
}

export async function getLeads(): Promise<Lead[]> {
  const db = database();
  if (!db) return readJson<Lead[]>(LEADS_FILE, []);
  try {
    await ensureSchema();
    const rows = await db`SELECT data FROM leads ORDER BY created_at DESC`;
    return rows.map((row) => row.data as Lead);
  } catch (error) {
    console.error("Database unavailable; serving bundled lead data.", error);
    return readJson<Lead[]>(LEADS_FILE, []);
  }
}

export async function addLead(lead: Lead) {
  const db = database();
  if (!db) {
    const list = await getLeads();
    list.unshift(lead);
    writeJson(LEADS_FILE, list);
    return;
  }
  await ensureSchema();
  await db`INSERT INTO leads (id, data, created_at)
    VALUES (${lead.id}, ${JSON.stringify(lead)}::jsonb, ${lead.createdAt})`;
}

export async function deleteLead(id: string) {
  const db = database();
  if (!db) {
    writeJson(LEADS_FILE, (await getLeads()).filter((lead) => lead.id !== id));
    return;
  }
  await ensureSchema();
  await db`DELETE FROM leads WHERE id = ${id}`;
}
