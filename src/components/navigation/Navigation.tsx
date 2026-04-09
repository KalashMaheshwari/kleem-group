import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [mobileOpen]);

  if (location.pathname === '/') return null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '#projectabout' },
    { label: 'Contact', href: '#contact' },
  ];

  // PREMIUM EASING: Fast start, slow finish, zero bounce.
  const fluidTransition = { duration: 0.8, ease: easeInOut };

  return (
    <>
      {/* ── LOGO ── */}
      <header className="absolute top-0 left-0 right-0 z-[100] w-full pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-[100px] md:h-[140px]">
          <div className="pointer-events-auto">
            <Link to="/">
              <img
                src="/logomain.webp"
                alt="Kleem Group"
                className="h-12 md:h-18 w-auto object-contain transition-transform hover:scale-105 duration-500"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ── FLOATING NAV ── */}
      <nav className="fixed top-6 right-6 md:left-0 md:right-0 z-[120] flex md:justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            // Shift left on desktop when not scrolled
            x: window.innerWidth > 768 ? (scrolled ? 0 : "100%") : 0,
            backgroundColor: 'rgba(54, 2, 12, 0.9)',
          }}
          transition={fluidTransition}
          className="pointer-events-auto flex items-center p-1.5 rounded-full border border-white/10 shadow-2xl backdrop-blur-2xl"
        >
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-7 py-3 rounded-full text-[10px] font-black tracking-[0.25em] uppercase text-white transition-all duration-500 group overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-[#70061d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </a>
            ))}
          </div>

          {/* MOBILE TRIGGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span className={`h-[1px] bg-white transition-all duration-500 ease-[0.16,1,0.3,1] ${mobileOpen ? 'w-5 rotate-45 translate-y-[3.5px]' : 'w-5'}`} />
            <span className={`h-[1px] bg-white transition-all duration-500 ease-[0.16,1,0.3,1] ${mobileOpen ? 'w-5 -rotate-45 -translate-y-[3.5px]' : 'w-3 self-end mr-3.5'}`} />
          </button>
        </motion.div>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[115] bg-[#1a0005] flex flex-col justify-between p-10 pt-32"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="flex flex-col gap-8 relative z-10">
              <span className="text-[10px] tracking-[0.5em] text-[#70061d] font-black uppercase mb-4">Navigation</span>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
                  href={link.href}
                  className="text-white text-5xl font-black tracking-tighter uppercase leading-none group flex items-end gap-4"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-[#70061d] text-lg font-serif italic normal-case mr-2">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="relative z-10 border-t border-white/10 pt-10 flex flex-col gap-2">
              <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">Kleem Group Ecosystem</span>
              <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">© 2026 Architectural Excellence</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;