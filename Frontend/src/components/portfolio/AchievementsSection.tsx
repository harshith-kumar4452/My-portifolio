import { useInView } from '@/hooks/useInView';
import { Trophy } from 'lucide-react';

const achievements = [
    {
        title: 'Runner-Up — VJ Hackathon 2025',
        description: 'Secured Runner-Up position at VJ Hackathon 2025, organized by CSI, VNRVJIET. Competed among top engineering teams in a high-stakes technical challenge.',
        year: 'Oct 2025',
    },
    {
        title: '1st Place — CONVERGENCE 2K25',
        description: 'Won 1st Place in the Project Contest (Software) at CONVERGENCE 2K25, a National Technical Symposium hosted at VNRVJIET.',
        year: 'Nov 2025',
    },
    {
        title: '2nd Place — SynthVision Hackathon',
        description: 'Secured 2nd place at the SynthVision Hackathon, part of AI Week organized by Krithomedh at VNRVJIET, demonstrating strong AI-driven solution building.',
        year: 'Feb 2026',
    },
];

export function AchievementsSection() {
    const { ref, isInView } = useInView(0.2);

    return (
        <section id="achievements" className="py-24 relative min-h-screen flex items-center pt-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" ref={ref}>
                <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        My <span className="text-gradient">Achievements</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {achievements.map((achievement, i) => (
                        <div
                            key={achievement.title}
                            className={`rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:glow-border hover:-translate-y-2 hover:scale-[1.03] ${isInView ? `animate-fade-in-up delay-${(i + 2) * 100}` : 'opacity-0'
                                }`}
                            style={{ animationDelay: isInView ? `${(i + 2) * 100}ms` : undefined }}
                        >
                            <Trophy className="h-10 w-10 text-primary mb-6" />
                            <h3 className="text-xl font-bold text-foreground mb-3">{achievement.title}</h3>
                            <p className="text-primary font-medium mb-4">{achievement.year}</p>
                            <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
