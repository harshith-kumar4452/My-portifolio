import { useInView } from '@/hooks/useInView';
import { GraduationCap } from 'lucide-react';

const entries = [
  {
    title: 'VNR Vignana Jyothi Institute of Engineering & Technology',
    subtitle: 'B.Tech CSE (Hons) – Data Science',
    detail: 'CGPA: 9.1 | Graduation Year: 2028',
  },
  {
    title: 'IIT Madras',
    subtitle: 'Online BS Degree in Data Science & Applications',
    detail: '',
  },
  {
    title: 'Viswasanthi E.M High School',
    subtitle: 'Intermediate (CBSE PCM)',
    detail: '91.8%',
  },
  {
    title: 'Matriculation',
    subtitle: 'CBSE',
    detail: '95.6%',
  },
];

export function EducationSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border/50">
            <div
              className="w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-1000"
              style={{ height: isInView ? '100%' : '0%' }}
            />
          </div>

          {entries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={entry.title}
                className={`relative flex items-start mb-12 last:mb-0 ${isInView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                style={{ animationDelay: isInView ? `${i * 200}ms` : undefined }}
              >
                {/* Node */}
                <div
                  className={`absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10 ${isInView ? 'animate-glow-pulse' : ''
                    }`}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>

                {/* Content */}
                <div
                  className={`ml-24 sm:ml-0 sm:w-5/12 ${isLeft ? 'sm:pr-16 sm:text-right' : 'sm:ml-auto sm:pl-16 sm:text-left'
                    }`}
                >
                  <div className="rounded-xl border border-border/50 bg-card p-5 transition-all duration-500 hover:glow-border hover:scale-[1.02] hover:-translate-y-1">
                    <h3 className="text-foreground font-semibold mb-1">{entry.title}</h3>
                    <p className="text-primary text-sm font-medium mb-1">{entry.subtitle}</p>
                    {entry.detail && (
                      <p className="text-muted-foreground text-sm">{entry.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
