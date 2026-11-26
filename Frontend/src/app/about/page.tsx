import type { Metadata } from "next";
import { Stats } from "@/components/Counters";
import { GhGraph } from "@/components/GhGraph";
import { InView } from "@/components/InView";
import { PageHead, SecHead } from "@/components/Sections";
import { Timeline } from "@/components/Timeline";
import { EDUCATION } from "@/lib/data";
import { ArrowUR } from "@/lib/icons";
import { pageMeta, SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "About — Harshith Kumar",
  "About Harshith Kumar: B.Tech CSE (Data Science) at VNRVJIET with a 9.1 CGPA, IIT Madras B.S. Data Science student, and active competitive programmer.",
  "/about",
);

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="Developer by craft, data scientist by training."
        lead="A Computer Science undergraduate majoring in Data Science, with core skills in machine learning, full-stack engineering and software architecture. I develop AI-driven applications that scale across web and mobile, and I'm currently pursuing a Software Engineer role to contribute to impactful technology."
      />

      <section className="section border-t-0 pt-0">
        <div className="container">
          <Stats
            tour="stats"
            items={[
              { to: 3, plus: true, label: "Projects shipped" },
              { to: 20, plus: true, label: "Technologies used" },
              { to: 3, label: "Hackathon podiums" },
              { to: 9.1, label: "B.Tech CGPA" },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 items-start gap-[clamp(32px,6vw,72px)]">
          <InView>
            <span className="eyebrow">Education</span>
            <h2 className="h2">Where I&apos;ve learned.</h2>
            <p className="muted mt-4">Two degrees in parallel — a B.Tech in CSE (Data Science) and IIT Madras&apos; B.S. in Data Science — on a foundation of strong school results.</p>
          </InView>
          <Timeline items={EDUCATION} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecHead eyebrow="Practice">Coding profiles.</SecHead>
          <div className="grid-3">
            <InView as="a" className="card tilt" href={SITE.leetcode} target="_blank" rel="noopener noreferrer">
              <div className="project-top"><span className="h3">LeetCode</span><span className="arrow w-[18px]"><ArrowUR /></span></div>
              <p className="muted mono m-0 mt-2 text-[13px]">@harshith_1510_</p>
            </InView>
            <InView as="a" className="card tilt" delay={1} href={SITE.github} target="_blank" rel="noopener noreferrer">
              <div className="project-top"><span className="h3">GitHub</span><span className="arrow w-[18px]"><ArrowUR /></span></div>
              <p className="muted mono m-0 mt-2 text-[13px]">@harshith-kumar4452</p>
            </InView>
            <InView className="card tilt" delay={2}>
              <div className="project-top"><span className="h3">HackerRank · CodeChef</span></div>
              <p className="muted mono m-0 mt-2 text-[13px]">Harshith Kumar · harshithkumar</p>
            </InView>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecHead eyebrow="Consistency" link={{ href: SITE.github, label: "View profile", external: true, icon: <ArrowUR /> }}>
            GitHub activity.
          </SecHead>
          <GhGraph />
        </div>
      </section>
    </>
  );
}
