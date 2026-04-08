import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Premium Plots & Built Villas',
    location: 'Dera Bassi | Near Tricity',
    specs: 'Thoughtfully planned residential development designed for modern living.',
    image: '/images/project-banner.webp',
    status: 'Main Project',
    path: '/projects/dera-bassi',
    isActive: true, // This is the only interactive one
  },
  {
    title: 'Coming Soon',
    location: 'Location Revealed Soon',
    specs: 'A new standard of luxury arriving shortly.',
    image: '/images/kasoli.webp', // Added the image as requested
    status: 'Upcoming',
    path: '#',
    isActive: false, // Not clickable yet
  },
  {
    title: 'Coming Soon',
    location: 'Location Revealed Soon',
    specs: 'Details revealed soon.',
    image: null,
    status: 'Upcoming',
    path: '#',
    isActive: false,
  },
  {
    title: 'Coming Soon',
    location: 'Location Revealed Soon',
    specs: 'Details revealed soon.',
    image: null,
    status: 'Upcoming',
    path: '#',
    isActive: false,
  }
];

export const ProjectNavigator: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gridRef.current?.querySelectorAll('.project-card');
      if (blocks) {
        gsap.fromTo(blocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <span className="block font-black text-[10px] tracking-[0.5em] text-[#70061d] uppercase mb-6">
            03 / THE PORTFOLIO
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black text-[#1a0008] leading-tight uppercase tracking-tighter">
            Current & <span className="text-[#70061d] italic font-medium lowercase" style={{ fontFamily: 'serif' }}>upcoming</span> series.
          </h2>
        </div>

        {/* SQUARE GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`project-card group relative aspect-square overflow-hidden rounded-[32px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${project.isActive ? 'cursor-pointer hover:shadow-[0_40px_80px_-20px_rgba(112,6,29,0.2)]' : ''
                } ${project.image ? '' : 'bg-[#fdf8f8] border border-black/5'}`}
              onClick={() => project.isActive && navigate(project.path)}
            >
              {/* IMAGE LAYER */}
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  {/* Multiply Tint */}
                  <div className="absolute inset-0 bg-[#70061d]/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Bottom Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0005]/95 via-[#1a0005]/20 to-transparent opacity-90" />
                </>
              ) : (
                /* NO IMAGE STATE - Subtle Pattern */
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: 'radial-gradient(#70061d 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              )}

              {/* CONTENT OVERLAY */}
              <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black tracking-[0.4em] uppercase ${project.image ? 'text-white/40' : 'text-[#70061d]/40'}`}>
                    {project.status}
                  </span>
                  <span className={`font-black text-3xl tracking-tighter ${project.image ? 'text-white/10' : 'text-black/[0.03]'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div className={`${project.isActive ? 'group-hover:-translate-y-2' : ''} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
                  <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-3 ${project.image ? 'text-[#70061d] brightness-150' : 'text-[#70061d]'}`}>
                    {project.location}
                  </p>
                  <h3 className={`text-[24px] md:text-[34px] font-black leading-[0.95] uppercase tracking-tighter mb-4 ${project.image ? 'text-white' : 'text-[#1a0008]/20'}`}>
                    {project.title}
                  </h3>

                  {/* Footer Reveal (Only for Main Active Project) */}
                  {project.isActive && (
                    <div className="flex flex-col gap-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                      <p className="text-white/50 text-[13px] font-medium leading-relaxed max-w-[320px]">
                        {project.specs}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="bg-white text-[#70061d] py-3 px-8 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl transition-transform hover:scale-105">
                          View Project
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upcoming Project indicator */}
                  {!project.isActive && (
                    <p className="text-black/10 text-[12px] font-bold uppercase tracking-widest">
                      Coming Soon
                    </p>
                  )}
                </div>
              </div>

              {/* Interaction Border */}
              <div className="absolute inset-0 border border-black/5 rounded-[32px] group-hover:border-[#70061d]/20 transition-colors duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectNavigator;