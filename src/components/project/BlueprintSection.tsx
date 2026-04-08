import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blueprintData = [
  {
    id: 'villa',
    tag: 'PREMIUM CONFIGURATION',
    title: 'Villa Layout',
    description: 'Spacious layout designed for comfortable family living with balanced space planning and open flow.',
    stats: '100 Sq. Yards',
    image: '/BP1.webp',
    features: ['Balanced Space Planning', 'Comfortable Family Living', 'Open Flow Design']
  },
  {
    id: '1bhk',
    tag: 'SMART CONFIGURATION',
    title: '1 BHK Layout',
    description: 'Smart and efficient layout designed for modern living and maximizing rental utility.',
    stats: '75 Sq. Yards',
    image: '/BP2.webp',
    features: ['Maximum Space Utility', 'Modern Rental Ready', 'Efficient Footprint']
  }
];

export const BlueprintSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary z-30">
      
      {/* WHITE ARCHITECTURAL DOT TEXTURE (Inverted for Burgundy BG) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="h-screen w-full flex flex-col md:flex-row">

        {/* LEFT: EDITORIAL COLUMN */}
        <div className="relative w-full md:w-[42%] h-full flex flex-col justify-center px-12 md:px-20 lg:px-28 bg-primary z-20">
          {blueprintData.map((data, index) => (
            <div key={data.id} className={`bp-content-${index} absolute inset-0 flex flex-col justify-center px-12 md:px-20 lg:px-28 pointer-events-none ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
              
              <div className="mb-6">
                <span className="inline-block font-bold text-[11px] tracking-[0.5em] text-white/50 uppercase border-l-4 border-white/20 pl-4">
                  {data.tag}
                </span>
              </div>

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
        <div className="relative w-full md:w-[58%] h-full bg-black/20 flex items-center justify-center p-6 md:p-10 lg:p-16 overflow-hidden">
          {blueprintData.map((data, index) => (
            <div key={data.id} className={`bp-image-${index} absolute w-full h-full flex items-center justify-center z-10`}>
              <div className="relative group w-full max-w-[92%] h-auto flex items-center justify-center">

                {/* North Marker Asset */}
                <div className="absolute -top-16 right-4 flex flex-col items-center opacity-40">
                  <span className="text-[10px] font-bold text-white mb-1">N</span>
                  <div className="w-[1.5px] h-10 bg-white" />
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

                {/* THE HANG-TAG: Inverted White Style for contrast on Burgundy */}
                <div
                  className="absolute -bottom-6 -right-4 flex flex-col items-center justify-center shadow-2xl z-20 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: '#ffffff',
                    width: '110px',
                    height: '150px',
                    borderRadius: '4px',
                    padding: '24px 10px',
                    transform: 'rotate(-2deg)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary/10 mb-5" />
                  <div className="flex flex-col items-center text-center gap-1">
                    <span className="text-[9px] font-bold text-primary/40 tracking-[0.2em] uppercase">Dimension</span>
                    <span className="text-[24px] font-black text-primary leading-none">
                      {data.stats.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold text-primary/60 tracking-widest italic">SQ YDS</span>
                  </div>
                  
                  {/* Serial Code Barcode */}
                  <div className="mt-auto flex gap-[2px] h-5 items-end opacity-30">
                    {[3, 6, 2, 8, 4, 7, 3].map((h, i) => (
                      <div key={i} className="w-[3px] bg-primary" style={{ height: `${h * 2}px` }} />
                    ))}
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