import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all components
import { ProjectHero } from '../components/project/ProjectHero';
import { ProjectAbout } from '../components/project/ProjectAbout';
import { KineticGallery } from '../components/project/KineticGallery';
import { BlueprintSection } from '../components/project/BlueprintSection';
import { AmenitiesSection } from '../components/project/AmenitiesSection';
import { ConclusionSection } from '../components/project/ConclusionSection';
import { ContactSection } from '../components/project/ContactSection';
import { Footer } from '../components/shared/Footer';

gsap.registerPlugin(ScrollTrigger);

export const ProjectPage: React.FC = () => {
  // Use useLayoutEffect to ensure ScrollTrigger calculates AFTER the DOM is ready
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // Refresh and sort triggers by their position on the page
    ScrollTrigger.refresh();
    ScrollTrigger.sort();

    return () => {
      // Clean up everything to prevent the "Back-and-forth" ghosting
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <ProjectHero />
      <ProjectAbout />
      
      {/* SECTION A: THE GALLERY */}
      <section className="relative z-10">
        <KineticGallery />
      </section>

      {/* SECTION B: THE BLUEPRINTS */}
      <section className="relative z-20">
        <BlueprintSection />
      </section>

      <AmenitiesSection />
      <ConclusionSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default ProjectPage;