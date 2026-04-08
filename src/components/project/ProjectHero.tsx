import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const targets = titleRef.current.querySelectorAll('.split-target');
      targets.forEach((target: any) => {
        const text = target.innerText;
        target.innerHTML = text.split('').map((char: string) =>
          `<span class="letter" style="display:inline-block; transform:translateY(110%); opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      tl.to(".letter", {
        y: 0,
        opacity: 1,
        stagger: 0.01,
        duration: 1,
        ease: "expo.out",
      });

      tl.to(".hero-fade-in-block", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Canvas */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/images/project-hero.webp"
          alt="Premium Living"
          className="w-full h-full object-cover brightness-[0.85] saturate-[1.1]"
        />

        {/* SOFT VIGNETTE: Darkens edges slightly to focus on center */}
        <div className="absolute inset-0 z-[1] bg-black/20" />

        {/* THE SOFT BURGUNDY BLOOM: 
      Starts soft from the left and washes out before the center. 
      'multiply' blend mode makes the color look 'in' the photo, not 'on' it. */}
        <div
          className="absolute inset-0 z-[2] mix-blend-multiply"
          style={{
            background: 'linear-gradient(to right, rgba(112,6,29,0.45) 0%, rgba(112,6,29,0.1) 40%, transparent 70%)'
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1500px] mx-auto">

        <div className="hero-fade-in-block opacity-0 translate-y-4 mb-4">

        </div>

        <div className="mb-10">
          <h1 ref={titleRef} className="text-white flex flex-col items-start gap-1"
            style={{ fontSize: 'clamp(40px, 7vw, 98px)', lineHeight: '1' }}>

            <span className="split-target block font-[900] tracking-tighter uppercase whitespace-nowrap">
              Residential
            </span>

            <div className="flex flex-wrap items-center gap-x-5">
              <span className="split-target block font-[900] tracking-tighter uppercase">plots & villas.</span>

              {/* THE REFINED HOLLOW + PHYSICAL HIGHLIGHT */}
              <span className="relative group cursor-default">
                {/* Left-to-Right Highlighter Fill */}
                <div className="absolute inset-0 bg-[#70061d] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.65, 0, 0.35, 1]" />
              </span>
            </div>
          </h1>
        </div>

        <div className="hero-fade-in-block opacity-0 translate-y-4 mb-12">
          <p className="text-white/75 max-w-[580px] font-medium leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
            A thoughtfully planned residential development offering the perfect
            balance of comfort, connectivity, and modern design.
          </p>
        </div>

        <div className="hero-fade-in-block opacity-0 translate-y-4">
          <motion.a
            href="#about-project"
            // SCALE UP: 1.05 is the "Sweet Spot" for premium buttons (5% increase)
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }} // Adds a physical "click" feel
            transition={{ type: "spring", stiffness: 400, damping: 25 }} // Makes the scale-up feel snappy but smooth
            className="group relative inline-flex items-center gap-6 bg-[#70061d] px-12 py-5 rounded-full overflow-hidden transition-all duration-700 shadow-[0_20px_40px_rgba(112,6,29,0.25)]"
          >
            {/* WHITE FILL SLIDE */}
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-600 ease-[0.16,1,0.3,1]" />

            <span className="relative z-10 text-white group-hover:text-[#70061d] font-bold text-[12px] tracking-[0.3em] uppercase transition-colors duration-500">
              Explore Now
            </span>

            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="relative z-10 text-white group-hover:text-[#70061d] transition-colors duration-500"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;