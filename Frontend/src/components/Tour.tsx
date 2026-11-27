"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn, reducedMotion, store } from "@/lib/cn";
import { useReady } from "./Providers";

const TOUR: { sel?: string; title: string; text: string }[] = [
  { title: "Welcome 👋", text: "Hi, I'm Harshith — a full-stack developer studying Data Science. Here's a 30-second tour of my portfolio." },
  { sel: '[data-tour="nav"], [data-tour="nav-mobile"]', title: "Navigate", text: "Six pages: About, Skills, Projects, Achievements and Contact. On phones, open the menu here." },
  { sel: '[data-tour="hero-cta"]', title: "Quick actions", text: "Reach out directly or download my resume as a PDF in one click." },
  { sel: '[data-tour="stats"]', title: "At a glance", text: "Key numbers — projects built, technologies, hackathon wins and CGPA." },
  { sel: '[data-tour="work"]', title: "Selected work", text: "Featured projects with code and live demos. See the Projects page for all of them, filterable by domain." },
  { sel: '[data-tour="theme"]', title: "Light or dark", text: "Switch themes anytime — your choice is remembered." },
  { sel: '[data-tour="tour"]', title: "Replay the tour", text: "Tap this button any time to see this guide again. Enjoy looking around!" },
];

const isVisible = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
};
const findTarget = (sel?: string) => (sel ? Array.from(document.querySelectorAll(sel)).find(isVisible) ?? null : null);

export function Tour() {
  const pathname = usePathname();
  const { ready } = useReady();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const spotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const end = useCallback(() => {
    store.set("hk-tour-done", "1");
    setOpen(false);
  }, []);
  const go = useCallback(
    (dir: number) => {
      const n = i + dir;
      if (n < 0) return;
      if (n >= TOUR.length) return end();
      setI(n);
    },
    [i, end],
  );

  const begin = useCallback(() => {
    window.scrollTo({ top: 0 });
    setI(0);
    setOpen(true);
  }, []);

  /* manual trigger from the header button */
  useEffect(() => {
    window.addEventListener("hk:tour", begin);
    return () => window.removeEventListener("hk:tour", begin);
  }, [begin]);

  /* auto-start on first visit / when requested from another page */
  useEffect(() => {
    if (!ready || pathname !== "/") return;
    const asked = store.get("hk-tour-request", "session");
    if (!asked && store.get("hk-tour-done")) return;
    store.remove("hk-tour-request", "session");
    const t = setTimeout(begin, 500);
    return () => clearTimeout(t);
  }, [ready, pathname, begin]);

  const place = useCallback(() => {
    const spot = spotRef.current, card = cardRef.current;
    if (!spot || !card) return;
    const s = TOUR[i];
    const target = findTarget(s.sel);
    const cw = card.offsetWidth, ch = card.offsetHeight, pad = 8, m = 16;
    if (!target) {
      spot.classList.add("center");
      card.style.left = Math.max(m, (innerWidth - cw) / 2) + "px";
      card.style.top = Math.max(m, (innerHeight - ch) / 2) + "px";
      return;
    }
    spot.classList.remove("center");
    const r = target.getBoundingClientRect();
    Object.assign(spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
    let top = r.bottom + pad + 14;
    if (top + ch > innerHeight - m) top = r.top - pad - 14 - ch;
    if (top < m) top = Math.min(innerHeight - ch - m, r.bottom + pad + 14);
    const left = Math.max(m, Math.min(r.left + r.width / 2 - cw / 2, innerWidth - cw - m));
    card.style.top = top + "px";
    card.style.left = left + "px";
  }, [i]);

  /* position on every step; scroll the target into view first when needed */
  useLayoutEffect(() => {
    if (!open) return;
    const target = findTarget(TOUR[i].sel);
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (target) {
      const r = target.getBoundingClientRect();
      if (r.top < 70 || r.bottom > innerHeight - 40) {
        target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
        timers.push(setTimeout(place, 450), setTimeout(place, 900));
      }
    }
    place();
    nextRef.current?.focus({ preventScroll: true });
    return () => timers.forEach(clearTimeout);
  }, [open, i, place]);

  /* keyboard + reposition on resize/scroll */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") end();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    addEventListener("resize", place);
    addEventListener("scroll", place, { passive: true });
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("resize", place);
      removeEventListener("scroll", place);
    };
  }, [open, end, go, place]);

  if (!open) return null;
  const s = TOUR[i];
  const last = i === TOUR.length - 1;

  return (
    <>
      <div className="tour-block" onClick={() => go(1)} />
      <div className="tour-spot center" ref={spotRef} />
      <div className="tour-card" ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="tour-title">
        <div className="t-step">Step {i + 1} of {TOUR.length}</div>
        <h3 id="tour-title">{s.title}</h3>
        <p>{s.text}</p>
        <div className="tour-dots">
          {TOUR.map((_, k) => (
            <i key={k} className={cn(k === i && "on")} />
          ))}
        </div>
        <div className="tour-actions">
          <button className="tour-skip" type="button" onClick={end}>{last ? "" : "Skip tour"}</button>
          <div className="right">
            {i > 0 && <button className="btn btn-sm" type="button" onClick={() => go(-1)}>Back</button>}
            <button className="btn btn-sm btn-primary" type="button" ref={nextRef} onClick={() => go(1)}>
              {last ? "Finish" : i === 0 ? "Start tour" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
