import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { InView } from "@/components/InView";
import { PageHead } from "@/components/Sections";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, PinIcon } from "@/lib/icons";
import { pageMeta, SITE, telHref } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Contact — Harshith Kumar",
  "Get in touch with Harshith Kumar for software engineering roles, internships and collaborations. Email, LinkedIn, GitHub or the contact form.",
  "/contact",
);

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Let's build something extraordinary."
        lead="I'm open to internships, full-time roles, collaborations — or just a good conversation about tech and design."
      />

      <section className="section border-t-0 pt-0">
        <div className="container contact-grid">
          <InView>
            <ul className="contact-list">
              <li>
                <a href={`mailto:${SITE.email}`}><MailIcon /><span className="k">Email</span><span className="v">{SITE.email}</span></a>
                <CopyButton value={SITE.email} />
              </li>
              {SITE.phone && (
                <li>
                  <a href={telHref(SITE.phone)}><PhoneIcon /><span className="k">Phone</span><span className="v">{SITE.phone}</span></a>
                </li>
              )}
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon /><span className="k">LinkedIn</span><span className="v">kakkirala-harshithkumar</span></a>
              </li>
              <li>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer"><GithubIcon /><span className="k">GitHub</span><span className="v">harshith-kumar4452</span></a>
              </li>
              <li>
                <span className="row"><PinIcon /><span className="k">Based in</span><span className="v">{SITE.location}</span></span>
              </li>
            </ul>
            <a className="btn mt-6" href={SITE.resume} download><DownloadIcon /> Download resume</a>
          </InView>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
