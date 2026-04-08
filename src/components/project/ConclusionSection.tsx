import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ConclusionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Background Zoom
      gsap.to(bgRef.current, {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // 2. Content Stagger
      const elements = sectionRef.current?.querySelectorAll('.conclusion-reveal');
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a0008]"
      style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}
    >

      {/* Luxury Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(circle at center, rgba(112,6,29,0.92) 0%, #1a0008 100%)'
        }}
      />

      {/* Massive Scarcity Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <span className="font-black text-[35vw] text-white/[0.03] leading-none select-none">
          13
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">

        <div className="conclusion-reveal flex items-center gap-4 mb-10">
          <div className="w-10 h-px bg-white/30" />
          <span className="font-bold text-[11px] tracking-[0.6em] text-white/50 uppercase">
            04 / THE OPPORTUNITY
          </span>
          <div className="w-10 h-px bg-white/30" />
        </div>

        <h2
          className="conclusion-reveal font-[900] text-white mb-10 max-w-[900px] leading-[0.9] tracking-tighter uppercase"
          style={{ fontSize: 'clamp(44px, 7.5vw, 110px)' }}
        >
          Secure Your <br /> <span className="text-white/40 italic">Future</span> Today.
        </h2>

        <p
          className="conclusion-reveal max-w-[680px] mx-auto mb-14 leading-relaxed font-medium"
          style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', color: 'rgba(255,255,255,0.6)' }}
        >
          The Dera Bassi micro-market is appreciating rapidly. With proximity to Chandigarh and only <span className="text-white underline decoration-primary underline-offset-4">13 units</span> available, this is the final window for an elite investment.
        </p>

        {/* Dynamic Scarcity Badge */}
        <div className="conclusion-reveal group relative mb-16">
          <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
        </div>

        {/* Premium CTA Block */}
        <div className="conclusion-reveal flex flex-col md:flex-row items-center gap-8">
          <a
            href="/#contact"
            className="group relative px-14 py-6 rounded-full bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[#70061d] group-hover:text-white font-black text-sm tracking-[0.2em] uppercase transition-colors">
              Schedule Site Visit
            </span>
          </a>

          <a
            href="https://wa.me/917717505741"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-white font-bold text-sm tracking-[0.2em] uppercase transition-all hover:gap-6"
          >
            <span>WhatsApp Us</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Architectural Branding Side-Lines */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5 hidden 2xl:block" />
      <div className="absolute right-10 top-0 bottom-0 w-px bg-white/5 hidden 2xl:block" />
    </section>
  );
};

export default ConclusionSection;