"use client";

import { useState } from "react";
import { InView } from "./InView";
import { SITE } from "@/lib/site";

export function GhGraph() {
  const [failed, setFailed] = useState(false);
  return (
    <InView className="card gh-card">
      <p className="muted mono m-0 text-[12px]">Contributions over the last year</p>
      {!failed && (
        <div className="gh-graph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ghchart.rshah.org/111111/harshith-kumar4452"
            alt="GitHub contribution graph for harshith-kumar4452"
            loading="lazy"
            width={720}
            height={112}
            onError={() => setFailed(true)}
          />
        </div>
      )}
      {failed && (
        <p className="gh-fallback" style={{ display: "block" }}>
          The contribution graph couldn&apos;t load right now —{" "}
          <a className="text-link" href={SITE.github} target="_blank" rel="noopener noreferrer">see it on GitHub</a>.
        </p>
      )}
    </InView>
  );
}
