import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Harshith Kumar" },
  description: "The page you were looking for doesn't exist. Head back to Harshith Kumar's portfolio home page.",
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container">
        <div className="nf-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <h1 className="h2 text-[clamp(24px,4vw,36px)]">This page wandered off.</h1>
        <p className="lead mx-auto">The link may be broken or the page may have moved. Let&apos;s get you back on track.</p>
        <div className="hero-cta justify-center">
          <Link className="btn btn-primary" href="/">
            Back to home <ArrowIcon />
          </Link>
          <Link className="btn" href="/projects">
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
