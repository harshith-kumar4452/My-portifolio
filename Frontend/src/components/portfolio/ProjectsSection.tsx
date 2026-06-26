import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ExternalLink, Github, Globe, Brain } from 'lucide-react';

type Project = {
  title: string;
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  category: string[];
  icon: typeof Globe;
  github: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: 'AgriChain – Blockchain Agricultural Supply Chain',
    shortDesc: 'A blockchain-enabled agricultural supply chain traceability platform with role-based access for Farmers, Aggregators, Retailers, and Consumers.',
    fullDesc:
      'Engineered a blockchain-enabled agricultural supply chain traceability platform with role-based access for Farmers, Aggregators, Retailers, and Consumers. Implemented QR-based batch creation and real-time camera scanning to log trace events (transport, processing, storage, retail) across the supply chain. Connected Solidity smart contracts on the Polygon testnet via ethers.js to provide optional tamper-proof blockchain verification of product history.',
    tech: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Solidity', 'ethers.js', 'Polygon'],
    category: ['web', 'blockchain'],
    icon: Globe,
    github: 'https://github.com/harshith-kumar4452',
  },
  {
    title: 'GenSathi – Civic Complaint Management Platform',
    shortDesc: 'A civic engagement platform connecting citizens and city administrators for real-time issue reporting, tracking, and resolution.',
    fullDesc:
      'Developed a civic engagement platform connecting citizens and city administrators for real-time issue reporting, tracking, and resolution. Built a smart duplicate-detection system using the Haversine distance formula to flag similar complaints within a 150m radius. Designed an XP-based gamification and community upvoting engine to prioritize critical issues, paired with proof-based (before/after photo) resolution workflows for admins.',
    tech: ['Next.js', 'React', 'Firebase Firestore', 'Tailwind CSS', 'Leaflet'],
    category: ['web'],
    icon: Globe,
    github: 'https://github.com/harshith-kumar4452/Spirit.git',
    demo: 'https://spirit-rho.vercel.app/',
  },
  {
    title: 'CampusPocket – Mobile EdTech Platform',
    shortDesc: 'A full-stack mobile EdTech platform connecting schools, parents, and students with real-time academic insights and AI-powered tools.',
    fullDesc:
      'Built a full-stack mobile EdTech platform connecting schools, parents, and students with real-time academic insights, automated scheduling, and performance analytics. Engineered a custom Linear Regression Growth Modeling (LRGM) algorithm to analyze multi-year academic data and predict student performance trends. Integrated an AI-powered curriculum chatbot and parent performance summaries via Groq API, using minimal RAG and 24-hour response caching to cut token usage and API costs.',
    tech: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Groq API', 'NativeWind'],
    category: ['mobile', 'ai'],
    icon: Brain,
    github: 'https://github.com/harshith-kumar4452',
  },
];

const filters = ['All', 'Web', 'AI', 'Mobile', 'Blockchain'];

export function ProjectsSection() {
  const { ref, isInView } = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter.toLowerCase()));

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        {/* Filters */}
        <div className={`flex justify-center gap-3 mb-12 flex-wrap ${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === f
                ? 'bg-primary text-primary-foreground glow-blue'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-500 hover:glow-border hover:-translate-y-2 hover:scale-[1.02] ${isInView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                style={{ animationDelay: isInView ? `${(i + 2) * 150}ms` : undefined }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <Icon className="h-16 w-16 text-primary/60 group-hover:text-primary transition-all duration-500 animate-bounce-subtle" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-card border-border/50 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-3 leading-relaxed">
              {selectedProject?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProject?.tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <Button asChild className="glow-blue">
              <a href={selectedProject?.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            {selectedProject?.demo && (
              <Button variant="outline" asChild className="border-primary/30 text-foreground hover:bg-primary/10">
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
