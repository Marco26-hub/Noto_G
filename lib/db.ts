import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Lead, Property } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PROPERTIES_FILE = path.join(DATA_DIR, "properties.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

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

export function newId() {
  return crypto.randomBytes(6).toString("hex");
}

export function getProperties(): Property[] {
  return readJson<Property[]>(PROPERTIES_FILE, []);
}

export function getPublicProperties(): Property[] {
  return getProperties()
    .filter((p) => p.status !== "venduto")
    .sort((a, b) => (a.featured === b.featured ? b.createdAt.localeCompare(a.createdAt) : a.featured ? 1 : -1));
}

export function getProperty(id: string): Property | undefined {
  return getProperties().find((p) => p.id === id);
}

export function saveProperties(list: Property[]) {
  writeJson(PROPERTIES_FILE, list);
}

export function upsertProperty(prop: Property): Property {
  const list = getProperties();
  const idx = list.findIndex((p) => p.id === prop.id);
  if (idx >= 0) list[idx] = prop;
  else list.unshift(prop);
  saveProperties(list);
  return prop;
}

export function deleteProperty(id: string): boolean {
  const list = getProperties();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  const prop = list.find((p) => p.id === id);
  saveProperties(next);
  for (const img of prop?.images ?? []) {
    if (img.startsWith("/uploads/")) {
      const file = path.join(process.cwd(), "public", img);
      try {
        fs.rmSync(file);
      } catch {
        /* ignore */
      }
    }
  }
  return true;
}

export function getLeads(): Lead[] {
  return readJson<Lead[]>(LEADS_FILE, []);
}

export function addLead(lead: Lead) {
  const list = getLeads();
  list.unshift(lead);
  writeJson(LEADS_FILE, list);
}

export function deleteLead(id: string) {
  writeJson(
    LEADS_FILE,
    getLeads().filter((l) => l.id !== id)
  );
}
