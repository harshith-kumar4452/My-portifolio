"use client";

import { cn } from "@/lib/cn";
import { useInView } from "./hooks";
import { InView } from "./InView";

type Item = { when: string; title: string; sub: string; badge: string };

export function Timeline({ items }: { items: Item[] }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div className={cn("timeline", seen && "in")} ref={ref}>
      <span className="tl-progress" aria-hidden="true" />
      {items.map((it) => (
        <InView key={it.title + it.when} base={false} className="tl-item">
          <span className="tl-when">{it.when}</span>
          <h3>{it.title}</h3>
          <p>{it.sub}</p>
          <span className="badge">{it.badge}</span>
        </InView>
      ))}
    </div>
  );
}
