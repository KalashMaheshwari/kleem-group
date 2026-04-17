import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const brands = [
  {
    id: 'builders',
    name: 'Kleem Builder Pvt Ltd',
    tagline: 'Crafting Luxury Landmarks',
    image: '/images/kasoli.webp',
    type: 'nested',
    description: 'Architecting dreams into reality with world-class residential developments.',
    projects: [
      { name: '1 BHK Flats', path: '/projects/1bhk-flats', status: 'New Launch' },
    ]
  },
  {
    id: 'developers',
    name: 'Kleem Developers (OPC) Pvt Ltd',
    tagline: 'Strategic Urban Growth',
    image: '/images/developers-bg.jpg',
    type: 'nested',
    description: 'Creating high-yield investment opportunities through strategic land acquisition and urban planning.',
    projects: [
      { name: 'Luxury Villas', path: '/projects/dera-bassi', status: 'Ongoing' },
      { name: 'La Essence', path: '/projects/la-essence', status: 'Coming Soon' },
    ]
  },
  {
    id: 'pharma',
    name: 'Kleem Pharma Pvt Ltd',
    tagline: 'Pioneering Healthcare',
    image: '/images/pharma-bg.jpg',
    type: 'static',
    description: 'Redefining global pharmaceutical excellence through advanced research and sustainable healthcare solutions.',
    website: 'https://kleempharma.com',
  },
  {
    id: 'sports',
    name: 'Nextera Sports (OPC) Pvt Ltd',
    tagline: 'Beyond The Game',
    image: '/images/sports-bg.jpg',
    type: 'static',
    description: 'Transforming the sporting landscape with cutting-edge management and athlete-first strategies.',
    website: 'https://nexterasports.com',
  }
];

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export const ProjectNavigator: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const elapsedRef = useRef(0);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── TOGGLE LOGIC ──
  const handleToggle = useCallback((idx: number) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setActiveIndex(prev => (prev === idx ? -1 : idx));
    } else {
      setActiveIndex(idx);
    }
    elapsedRef.current = 0;
  }, []);

  // ── GSAP FOR ACCORDIONS & HERO ──
  useEffect(() => {
    brands.forEach((_, idx) => {
      const content = accordionRefs.current[idx];
      if (content) {
        if (idx === activeIndex) {
          gsap.to(content, { height: 'auto', opacity: 1, duration: 0.5, ease: "power3.out" });
        } else {
          gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
      }
    });

    if (activeIndex >= 0) {
      const tl = gsap.timeline();
      tl.fromTo(".hero-tagline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-description", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-cta", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(".hero-projects-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    }
  }, [activeIndex]);

  const activeBrand = brands[activeIndex] || brands[0];

  return (
    <section id="projects" className="w-full bg-gradient-to-b from-white via-[#fcfcfc] to-[#f7f5f5] py-20 md:py-36 overflow-hidden relative">
      
      <style>{`
        /* Liquid Glass - Dark Context (Hero) */
        .liquid-glass-dark {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .liquid-glass-dark::before {
          content: '';
          position: absolute;
          top: 0; left: -150%; width: 100%; height: 100%;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transition: left 0.7s ease-in-out;
          transform: skewX(-20deg);
          z-index: 1;
        }
        .liquid-glass-dark:hover::before { left: 150%; }
        .liquid-glass-dark:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        /* Liquid Glass - Light Context (Sidebar & Mobile) */
        .liquid-glass-light {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .liquid-glass-light:hover {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#70061d] to-[#a01830]" />
              <span className="text-[10px] md:text-xs tracking-[0.35em] text-[#70061d] font-semibold uppercase">Our Ventures</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0a0a0a] tracking-[-0.03em] leading-[0.9]">
              Building<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#70061d] via-[#9c1230] to-[#70061d]">Empires</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 leading-relaxed md:text-right font-light">
            Four distinct verticals, one unified vision — transforming industries and creating lasting value across real estate, healthcare, sports, and development.
          </p>
        </div>
      </div>

      {/* ── MOBILE VIEW ── */}
      <div className="block md:hidden px-4 space-y-4">
        {brands.map((brand, idx) => (
          <div key={brand.id} className="liquid-glass-light rounded-2xl overflow-hidden">
            <button onClick={() => handleToggle(idx)} className="w-full flex items-center justify-between p-6 text-left">
              <div>
                <span className="block text-[8px] tracking-[0.3em] text-[#70061d] font-bold uppercase mb-1.5">{brand.tagline.split(' ')[0]}</span>
                <span className="text-lg font-black uppercase tracking-tight text-[#111]">{brand.name.replace('Pvt Ltd', '').replace(' (OPC)', '')}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${idx === activeIndex ? 'rotate-180 bg-[#70061d] text-white shadow-lg shadow-[#70061d]/30' : 'bg-black/5 text-black/30'}`}>
                <span className="text-[10px]">↓</span>
              </div>
            </button>
            <div ref={el => { accordionRefs.current[idx] = el; }} className="overflow-hidden h-0 opacity-0">
              <div className="p-6 pt-0">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 shadow-md">
                  <img src={brand.image} className="w-full h-full object-cover" alt="" />
                </div>
                {brand.type === 'nested' ? (
                  <div className="grid grid-cols-1 gap-3">
                    {brand.projects?.map((pj) => (
                      <div key={pj.name} onClick={() => pj.path !== '#' && navigate(pj.path)} className="p-4 bg-white/60 backdrop-blur-sm rounded-xl flex justify-between items-center active:bg-[#70061d] active:text-white transition-colors cursor-pointer border border-white/50 shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#111]">{pj.name}</span>
                        <span className="text-[#70061d]">→</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-[#111]/50 text-sm leading-relaxed tracking-tight">{brand.description}</p>
                    <a href={brand.website} target="_blank" className="inline-block w-full text-center px-6 py-4 bg-[#70061d] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl shadow-lg shadow-[#70061d]/20 hover:bg-[#8a0a26] transition-colors">Visit Portal</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP VIEW ── */}
      <div className="hidden md:grid max-w-[1800px] mx-auto px-8 grid-cols-12 gap-8 items-stretch">
        <div className="col-span-12 lg:col-span-9 min-h-[700px] xl:min-h-[750px] relative rounded-[40px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(112,6,29,0.12)] group">
          <div className="absolute inset-0 bg-[#0a0a0a]">
            {brands.map((brand, idx) => (
              <div key={brand.id} className={`absolute inset-0 transition-all duration-1000 ease-out ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={brand.image} className="w-full h-full object-cover" alt={brand.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>
          
          {/* Index Number */}
          <div className="absolute top-12 right-12 z-20">
            <span className="text-8xl font-black text-white/[0.06] tracking-tighter">{String(activeIndex + 1).padStart(2, '0')}</span>
          </div>
          
          <div className="relative z-20 h-full w-full p-12 xl:p-20 flex flex-col justify-end">
            <div className="hero-tagline mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full liquid-glass-dark">
                <div className="w-2 h-2 rounded-full bg-[#ff4070] shadow-[0_0_12px_rgba(255,64,112,0.6)]" />
                <span className="text-[11px] tracking-[0.25em] text-white/80 uppercase font-medium">{activeBrand.tagline}</span>
              </div>
            </div>
            
            <h3 className="hero-title text-5xl xl:text-7xl font-black text-white leading-[0.95] tracking-[-0.03em] mb-6 max-w-3xl">{activeBrand.name.replace(' Pvt Ltd', '').replace(' (OPC)', '')}</h3>
            <p className="hero-description text-base xl:text-lg text-white/60 max-w-xl leading-relaxed mb-12 font-light">{activeBrand.description}</p>
            
            {activeBrand.type === 'nested' ? (
              <div className={`grid ${activeBrand.projects?.length === 1 ? 'grid-cols-1 max-w-xs' : 'grid-cols-2 max-w-lg'} gap-4`}>
                {activeBrand.projects?.map((project, pIdx) => (
                  <button key={pIdx} onClick={() => project.path !== '#' && navigate(project.path)} className="hero-projects-item flex items-center justify-between p-5 rounded-2xl liquid-glass-dark hover:shadow-[0_0_30px_rgba(112,6,29,0.3)]">
                    <div className="relative z-10 flex flex-col items-start">
                      <span className="text-sm font-semibold text-white tracking-tight">{project.name}</span>
                      <span className="text-[9px] tracking-[0.2em] text-[#ff8fa8] uppercase mt-1.5 font-medium">{project.status}</span>
                    </div>
                    <ArrowIcon className="relative z-10 w-4 h-4 text-white/30" />
                  </button>
                ))}
              </div>
            ) : (
              <a href={activeBrand.website} target="_blank" rel="noopener noreferrer" className="hero-cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#0a0a0a] font-semibold text-sm tracking-wide hover:bg-[#70061d] hover:text-white transition-all duration-300 w-fit shadow-lg shadow-black/20 hover:shadow-[#70061d]/40">
                <span>Visit Website</span><ArrowIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* ── SIDEBAR NAVIGATION ── */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-5">
          {brands.map((brand, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={brand.id} onClick={() => handleToggle(idx)} className={`relative flex-1 min-h-[140px] xl:min-h-[160px] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 group ${isActive ? 'bg-gradient-to-br from-[#70061d] via-[#8a0a26] to-[#5c0518] shadow-2xl shadow-[#70061d]/30 scale-[1.02] border border-[#ff4070]/10' : 'liquid-glass-light'}`}>
                <div className="relative z-10 h-full p-6 xl:p-7 flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] tracking-[0.2em] font-bold uppercase mb-3 block transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-[#70061d]'}`}>{String(idx + 1).padStart(2, '0')}</span>
                    <h4 className={`text-base xl:text-lg font-bold transition-colors duration-300 tracking-[-0.01em] ${isActive ? 'text-white' : 'text-[#111]'}`}>{brand.name.replace(' Pvt Ltd', '').replace(' (OPC)', '')}</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className={`text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${isActive ? 'text-white/40' : 'text-neutral-400'}`}>{brand.tagline.split(' ').slice(0, 2).join(' ')}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/10 border border-white/10' : 'bg-white/60 border border-black/5 group-hover:bg-[#70061d]/10'}`}>
                      <ArrowIcon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-black/30 group-hover:text-[#70061d]'}`} />
                    </div>
                  </div>
                </div>
                {/* Subtle inner glow for active card */}
                {isActive && <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectNavigator;