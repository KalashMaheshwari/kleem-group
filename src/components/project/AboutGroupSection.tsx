import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const pillars = [
  { title: 'Quality', sub: 'Premium materials, zero compromise.' },
  { title: 'Practical Design', sub: 'Function-first architecture.' },
  { title: 'Reliable Service', sub: 'We answer. We deliver.' },
];

export const AboutGroupSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{ padding: 'clamp(100px, 12vw, 180px) 0' }}
    >
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(#70061d 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">

          {/* LEFT: Branding Tagline + Large Project Image */}
          <div className="flex flex-col">
            <div className="pl-6 h-fit relative mb-12 lg:mb-16">
              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#70061d]/20" />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="block font-bold text-[11px] tracking-[0.4em] text-[#70061d] uppercase mb-4"
              >
                / THE GROUP
              </motion.span>
              <p className="text-[13px] font-semibold text-black/30 uppercase tracking-[0.2em] leading-relaxed">
                Architecture & <br /> Development Standards
              </p>
            </div>

            {/* mt-auto pushes the image to the bottom to align with the box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-auto w-full relative group"
            >
              {/* Architectural Offset Frame */}
              <div 
                className="absolute -bottom-4 -right-4 w-full h-full rounded-[32px] border-[1.5px] border-[#70061d]/10 -z-10 transition-all duration-700 group-hover:-bottom-3 group-hover:-right-3 group-hover:border-[#70061d]/20" 
              />
              
              {/* Decreased image length slightly: aspect-[5/6] instead of 4/5 */}
              <div className="relative overflow-hidden rounded-[32px] aspect-[5/6] shadow-2xl">
                <motion.div style={{ y }} className="w-full h-full">
                  <img
                    src="/images/Firefly.webp"
                    alt="Kleem Group Portfolio"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </motion.div>
                {/* Luxury gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: The Content */}
          <div className="flex flex-col lg:pt-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-black text-black mb-12 tracking-tighter leading-[0.85] uppercase"
                style={{ fontSize: 'clamp(40px, 5.5vw, 76px)' }}
              >
                Building More <br />
                Than{' '}
                <span 
                  className="text-[#70061d] italic font-extralight"
                  style={{
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(112,6,29,0.2)',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '8px',
                    textDecorationSkipInk: 'none'
                  }}
                >
                  Structures.
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-16 leading-relaxed font-medium text-black/40 max-w-[580px]"
                style={{ fontSize: 'clamp(16px, 1.6vw, 19px)' }}
              >
                <p className="mb-6">
                  At Kleem Group, we engineer autonomy. Our goal is straightforward:
                  uncompromising quality, function-first architecture, and a
                  service standard that respects your investment.
                </p>
                <p>
                  Every home in this collection is a testament to our non-negotiable
                  commitment to the families who trust our vision.
                </p>
              </motion.div>
            </div>

            {/* --- LIQUID GLASS PILLAR BLOCK --- */}
            {/* mt-auto pushes this box to the bottom, aligning perfectly with the left image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-10 bg-[#70061d] rounded-[24px] shadow-[0_20px_50px_-15px_rgba(112,6,29,0.3)] relative overflow-hidden"
            >
              {/* Subtle inner light */}
              <div className="absolute -right-24 -top-24 w-64 h-64 bg-white/5 rounded-full blur-4xl pointer-events-none" />

              {pillars.map((pillar, i) => (
                <motion.div 
                  key={i} 
                  className="group cursor-default relative z-10 pt-6 border-t border-white/10 transition-all duration-500 hover:border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-mono font-bold text-white/30 transition-colors duration-300 group-hover:text-white/60">0{i + 1}</span>
                  </div>
                  <h4 className="font-black text-[16px] uppercase tracking-wider text-white mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-[14px] font-medium text-white/40 leading-relaxed transition-colors duration-500 group-hover:text-white/70">
                    {pillar.sub}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGroupSection;