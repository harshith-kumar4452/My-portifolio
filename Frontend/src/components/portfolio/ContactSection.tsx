import { useInView } from '@/hooks/useInView';
import { Mail, MapPin } from 'lucide-react';

export function ContactSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="contact" className="contact-section py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 contact-container">
        <div className={`mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3>Contact</h3>
          <div className="w-20 h-1 bg-primary rounded-full glow-blue mt-4" />
        </div>

        <div className={`contact-flex ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Left Box */}
          <div className="contact-box max-w-xl gap-4">
            <h4>Get in Touch</h4>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm always open to new opportunities, collaborations, or simply discussing interesting tech and design ideas. Let's connect!
            </p>
            
            <h2 className="mt-2">Let's build something <span>extraordinary</span>.</h2>
            
            <h5 className="mt-4 flex items-center">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Hyderabad, India</span>
            </h5>
          </div>

          {/* Right Box */}
          <div className="contact-box min-w-[250px] gap-6">
            <h4>Socials</h4>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href="mailto:harshithkumar4452@gmail.com"
                className="contact-social flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" /> Email
              </a>
              <a
                href="https://linkedin.com/in/kakkirala-harshithkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/harshith-kumar4452"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
