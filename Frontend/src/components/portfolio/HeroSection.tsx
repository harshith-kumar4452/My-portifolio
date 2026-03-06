import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = ['Full Stack Developer', 'AI Enthusiast', 'Data Science Student'];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length === current.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);



  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-orb pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-orb-2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <div className="flex justify-center lg:order-1 order-1">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-40 animate-glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-primary/30 overflow-hidden bg-secondary flex items-center justify-center glow-blue transition-all duration-500 group-hover:scale-105 group-hover:glow-blue-lg group-hover:border-primary/60">
                <img src="/harshith.jpeg" alt="Harshith Kumar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:order-2 order-2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Kakkirala{' '}
              <span className="text-gradient">Harshith Kumar</span>
            </h1>
            <div className="text-xl sm:text-2xl text-muted-foreground mb-6 h-8">
              <span>{text}</span>
              <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-typing-cursor" />
            </div>
            <p className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed">
              I am a passionate developer interested in building intelligent applications,
              data-driven solutions, and impactful web platforms.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link to="/contact">
                <Button
                  className="glow-blue hover:glow-blue-lg transition-all duration-300 px-6 py-3 text-base w-full sm:w-auto"
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" /> Contact Me
                </Button>
              </Link>

              <a href="/Harshith_Resume.pdf" download="Harshith_Resume.pdf" target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 px-6 py-3 text-base w-full sm:w-auto"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
