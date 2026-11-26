"use client";

import { useState } from "react";
import { ArrowUR, CodeIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { FILTERS, PROJECTS, type Project } from "@/lib/data";
import { InView } from "./InView";

function Body({ p }: { p: Project }) {
  return (
    <>
      <div className="project-visual">
        <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: p.visual }} />
      </div>
      <div className="project-top">
        <span className="project-num">{p.num}</span>
        <span className="project-cats">{p.cats}</span>
      </div>
      <h3>
        {p.name} <span className="muted" style={{ fontWeight: 400 }}>— {p.tagline}</span>
      </h3>
      <p>{p.desc}</p>
      <div className="chips">
        {p.stack.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
      <div className="project-links">
        {p.code && (
          <a className="btn btn-sm" href={p.code} target="_blank" rel="noopener noreferrer">
            <CodeIcon /> Code
          </a>
        )}
        {p.live && (
          <a className="btn btn-sm btn-primary" href={p.live} target="_blank" rel="noopener noreferrer">
            Live demo <ArrowUR />
          </a>
        )}
      </div>
    </>
  );
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [touched, setTouched] = useState(false);
  const match = (p: Project, f: string) => f === "all" || p.cat.includes(f);
  const shown = PROJECTS.filter((p) => match(p, filter));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by domain">
        {FILTERS.map((f) => (
          <button
            key={f}
            className="filter"
            type="button"
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setTouched(true);
            }}
          >
            {f === "ai" ? "AI" : f[0].toUpperCase() + f.slice(1)}
            <span className="count">{PROJECTS.filter((p) => match(p, f)).length}</span>
          </button>
        ))}
      </div>
      <div className="grid-3">
        {shown.map((p, idx) =>
          touched ? (
            // after a filter click: re-mount so every visible card replays the fade-up
            <article key={`${filter}-${p.num}`} className={cn("card project tilt", "fade-swap")}>
              <Body p={p} />
            </article>
          ) : (
            <InView as="article" key={p.num} className="card project tilt" delay={(idx % 3) as 0 | 1 | 2}>
              <Body p={p} />
            </InView>
          ),
        )}
      </div>
    </>
  );
}
