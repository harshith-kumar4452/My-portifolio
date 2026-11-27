import { contactMessages } from "@/lib/mongodb";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit: 5 messages per IP per hour.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const bad = (error: string, status = 400) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't retry.
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100) return bad("Please enter your name (2–100 characters).");
  if (!EMAIL_RE.test(email) || email.length > 200) return bad("Please enter a valid email address.");
  if (message.length < 10 || message.length > 5000) return bad("Your message should be 10–5000 characters.");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return bad("Too many messages. Please try again later.", 429);

  try {
    const col = await contactMessages();
    await col.insertOne({ name, email, message, createdAt: new Date(), userAgent: request.headers.get("user-agent") });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact: failed to save message", err instanceof Error ? err.message : err);
    return bad("Couldn't save your message right now.", 500);
  }
}
