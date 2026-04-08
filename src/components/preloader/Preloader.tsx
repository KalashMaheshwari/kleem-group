import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  const [maskSize] = useState({ value: -50 });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('kleem-visited');
    if (hasVisited) {
      setShouldRender(false);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('kleem-visited', 'true');
          setShouldRender(false);
          onComplete();
        },
      });

      gsap.set(logoRef.current, {
        scale: 0.9,
        opacity: 0
      });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out'
      })

      .fromTo('.reveal-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        "-=1.6"
      )

      .fromTo('.loading-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power4.inOut' },
        "-=1"
      )

      .to(maskSize, {
        value: 150,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (containerRef.current) {
            const val = maskSize.value;
            const mask = `radial-gradient(circle, rgba(0,0,0,0) ${val}%, rgba(0,0,0,1) ${val + 50}%)`;
            containerRef.current.style.webkitMaskImage = mask;
            containerRef.current.style.maskImage = mask;
          }
        }
      }, "+=0.1")
      .call(() => {
        onComplete();
      }, [], "-=0.5")
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.4,
        ease: "power2.inOut"
      }, "<");

    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
      style={{
        background: '#36020c',
        ['WebkitMaskImage' as any]: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        maskImage: 'radial-gradient(circle, rgba(0,0,0,0) -50%, rgba(0,0,0,1) 0%)',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
      } as React.CSSProperties}
    >

      {/* ── LAYERED BACKGROUND ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #3d0110 0%, #220008 50%, #0e0003 100%)',
      }} />

      {/* Architectural grid — very subtle */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 1,
      }} />

      {/* Horizontal center rule */}
      <div className="absolute pointer-events-none" style={{
        top: '50%',
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent 100%)',
      }} />

      {/* Top edge light bleed */}
      <div className="absolute pointer-events-none" style={{
        width: '60%',
        height: '1px',
        top: 0,
        left: '20%',
        background: 'linear-gradient(to right, transparent, rgba(210,30,65,0.5), transparent)',
        filter: 'blur(0.5px)',
      }} />

      {/* Bottom edge subtle */}
      <div className="absolute pointer-events-none" style={{
        width: '40%',
        height: '1px',
        bottom: 0,
        left: '30%',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
      }} />

      {/* Central warm glow pool */}
      <div className="absolute pointer-events-none" style={{
        width: '700px',
        height: '400px',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(170,10,40,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* ── CORNER BRACKETS ── */}
      {/* Top Left */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M1 48 L1 1 L48 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
        <div className="absolute top-1 left-1" style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: 'rgba(220,40,70,0.5)',
          boxShadow: '0 0 6px rgba(220,40,70,0.4)',
        }} />
      </div>
      {/* Top Right */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M47 48 L47 1 L0 1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
        <div className="absolute top-1 right-1" style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: 'rgba(220,40,70,0.5)',
          boxShadow: '0 0 6px rgba(220,40,70,0.4)',
        }} />
      </div>
      {/* Bottom Left */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M1 0 L1 47 L48 47" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
        <div className="absolute bottom-1 left-1" style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: 'rgba(220,40,70,0.5)',
          boxShadow: '0 0 6px rgba(220,40,70,0.4)',
        }} />
      </div>
      {/* Bottom Right */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M47 0 L47 47 L0 47" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" strokeLinecap="square"/>
        </svg>
        <div className="absolute bottom-1 right-1" style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: 'rgba(220,40,70,0.5)',
          boxShadow: '0 0 6px rgba(220,40,70,0.4)',
        }} />
      </div>

      {/* ── SIDE LABELS (Architectural Metadata) ── */}
      {/* Left vertical label */}
      <div className="absolute left-10 top-1/2 pointer-events-none" style={{
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center center',
      }}>
        <span style={{
          fontSize: '7px',
          letterSpacing: '0.45em',
          color: 'rgba(255,255,255,0.12)',
          textTransform: 'uppercase',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          Est. 2010 &nbsp;·&nbsp; India
        </span>
      </div>
      {/* Right vertical label */}
      <div className="absolute right-10 top-1/2 pointer-events-none" style={{
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'center center',
      }}>
        <span style={{
          fontSize: '7px',
          letterSpacing: '0.45em',
          color: 'rgba(255,255,255,0.12)',
          textTransform: 'uppercase',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          Building Tomorrow
        </span>
      </div>

      {/* ── MICRO PARTICLES ── */}
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: i % 5 === 0 ? '2px' : '1px',
            height: i % 5 === 0 ? '2px' : '1px',
            background: i % 5 === 0
              ? 'rgba(220,60,90,0.25)'
              : `rgba(255,255,255,${0.04 + (i % 3) * 0.03})`,
            top: `${12 + (i * 17 + 9) % 76}%`,
            left: `${6 + (i * 29 + 13) % 88}%`,
            boxShadow: i % 5 === 0 ? '0 0 4px rgba(220,60,90,0.3)' : 'none',
          }}
        />
      ))}

      {/* ══════════════════════════════════
          CONTENT WRAPPER
      ══════════════════════════════════ */}
      <div ref={contentRef} className="flex flex-col items-center w-full px-8 relative z-10" style={{ maxWidth: '780px' }}>

        {/* ── LOGO ── */}
        <div className="relative flex items-center justify-center mb-14">
          <div className="absolute pointer-events-none" style={{
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180,10,40,0.08) 0%, transparent 65%)',
            filter: 'blur(35px)',
          }} />
          <div className="absolute pointer-events-none" style={{
            width: '196px', height: '196px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
          }} />
          <div className="absolute pointer-events-none" style={{
            width: '230px', height: '230px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.025)',
          }} />
          <img
            ref={logoRef}
            src="/logomain.webp"
            alt="Kleem Group"
            className="w-44 h-auto relative z-10"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(200,15,50,0.18)) drop-shadow(0 0 50px rgba(200,15,50,0.07))',
            }}
          />
        </div>

        {/* ── TYPOGRAPHY BLOCK ── */}
        <div className="flex flex-col items-center text-center w-full">

          {/* ── "WELCOME TO" — Big, clean, premium ── */}
          <div className="overflow-hidden w-full mb-3">
            <div className="reveal-text flex items-center justify-center gap-6">
              {/* Left rule */}
              <div style={{
                flex: 1,
                maxWidth: '140px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15))',
              }} />

              <span style={{
                fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)',
                fontWeight: 300,
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                paddingLeft: '0.55em',
                fontFamily: 'inherit',
              }}>
                Welcome to
              </span>

              {/* Right rule */}
              <div style={{
                flex: 1,
                maxWidth: '140px',
                height: '1px',
                background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.15))',
              }} />
            </div>
          </div>

          {/* ── KLEEM GROUP — Monumental hero text ── */}
          <div className="overflow-hidden w-full mb-6">
            <h1
              className="reveal-text block font-black uppercase"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                background: 'linear-gradient(165deg, #ffffff 0%, rgba(255,255,255,0.95) 25%, rgba(255,210,220,0.88) 55%, rgba(200,60,85,0.7) 80%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 50px rgba(210,30,65,0.2))',
              }}
            >
              Kleem Group
            </h1>
          </div>

          {/* ── BUILDER IDENTITY TAG ── */}
          <div className="overflow-hidden w-full mb-2">
            <div className="reveal-text flex items-center justify-center gap-0">
              {/* Pill tags */}
              {['Architects of Space', 'Builders of Legacy', 'Shapers of Skylines'].map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && (
                    <div style={{
                      width: '3px', height: '3px', borderRadius: '50%',
                      background: 'rgba(220,50,80,0.4)',
                      margin: '0 14px',
                      flexShrink: 0,
                    }} />
                  )}
                  <span style={{
                    fontSize: 'clamp(7px, 1vw, 9px)',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>
                    {tag}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── THIN DIVIDER ── */}
          <div className="reveal-text flex items-center gap-5 w-full justify-center mb-8 mt-4">
            <div style={{
              flex: 1, maxWidth: '80px', height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08))',
            }} />
            <div style={{
              width: '4px', height: '4px', borderRadius: '50%',
              border: '1px solid rgba(220,50,80,0.4)',
            }} />
            <div style={{
              flex: 1, maxWidth: '80px', height: '1px',
              background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.08))',
            }} />
          </div>

          {/* ── LOADING BAR ── */}
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="relative" style={{ width: '180px' }}>
              {/* Bloom glow */}
              <div className="absolute pointer-events-none" style={{
                inset: '-8px 20px',
                background: 'rgba(200,20,55,0.1)',
                filter: 'blur(10px)',
                borderRadius: '9999px',
              }} />
              {/* Track */}
              <div className="relative overflow-hidden rounded-full" style={{ height: '1px' }}>
                <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div
                  className="loading-line absolute inset-0 origin-left"
                  style={{
                    background: 'linear-gradient(to right, rgba(255,255,255,0.2) 0%, #ffffff 50%, rgba(220,70,100,0.8) 100%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                  }}
                />
              </div>
            </div>

            {/* Loading text */}
            <span style={{
              fontSize: '7px',
              letterSpacing: '0.6em',
              color: 'rgba(255,255,255,0.13)',
              textTransform: 'uppercase',
              fontWeight: 400,
              paddingLeft: '0.6em',
            }}>
              Crafting your experience
            </span>
          </div>

        </div>
      </div>

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(6,0,2,0.75) 100%)',
      }} />

      {/* ── DOT TEXTURE ── */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
      </div>

      {/* ── FILM GRAIN ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.022]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

    </div>
  );
};

export default Preloader;