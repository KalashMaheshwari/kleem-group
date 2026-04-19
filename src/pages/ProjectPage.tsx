import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import the Master Data (Make sure you've created this file)
import { projectData } from '../data/ProjectData';

// Import all components
import { ProjectHero } from '../components/project/ProjectHero';
import { ProjectAbout } from '../components/project/ProjectAbout';
import { KineticGallery } from '../components/project/KineticGallery';
import { BlueprintSection } from '../components/project/BlueprintSection';
import { AmenitiesSection } from '../components/project/AmenitiesSection';
import { ConclusionSection } from '../components/project/ConclusionSection';
import { AboutGroupSection } from '../components/project/AboutGroupSection';
import { ContactSection } from '../components/project/ContactSection';
import { Footer } from '../components/shared/Footer';

gsap.registerPlugin(ScrollTrigger);

export const ProjectPage: React.FC = () => {
  // 1. Grab the slug from the URL (e.g., 'villas' or '1bhk-flats')
  const { slug } = useParams<{ slug: string }>();
  
  // 2. Filter the projectData based on that slug
  const data = projectData[slug as keyof typeof projectData];

  // Use useLayoutEffect to ensure ScrollTrigger calculates AFTER the DOM is ready
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // Refresh and sort triggers by their position on the page
    // Using a slight timeout ensures the dynamic content is painted first
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.sort();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up everything to prevent the "Back-and-forth" ghosting
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [slug]); // Re-run when switching projects

  // Fallback if data isn't found
  if (!data) return <div className="h-screen bg-black" />;

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      
      {/* Dynamic Hero: Sets the 'Affordable 1 BHK' heading [cite: 5] */}
      <ProjectHero 
        titleLine1={data.hero.title} 
        titleLine2={data.hero.subtitle} 
        description={data.hero.description}
        bgImage={data.hero.bgImage}
        videoSrc={data.hero.videoSrc}
      />

      {/* Dynamic About: Shows 75 Sq. Yards for 1BHK [cite: 50] */}
      <ProjectAbout 
        headingMain="Defining"
        headingItalic="Excellence."
        descriptionTop={data.hero.description}
        descriptionSub="A thoughtfully planned residential development offering the perfect balance of comfort, connectivity, and modern design."
        projectSpecs={data.specs}
        highlights={data.highlights}
        bannerImage={data.about.bannerImage}
      />
      
      <section className="relative z-10">
        <KineticGallery />
      </section>

      {/* SECTION B: THE BLUEPRINTS (Hidden for 1BHK as requested)  */}
      {data.blueprints && data.blueprints.length > 0 && (
        <section className="relative z-20">
          <BlueprintSection data={data.blueprints} />
        </section>
      )}

      {/* Dynamic Amenities: Focuses on 'Smart Space Planning' [cite: 57] */}
      <AmenitiesSection
        titleMain="Designed for the"
        titleItalic="Way You Live"
        subtitle="Every detail considered. Nothing left to chance."
        amenitiesList={data.amenities}
      />

      {/* Dynamic Conclusion: Shows 'Limited Units' for 1BHK  */}
      <ConclusionSection 
        availabilityNumber={data.specs.find(s => s.label === 'Availability')?.value || 'LTD'}
        headingMain="Secure Your"
        headingItalic="future today"
        description={
          <>
            Secure your space in a fast-growing location near Tricity. 
            With <span className="text-white font-semibold underline decoration-[#70061d] underline-offset-4">Limited Units</span> remaining, 
            this is the final window for an elite investment.
          </>
        }
      />

      {/* SECTION 05: Conditional Group Section */}
      {data.showGroupSection && (
        <AboutGroupSection />
      )}

      <ContactSection />
      <Footer />
    </main>
  );
};

export default ProjectPage;