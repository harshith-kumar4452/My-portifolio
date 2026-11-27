import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.map((n) => ({ url: n.href === "/" ? `${SITE_URL}/` : `${SITE_URL}${n.href}` }));
}
