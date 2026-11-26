import type { Metadata } from "next";
import { Stats } from "@/components/Counters";
import { InView } from "@/components/InView";
import { PageHead } from "@/components/Sections";
import { ACHIEVEMENTS } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Achievements — Harshith Kumar",
  "Hackathon wins of Harshith Kumar: 1st place at CONVERGENCE 2K25, 2nd at SynthVision Hackathon and runner-up at VJ Hackathon 2025.",
  "/achievements",
);

export default function Achievements() {
  return (
    <>
      <PageHead
        eyebrow="Achievements"
        title="Three hackathon podiums in five months."
        lead="Competing against top engineering teams — shipping working prototypes under pressure."
      />

      <section className="section border-t-0 pt-0">
        <div className="container">
          <Stats
            className="mb-12"
            items={[
              { to: 3, label: "Podium finishes" },
              { to: 1, label: "First place" },
              { to: 2, label: "Second place" },
              { to: 5, label: "Months, Oct → Feb" },
            ]}
          />
          {ACHIEVEMENTS.map((a, i) => (
            <InView as="article" className="ach" key={a.title} delay={i as 0 | 1 | 2}>
              <div className="ach-rank">{a.rank}<small>{a.suffix}</small></div>
              <div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
              <div className="ach-date">{a.date}</div>
            </InView>
          ))}
        </div>
      </section>
    </>
  );
}
