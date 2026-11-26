import Link from "next/link";
import { Stats } from "@/components/Counters";
import { InView, InViewLink } from "@/components/InView";
import { SecHead } from "@/components/Sections";
import { TypedRole } from "@/components/TypedRole";
import { ACHIEVEMENTS, FEATURED, MARQUEE, ROLES } from "@/lib/data";
import { ArrowIcon, ArrowUR, DownloadIcon, MailIcon } from "@/lib/icons";
import { SITE } from "@/lib/site";

export default function Home() {
  const marquee = [...MARQUEE, ...MARQUEE];
  return (
    <>
      <section className="hero">
        <span className="blob b1" aria-hidden="true" />
        <span className="blob b2" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="status-pill"><span className="status-dot" />Open to SWE internships &amp; roles</span>
            <h1 className="h1">
              <span className="line"><span>Harshith</span></span>
              <span className="line"><span>Kumar<span className="accent">.</span></span></span>
            </h1>
            <p className="role">
              <span className="muted">&gt; </span>
              <TypedRole words={ROLES} />
              <span className="caret" />
            </p>
            <p className="lead">I build intelligent applications, data-driven solutions and web platforms that solve practical problems — fast, clean and built to scale.</p>
            <div className="hero-cta" data-tour="hero-cta">
              <Link className="btn btn-primary mag" href="/contact">Get in touch <ArrowIcon /></Link>
              <a className="btn mag" href={SITE.resume} download><DownloadIcon /> Download resume</a>
            </div>
          </div>
          <figure className="hero-photo tilt m-0">
            <picture>
              <source srcSet="/assets/img/harshith-320.webp 320w, /assets/img/harshith-480.webp 480w, /assets/img/harshith.webp 640w" sizes="(max-width: 760px) 160px, 400px" type="image/webp" />
              <img src="/assets/img/harshith.jpg" alt="Portrait of Kakkirala Harshith Kumar" width={640} height={853} fetchPriority="high" />
            </picture>
            <svg className="badge-ring" viewBox="0 0 120 120" aria-hidden="true">
              <defs><path id="ringp" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <circle cx="60" cy="60" r="58" fill="rgba(0,0,0,.4)" />
              <circle cx="60" cy="60" r="5" fill="#ea6a2c" />
              <text><textPath href="#ringp" textLength="284" lengthAdjust="spacing">LEARN · BUILD · SHIP · REPEAT · </textPath></text>
            </svg>
            <figcaption className="tag">Hyderabad, IN · B.Tech CSE (DS)</figcaption>
          </figure>
        </div>
        <div className="scroll-hint" aria-hidden="true">SCROLL<i /></div>
      </section>

      <div className="marquee" aria-label="Technologies I work with">
        <div className="marquee-track">
          {marquee.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      <section className="section pt-0">
        <div className="container">
          <Stats
            tour="stats"
            items={[
              { to: 4, plus: true, label: "Projects shipped" },
              { to: 20, plus: true, label: "Technologies used" },
              { to: 3, label: "Hackathon podiums" },
              { to: 9.1, label: "B.Tech CGPA" },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecHead eyebrow="Chapter one · Selected work" link={{ href: "/projects", label: "All projects" }}>
            Things I&apos;ve <em>built.</em>
          </SecHead>
          <div data-tour="work">
            {FEATURED.map((p, i) => {
              const inner = (
                <>
                  <div>
                    <div className="meta">{p.n} · {p.meta}</div>
                    <div className="title">{p.title}</div>
                  </div>
                  <span className="arrow"><ArrowUR /></span>
                </>
              );
              const delay = ([0, 0, 1, 1, 2] as const)[i];
              return p.external ? (
                <InView as="a" key={p.title} className="link-row" delay={delay} href={p.href} target="_blank" rel="noopener noreferrer">{inner}</InView>
              ) : (
                <InViewLink key={p.title} className="link-row" delay={delay} href={p.href}>{inner}</InViewLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecHead eyebrow="Chapter two · Recognition" link={{ href: "/achievements", label: "All achievements" }}>
            Recent <em>wins.</em>
          </SecHead>
          <div className="grid-3">
            {ACHIEVEMENTS.map((a, i) => (
              <InView key={a.title} className="card tilt" delay={i as 0 | 1 | 2}>
                <div className="ach-rank text-[44px]">{a.rank}<small>{a.suffix}</small></div>
                <h3 className="h3 mt-3.5">{a.title}</h3>
                <p className="muted mono m-0 mt-1.5 text-[12px]">{a.date}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <InView className="container">
          <span className="eyebrow">Chapter three · Let&apos;s talk</span>
          <h2 className="h2">Have a project, role or idea? Let&apos;s build something <em>great.</em></h2>
          <div className="hero-cta">
            <a className="btn btn-primary mag" href={`mailto:${SITE.email}`}><MailIcon /> {SITE.email}</a>
            <Link className="btn mag" href="/contact">Contact page <ArrowIcon /></Link>
          </div>
        </InView>
      </section>
    </>
  );
}
