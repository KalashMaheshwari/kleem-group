import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    title: 'Proper Front Space',
    desc: 'Generous setback area ensuring privacy, natural light, and a welcoming approach to your home.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h4l1-4h6l1 4h4" />
        <path d="M4 20V10" />
        <path d="M20 20V10" />
        <path d="M8 16h8" />
        <path d="M8 12h8" />
        <path d="M10 8h4" />
      </svg>
    ),
    title: 'Independent Staircase',
    desc: 'Each unit features its own dedicated staircase — complete independence, complete privacy.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: 'Modern Layout',
    desc: 'Vastu-aligned, open-plan interiors designed for contemporary family living and future flexibility.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Affordable Pricing',
    desc: 'Premium quality at a price point that makes exceptional living genuinely accessible in Tricity.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Prime Location',
    desc: 'Situated on the Dera Bassi–Zirakpur growth corridor, offering excellent connectivity to all three cities.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Quality Construction',
    desc: 'Built with premium-grade materials and supervised by experienced architects and civil engineers.',
  },
];

export const AmenitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.amenity-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      className="bg-white"
      style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 96px)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span
            className="block font-bold text-[11px] tracking-[0.5em] mb-4"
            style={{ color: '#70061d' }}
          >
            03 / AMENITIES
          </span>
          <h2
            className="font-black mb-4 tracking-tighter"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#1a0008', lineHeight: '0.9' }}
          >
            Designed for the <br /> <span className="italic" style={{ color: '#70061d' }}>Way You Live</span>
          </h2>
          <p className="text-[18px] font-medium" style={{ color: 'rgba(26,0,8,0.5)' }}>
            Every detail considered. Nothing left to chance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, i) => (
            <div
              key={i}
              className="amenity-card relative overflow-hidden transition-all duration-500 group"
              style={{
                background: '#70061d', // Solid Burgundy
                borderRadius: '24px',
                padding: 'clamp(32px, 4vw, 48px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(112,6,29,0.2)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-10px)';
                el.style.boxShadow = '0 30px 70px rgba(112,6,29,0.4)';
                el.style.background = '#800822'; // Slightly lighter on hover
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 20px 40px rgba(112,6,29,0.2)';
                el.style.background = '#70061d';
              }}
            >
              {/* Background Number: Ghost White */}
              <span
                className="absolute -bottom-2 -right-2 font-black text-[100px] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.04)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon Container */}
              <div
                className="mb-8 w-14 h-14 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(4px)'
                }}
              >
                {amenity.icon}
              </div>

              {/* Title */}
              <h3
                className="font-black mb-4 uppercase tracking-tight text-white"
                style={{ fontSize: 'clamp(20px, 2.2vw, 24px)' }}
              >
                {amenity.title}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] leading-relaxed relative z-10 font-medium text-white/70"
              >
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;