import "server-only";

/**
 * Fixed-window limiter kept in process memory.
 *
 * On a serverless host the counters are per-instance, so a determined attacker
 * spread across instances still gets more attempts than the nominal limit. It
 * is enough to stop the trivial single-host brute force against the shared
 * admin password; a shared store (Redis/Neon) would be the next step.
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}
