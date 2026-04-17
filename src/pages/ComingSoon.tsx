import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = useRef(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.current.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setEmail(''); }, 4000);
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  const particles = useRef(
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.4 + 0.5,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.08 + 0.02,
      color: i % 4 === 0 ? '#ff2a5f' : '#ffffff', 
    }))
  ).current;

  return (
    <>
      <style>{`
        .tabular { font-variant-numeric: tabular-nums; }
        
        /* Liquid Glass Effect - Optimized for Dark Mode */
        .liquid-glass {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Light Refraction Sweep */
        .liquid-glass::before {
          content: '';
          position: absolute;
          top: 0; 
          left: -150%; 
          width: 100%; 
          height: 100%;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transition: left 0.7s ease-in-out;
          transform: skewX(-20deg);
          z-index: 1;
        }

        .liquid-glass:hover::before {
          left: 150%;
        }

        .liquid-glass:focus-within {
          border-color: rgba(160, 20, 50, 0.6);
          box-shadow: 
            0 8px 32px 0 rgba(128, 0, 32, 0.25),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            0 0 25px rgba(128, 0, 32, 0.15);
        }
      `}</style>

      <div className="fixed inset-0 z-[150] bg-[#0d0a0e] flex flex-col items-center justify-center overflow-hidden">
        
        {/* ── SUBTLE NOISE TEXTURE ── */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" style={{ mixBlendMode: 'screen' }}>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* ── AMBIENT LIGHT GRADIENTS (Burgundy Tinted for Dark BG) ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(128,0,32,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_120%,rgba(128,0,32,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_80%,rgba(60,0,20,0.15),transparent)]" />

        {/* ── FLOATING PARTICLES ── */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`, 
              width: p.size, 
              height: p.size, 
              opacity: p.opacity,
              backgroundColor: p.color 
            }}
            animate={{ y: [0, -100, 0], x: [0, Math.random() * 20 - 10, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ── THIN ARCHITECTURAL LINES ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"
        />

        {/* ═══════════════ CONTENT ═══════════════ */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full">

          {/* EYEBROW */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[9px] tracking-[0.4em] text-[#d4a0a0]/60 uppercase font-semibold">
              Kleem Group
            </span>
            <div className="w-8 h-px bg-white/10" />
          </motion.div>

          {/* HEADING — Two-tone Burgundy Palette */}
          <div className="overflow-hidden mb-1.5">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[2.5rem] sm:text-5xl md:text-[4.5rem] font-semibold text-[#800020] uppercase tracking-[-0.04em] leading-[0.9]"
            >
              Coming
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[2.5rem] sm:text-5xl md:text-[4.5rem] font-semibold text-[#a8304f] uppercase tracking-[-0.04em] leading-[0.9]"
            >
              Soon
            </motion.h1>
          </div>

          {/* DIVIDER */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-[#800020]/30 mb-8"
          />

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-sm text-white/40 text-[13px] md:text-[15px] leading-[1.8] tracking-[0.01em] font-light mb-12"
          >
            A new standard of excellence is being crafted. Something extraordinary awaits within the Kleem Group portfolio.
          </motion.p>

          {/* COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-6 sm:gap-8 md:gap-10 mb-12"
          >
            {[
              { value: pad(timeLeft.days), label: 'Days' },
              { value: pad(timeLeft.hours), label: 'Hours' },
              { value: pad(timeLeft.minutes), label: 'Min' },
              { value: pad(timeLeft.seconds), label: 'Sec' },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-light text-[#e8476c] tabular tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-[7px] tracking-[0.3em] text-white/25 uppercase mt-2 font-medium">
                    {item.label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="text-white/15 text-sm font-light mt-[-10px]">:</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* EMAIL SIGNUP (Liquid Glass) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-xs mb-12"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="relative flex items-center group liquid-glass"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for early access"
                    className="relative z-10 w-full bg-transparent text-white/80 text-[12px] tracking-[0.01em] placeholder:text-white/20 px-6 py-3.5 pr-[90px] outline-none font-light"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 z-20 px-4 py-1.5 rounded-full bg-[#800020] text-white/90 text-[8px] font-semibold uppercase tracking-[0.15em] hover:bg-[#a8304f] transition-colors duration-300 shadow-lg shadow-[#800020]/30"
                  >
                    Notify
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="liquid-glass flex items-center justify-center gap-2.5 py-3.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e8476c]" />
                  <span className="text-white/50 text-[12px] tracking-[0.01em] font-light">
                    You'll be among the first to know
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RETURN HOME */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <Link 
              to="/" 
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/10 bg-white/5 text-white/60 text-[9px] font-semibold uppercase tracking-[0.2em] hover:border-[#800020]/50 hover:bg-[#800020] hover:text-white transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-[#800020]/20"
            >
              <svg 
                className="w-3 h-3 transition-transform duration-500 group-hover:-translate-x-0.5" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return Home
            </Link>
          </motion.div>
        </div>

        {/* ── FOOTER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="absolute bottom-5 left-0 right-0 flex justify-center"
        >
          <div className="flex items-center gap-4 text-[7px] tracking-[0.3em] text-white/10 uppercase font-medium">
            <span>© {new Date().getFullYear()}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/15" />
            <span>Kleem Group</span>
          </div>
        </motion.div>

        {/* ── WATERMARK ── */}
        <div className="absolute bottom-[-5vh] opacity-[0.03] select-none pointer-events-none">
          <span className="text-[18vw] font-semibold uppercase leading-none tracking-[-0.04em] text-[#800020]">KLEEM</span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;