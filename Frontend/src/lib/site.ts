import type { Metadata } from "next";

export const SITE_URL = "https://my-portifolio-six-tau.vercel.app";

export const SITE = {
  name: "Kakkirala Harshith Kumar",
  email: "harshithkumar4452@gmail.com",
  phone: "+91 74160 02298",
  location: "Hyderabad, India",
  resume: "/assets/Harshith_Resume.pdf",
  github: "https://github.com/harshith-kumar4452",
  linkedin: "https://linkedin.com/in/kakkirala-harshithkumar",
  leetcode: "https://leetcode.com/u/harshith_1510_/",
  // Optional: a Formspree / Getform endpoint. Leave empty to open the visitor's mail app instead.
  formEndpoint: "",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
] as const;

export const telHref = (phone: string) => "tel:" + phone.replace(/[^+\d]/g, "");

/** Per-page SEO metadata (title, description, canonical, Open Graph, Twitter). */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Harshith Kumar",
      title,
      description,
      url: path,
      images: ["/assets/img/harshith.jpg"],
    },
    twitter: { card: "summary", title, description },
  };
}
