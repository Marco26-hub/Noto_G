import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = process.env.ADMIN_SECRET || "noto-g-secret-change-me";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "notog2026";
export const COOKIE_NAME = "notog_admin";

export function sessionToken() {
  return crypto
    .createHmac("sha256", SECRET)
    .update("notog-admin-session:" + ADMIN_PASSWORD)
    .digest("hex");
}

export function passwordMatches(candidate: string) {
  const a = Buffer.from(candidate);
  const b = Buffer.from(ADMIN_PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAuthenticated() {
  try {
    const store = await cookies();
    return store.get(COOKIE_NAME)?.value === sessionToken();
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/login");
}

export function feedKey() {
  return process.env.FEED_KEY || crypto.createHash("sha256").update(SECRET + ":feed").digest("hex").slice(0, 24);
}

export function hasValidFeedKey(value: string | null) {
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(feedKey());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
