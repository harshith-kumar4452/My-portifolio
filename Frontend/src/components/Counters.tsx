"use client";

import { useEased, useInView } from "./hooks";
import { InView } from "./InView";
import { cn } from "@/lib/cn";

const decimals = (n: number) => (String(n).split(".")[1] || "").length;

/** Number that counts up from 0 when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const k = useEased(seen);
  return (
    <span ref={ref}>
      {(to * k).toFixed(decimals(to))}
      {suffix}
    </span>
  );
}

export type StatItem = { to: number; plus?: boolean; label: string };

/** The 4-up stat strip (home / about / achievements). */
export function Stats({ items, className, tour, style }: { items: StatItem[]; className?: string; tour?: string; style?: React.CSSProperties }) {
  return (
    <InView className={cn("stats", className)} data-tour={tour} style={style}>
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-num">
            <CountUp to={s.to} />
            {s.plus && <sup>+</sup>}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </InView>
  );
}

/** Animated skill bar with a live percentage. */
export function SkillBar({ name, value }: { name: string; value: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const k = useEased(seen);
  return (
    <div className={cn("bar", seen && "in")} ref={ref}>
      <div className="bar-top">
        <span>{name}</span>
        <span className="pct">{Math.round(value * k)}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: seen ? `${value}%` : 0 }} />
      </div>
    </div>
  );
}
