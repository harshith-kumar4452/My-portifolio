import { useInView } from '@/hooks/useInView';
import { Code2, Layers, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { icon: Code2, label: 'Projects Built', value: 10 },
  { icon: Layers, label: 'Technologies Learned', value: 15 },
  { icon: Clock, label: 'Years of Learning', value: 3 },
];

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [active, target]);
  return <span>{count}+</span>;
}

export function AboutSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        <div
          className={`max-w-3xl mx-auto rounded-2xl border border-border/50 bg-card p-8 sm:p-10 mb-16 transition-all duration-500 hover:glow-border ${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'
            }`}
        >
          <p className="text-muted-foreground text-lg leading-relaxed">
            I am a Computer Science student specializing in Data Science, passionate about building
            intelligent systems and modern web applications. I enjoy solving real-world problems
            using programming, AI, and data analytics. My goal is to create impactful technology
            solutions that make a difference in people's lives.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-xl border border-border/50 bg-card p-6 text-center transition-all duration-500 hover:glow-border hover:-translate-y-1 hover:scale-[1.05] ${isInView ? `animate-fade-in-up delay-${(i + 3) * 100}` : 'opacity-0'
                  }`}
                style={{ animationDelay: isInView ? `${(i + 3) * 100}ms` : undefined }}
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  <CountUp target={stat.value} active={isInView} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
