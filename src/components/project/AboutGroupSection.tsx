import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
  { title: 'Quality', sub: 'Premium materials, zero compromise.' },
  { title: 'Practical Design', sub: 'Function-first architecture.' },
  { title: 'Reliable Service', sub: 'We answer. We deliver.' },
];

export const AboutGroupSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-white overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 150px) 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Adjusted to 11 columns to allow the image a bit more dominance */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-24 items-start">

          {/* LEFT: Branding Tagline + Large Project Image */}
          <div className="lg:col-span-5 flex flex-col gap-16">
            <div className="border-l-2 border-[#70061d] pl-6 h-fit">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="block font-bold text-[11px] tracking-[0.4em] text-[#70061d] uppercase mb-4"
              >
                05 / THE GROUP
              </motion.span>
              <p className="text-[14px] font-bold text-black/30 uppercase tracking-widest leading-relaxed">
                Architecture & <br /> Development Standards
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative overflow-hidden rounded-[48px] shadow-2xl aspect-[4/5] lg:aspect-square group"
            >
              <img
                src="/images/Firefly.webp"
                alt="Kleem Group Portfolio"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              {/* Subtle overlay for luxury feel */}
              <div className="absolute inset-0 bg-[#70061d]/10 mix-blend-multiply opacity-60 pointer-events-none" />
            </motion.div>
          </div>

          {/* RIGHT: The Content */}
          <div className="lg:col-span-6 lg:pt-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[900] text-black mb-10 tracking-tighter leading-[0.9] uppercase"
              style={{ fontSize: 'clamp(40px, 6vw, 78px)' }}
            >
              Building More <br />
              Than <span className="text-[#70061d] italic font-medium">Structures.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-16 leading-relaxed font-medium text-black/60 max-w-[650px]"
              style={{ fontSize: 'clamp(17px, 1.8vw, 21px)' }}
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

            {/* --- BURGUNDY PILLAR BLOCK --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 md:p-12 bg-[#70061d] rounded-[32px] shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background circle for the pillar block */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {pillars.map((pillar, i) => (
                <div key={i} className="group cursor-default relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold text-white/30">0{i + 1}</span>
                    <h4 className="font-black text-[14px] uppercase tracking-wider text-white">
                      {pillar.title}
                    </h4>
                  </div>
                  <div className="h-[2px] w-8 bg-white/20 group-hover:w-full group-hover:bg-white transition-all duration-500 mb-4" />
                  <p className="text-[13px] font-semibold text-white/50 group-hover:text-white/80 transition-colors leading-relaxed">
                    {pillar.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGroupSection;