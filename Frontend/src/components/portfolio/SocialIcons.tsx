import { useRef, useEffect } from 'react';
import { Github, Linkedin, Instagram, FileText } from 'lucide-react';

function MagneticIcon({ children, href, title }: { children: React.ReactNode; href: string; title: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    const a = aRef.current;
    if (!span || !a) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = span.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse x relative to span
      const y = e.clientY - rect.top;  // mouse y relative to span

      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = x - centerX;
      const deltaY = y - centerY;

      // Pull the anchor towards the mouse by 35% of the distance
      a.style.setProperty('--siLeft', `${50 + (deltaX / rect.width) * 45}%`);
      a.style.setProperty('--siTop', `${50 + (deltaY / rect.height) * 45}%`);
      a.style.transform = `translate(-50%, -50%) scale(1.15)`;
    };

    const handleMouseLeave = () => {
      // Reset position
      a.style.setProperty('--siLeft', '50%');
      a.style.setProperty('--siTop', '50%');
      a.style.transform = `translate(-50%, -50%) scale(1)`;
    };

    span.addEventListener('mousemove', handleMouseMove);
    span.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      span.removeEventListener('mousemove', handleMouseMove);
      span.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span ref={spanRef} className="cursor-pointer">
      <a
        ref={aRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      >
        {children}
      </a>
    </span>
  );
}

export function SocialIcons() {
  return (
    <div className="icons-section">
      <div className="social-icons">
        <MagneticIcon href="https://github.com/harshith-kumar4452" title="GitHub">
          <Github className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" />
        </MagneticIcon>
        
        <MagneticIcon href="https://linkedin.com/in/kakkirala-harshithkumar" title="LinkedIn">
          <Linkedin className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" />
        </MagneticIcon>
        
        <MagneticIcon href="https://x.com" title="X (Twitter)">
          <svg viewBox="0 0 24 24" className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px] fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </MagneticIcon>
        
        <MagneticIcon href="https://instagram.com" title="Instagram">
          <Instagram className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" />
        </MagneticIcon>
      </div>

      <a
        href="/Harshith_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-button"
      >
        <span className="mr-1">
          <FileText className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
        </span>
        RESUME
      </a>
    </div>
  );
}

export default SocialIcons;
