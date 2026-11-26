import type { ReactNode } from "react";
import { ArrowIcon } from "@/lib/icons";
import Link from "next/link";

/** Inner-page hero: eyebrow, H1 and lead paragraph. */
export function PageHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="page-head">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h2 max-w-[820px]">{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

/** Eyebrow + H2 row with an optional link on the right. */
export function SecHead({ eyebrow, children, link }: { eyebrow: string; children: ReactNode; link?: { href: string; label: string; external?: boolean; icon?: ReactNode } }) {
  return (
    <div className="sec-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{children}</h2>
      </div>
      {link &&
        (link.external ? (
          <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} {link.icon ?? <ArrowIcon />}
          </a>
        ) : (
          <Link className="text-link" href={link.href}>
            {link.label} {link.icon ?? <ArrowIcon />}
          </Link>
        ))}
    </div>
  );
}
