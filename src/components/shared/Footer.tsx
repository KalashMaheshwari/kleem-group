import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: '#70061d' }}
      role="contentinfo"
    >
      {/* GHOST LOGO BACKGROUND */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[18vw] font-black leading-none tracking-tighter text-white uppercase">
          KLEEM
        </h2>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-8">

        {/* TOP BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* Brand Identity */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <img
                src="/logofull.webp"
                alt="Kleem Group"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[16px] md:text-[18px] font-medium leading-tight text-white/40 max-w-[300px]">
              Building More Than <br />
              <span className="text-white italic">Structures.</span>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase mb-6">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {['Projects', 'About Us', 'Contact'].map((label) => (
                <li key={label}>
                  <a
                    href={`/#${label.toLowerCase().replace(' ', '')}`}
                    className="text-[14px] font-medium text-white/60 hover:text-white transition-all duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3">
            <h4 className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="text-[13px] text-white/60 leading-snug">
                SCO 205, The Summit,<br />Zirakpur, Punjab
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:+917717505741" className="text-lg font-bold text-white hover:text-white/70 transition-colors">
                  +91-77175-05741
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <p className="text-[9px] font-bold tracking-widest text-white/20 uppercase">
              &copy; 2026 Kleem Group
            </p>
            <div className="h-3 w-px bg-white/10 hidden md:block" />
            <p className="text-[9px] font-bold tracking-widest text-white/20 uppercase italic">
              Tricity // Punjab
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;