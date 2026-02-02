import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-parallax');
        let speedValue = 0;
        
        if (speed === 'fast') speedValue = 0.5;
        else if (speed === 'medium') speedValue = 0.3;
        else if (speed === 'slow') speedValue = 0.1;
        
        const yPos = -(scrolled * speedValue);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
