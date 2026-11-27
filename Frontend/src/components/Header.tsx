"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn, store } from "@/lib/cn";
import { HelpIcon, MailIcon, MoonIcon, PhoneIcon, SunIcon, DownloadIcon } from "@/lib/icons";
import { NAV, SITE, telHref } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("hk-theme", next);
  };

  const startTour = () => {
    if (pathname === "/") window.dispatchEvent(new Event("hk:tour"));
    else {
      store.set("hk-tour-request", "1", "session");
      router.push("/");
    }
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={cn("site-header", scrolled && "scrolled")} id="top">
        <nav className="container nav" aria-label="Primary">
          <Link href="/" className="logo" aria-label="Harshith Kumar — home" data-tour="logo">
            <span className="logo-mark">HK</span>
            <span className="logo-text">Harshith Kumar</span>
          </Link>
          <ul className="nav-links" data-tour="nav">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                  <span className="roll" data-t={n.label}>{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button className="icon-btn tour-btn" type="button" aria-label="Take a tour of this site" title="Take the tour" data-tour="tour" onClick={startTour}>
              <HelpIcon />
            </button>
            <button className="icon-btn theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle theme" data-tour="theme" onClick={toggleTheme}>
              <SunIcon />
              <MoonIcon />
            </button>
            <button
              className="icon-btn menu-btn"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-tour="nav-mobile"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="menu-btn-inner"><span /><span /><span /></span>
            </button>
          </div>
        </nav>
      </header>
      <div className={cn("mobile-menu", open && "open")} id="mobile-menu" aria-hidden={!open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.href} style={{ transitionDelay: `${0.04 * i + 0.05}s` }}>
              <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                {n.label}
                <span className="idx">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mm-foot">
          <a className="btn btn-primary btn-sm" href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1}><MailIcon /> Email me</a>
          {SITE.phone && <a className="btn btn-sm" href={telHref(SITE.phone)} tabIndex={open ? 0 : -1}><PhoneIcon /> Call</a>}
          <a className="btn btn-sm" href={SITE.resume} download tabIndex={open ? 0 : -1}><DownloadIcon /> Resume</a>
        </div>
      </div>
    </>
  );
}
