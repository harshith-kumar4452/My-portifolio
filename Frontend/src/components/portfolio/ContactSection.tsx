import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Github, Linkedin, Mail } from 'lucide-react';

export function ContactSection() {
  const { ref, isInView } = useInView(0.1);
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: 'Message sent!', description: 'Thank you for reaching out. I will get back to you soon.' });
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-blue" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-5 ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}
          >
            <div>
              <Label htmlFor="name" className="text-foreground mb-2 block">Name</Label>
              <Input
                id="name"
                required
                placeholder="Your name"
                className="bg-secondary border-border/50 focus:border-primary focus:glow-blue transition-all"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground mb-2 block">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                className="bg-secondary border-border/50 focus:border-primary focus:glow-blue transition-all"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground mb-2 block">Message</Label>
              <Textarea
                id="message"
                required
                placeholder="Your message..."
                rows={5}
                className="bg-secondary border-border/50 focus:border-primary focus:glow-blue transition-all resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full glow-blue hover:glow-blue-lg transition-all duration-300"
              size="lg"
            >
              {sending ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
            </Button>
          </form>

          {/* Social links */}
          <div className={`flex flex-col justify-center items-center md:items-start gap-6 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <p className="text-muted-foreground text-lg text-center md:text-left">
              Feel free to reach out to me through the form or via my social links below.
            </p>

            <div className="space-y-4">
              <a
                href="https://github.com/harshith-kumar4452"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="p-3 rounded-lg bg-secondary group-hover:glow-blue transition-all">
                  <Github className="h-5 w-5" />
                </div>
                <span>github.com/harshith-kumar4452</span>
              </a>
              <a
                href="https://linkedin.com/in/kakkirala-harshithkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="p-3 rounded-lg bg-secondary group-hover:glow-blue transition-all">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span>linkedin.com/in/kakkirala-harshithkumar</span>
              </a>
              <a
                href="mailto:harshithkumar4452@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="p-3 rounded-lg bg-secondary group-hover:glow-blue transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <span>harshithkumar4452@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
