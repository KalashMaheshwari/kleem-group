import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  const [maskSize] = useState({ value: -50 });

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

      gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out'
      })
      .fromTo('.reveal-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        "-=1.6"
      )
      .fromTo('.loading-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power4.inOut' },
        "-=1"
      )
      .to(maskSize, {
        value: 150,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (containerRef.current) {
            const val = maskSize.value;
            const mask = `radial-gradient(circle, rgba(0,0,0,0) ${val}%, rgba(0,0,0,1) ${val + 50}%)`;
            containerRef.current.style.webkitMaskImage = mask;
            containerRef.current.style.maskImage = mask;
          }
        }
      }, "+=0.1")
      .call(() => {
        onComplete();
      }, [], "-=0.5")
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.4,
        ease: "power2.inOut"
      }, "<");
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
      style={{
        background: '#36020c',
        maskImage: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
      } as React.CSSProperties}
    >
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #3d0110 0%, #220008 50%, #0e0003 100%)',
      }} />

      <div className="absolute inset-0 hidden md:block" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />

      {/* ── CONTENT ── */}
      <div ref={contentRef} className="flex flex-col items-center w-full px-10 relative z-10" style={{ maxWidth: '780px' }}>
        
        <div className="relative flex items-center justify-center mb-8 md:mb-14">
          <img
            ref={logoRef}
            src="/goldfulllogo.webp"
            alt="Kleem Group"
            className="w-32 md:w-44 h-auto relative z-10"
            style={{ filter: 'drop-shadow(0 0 25px rgba(200,15,50,0.18))' }}
          />
        </div>

        <div className="flex flex-col items-center text-center w-full">
          <div className="overflow-hidden w-full mb-3">
            <div className="reveal-text flex items-center justify-center gap-4 md:gap-6">
              <div className="flex-1 max-w-[60px] md:max-w-[140px] h-px bg-gradient-to-r from-transparent to-white/15" />
              <span className="text-[10px] md:text-[1.1rem] font-light tracking-[0.4em] md:tracking-[0.55em] uppercase text-white/50 whitespace-nowrap">
                Welcome to
              </span>
              <div className="flex-1 max-w-[60px] md:max-w-[140px] h-px bg-gradient-to-l from-transparent to-white/15" />
            </div>
          </div>

          <div className="overflow-hidden w-full mb-6">
            <h1 className="reveal-text block font-black uppercase text-white text-[2.5rem] md:text-[7rem] tracking-tighter leading-[0.9]">
              Kleem Group
            </h1>
          </div>

          {/* ── SOLID ARCHITECTURAL LOADER ── */}
<div className="flex flex-col items-center w-full pt-8 md:pt-4">
  <div className="relative w-[140px] md:w-[200px] flex flex-col items-center">
    
    {/* THE SOLID TRACK */}
    <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      <div 
        className="loading-line absolute inset-0 origin-left bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)]" 
      />
    </div>

    {/* MINIMALIST SPEC LABELS */}
    <div className="w-full flex justify-between mt-3 px-1">
       <div className="flex flex-col items-start gap-1 opacity-20 transition-opacity hover:opacity-40">
          <span className="text-[5px] font-mono tracking-[0.2em] uppercase leading-none">Status // Ready</span>
          <span className="text-[5px] font-mono tracking-[0.2em] uppercase leading-none">Grade_A1</span>
       </div>
       <div className="flex flex-col items-end gap-1 opacity-20 transition-opacity hover:opacity-40">
          <span className="text-[5px] font-mono tracking-[0.2em] uppercase leading-none">Vector_Grid</span>
          <span className="text-[5px] font-mono tracking-[0.2em] uppercase leading-none">Coord_51.2</span>
       </div>
    </div>
  </div>

  {/* ── THEME TAG ── */}
  <div className="mt-8 flex items-center gap-2 group cursor-default">
    <div className="w-1.5 h-1.5 rounded-full bg-[#70061d] shadow-[0_0_8px_#70061d]" />
    <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-black transition-colors group-hover:text-white">
      Setting Foundations
    </span>
  </div>
</div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,0,2,0.8)_100%)]" />
    </div>
  );
};

export default Preloader;