import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Placeholder values used only in local development. They are published in
// .env.example and in the README, so in production the panel stays locked
// until ADMIN_PASSWORD and ADMIN_SECRET are provided by the environment.
const DEV_SECRET = "noto-g-secret-change-me";
const DEV_PASSWORD = "notog2026";

export const COOKIE_NAME = "notog_admin";

/** False when a production deploy is missing the admin credentials. */
export function adminConfigured() {
  return !IS_PRODUCTION || Boolean(process.env.ADMIN_SECRET && process.env.ADMIN_PASSWORD);
}

function secret() {
  return process.env.ADMIN_SECRET || DEV_SECRET;
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || DEV_PASSWORD;
}

function equals(candidate: string, expected: string) {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function sessionToken() {
  return crypto
    .createHmac("sha256", secret())
    .update("notog-admin-session:" + adminPassword())
    .digest("hex");
}

export function passwordMatches(candidate: string) {
  if (!adminConfigured()) return false;
  return equals(candidate, adminPassword());
}

export async function isAuthenticated() {
  if (!adminConfigured()) return false;
  try {
    const store = await cookies();
    const value = store.get(COOKIE_NAME)?.value;
    return Boolean(value) && equals(value!, sessionToken());
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/login");
}

export function feedKey() {
  return (
    process.env.FEED_KEY ||
    crypto.createHash("sha256").update(secret() + ":feed").digest("hex").slice(0, 24)
  );
}

export function hasValidFeedKey(value: string | null) {
  if (!value || !adminConfigured()) return false;
  return equals(value, feedKey());
}
