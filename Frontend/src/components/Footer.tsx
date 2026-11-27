import Link from "next/link";
import { Logo } from "./Logo";
import { NAV, SITE, telHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="muted" style={{ maxWidth: 320, margin: "14px 0 0", fontSize: 14 }}>
              Full-stack developer building intelligent, data-driven products. Based in {SITE.location}.
            </p>
          </div>
          <div className="footer-nav">
            <div>
              <h4>Pages</h4>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <ul>
                <li><a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href={SITE.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                <li><a href={SITE.resume} download>Resume (PDF)</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                {SITE.phone && <li><a href={telHref(SITE.phone)}>{SITE.phone}</a></li>}
                <li className="muted">{SITE.location}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. All rights reserved.</span>
          <a href="#top" className="text-link">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
