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

      gsap.set(logoRef.current, {
        scale: 0.9,
        opacity: 0
      });

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
        ['WebkitMaskImage' as any]: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        maskImage: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
      } as React.CSSProperties}
    >

      {/* ── LAYERED BACKGROUND ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #3d0110 0%, #220008 50%, #0e0003 100%)',
      }} />

      {/* Architectural grid — hidden on mobile */}
      <div className="absolute inset-0 hidden md:block" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 1,
      }} />

      {/* Horizontal center rule — hidden on mobile */}
      <div className="absolute pointer-events-none hidden md:block" style={{
        top: '50%',
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent 100%)',
      }} />

      {/* ── CORNER BRACKETS — Hidden on Mobile ── */}
      <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M1 48 L1 1 L48 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
      </div>
      <div className="absolute top-8 right-8 pointer-events-none hidden md:block">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M47 48 L47 1 L0 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 pointer-events-none hidden md:block">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M1 0 L1 47 L48 47" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none hidden md:block">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M47 0 L47 47 L0 47" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
      </div>

      {/* ── SIDE LABELS — Hidden on Mobile ── */}
      <div className="absolute left-10 top-1/2 pointer-events-none hidden md:block" style={{ transform: 'translateY(-50%) rotate(-90deg)' }}>
        <span className="text-[7px] tracking-[0.45em] text-white/10 uppercase">Est. 2010 · India</span>
      </div>
      <div className="absolute right-10 top-1/2 pointer-events-none hidden md:block" style={{ transform: 'translateY(-50%) rotate(90deg)' }}>
        <span className="text-[7px] tracking-[0.45em] text-white/10 uppercase">Building Tomorrow</span>
      </div>

      {/* ── MICRO PARTICLES — Hidden on Mobile ── */}
      <div className="hidden md:block">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
              width: '1px', height: '1px', background: 'rgba(255,255,255,0.05)',
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`
          }} />
        ))}
      </div>

      {/* ── CONTENT WRAPPER ── */}
      <div ref={contentRef} className="flex flex-col items-center w-full px-10 relative z-10" style={{ maxWidth: '780px' }}>

        {/* LOGO — Scaled down for mobile */}
        <div className="relative flex items-center justify-center mb-8 md:mb-14">
          <img
            ref={logoRef}
            src="/logomain.webp"
            alt="Kleem Group"
            className="w-32 md:w-44 h-auto relative z-10"
            style={{ filter: 'drop-shadow(0 0 25px rgba(200,15,50,0.18))' }}
          />
        </div>

        {/* TYPOGRAPHY BLOCK */}
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

          {/* Identity Tags — Hidden on mobile for cleaner look */}
          <div className="overflow-hidden w-full mb-2 hidden md:block">
            <div className="reveal-text flex items-center justify-center gap-0">
              {['Architects of Space', 'Builders of Legacy'].map((tag) => (
                <span key={tag} className="text-[9px] tracking-[0.35em] uppercase text-white/20 font-medium px-4">{tag}</span>
              ))}
            </div>
          </div>

          {/* LOADING BAR — Minimal for Mobile */}
          <div className="flex flex-col items-center gap-4 w-full pt-4 md:pt-0">
            <div className="relative w-[140px] md:w-[180px]">
              <div className="relative overflow-hidden rounded-full h-px">
                <div className="absolute inset-0 bg-white/5" />
                <div className="loading-line absolute inset-0 origin-left bg-gradient-to-r from-white/20 via-white to-burgundy" />
              </div>
            </div>
            <span className="text-[8px] tracking-[0.4em] text-white/15 uppercase font-medium">Initializing</span>
          </div>
        </div>
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,0,2,0.8)_100%)]" />

    </div>
  );
};

export default Preloader;