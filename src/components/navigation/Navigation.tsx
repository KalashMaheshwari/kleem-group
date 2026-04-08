import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hook to get the current route
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LOGIC: HIDE ON HOMEPAGE ---
  // This ensures the navbar only renders if the path is NOT "/"
  if (location.pathname === '/') {
    return null;
  }

  const navLinks = [
    { label: 'Home', href: '/' },               // Keeps link to main landing
    { label: 'Projects', href: '/#projects' },  // Usually on Home, so keep /#
    { label: 'About', href: '#projectabout' },         // REMOVED / - Looks on current page
    { label: 'Contact', href: '#contact' },     // REMOVED / - Looks on current page
  ];

  return (
    <>
      {/* HEADER: Absolute - Logo scrolls away naturally */}
      <header className="absolute top-0 left-0 right-0 z-[100] w-full pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-[100px] md:h-[140px]">
          <div className="pointer-events-auto">
            <Link to="/">
              <img
                src="/logofull.webp"
                alt="Kleem Group"
                className="h-14 md:h-18 w-auto object-contain transition-transform hover:scale-105 duration-500"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* THE FLOATING NAV PILL */}
      <nav className="fixed top-6 md:top-8 left-0 right-0 z-[110] flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: scrolled ? 0 : "90%",
            backgroundColor: 'rgba(54, 2, 12, 0.74)',
            backdropFilter: 'blur(24px) saturate(160%)',
            scale: scrolled ? 0.95 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 100,
            mass: 1.1
          }}
          className="pointer-events-auto flex items-center p-1.5 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(110%)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15), 0 12px 30px rgba(0,0,0,0.25)',
          }}
        >
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-7 py-3 rounded-full text-[11px] font-[800] tracking-[0.25em] uppercase text-white transition-all duration-500 group overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-500">
                  {link.label}
                </span>
                <div className="absolute inset-0 bg-[#70061d] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.19,1,0.22,1]" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-12 h-12 rounded-full flex items-center justify-center bg-white/5"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 w-full bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </motion.div>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[115] bg-[#1a0005] flex flex-col items-center justify-center p-12"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white text-5xl font-[900] tracking-tighter uppercase italic hover:text-primary transition-all active:scale-95"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;