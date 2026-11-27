import type { Metadata } from "next";
import { Radar } from "@/components/Charts";
import { SkillBar } from "@/components/Counters";
import { InView } from "@/components/InView";
import { PageHead, SecHead } from "@/components/Sections";
import { RADAR, SKILL_GROUPS, TOOLBOX } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Skills — Harshith Kumar",
  "Technical skills of Harshith Kumar: Python, JavaScript, React/Next.js, TensorFlow, Firebase, PostgreSQL, Docker and more, with proficiency charts.",
  "/skills",
);

export default function Skills() {
  return (
    <>
      <PageHead
        eyebrow="Skills"
        title="A full-stack toolkit with a data-science core."
        lead="From Python models to production React apps — here's how my skills break down, measured honestly."
      />

      <section className="section border-t-0 pt-0">
        <div className="container skills-layout">
          <InView className="card chart-card">
            <span className="eyebrow">Skill profile</span>
            <Radar data={RADAR} />
            <p className="muted mx-0 mb-0 mt-1.5 text-center text-[13px]">Average proficiency by domain</p>
          </InView>
          <div>
            {SKILL_GROUPS.map((g) => (
              <InView className="skill-group" key={g.title}>
                <h3 className="h3">
                  {g.title}
                  <span className="avg">avg {g.avg}%</span>
                </h3>
                {g.items.map(([name, value]) => (
                  <SkillBar key={name} name={name} value={value} />
                ))}
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecHead eyebrow="Also in the toolbox">Technologies I use.</SecHead>
          <InView className="chips">
            {TOOLBOX.map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </InView>
        </div>
      </section>
    </>
  );
}
