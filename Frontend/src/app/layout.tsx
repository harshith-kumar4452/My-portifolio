import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Providers } from "@/components/Providers";
import { Tour } from "@/components/Tour";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const TITLE = "Harshith Kumar — Full-Stack Developer & Data Science Student";
const DESC =
  "Portfolio of Kakkirala Harshith Kumar, a full-stack developer and Data Science undergraduate in Hyderabad building AI-driven web and mobile applications.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  authors: [{ name: "Kakkirala Harshith Kumar" }],
  alternates: { canonical: "/" },
  icons: { icon: { url: "/assets/img/favicon.svg", type: "image/svg+xml" }, apple: "/assets/img/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: "Harshith Kumar", title: TITLE, description: DESC, url: "/", images: ["/assets/img/harshith.jpg"] },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

// Runs before first paint: applies the saved/OS theme and flags repeat visits (skips the long intro).
const INIT = `try{var t=localStorage.getItem("hk-theme");document.documentElement.setAttribute("data-theme",t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}try{if(sessionStorage.getItem("hk-loaded"))document.documentElement.setAttribute("data-seen","")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.loader{display:none}.page{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>
          <Loader />
          <Effects />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Tour />
        </Providers>
      </body>
    </html>
  );
}
