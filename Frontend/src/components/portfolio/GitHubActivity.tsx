import { useInView } from '@/hooks/useInView';
import { useMemo } from 'react';

export function GitHubActivity() {
  const { ref, isInView } = useInView(0.1);

  const weeks = useMemo(() => {
    return Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
    );
  }, []);

  const levelClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-secondary';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/70';
      case 4: return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        <div
          className={`rounded-xl border border-border/50 bg-card p-6 sm:p-8 transition-all duration-300 hover:glow-border overflow-x-auto ${
            isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}
        >
          <div className="flex gap-1 min-w-[700px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`w-3 h-3 rounded-sm ${levelClass(level)} transition-all duration-300`}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transitionDelay: `${(wi * 7 + di) * 2}ms`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className={`w-3 h-3 rounded-sm ${levelClass(l)}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
