import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Amenity {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface AmenitiesSectionProps {
  titleMain: string;
  titleItalic: string;
  amenitiesList: Amenity[];
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  titleMain,
  titleItalic,
  amenitiesList
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.amenity-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
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
  }, [amenitiesList]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ 
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 6vw, 96px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span
            className="block font-bold text-[11px] tracking-[0.4em] mb-5 uppercase"
            style={{ color: '#70061d' }}
          >
            / AMENITIES
          </span>
          <h2
            className="font-black tracking-tighter uppercase"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1a0008', lineHeight: '0.9' }}
          >
            {titleMain} <br /> 
            <span className="italic" style={{ color: '#70061d' }}>
              {titleItalic}
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenitiesList.map((amenity, i) => (
            <div
              key={i}
              className="amenity-card group relative"
              onMouseMove={handleMouseMove}
            >
              <div
                className="relative h-full overflow-hidden group-hover:-translate-y-3 group-hover:scale-[1.02]"
                style={{
                  background: '#70061d',
                  borderRadius: '24px',
                  padding: 'clamp(32px, 4vw, 44px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 24px rgba(112,6,29,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 30px 60px -12px rgba(112,6,29,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(112,6,29,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {/* Mouse-follow highlight */}
                <div 
                  className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(112,6,29,0) 70%)',
                    left: 'var(--mouse-x, 50%)',
                    top: 'var(--mouse-y, 50%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />

                {/* Top Accent Line */}
                <div 
                  className="absolute top-0 left-0 w-0 h-[2px] transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: 'rgba(255,255,255,0.4)' }} 
                />

                {/* Background Number */}
                <span
                  className="absolute -bottom-4 -right-2 font-black text-[100px] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[120px] group-hover:-right-1"
                  style={{ color: 'rgba(255,255,255,0.05)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon Container */}
                <div
                  className="mb-8 w-14 h-14 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '16px',
                    color: '#ffffff'
                  }}
                >
                  {amenity.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-black mb-3 uppercase tracking-tight text-white"
                  style={{ fontSize: 'clamp(18px, 2.2vw, 22px)' }}
                >
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed relative z-10 font-medium text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {amenity.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;