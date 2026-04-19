import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Spec {
  label: string;
  value: string;
  detail: string;
}

interface ProjectAboutProps {
  headingMain: string;
  headingItalic: string;
  descriptionTop: string;
  descriptionSub: string;
  projectSpecs: Spec[];
  highlights: string[];
  bannerImage?: string;
}

export const ProjectAbout: React.FC<ProjectAboutProps> = ({
  headingMain,
  headingItalic,
  descriptionTop,
  descriptionSub,
  projectSpecs,
  highlights,
  bannerImage = "/images/project-banner.webp"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Data Lines Entrance
      gsap.from(".data-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 2,
        ease: "expo.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".specs-section",
          start: "top 85%",
        }
      });

      // Fade Up animations
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
          }
        });
      });
    });

    return () => ctx.revert();
  }, [projectSpecs, highlights]); // Re-run animations if props change

  return (
    <section id="projectabout" ref={sectionRef} className="relative z-20 overflow-hidden">

      {/* --- SECTION 1: BURGUNDY HEADER --- */}
      <div className="bg-primary pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-white/40" />
                <span className="font-bold text-[11px] tracking-[0.5em] text-white/60 uppercase">
                  / Project Overview
                </span>
              </div>
              <h2 className="fade-up text-[clamp(40px,5vw,85px)] font-[900] text-white leading-[0.85] tracking-tighter uppercase">
                {headingMain} <br /> <span className="text-white/40 italic">{headingItalic}</span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 pt-4">
              <p className="fade-up text-[20px] md:text-[28px] leading-[1.1] text-white font-bold mb-10 tracking-tight">
                {descriptionTop}
              </p>
              <p className="fade-up text-[17px] leading-relaxed text-white/60 max-w-[500px]">
                {descriptionSub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: SPECS --- */}
      <div className="specs-section bg-primary pb-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="data-line h-px w-full bg-white/20 mb-0" />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {projectSpecs.map((spec, i) => (
              <div key={i} className="group relative p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />

                <div className="relative z-10 transition-colors duration-500">
                  <span className="block text-[10px] font-bold tracking-[0.4em] text-white/60 group-hover:text-primary uppercase mb-8 transition-colors">
                    {spec.label}
                  </span>
                  <span className="block text-4xl lg:text-5xl font-black text-white group-hover:text-primary mb-4 tracking-tighter transition-colors">
                    {spec.value}
                  </span>
                  <div className="flex items-center gap-2 text-white/40 group-hover:text-primary transition-colors">
                    <span className="w-4 h-px bg-white/40 group-hover:bg-primary transition-colors" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{spec.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="data-line h-px w-full bg-white/20 mt-0" />
        </div>
      </div>

      {/* --- SECTION 3: WHITE HIGHLIGHTS --- */}
      <div className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="relative rounded-[48px] overflow-hidden group shadow-2xl h-auto bg-[#f9f9f9]">
              <img
                src={bannerImage}
                alt="Project Highlights"
                className="w-full h-auto block object-contain grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            <div className="space-y-16 lg:pt-8">
              <h3 className="text-4xl font-black text-ink tracking-tighter uppercase">Key Highlights</h3>
              <div className="grid grid-cols-1 gap-10">
                {highlights.map((item, i) => (
                  <div key={i} className="group flex flex-col gap-4 cursor-default">
                    <div className="flex justify-between items-end">
                      <span className="text-[15px] font-bold text-ink uppercase tracking-[0.1em] transition-all duration-500 group-hover:text-primary group-hover:pl-4">
                        {item}
                      </span>
                      <span className="text-primary font-mono text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all">0{i + 1}</span>
                    </div>
                    <div className="h-[2px] w-full bg-primary/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectAbout;