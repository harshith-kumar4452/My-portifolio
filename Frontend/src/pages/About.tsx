import { AboutSection } from '@/components/portfolio/AboutSection';
import { EducationSection } from '@/components/portfolio/EducationSection';
import { GitHubActivity } from '@/components/portfolio/GitHubActivity';
import { useInView } from '@/hooks/useInView';
import { ExternalLink } from 'lucide-react';

const codingProfiles = [
    { name: 'LeetCode', url: 'https://leetcode.com/u/user9425Wn/', handle: 'user9425Wn' },
    { name: 'HackerRank', url: 'https://hackerrank.com/', handle: 'Harshith Kumar' },
    { name: 'CodeChef', url: 'https://codechef.com/', handle: 'harshithkumar' },
];

function CodingProfiles() {
    const { ref, isInView } = useInView(0.2);
    return (
        <section className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Coding <span className="text-gradient">Profiles</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {codingProfiles.map((profile, i) => (
                        <a
                            key={profile.name}
                            href={profile.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center justify-between p-6 rounded-xl border border-border/50 bg-card hover:glow-border hover:-translate-y-1 hover:scale-[1.05] transition-all duration-500 ${isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'
                                }`}
                            style={{ animationDelay: isInView ? `${(i + 1) * 100}ms` : undefined }}
                        >
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">{profile.name}</h3>
                                <p className="text-muted-foreground text-sm">{profile.handle}</p>
                            </div>
                            <ExternalLink className="w-5 h-5 text-primary" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function About() {
    return (
        <div className="flex flex-col">
            <AboutSection />
            <EducationSection />
            <CodingProfiles />
            <GitHubActivity />
        </div>
    );
}
