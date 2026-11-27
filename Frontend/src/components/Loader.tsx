"use client";

import { useEffect, useRef, useState } from "react";
import { cn, reducedMotion, store } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { useReady } from "./Providers";

const PHASES = ["Initialising", "Loading assets", "Compiling projects", "Rendering graphs", "Almost there", "Welcome"];
const WORDS = ["Harshith", "Kumar"];

export function Loader() {
  const { setReady } = useReady();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const countRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const seen = !!store.get("hk-loaded", "session");
    const reduce = reducedMotion();
    let cancelled = false;
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    document.body.style.overflow = "hidden";

    const finish = () => {
      if (cancelled) return;
      setDone(true);
      document.documentElement.classList.add("is-ready");
      document.body.style.overflow = "";
      store.set("hk-loaded", "1", "session");
      later(() => {
        setGone(true);
        setReady(true);
      }, 1150);
    };

    if (seen || reduce) {
      later(finish, seen ? 120 : 300);
    } else {
      const dur = 2400;
      const t0 = performance.now();
      let pageLoaded = document.readyState === "complete";
      const onLoad = () => (pageLoaded = true);
      window.addEventListener("load", onLoad);
      later(() => (pageLoaded = true), 6000); // never block for long

      const step = (t: number) => {
        if (cancelled) return;
        let k = Math.min(1, (t - t0) / dur);
        if (!pageLoaded && k > 0.9) k = 0.9; // hold at 90% until assets are in
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        if (countRef.current) countRef.current.textContent = String(Math.round(e * 100)).padStart(3, "0");
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${e})`;
        if (phaseRef.current) phaseRef.current.textContent = PHASES[Math.min(PHASES.length - 1, Math.floor(e * (PHASES.length - 1)))];
        if (k < 1) raf = requestAnimationFrame(step);
        else later(finish, 280);
      };
      raf = requestAnimationFrame(step);
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        window.removeEventListener("load", onLoad);
        document.body.style.overflow = "";
      };
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [setReady]);

  if (gone) return null;

  let d = 0;
  return (
    <div className={cn("loader", done && "done")} aria-hidden="true">
      <div className="panel top" />
      <div className="panel bottom" />
      <div className="loader-grid" />
      <div className="loader-inner">
        <div className="loader-name">
          {WORDS.map((w, wi) => (
            <span className="word" key={w}>
              {w.split("").map((ch, ci) => (
                <span className="ch" key={ci} style={{ animationDelay: `${(d++ * 0.045 + 0.15).toFixed(3)}s` }}>
                  {ch}
                </span>
              ))}
              {wi === WORDS.length - 1 && (
                <span className="ch dot" style={{ animationDelay: `${(d * 0.045 + 0.2).toFixed(3)}s` }}>
                  .
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="loader-sub">
          <span className="phase" ref={phaseRef}>Initialising</span>
          <span>Portfolio · 2026</span>
        </div>
        <div className="loader-track">
          <div className="loader-fill" ref={fillRef} />
        </div>
      </div>
      <div className="loader-meta">
        Full-stack developer
        <br />
        Data Science · AI · Web
        <br />
        {SITE.location}
      </div>
      <div className="loader-count">
        <b ref={countRef}>000</b>
        <span>%</span>
      </div>
    </div>
  );
}
