import React, { useEffect, useRef, useState } from 'react';
import { OmSymbol } from '../shared/OmSymbol';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('kleem-visited');
    if (hasVisited) {
      setShouldRender(false);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('kleem-visited', 'true');
          setShouldRender(false);
          onComplete();
        },
      });

      // Step 1: Logo blur-in
      tl.fromTo(
        logoRef.current,
        { filter: 'blur(40px)', opacity: 0, scale: 0.85 },
        { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }
      );

      // Step 2: Petals stagger
      tl.fromTo(
        '.petal',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)' },
        0.4
      );

      // Step 2b: Wordmark
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' },
        0.8
      );

      // Step 3: Pulse
      tl.to(logoRef.current, {
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 1.8);
      tl.to(logoRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 2.1);

      // Step 4: Exit
      tl.to(containerRef.current, {
        y: '-100vh',
        duration: 0.9,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }, 2.5);
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#70061d', willChange: 'transform' }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div ref={logoRef} style={{ opacity: 0 }}>
          <OmSymbol size={120} color="white" showPetals={true} />
        </div>
        <div ref={wordmarkRef} className="flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <div
            className="w-12 h-px"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          />
          <span
            className="text-white font-bold text-[13px] tracking-[0.35em]"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            KLEEM GROUP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
