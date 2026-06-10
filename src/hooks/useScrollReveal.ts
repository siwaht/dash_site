import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  staggerDelay?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  staggerDelay = 100
}: UseScrollRevealOptions = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.scroll-reveal');
            reveals.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * staggerDelay);
            });
            // Reveal animation only needs to run once per section
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, staggerDelay]);

  return sectionRef;
}
