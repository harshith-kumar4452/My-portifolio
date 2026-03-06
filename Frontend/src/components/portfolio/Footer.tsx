import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Kakkirala Harshith Kumar. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/harshith-kumar4452"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300 hover:glow-blue"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/kakkirala-harshithkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300 hover:glow-blue"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:harshithkumar4452@gmail.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300 hover:glow-blue"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:glow-blue transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
