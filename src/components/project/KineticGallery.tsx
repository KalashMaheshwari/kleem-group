import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

const galleryImages = [
  { src: '/images/gallery-1.webp', caption: 'Exterior View', tag: 'AESTHETIC' },
  { src: '/images/gallery-2.webp', caption: 'Living Space', tag: 'COMFORT' },
  { src: '/images/gallery-3.webp', caption: 'Master Bedroom', tag: 'LUXURY' },
  { src: '/images/gallery-4.webp', caption: 'Kitchen Layout', tag: 'MODERN' },
  { src: '/images/gallery-5.webp', caption: 'Bathroom', tag: 'RELAX' },
  { src: '/images/gallery-6.webp', caption: 'Staircase Design', tag: 'DETAIL' },
  { src: '/images/gallery-7.webp', caption: 'Street View', tag: 'COMMUNITY' },
  { src: '/images/gallery-8.webp', caption: 'Plot Layout', tag: 'VISION' },
];

export const KineticGallery: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // 1. DUPLICATE FOR INFINITE WRAP
    const totalWidth = slider.scrollWidth / 2;
    let xPos = 0;
    let autoSpeed = -0.6; // The "slow crawl"
    let userVelocity = 0;
    let isInteracting = false;

    // 2. TICKER LOOP (THE LIQUID HEART)
    const tick = () => {
      if (!isInteracting) {
        // Natural friction/decay for that liquid feel
        userVelocity *= 0.95;
        xPos += autoSpeed + userVelocity;

        // Seamless Wrapping
        if (xPos <= -totalWidth) xPos += totalWidth;
        if (xPos > 0) xPos -= totalWidth;

        gsap.set(slider, { x: xPos });

        // 3. DYNAMIC SCALING (Center Focus)
        // This makes images in the center look "bigger/closer"
        const items = slider.querySelectorAll('.gallery-item');
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = window.innerWidth / 2;
          const distanceFromCenter = Math.abs(rect.left + rect.width / 2 - centerX);
          const scale = gsap.utils.mapRange(0, window.innerWidth, 1.05, 0.85, distanceFromCenter);
          gsap.set(item, { scale: gsap.utils.clamp(0.85, 1.05, scale) });
        });
      }
    };

    gsap.ticker.add(tick);

    // 4. ELASTIC DRAGGABLE
    Draggable.create(slider, {
      type: "x",
      edgeResistance: 0.1, // Added some weight
      dragResistance: 0.1,
      allowNativeTouchScrolling: true,
      onPress: () => {
        isInteracting = true;
      },
      onDrag: function () {
        xPos = this.x;
        userVelocity = this.deltaX * 0.5; // Record velocity for smooth handoff

        // Wrap during drag
        if (xPos <= -totalWidth) xPos += totalWidth;
        else if (xPos > 0) xPos -= totalWidth;
        gsap.set(this.target, { x: xPos });
      },
      onRelease: function () {
        // Liquid Hand-off
        isInteracting = false;
      }
    });

    return () => {
      gsap.ticker.remove(tick);
      const draggables = Draggable.get(slider);
      if (Array.isArray(draggables)) {
        draggables.forEach(d => d.kill());
      } else if (draggables) {
        draggables.kill();
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="py-2 bg-white overflow-hidden select-none relative">
      {/* DECORATION: Background Monogram or Coordinates */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-primary/[0.02] pointer-events-none whitespace-nowrap uppercase tracking-tighter">
        Kleem Group // 2026
      </div>

      <div className="px-10 lg:px-24 mb-20 relative z-10">
        <span className="block font-bold text-[11px] tracking-[0.6em] text-primary mb-5 uppercase border-l-4 border-primary pl-5">
          / INTERIOR MASTERPIECES
        </span>
        <div className="flex items-end justify-between">
          <h2 className="font-[900] text-ink text-[clamp(32px,5.5vw,80px)] leading-[0.9] tracking-tighter">
            Architectural <br /> Essence
          </h2>
          <div className="hidden lg:block text-right">
            <div className="flex gap-2 items-center justify-end mb-2">
              {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
            </div>
            <p className="text-[11px] font-bold tracking-widest text-ink-muted uppercase">Interactive Gallery // Drag to inspect</p>
          </div>
        </div>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing">
        <div ref={sliderRef} className="flex gap-12 w-fit will-change-transform py-10">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div
              key={i}
              className="gallery-item relative flex-shrink-0 w-[300px] md:w-[550px] h-[400px] md:h-[700px] rounded-[48px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(112,6,29,0.25)] bg-white border border-primary/5 group"
            >
              {/* Card Badge */}
              <div className="absolute top-8 right-8 z-20 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white text-[10px] font-bold tracking-widest">{img.tag}</span>
              </div>

              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-12 flex flex-col justify-end">
                <div className="w-12 h-1 bg-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                <span className="text-white font-black text-[22px] tracking-tight mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {img.caption}
                </span>
                <span className="text-white/60 font-bold text-[11px] tracking-[0.3em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  Exclusive Design
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KineticGallery;