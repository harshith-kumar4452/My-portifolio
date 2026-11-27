import type { Metadata } from "next";
import { Donut } from "@/components/Charts";
import { InView } from "@/components/InView";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { PageHead } from "@/components/Sections";
import { DOMAIN_SHARE } from "@/lib/data";
import { GithubIcon } from "@/lib/icons";
import { pageMeta, SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Projects — Harshith Kumar",
  "Projects by Harshith Kumar: Wanderly, MAARG, AgriChain, GenSathi and Learning Hub. AI, web, mobile and blockchain apps, with code and live demos.",
  "/projects",
);

export default function Projects() {
  return (
    <>
      <PageHead
        eyebrow="Projects"
        title="Products that solve real problems."
        lead="AI travel planning, shipment recovery, supply-chain traceability, civic tech and EdTech — built end-to-end, from data model to deployed UI."
      />

      <section className="section border-t-0 pt-0">
        <div className="container">
          <ProjectsGrid />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 items-center gap-[clamp(32px,6vw,72px)]">
          <InView>
            <span className="eyebrow">By domain</span>
            <h2 className="h2">Where my work lands.</h2>
            <p className="muted mt-4">Most projects are web-first, with mobile, AI and blockchain layered in where they add real value. More experiments live on GitHub.</p>
            <a className="btn mt-5" href={`${SITE.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> More on GitHub
            </a>
          </InView>
          <InView className="card" delay={1}>
            <Donut data={DOMAIN_SHARE} />
          </InView>
        </div>
      </section>
    </>
  );
}
