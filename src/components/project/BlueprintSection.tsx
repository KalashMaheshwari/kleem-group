import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blueprintData = [
  {
    id: 'villa',
    tag: 'PREMIUM CONFIGURATION',
    title: 'Villa Layout',
    description: 'Spacious layout designed for comfortable family living with balanced space planning and open flow.',
    stats: 'Ground Floor',
    image: '/BP1.webp',
    features: ['Balanced Space Planning', 'Comfortable Family Living', 'Open Flow Design']
  },
  {
    id: '1bhk',
    tag: 'PREMIUM CONFIGURATION',
    title: 'Villa Layout',
    description: 'Smart and efficient layout designed for modern living and maximizing rental utility.',
    stats: 'First Floor',
    image: '/BP2.webp',
    features: ['Maximum Space Utility', 'Modern Rental Ready', 'Efficient Footprint']
  }
];

export const BlueprintSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop GSAP Animation (unchanged)
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          immediateRender: false,
        }
      });

      // --- INITIAL STATES ---
      gsap.set(".bp-image-0", { x: "0%", opacity: 1, filter: "blur(0px)", rotate: 0 });
      gsap.set(".bp-content-0", { opacity: 1, y: 0, filter: "blur(0px)" });

      gsap.set(".bp-image-1", { x: "110vw", opacity: 0, filter: "blur(40px)", rotate: 8 });
      gsap.set(".bp-content-1", { opacity: 0, y: 80, filter: "blur(20px)" });

      // --- TIMELINE PHASES ---
      tl.to({}, { duration: 0.5 })
        .to(".bp-content-0", {
          opacity: 0,
          y: -80,
          filter: "blur(30px)",
          duration: 0.8,
          ease: "power2.in"
        })
        .to(".bp-image-0", {
          y: "130vh",
          opacity: 0,
          rotate: -5,
          filter: "blur(40px)",
          duration: 1.2,
          ease: "power2.in"
        }, "-=0.6")
        .fromTo(".bp-content-1",
          { opacity: 0, y: 80, filter: "blur(30px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        )
        .fromTo(".bp-image-1",
          { x: "110vw", opacity: 0, filter: "blur(60px)", rotate: 10 },
          { x: "0%", opacity: 1, filter: "blur(0px)", rotate: 0, duration: 1.8, ease: "expo.out" },
          "-=1"
        );
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile scroll animations
  useEffect(() => {
    if (!isMobile) return;

    const ctx = gsap.context(() => {
      // Animate each mobile card on scroll
      gsap.utils.toArray('.mobile-bp-card').forEach((card: any, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Animate the image separately
        const image = card.querySelector('.mobile-bp-image');
        if (image) {
          gsap.fromTo(image,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary z-30">

      {/* WHITE ARCHITECTURAL DOT TEXTURE (Inverted for Burgundy BG) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MOBILE VIEW */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden">
        {/* Mobile Header */}
        <div className="px-6 pt-16 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-white/40" />
            <span className="text-[10px] tracking-[0.3em] text-white/60 font-semibold uppercase">
              Floor Plans
            </span>
          </div>
          <h2 className="text-4xl font-black text-white leading-[0.95] tracking-tight uppercase">
            Blueprint<br />
            <span className="text-white/60">Gallery</span>
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="px-4 pb-16 space-y-8">
          {blueprintData.map((data, index) => (
            <div 
              key={data.id} 
              className="mobile-bp-card relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10"
            >
              {/* Card Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] tracking-[0.25em] text-white/40 font-bold uppercase">
                    {data.tag}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-white/30 font-mono">
                    0{index + 1}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-2xl font-black text-white leading-tight tracking-tight uppercase">
                    {data.title}
                  </h3>
                  <div className="h-px flex-grow bg-white/10" />
                </div>
                
                <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 text-[11px] font-bold text-white/80 tracking-wider">
                  {data.stats}
                </span>
              </div>

              {/* Blueprint Image */}
              <div className="relative px-4 py-4">
                <div className="mobile-bp-image relative bg-white rounded-2xl p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                  {/* North Arrow */}
                  <div className="absolute -top-3 right-6 z-20 flex flex-col items-center opacity-70">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#70061d"
                      className="drop-shadow-sm"
                    >
                      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                    </svg>
                    <span className="mt-1 text-[10px] font-black text-white/60 tracking-[0.15em]">
                      N
                    </span>
                  </div>

                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ filter: 'contrast(1.05) brightness(1)' }}
                  />

                  {/* Digital Stamp */}
                  <div className="absolute bottom-5 left-5 opacity-30">
                    <span className="text-[8px] font-mono text-primary tracking-widest uppercase font-bold">
                      ARCH_SPEC // 2026.KG
                    </span>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm leading-relaxed text-white/60 mb-5">
                  {data.description}
                </p>

                <div className="space-y-3">
                  {data.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-white/30" />
                      <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.15em]">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Mobile Bottom Indicator */}
        <div className="flex justify-center pb-12">
          <div className="flex items-center gap-3">
            {blueprintData.map((_, idx) => (
              <div 
                key={idx}
                className="w-2 h-2 rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* DESKTOP VIEW (COMPLETELY UNCHANGED) */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex h-screen w-full flex-row">

        {/* LEFT: EDITORIAL COLUMN */}
        <div className="relative w-[42%] h-full flex flex-col justify-center px-12 md:px-20 lg:px-28 bg-primary z-20">
          {blueprintData.map((data, index) => (
            <div key={data.id} className={`bp-content-${index} absolute inset-0 flex flex-col justify-center px-12 md:px-20 lg:px-28 pointer-events-none ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>

              <h2 className="font-[900] text-[clamp(42px,5.5vw,72px)] text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                {data.title.split(' ').map((word, i) => (<span key={i} className="block">{word}</span>))}
              </h2>

              <div className="flex items-center gap-6 mb-10">
                <span className="text-[40px] font-black text-white leading-none italic">{data.stats}</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>

              <p className="text-[19px] leading-relaxed text-white/70 max-w-[420px] mb-12 font-medium">
                {data.description}
              </p>

              <div className="grid grid-cols-1 gap-5">
                {data.features.map((f, i) => (
                  <div key={i} className="group flex items-center gap-4">
                    <div className="w-10 h-[1.5px] bg-white/20 group-hover:w-14 group-hover:bg-white transition-all duration-500" />
                    <span className="font-bold text-white text-[13px] uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: BLUEPRINT CANVAS */}
        <div className="relative w-[58%] h-full bg-black/20 flex items-center justify-center p-6 md:p-10 lg:p-16 overflow-hidden">
          {blueprintData.map((data, index) => (
            <div key={data.id} className={`bp-image-${index} absolute w-full h-full flex items-center justify-center z-10`}>
              <div className="relative group w-full max-w-[92%] h-auto flex items-center justify-center">

                {/* Minimalist Delta North Arrow - N Below */}
                <div className="absolute -top-16 right-8 flex flex-col items-center group/north select-none transition-opacity duration-500 opacity-60 hover:opacity-100">

                  {/* The SVG Arrowhead */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105"
                  >
                    {/* High-precision Delta Path */}
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                  </svg>

                  {/* The N Identifier */}
                  <span className="mt-2 text-[13px] font-black text-white tracking-[0.2em] leading-none transition-colors duration-500 group-hover:text-[#70061d]">
                    N
                  </span>
                </div>

                {/* Main Drawing Board */}
                <div className="relative shadow-[0_60px_130px_-30px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden bg-white p-3 md:p-5 border border-white/10">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full max-h-[76vh] object-contain rounded-sm"
                    style={{ filter: 'contrast(1.05) brightness(1)' }}
                  />

                  {/* Digital Stamp */}
                  <div className="absolute top-4 left-6 opacity-30">
                    <span className="text-[9px] font-mono text-primary tracking-widest uppercase font-bold">
                      ARCH_SPEC // 2026.KG
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};