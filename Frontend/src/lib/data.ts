export type Project = {
  num: string;
  cats: string; // display label
  cat: string; // filter keys
  name: string;
  tagline: string;
  desc: string;
  stack: string[];
  code?: string;
  live?: string;
  /** Inner markup of the 300x120 decorative SVG (static, trusted). */
  visual: string;
};

export const PROJECTS: Project[] = [
  {
    num: "01",
    cats: "Web · AI",
    cat: "web ai",
    name: "Wanderly",
    tagline: "AI travel planner for India",
    desc: "A full-stack travel platform: a clickable 3D map of all 36 states, day-by-day trip plans, and Jimmy, a voice guide that answers from a curated travel guide using retrieval and Gemini. Accounts, a bucket list, a photo scrapbook and a recommendation engine personalise every visit.",
    stack: ["Next.js", "TypeScript", "Three.js", "Supabase", "Gemini"],
    live: "https://wanderly-nine-mu.vercel.app/",
    visual:
      '<g fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"><path d="M10 104 70 40l34 34 30-30 50 60"/><path d="M150 104l60-52 44 40 36-22"/></g><path d="M40 96c40-10 70 10 110-6s70-34 110-20" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="4 5"/><g fill="var(--accent)"><path d="M232 30a12 12 0 0 1 24 0c0 10-12 22-12 22s-12-12-12-22Z"/></g><circle cx="244" cy="30" r="4" fill="var(--bg, #fff)"/>',
  },
  {
    num: "02",
    cats: "Web · AI",
    cat: "web ai",
    name: "MAARG",
    tagline: "AI recovery for misplaced shipments",
    desc: "Predicts where parcels go missing, prices each delay in rupees per hour, and runs a reverse auction so vehicles already heading that way carry the recovery. A FastAPI backend runs nine engines, including a misplacement classifier, a time-expanded router and a counterfactual explainer, on PostgreSQL. Four role-based portals sit on top.",
    stack: ["FastAPI", "Python", "scikit-learn", "PostgreSQL", "Supabase", "Leaflet"],
    code: "https://github.com/harshith-kumar4452/Maarg",
    visual:
      '<g fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"><circle cx="40" cy="84" r="7"/><circle cx="120" cy="34" r="7"/><circle cx="196" cy="88" r="7"/><circle cx="262" cy="36" r="7"/><path d="M47 80 113 38M127 38l62 46M203 84l52-44"/></g><path d="M40 84C90 110 150 110 196 88" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="4 5"/><circle cx="40" cy="84" r="16" fill="var(--accent)" opacity=".18"/><circle cx="40" cy="84" r="5" fill="var(--accent)"/><g fill="var(--accent)"><rect x="180" y="72" width="32" height="20" rx="4" opacity=".9"/></g>',
  },
  {
    num: "03",
    cats: "Web · Blockchain",
    cat: "web blockchain",
    name: "AgriChain",
    tagline: "Blockchain agricultural supply chain",
    desc: "A blockchain-enabled traceability platform with role-based access for Farmers, Aggregators, Retailers and Consumers — every hand-off from farm to shelf is verifiable.",
    stack: ["Next.js", "React", "TypeScript", "Blockchain"],
    code: "https://github.com/harshith-kumar4452/Agrichain",
    visual:
      '<g fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"><rect x="30" y="42" width="40" height="36" rx="8"/><rect x="92" y="42" width="40" height="36" rx="8"/><rect x="154" y="42" width="40" height="36" rx="8"/><rect x="216" y="42" width="40" height="36" rx="8"/><line x1="70" y1="60" x2="92" y2="60" stroke-dasharray="3 3"/><line x1="132" y1="60" x2="154" y2="60" stroke-dasharray="3 3"/><line x1="194" y1="60" x2="216" y2="60" stroke-dasharray="3 3"/></g><rect x="216" y="42" width="40" height="36" rx="8" fill="var(--accent)" opacity=".9"/>',
  },
  {
    num: "04",
    cats: "Web",
    cat: "web",
    name: "GenSathi",
    tagline: "Civic complaint management",
    desc: "A civic engagement platform connecting citizens and city administrators for real-time issue reporting, tracking and resolution.",
    stack: ["Next.js", "React", "Firebase Firestore"],
    code: "https://github.com/harshith-kumar4452/Spirit",
    live: "https://spirit-rho.vercel.app/",
    visual:
      '<g stroke="currentColor" stroke-width="1" opacity=".25"><line x1="0" y1="10" x2="300" y2="10"/><line x1="0" y1="32" x2="300" y2="32"/><line x1="0" y1="54" x2="300" y2="54"/><line x1="0" y1="76" x2="300" y2="76"/><line x1="0" y1="98" x2="300" y2="98"/><line x1="10" y1="0" x2="10" y2="120"/><line x1="32" y1="0" x2="32" y2="120"/><line x1="54" y1="0" x2="54" y2="120"/><line x1="76" y1="0" x2="76" y2="120"/><line x1="98" y1="0" x2="98" y2="120"/><line x1="120" y1="0" x2="120" y2="120"/><line x1="142" y1="0" x2="142" y2="120"/><line x1="164" y1="0" x2="164" y2="120"/><line x1="186" y1="0" x2="186" y2="120"/><line x1="208" y1="0" x2="208" y2="120"/><line x1="230" y1="0" x2="230" y2="120"/><line x1="252" y1="0" x2="252" y2="120"/><line x1="274" y1="0" x2="274" y2="120"/><line x1="296" y1="0" x2="296" y2="120"/></g><g fill="currentColor" opacity=".6"><circle cx="76" cy="54" r="4"/><circle cx="208" cy="32" r="4"/><circle cx="164" cy="98" r="4"/></g><circle cx="142" cy="54" r="7" fill="var(--accent)"/><circle cx="142" cy="54" r="16" fill="none" stroke="var(--accent)" opacity=".5"/>',
  },
  {
    num: "05",
    cats: "Web",
    cat: "web",
    name: "Learning Hub",
    tagline: "Roadmap & practice tracker",
    desc: "Tracks 30 learning roadmaps and 1,600+ topics imported from Notion, plus a daily routine that logs LeetCode and GFG POTDs and weekly contests with streaks. Cheat sheets, a to-do list and mind maps drawn from outlines live alongside.",
    stack: ["Node.js", "Express", "MongoDB Atlas", "JavaScript", "Vercel"],
    code: "https://github.com/harshith-kumar4452/roadmap-tracker",
    live: "https://roadmaps-tracker.vercel.app/",
    visual:
      '<g fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"><rect x="26" y="24" width="12" height="12" rx="3"/><rect x="26" y="54" width="12" height="12" rx="3"/><rect x="26" y="84" width="12" height="12" rx="3"/></g><path d="M28.5 30.5l2.5 2.5 4.5-5M28.5 60.5l2.5 2.5 4.5-5" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><g fill="currentColor" opacity=".2"><rect x="50" y="27" width="96" height="6" rx="3"/><rect x="50" y="57" width="96" height="6" rx="3"/><rect x="50" y="87" width="96" height="6" rx="3"/></g><g fill="var(--accent)"><rect x="50" y="27" width="96" height="6" rx="3"/><rect x="50" y="57" width="58" height="6" rx="3"/><rect x="50" y="87" width="22" height="6" rx="3" opacity=".6"/></g><g fill="currentColor" opacity=".18"><rect x="176" y="24" width="14" height="14" rx="3"/><rect x="194" y="24" width="14" height="14" rx="3"/><rect x="230" y="24" width="14" height="14" rx="3"/><rect x="176" y="42" width="14" height="14" rx="3"/><rect x="212" y="42" width="14" height="14" rx="3"/><rect x="248" y="42" width="14" height="14" rx="3"/><rect x="194" y="60" width="14" height="14" rx="3"/><rect x="230" y="60" width="14" height="14" rx="3"/><rect x="176" y="78" width="14" height="14" rx="3"/><rect x="212" y="78" width="14" height="14" rx="3"/><rect x="266" y="78" width="14" height="14" rx="3"/></g><g fill="var(--accent)"><rect x="212" y="24" width="14" height="14" rx="3"/><rect x="248" y="24" width="14" height="14" rx="3" opacity=".6"/><rect x="194" y="42" width="14" height="14" rx="3" opacity=".6"/><rect x="230" y="42" width="14" height="14" rx="3"/><rect x="176" y="60" width="14" height="14" rx="3"/><rect x="212" y="60" width="14" height="14" rx="3" opacity=".6"/><rect x="248" y="60" width="14" height="14" rx="3"/><rect x="194" y="78" width="14" height="14" rx="3"/><rect x="230" y="78" width="14" height="14" rx="3" opacity=".6"/><rect x="248" y="78" width="14" height="14" rx="3"/></g>',
  },
];

export const FILTERS = ["all", "web", "ai", "mobile", "blockchain"] as const;

export const DOMAIN_SHARE = [
  { label: "Web", value: 5, color: "var(--fg)" },
  { label: "Mobile", value: 1, color: "var(--accent)" },
  { label: "AI", value: 3, color: "var(--muted)" },
  { label: "Blockchain", value: 1, color: "var(--line)" },
];

export const FEATURED = [
  { n: "01", meta: "Web · AI", title: "Wanderly", href: "https://wanderly-nine-mu.vercel.app/", external: true },
  { n: "02", meta: "Web · AI", title: "MAARG", href: "https://github.com/harshith-kumar4452/Maarg", external: true },
  { n: "03", meta: "Web · Blockchain", title: "AgriChain", href: "/projects", external: false },
  { n: "04", meta: "Web", title: "GenSathi", href: "/projects", external: false },
  { n: "05", meta: "Web", title: "Learning Hub", href: "https://roadmaps-tracker.vercel.app/", external: true },
];

export const ACHIEVEMENTS = [
  {
    rank: "2",
    suffix: "nd",
    title: "SynthVision Hackathon",
    date: "Feb 2026",
    text: "Secured 2nd place at the SynthVision Hackathon, part of AI Week organised by Krithomedh at VNRVJIET, building an AI-driven solution under time pressure.",
  },
  {
    rank: "1",
    suffix: "st",
    title: "CONVERGENCE 2K25",
    date: "Nov 2025",
    text: "Won 1st place in the Project Contest (Software) at CONVERGENCE 2K25, a National Technical Symposium hosted at VNRVJIET.",
  },
  {
    rank: "2",
    suffix: "nd",
    title: "VJ Hackathon 2025",
    date: "Oct 2025",
    text: "Runner-up at VJ Hackathon 2025, organised by CSI, VNRVJIET — competing among the top engineering teams on campus.",
  },
];

export const EDUCATION = [
  { when: "2024 – 2028", title: "VNR Vignana Jyothi Institute of Engineering & Technology", sub: "B.Tech CSE (Hons) — Data Science · Hyderabad, Telangana", badge: "CGPA 9.1" },
  { when: "Ongoing", title: "IIT Madras", sub: "B.S. in Data Science and Applications (Diploma level)", badge: "CGPA 8.2" },
  { when: "July 2024", title: "Viswasanthi E.M High School", sub: "Intermediate CBSE (PCM) · Vuyyuru, Andhra Pradesh", badge: "91.8%" },
  { when: "May 2022", title: "Viswasanthi E.M High School", sub: "Matriculation (CBSE) · Vuyyuru, Andhra Pradesh", badge: "95.6%" },
];

export const SKILL_GROUPS = [
  { title: "Programming languages", avg: 80, items: [["Python", 90], ["JavaScript", 85], ["Java", 75], ["C / C++", 72]] },
  { title: "Frameworks & libraries", avg: 74, items: [["React / Next.js", 88], ["Scikit-learn", 75], ["TensorFlow", 70], ["LangChain", 65]] },
  { title: "Databases & backend", avg: 80, items: [["Firebase", 85], ["REST APIs / Microservices", 80], ["PostgreSQL", 78], ["MySQL", 75]] },
  { title: "Tools & platforms", avg: 77, items: [["Git & GitHub", 90], ["Vercel", 82], ["Figma", 70], ["Docker", 65]] },
] as { title: string; avg: number; items: [string, number][] }[];

export const RADAR = [
  { label: "Languages", value: 81 },
  { label: "Frontend", value: 88 },
  { label: "Backend", value: 80 },
  { label: "Databases", value: 79 },
  { label: "ML / AI", value: 70 },
  { label: "DevOps", value: 74 },
];

export const TOOLBOX = ["TypeScript", "Node.js", "Express", "MongoDB", "Supabase", "React Native", "Expo", "Tailwind CSS", "Three.js", "Firestore", "Pandas", "NumPy", "Blockchain", "Linux"];

export const MARQUEE = ["Python", "JavaScript", "React / Next.js", "Firebase", "PostgreSQL", "Scikit-learn", "TensorFlow", "LangChain", "REST APIs", "Git & GitHub", "Vercel", "Docker"];

export const ROLES = ["Full-Stack Developer", "Data Science Undergrad", "AI Product Builder", "Hackathon Winner"];
