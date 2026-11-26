"use client";

import { useEffect, useRef, useState } from "react";
import { useReady } from "./Providers";
import { reducedMotion } from "@/lib/cn";

/** True (once) when the element scrolls into view — after the intro loader has finished. */
export function useInView<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const { ready } = useReady();

  useEffect(() => {
    if (!ready || seen) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready, seen]);

  return [ref, seen] as const;
}

/** Eased 0 → 1 progress (ease-out quart) that starts when `active` becomes true. */
export function useEased(active: boolean, duration = 1400) {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = reducedMotion();
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / duration);
      setK(1 - Math.pow(1 - p, 4));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, duration]);
  return k;
}
