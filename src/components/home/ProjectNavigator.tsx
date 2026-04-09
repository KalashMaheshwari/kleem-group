import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const brands = [
  {
    id: 'builders',
    name: 'Kleem Builder Pvt Ltd',
    tagline: 'Crafting Luxury Landmarks',
    image: '/images/builder-bg.jpg',
    type: 'nested',
    description: 'Architecting dreams into reality with world-class residential and commercial developments.',
    projects: [
      { name: 'Dera Bassi', path: '/projects/dera-bassi', status: 'Ongoing' },
      { name: 'Kasoli Heights', path: '#', status: 'Coming Soon' },
      { name: 'The Heights', path: '#', status: 'Completed' },
      { name: 'Oasis Greens', path: '#', status: 'Planning' },
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
  },
  {
    id: 'developers',
    name: 'Kleem Developers (OPC) Pvt Ltd',
    tagline: 'Strategic Urban Growth',
    image: '/images/developers-bg.jpg',
    type: 'static',
    description: 'Creating high-yield investment opportunities through strategic land acquisition and urban planning.',
    website: 'https://kleemdevelopers.com',
  }
];

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export const ProjectNavigator: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ROTATION_TIME = 6000;
  const INTERVAL = 30;

  // ── DESKTOP TIMER (STAYS AS IS) ──
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isMobile || isPaused) return;

    timerRef.current = setInterval(() => {
      elapsedRef.current += INTERVAL;
      const percent = (elapsedRef.current / ROTATION_TIME) * 100;
      setProgressPercent(percent);

      if (elapsedRef.current >= ROTATION_TIME) {
        elapsedRef.current = 0;
        setProgressPercent(0);
        setActiveIndex(prev => (prev + 1) % brands.length);
      }
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // ── TOGGLE LOGIC ──
  const handleToggle = useCallback((idx: number) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setActiveIndex(prev => (prev === idx ? -1 : idx));
    } else {
      setActiveIndex(idx);
    }
    elapsedRef.current = 0;
    setProgressPercent(0);
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
    <section id="projects" className="w-full bg-gradient-to-b from-white via-[#fefefe] to-[#f9f7f7] py-16 md:py-32 overflow-hidden">

      {/* ── HEADER (STAYS AS IS) ── */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#70061d] to-[#a01830]" />
              <span className="text-[10px] md:text-xs tracking-[0.35em] text-[#70061d] font-semibold uppercase">Our Ventures</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0a0a0a] tracking-tight leading-[0.9]">
              Building<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#70061d] via-[#8a0a26] to-[#70061d]">Empires</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-500 leading-relaxed md:text-right">
            Four distinct verticals, one unified vision — transforming industries and creating lasting value across real estate, healthcare, sports, and development.
          </p>
        </div>
      </div>

      {/* ── RESTORED MOBILE VIEW ── */}
      <div className="block md:hidden px-4 space-y-3">
        {brands.map((brand, idx) => (
          <div key={brand.id} className="border border-black/5 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button onClick={() => handleToggle(idx)} className="w-full flex items-center justify-between p-6 text-left">
              <div>
                <span className="block text-[8px] tracking-[0.3em] text-[#70061d] font-bold uppercase mb-1">{brand.tagline.split(' ')[0]}</span>
                <span className="text-lg font-black uppercase tracking-tight text-black">{brand.name.replace('Pvt Ltd', '')}</span>
              </div>
              <div className={`w-8 h-8 rounded-full border border-black/5 flex items-center justify-center transition-transform duration-500 ${idx === activeIndex ? 'rotate-180 bg-[#70061d] text-white border-[#70061d]' : ''}`}>
                <span className="text-[10px]">↓</span>
              </div>
            </button>
            <div ref={el => { accordionRefs.current[idx] = el; }} className="overflow-hidden h-0 opacity-0">
              <div className="p-6 pt-0">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                  <img src={brand.image} className="w-full h-full object-cover" alt="" />
                </div>
                {brand.type === 'nested' ? (
                  <div className="grid grid-cols-1 gap-2">
                    {brand.projects?.map((pj) => (
                      <div key={pj.name} onClick={() => pj.path !== '#' && navigate(pj.path)} className="p-4 bg-black/[0.03] rounded-xl flex justify-between items-center active:bg-[#70061d] active:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-widest">{pj.name}</span>
                        <span>→</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-black/50 text-sm leading-relaxed tracking-tight">{brand.description}</p>
                    <a href={brand.website} target="_blank" className="inline-block w-full text-center px-6 py-4 bg-[#70061d] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl">Visit Portal</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP VIEW (UNTOUCHED) ── */}
      <div className="hidden md:grid max-w-[1800px] mx-auto px-8 grid-cols-12 gap-8 items-stretch">
        <div
          className="col-span-12 lg:col-span-9 min-h-[700px] xl:min-h-[750px] relative rounded-[40px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(112,6,29,0.15)] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]">
            {brands.map((brand, idx) => (
              <div key={brand.id} className={`absolute inset-0 transition-all duration-1000 ease-out ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={brand.image} className="w-full h-full object-cover" alt={brand.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>
          <div className="absolute top-10 right-10 z-20"><span className="text-8xl font-black text-white/10">{String(activeIndex + 1).padStart(2, '0')}</span></div>
          <div className="relative z-20 h-full w-full p-12 xl:p-20 flex flex-col justify-end">
            <div className="hero-tagline mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#70061d]" /><span className="text-[11px] tracking-[0.25em] text-white/80 uppercase font-medium">{activeBrand.tagline}</span>
              </div>
            </div>
            <h3 className="hero-title text-5xl xl:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6 max-w-3xl">{activeBrand.name.replace(' Pvt Ltd', '').replace(' (OPC)', '')}</h3>
            <p className="hero-description text-base xl:text-lg text-white/70 max-w-xl leading-relaxed mb-10">{activeBrand.description}</p>
            {activeBrand.type === 'nested' ? (
              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {activeBrand.projects?.map((project, pIdx) => (
                  <button key={pIdx} onClick={() => navigate(project.path)} className="hero-projects-item flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#70061d]/50 transition-all duration-300">
                    <div className="flex flex-col items-start"><span className="text-sm font-semibold text-white">{project.name}</span><span className="text-[9px] tracking-wider text-[#70061d] uppercase mt-1">{project.status}</span></div><ArrowIcon className="w-4 h-4 text-white/30" />
                  </button>
                ))}
              </div>
            ) : (
              <a href={activeBrand.website} target="_blank" rel="noopener noreferrer" className="hero-cta inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[#0a0a0a] font-semibold text-sm tracking-wide hover:bg-[#70061d] hover:text-white transition-all w-fit">
                <span>Visit Website</span><ArrowIcon className="w-4 h-4" />
              </a>
            )}
            <div className="absolute bottom-10 right-10 xl:right-20 flex items-center gap-4">
              <div className="w-[160px] xl:w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#70061d] to-[#a01830]" style={{ width: `${progressPercent}%`, transition: 'width 30ms linear' }} />
              </div>
              <span className="text-[10px] text-white/40 font-mono">{Math.ceil((ROTATION_TIME - (progressPercent / 100 * ROTATION_TIME)) / 1000)}s</span>
            </div>
          </div>
        </div>

        {/* ── SIDEBAR NAVIGATION (STAYS AS IS) ── */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          {brands.map((brand, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={brand.id} onClick={() => handleToggle(idx)} className={`relative flex-1 min-h-[140px] xl:min-h-[160px] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 group ${isActive ? 'bg-gradient-to-br from-[#70061d] via-[#8a0a26] to-[#5c0518] shadow-2xl shadow-[#70061d]/30 scale-[1.02]' : 'bg-white border border-black/[0.04]'}`}>
                <div className="relative z-10 h-full p-6 xl:p-7 flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] tracking-[0.2em] font-bold uppercase mb-3 block ${isActive ? 'text-white/60' : 'text-[#70061d]'}`}>{String(idx + 1).padStart(2, '0')}</span>
                    <h4 className={`text-base xl:text-lg font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0a0a0a]'}`}>{brand.name.replace(' Pvt Ltd', '')}</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className={`text-[10px] tracking-[0.15em] uppercase font-medium ${isActive ? 'text-white/50' : 'text-neutral-400'}`}>{brand.tagline.split(' ').slice(0, 2).join(' ')}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-[#f5f5f5]'}`}><ArrowIcon className="w-4 h-4" /></div>
                  </div>
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20"><div className="h-full bg-white/80" style={{ width: `${progressPercent}%`, transition: 'width 30ms linear' }} /></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectNavigator;