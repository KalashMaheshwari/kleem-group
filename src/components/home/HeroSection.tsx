import React, { useEffect, useRef } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
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
    });
    return () => ctx.revert();
  }, []);

  const premiumEase = cubicBezier(0.16, 1, 0.3, 1);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0d0002]"
    >
      {/* 1. BACKGROUND VIDEO */}
      <div ref={videoRef} className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[0.75] saturate-[1.1]"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. OVERLAYS (Darkened) */}
      {/* Increased solid tint opacity to 0.5 for deeper color saturation */}
      <div className="absolute inset-0 bg-[#70061d]/50 z-[1] mix-blend-multiply" />

      {/* Darkened radial mask for higher contrast in the center */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(circle at center, transparent 10%, rgba(13,0,2,0.85) 90%)',
        }}
      />

      {/* Deeper bottom gradient for a seamless merge */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'linear-gradient(to top, #0d0002 0%, transparent 45%)',
        }}
      />

      {/* --- CONTENT LAYERS --- */}
      <div className="relative z-10 w-full h-full pointer-events-none">

        {/* 3. TOP LEFT: BRAND */}
        <div className="absolute top-8 left-8 md:top-14 md:left-14 pointer-events-auto">
          <Link to="/">
            <img
              src="/logofull.webp"
              alt="Kleem Group"
              className="h-12 md:h-18 w-auto object-contain transition-all hover:opacity-70"
            />
          </Link>
        </div>

        {/* 4. TOP RIGHT: EXPLORE CTA */}
        <div className="absolute top-8 right-8 md:top-14 md:right-14 pointer-events-auto">
          <motion.a
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="/#projects"
            className="inline-block bg-white text-ink py-4 px-10 text-[11px] font-black tracking-[0.3em] uppercase rounded-full transition-all duration-500 hover:bg-[#70061d] hover:text-white shadow-2xl"
          >
            Explore Projects
          </motion.a>
        </div>

        {/* 5. CENTER ICON (Massive & Shifted Higher) */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-[12vh]">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: premiumEase }}
            src="/logomain.webp"
            alt="Kleem Group Icon"
            className="w-auto h-[clamp(180px,22vw,320px)] object-contain"
          />
        </div>

        {/* 6. BOTTOM TEXT */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center text-center px-8">
          <div className="overflow-hidden mb-0.5">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: premiumEase }}
              className="text-white font-black tracking-[0.1em] uppercase leading-none"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}
            >
              Shaping
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: premiumEase }}
              className="text-white font-black tracking-[0.1em] uppercase leading-none"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}
            >
              Modern Living
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: premiumEase }}
            className="text-white font-semibold text-[11px] md:text-[13px] max-w-[340px] leading-relaxed tracking-wider"
          >
            Thoughtfully designed homes where architecture meets aspiration.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;