import { useInView } from '@/hooks/useInView';
import { Trophy } from 'lucide-react';

const achievements = [
    {
        title: 'Hackathon Winner',
        description: 'Secured 1st place in the National level Smart India Hackathon for developing an AI-driven predictive healthcare system.',
        year: '2023',
    },
    {
        title: 'Top 100 on LeetCode',
        description: 'Ranked in the top 100 globally in LeetCode weekly contests, demonstrating strong problem-solving and algorithmic skills.',
        year: '2024',
    },
    {
        title: 'Open Source Contributor',
        description: 'Recognized for significant contributions to major open-source repositories in the React and Node.js ecosystems.',
        year: '2024',
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
