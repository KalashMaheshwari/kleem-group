// src/pages/LegalPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { legalData } from '../data/ProjectData';
import { Footer } from '../components/shared/Footer';

export const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = legalData[slug as keyof typeof legalData];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) return <div className="h-screen bg-white" />;

  return (
    <main className="bg-white min-h-screen relative">
      {/* Back Link - Fixed top left, styled for dark background */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-semibold group bg-white px-5 py-2.5 rounded-full text-[#70061d] hover:bg-white/90 transition-colors shadow-sm"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> 
          Home
        </Link>
      </div>

      {/* BURGUNDY GRADIENT HERO */}
      <section className="relative w-full pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden rounded-b-[48px] md:rounded-b-[64px]" style={{ background: 'linear-gradient(135deg, #70061d 0%, #4a0412 100%)' }}>
        {/* Decorative internal light orb */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black uppercase tracking-tighter mb-10 text-white leading-[0.9]"
            style={{ fontSize: 'clamp(48px, 10vw, 110px)' }}
          >
            {data.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-10 h-[1.5px] bg-white/30" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 font-medium">
              Effective Date: {data.effectiveDate}
            </p>
            <div className="w-10 h-[1.5px] bg-white/30" />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-24">
        <div className="space-y-20">
          {data.sections.map((section, index) => (
            <motion.section 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 md:pl-12 border-l-2 border-[#70061d]/10 hover:border-[#70061d]/30 transition-colors duration-700"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-6 text-[#70061d]">
                {section.heading}
              </h2>
              <p 
                className="text-black/60 leading-[1.85] font-light"
                style={{ fontSize: 'clamp(16px, 1.6vw, 19px)' }}
              >
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Contact Footer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-32 p-8 md:p-12 bg-[#fafafa] rounded-3xl border border-black/5 text-center relative overflow-hidden group hover:border-[#70061d]/10 transition-colors duration-500"
        >
          {/* Decorative subtle orb */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#70061d]/5 rounded-full blur-3xl pointer-events-none" />
          
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-5 font-medium relative z-10">
            For further inquiries, please contact us at:
          </p>
          <a 
            href="mailto:kleemgroupchd@gmail.com" 
            className="relative z-10 text-2xl md:text-3xl font-black text-[#1a0008] hover:text-[#70061d] transition-colors duration-300 tracking-tight"
          >
            kleemgroupchd@gmail.com
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};