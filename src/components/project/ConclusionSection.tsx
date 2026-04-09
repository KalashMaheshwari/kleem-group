import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ConclusionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll('.conclusion-reveal');

      if (reveals) {
        gsap.fromTo(
          reveals,
          { 
            opacity: 0, 
            y: 80, 
            filter: "blur(12px)" 
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              once: true,           // ← Only fire once (big perf win)
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a0008] py-28 md:py-40"
    >
      {/* Deep Burgundy Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#70061d_0%,#1a0008_70%)] z-[1]" />

      {/* Massive Scarcity Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <span className="font-black text-[28vw] md:text-[22vw] leading-none text-white/5 select-none tracking-[-0.05em]">
          13
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 text-center">

        {/* Preheader */}
        <div className="conclusion-reveal flex items-center justify-center gap-4 mb-8 md:mb-10">
          <div className="h-px w-12 bg-white/20" />
          <span className="font-semibold text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
            04 — FINAL OPPORTUNITY
          </span>
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Headline */}
        <h2
          className="conclusion-reveal font-black text-white leading-[0.88] tracking-tighter uppercase mb-8 md:mb-10"
          style={{ fontSize: 'clamp(42px, 8.5vw, 108px)' }}
        >
          Secure Your<br />
          <span className="text-white/30 italic">Future Today</span>
        </h2>

        {/* Body Text */}
        <p className="conclusion-reveal max-w-[680px] mx-auto text-[17px] md:text-[19px] leading-relaxed text-white/60 mb-16">
          The Dera Bassi micro-market is experiencing rapid appreciation. 
          With proximity to Chandigarh and only <span className="text-white font-semibold underline decoration-[#70061d] underline-offset-4">13 exclusive units</span> remaining, 
          this is the final window for an elite investment.
        </p>

        {/* CTA Area */}
        <div className="conclusion-reveal flex flex-col sm:flex-row items-center justify-center gap-6">
          
          {/* Primary CTA */}
          <a
            href="/#contact"
            className="group relative px-16 py-7 rounded-full bg-white text-[#1a0008] font-black text-sm tracking-[0.25em] uppercase overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95"
          >
            <div className="absolute inset-0 bg-[#70061d] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              SCHEDULE SITE VISIT
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="https://wa.me/917717505741"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-7 text-white font-bold text-sm tracking-[0.25em] uppercase hover:gap-6 transition-all duration-500"
          >
            <span>WHATSAPP US</span>
            <svg 
              width="26" 
              height="26" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.75" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Subtle Side Accents */}
      <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
      <div className="absolute right-8 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
    </section>
  );
};

export default ConclusionSection;