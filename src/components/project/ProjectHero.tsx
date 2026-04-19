import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroProps {
  titleLine1: string;
  titleLine2: string;
  description: string;
  bgImage: string;
  videoSrc?: string;
  primaryCtaText?: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  titleLine1,
  titleLine2,
  description,
  bgImage,
  videoSrc,
  primaryCtaText = "Explore Now"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // START WITH PHOTO (false)
  const [isShowingVideo, setIsShowingVideo] = useState(false);

  // Initial Load Logic: Show photo for 5s, then switch to video
  useEffect(() => {
    if (!videoSrc) return;

    const initialTimer = setTimeout(() => {
      setIsShowingVideo(true);
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
      }
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [videoSrc]);

  // Loop Logic: When video ends, show photo for 5s, then restart video
  const handleVideoEnd = () => {
    setIsShowingVideo(false); 
    
    setTimeout(() => {
      setIsShowingVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.log("Loop restart blocked:", err));
      }
    }, 5000);
  };

  useEffect(() => {
    // 1. Text Animation Logic
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
  }, [titleLine1, titleLine2]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] bg-black">
        
        {/* IMAGE LAYER - Lower z-index, always there */}
        <img
          src={bgImage}
          alt={titleLine1}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85] saturate-[1.1]"
          style={{ zIndex: 1 }}
        />

        {/* VIDEO LAYER - Higher z-index, fades in/out */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto" // Forces background loading during the 5s photo time
            onEnded={handleVideoEnd}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              isShowingVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: 2 }}
          />
        )}

        {/* OVERLAYS */}
        <div className="absolute inset-0 z-[3] bg-black/20" />
        <div
          className="absolute inset-0 z-[4] mix-blend-multiply"
          style={{
            background: 'linear-gradient(to right, rgba(112,6,29,0.45) 0%, rgba(112,6,29,0.1) 40%, transparent 70%)'
          }}
        />
      </div>

      {/* CONTENT BLOCK (Same as before) */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1500px] mx-auto">
        <div className="mb-10">
          <h1 ref={titleRef} className="text-white flex flex-col items-start gap-1"
            style={{ fontSize: 'clamp(40px, 7vw, 98px)', lineHeight: '1' }}>
            <span className="split-target block font-[900] tracking-tighter uppercase whitespace-nowrap">
              {titleLine1}
            </span>
            <span className="split-target block font-[900] tracking-tighter uppercase">
              {titleLine2}
            </span>
          </h1>
        </div>

        <div className="hero-fade-in-block opacity-0 translate-y-4 mb-12">
          <p className="text-white/75 max-w-[580px] font-medium leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
            {description}
          </p>
        </div>

        <div className="hero-fade-in-block opacity-0 translate-y-4">
          <motion.a
            href="#projectabout"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-6 bg-[#70061d] px-12 py-5 rounded-full overflow-hidden transition-all duration-700"
          >
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-600 ease-[0.16,1,0.3,1]" />
            <span className="relative z-10 text-white group-hover:text-[#70061d] font-bold text-[12px] tracking-[0.3em] uppercase transition-colors duration-500">
              {primaryCtaText}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 text-white group-hover:text-[#70061d] transition-colors duration-500">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};