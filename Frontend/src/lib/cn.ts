export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const store = {
  get(key: string, area: "local" | "session" = "local"): string | null {
    try {
      return (area === "local" ? localStorage : sessionStorage).getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string, area: "local" | "session" = "local") {
    try {
      (area === "local" ? localStorage : sessionStorage).setItem(key, value);
    } catch {}
  },
  remove(key: string, area: "local" | "session" = "local") {
    try {
      (area === "local" ? localStorage : sessionStorage).removeItem(key);
    } catch {}
  },
};
