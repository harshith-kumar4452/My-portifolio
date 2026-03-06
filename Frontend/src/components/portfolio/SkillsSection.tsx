import { useInView } from '@/hooks/useInView';
import { Code, Globe, Database, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'C', level: 75 },
      { name: 'Python', level: 85 },
    ],
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Next.js', level: 70 },
    ],
  },
  {
    title: 'Data Science',
    icon: Database,
    skills: [
      { name: 'NumPy', level: 75 },
      { name: 'Pandas', level: 80 },
      { name: 'Matplotlib', level: 70 },
      { name: 'Scikit-learn', level: 65 },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 90 },
      { name: 'Excel', level: 75 },
      { name: 'Photoshop', level: 60 },
      { name: 'Video Editing', level: 65 },
    ],
  },
];

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:glow-border hover:-translate-y-1 hover:scale-[1.02] ${isInView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                style={{ animationDelay: isInView ? `${i * 150}ms` : undefined }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10 animate-bounce-subtle">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                </div>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={isInView} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
