"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/cn";

/**
 * Global motion layer: scroll progress bar, left scroll thread, custom cursor
 * (dot + lagging ring + glow), 3D tilt and magnetic buttons.
 * Cursor/tilt/magnet only run on fine pointers without reduced-motion.
 */
export function Effects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const threadFill = useRef<HTMLElement>(null);
  const threadDot = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ---- scroll progress + thread ---- */
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? Math.min(1, scrollY / h) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (threadFill.current) threadFill.current.style.transform = `scaleY(${p})`;
      if (threadDot.current) threadDot.current.style.top = `calc(${p * 100}% - 3px)`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [pathname]);

  /* ---- cursor, tilt, magnet ---- */
  useEffect(() => {
    if (reducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const body = document.body;
    body.classList.add("fx-on");

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, gx = mx, gy = my;
    let live = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      if (!live) {
        live = true;
        rx = gx = mx;
        ry = gy = my;
        body.classList.add("fx-live");
      }

      // 3D tilt
      const tl = (e.target as Element | null)?.closest?.<HTMLElement>(".tilt");
      if (tl) {
        const r = tl.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tl.style.setProperty("--py", (x * 10).toFixed(2) + "deg");
        tl.style.setProperty("--px", (-y * 8).toFixed(2) + "deg");
      }

      // magnetic buttons
      document.querySelectorAll<HTMLElement>(".mag").forEach((b) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.8) b.style.translate = `${(dx * 0.25).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px`;
        else if (b.style.translate) b.style.translate = "";
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const view = t.closest("a.link-row, .project");
      const hot = t.closest("a, button, .card, [data-copy], label");
      ringRef.current?.classList.toggle("view", !!view);
      ringRef.current?.classList.toggle("hot", !!hot && !view);
      if (labelRef.current) labelRef.current.textContent = view ? "VIEW" : "";
    };

    const onOut = (e: MouseEvent) => {
      const tl = (e.target as Element | null)?.closest?.<HTMLElement>(".tilt");
      if (tl && !tl.contains(e.relatedTarget as Node | null)) {
        tl.style.setProperty("--px", "0deg");
        tl.style.setProperty("--py", "0deg");
      }
    };

    const onLeave = () => {
      live = false;
      body.classList.remove("fx-live");
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${gx - 260}px,${gy - 260}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      body.classList.remove("fx-on", "fx-live");
    };
  }, []);

  return (
    <>
      <div className="progress-bar" ref={barRef} aria-hidden="true" />
      <div className="thread" aria-hidden="true">
        <i ref={threadFill} />
        <b ref={threadDot} />
      </div>
      <div id="cglow" ref={glowRef} aria-hidden="true" />
      <div id="cring" ref={ringRef} aria-hidden="true">
        <i ref={labelRef} />
      </div>
      <div id="cdot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
