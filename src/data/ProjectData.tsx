import React from 'react';
import { 
  Home, 
  DoorOpen, 
  LayoutGrid, 
  ShieldCheck, 
  TreePine, 
  MapPin, 
  Sun, 
  TrendingUp, 
  Layout, 
  Layers, 
  Wind 
} from 'lucide-react';

export const projectData = {
  "dera-bassi": {
    hero: {
      title: "Residential",
      subtitle: "plots & villas.",
      description: "A thoughtfully planned residential development offering the perfect balance of comfort, connectivity, and modern design.",
      bgImage: "/images/villas-hero.webp",
      videoSrc: "/videos/villa-hero.mp4" // Unique Hero for Villas
    },
    about: {
      headingMain: "Defining",
      headingItalic: "Excellence.",
      descriptionTop: "Located in Dera Bassi near Tricity, this project offers premium residential plots and built villas.",
      descriptionSub: "A thoughtfully planned residential development offering the perfect balance of comfort, connectivity, and modern design.",
      bannerImage: "/images/highlights-villas.webp" // Unique Highlights for Villas
    },
    specs: [
      { label: 'Plot Dimension', value: '20 FT × 45 FT', detail: 'VILLA_SEC_A' },
      { label: 'Total Area', value: '100 SQ. YDS', detail: 'RES_LAND_01' },
      { label: 'Units', value: '13 HOMES', detail: 'LTD_EDITION' },
    ],
    highlights: [
      "Well-planned layouts",
      "Proper ventilation and natural light",
      "Front and rear open space",
      "Peaceful residential surroundings",
      "Easy connectivity to Tricity"
    ],
    amenities: [
      {
        icon: <Home size={24} strokeWidth={1.5} />,
        title: 'Proper Front Space',
        desc: 'Generous setback area ensuring privacy, natural light, and a welcoming approach to your home.',
      },
      {
        icon: <DoorOpen size={24} strokeWidth={1.5} />,
        title: 'Independent Staircase',
        desc: 'Each unit features its own dedicated staircase — complete independence and complete privacy.',
      },
      {
        icon: <LayoutGrid size={24} strokeWidth={1.5} />,
        title: 'Modern Layout',
        desc: 'Vastu-aligned, open-plan interiors designed for contemporary family living and flexibility.',
      },
      {
        icon: <ShieldCheck size={24} strokeWidth={1.5} />,
        title: 'Secure Community',
        desc: 'A peaceful residential environment with controlled access for family safety and peace of mind.',
      },
      {
        icon: <TreePine size={24} strokeWidth={1.5} />,
        title: 'Green Surroundings',
        desc: 'Thoughtfully planned spaces with access to clean air and natural light in every room.',
      },
      {
        icon: <MapPin size={24} strokeWidth={1.5} />,
        title: 'Connectivity',
        desc: 'Strategically located on the Dera Bassi growth corridor for effortless access to the Tricity.',
      }
    ],
    blueprints: [
      {
        id: 'villa-ground',
        tag: 'PREMIUM CONFIGURATION',
        title: 'Villa Layout',
        description: 'Spacious layout designed for comfortable family living with balanced space planning and open flow.',
        stats: 'Ground Floor',
        image: '/BP1.webp',
        features: ['Balanced Space Planning', 'Comfortable Family Living', 'Open Flow Design']
      }
    ],
    conclusion: {
      number: "13",
      heading: "Secure Your",
      italic: "future today",
      text: "The Dera Bassi micro-market is experiencing rapid appreciation. With proximity to Chandigarh and only 13 exclusive units remaining, this is the final window for an elite investment."
    },
    showGroupSection: false
  },

  "1bhk-flats": {
    hero: {
      title: "Affordable",
      subtitle: "1 BHK Flats.",
      description: "Thoughtfully designed homes in Dera Bassi, built for comfort, functionality, and modern living.",
      bgImage: "/images/1bhk-hero.webp"
    },
    about: {
      headingMain: "Smart &",
      headingItalic: "Functional.",
      descriptionTop: "Kleem presents thoughtfully designed 1 BHK flats that focus on practical living and efficient use of space.",
      descriptionSub: "Each unit is planned to ensure smooth movement, privacy, and everyday comfort, making it a complete and functional home.",
      bannerImage: "/images/highlights-1bhk.webp"
    },
    specs: [
      { label: 'Unit Type', value: '1 BHK', detail: 'SMART_HOME' },
      { label: 'Total Area', value: '75 SQ. YARDS', detail: 'RES_LAND_02' },
      { label: 'Availability', value: 'LIMITED UNITS', detail: 'LTD_EDITION' },
    ],
    highlights: [
      "Well-Planned Layouts",
      "Natural Light & Ventilation",
      "Ideal for Living & Rental",
      "Prime Location Near Tricity",
      "Smart Space Planning"
    ],
    amenities: [
      {
        icon: <Sun size={24} strokeWidth={1.5} />,
        title: 'Design Advantage',
        desc: 'Every unit includes front and rear open spaces that allow natural light and proper ventilation throughout the home.',
      },
      {
        icon: <TrendingUp size={24} strokeWidth={1.5} />,
        title: 'Investment Value',
        desc: 'Suitable for personal living as well as rental income. Offers a strong opportunity for steady returns and appreciation.',
      },
      {
        icon: <Layout size={24} strokeWidth={1.5} />,
        title: 'Balanced Layout',
        desc: 'Carefully designed to maintain a balance between functionality and comfort with clear zoning.',
      },
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        title: 'Independent Living',
        desc: 'Multi-floor configurations (Ground, First, Second) making it ideal for extended families or multiple rental streams.',
      },
      {
        icon: <Wind size={24} strokeWidth={1.5} />,
        title: 'Ventilated Design',
        desc: 'Open areas are incorporated to ensure proper airflow and natural light, making the space pleasant for long-term living.',
      },
      {
        icon: <ShieldCheck size={24} strokeWidth={1.5} />,
        title: 'Privacy & Usability',
        desc: 'The architectural layout ensures smooth movement within the home while maintaining strict privacy between units.',
      }
    ],
    blueprints: [], 
    conclusion: {
      number: "LTD",
      heading: "Book Your",
      italic: "home today",
      text: "Limited units available. Secure your space in a fast-growing location near Tricity. Ideal for living and investment."
    },
    showGroupSection: true
  }
};

export const legalData = {
  "privacy-policy": {
    title: "Privacy Policy",
    effectiveDate: "2026",
    sections: [
      {
        heading: "Information We Collect",
        content: "We may collect personal information such as your name, phone number, email address, and any other details you voluntarily provide through contact forms, inquiry forms, or direct communication."
      },
      {
        heading: "How We Use Your Information",
        content: "Your information may be used to respond to inquiries and provide project details, share updates regarding our projects, offers, or services, and improve our services and user experience. We do not sell or rent your personal information. However, it may be shared with internal teams or authorized representatives strictly for business purposes."
      },
      {
        heading: "Data Security",
        content: "We take reasonable technical and organizational measures to safeguard your data. However, no digital platform can guarantee complete security."
      },
      {
        heading: "Cookies & Tracking",
        content: "Our website may use cookies or similar technologies to enhance user experience and analyze website performance."
      },
      {
        heading: "Third-Party Links",
        content: "Our website may contain links to external platforms. Kleem Group is not responsible for their content or privacy practices."
      }
    ]
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    effectiveDate: "2026",
    sections: [
      {
        heading: "General Information",
        content: "By accessing this website, you agree that all content is for informational and promotional purposes only and does not constitute a legal offer."
      },
      {
        heading: "Project Details",
        content: "All project specifications, layouts, sizes, pricing, and availability are subject to change without prior notice. Nothing on this website shall be considered as a binding agreement or commitment."
      },
      {
        heading: "Intellectual Property",
        content: "All content including images, text, designs, and branding elements are the property of Kleem Group. Unauthorized use is strictly prohibited."
      },
      {
        heading: "User Responsibility",
        content: "Users are advised to independently verify all details before making any decision related to property purchase or investment."
      },
      {
        heading: "Limitation of Liability",
        content: "Kleem Group shall not be held liable for any direct, indirect, or incidental damages arising from the use of this website or reliance on its content. All disputes shall be subject to the jurisdiction of local courts where the company operates."
      }
    ]
  },
  "disclaimer": {
    title: "Disclaimer",
    effectiveDate: "2026",
    sections: [
      {
        heading: "Informational Purposes",
        content: "All information, images, visuals, plans, layouts, specifications, and other content displayed on this website are for general informational and illustrative purposes only."
      },
      {
        heading: "Representation Clause",
        content: "Images shown are artistic impressions or conceptual representations. Actual construction, design, and specifications may vary from what is displayed."
      },
      {
        heading: "No Offer Clause",
        content: "This website does not constitute an offer, invitation to offer, or any form of legal commitment. All developments are subject to necessary approvals from relevant authorities."
      },
      {
        heading: "Investment Advisory",
        content: "The company does not guarantee returns, appreciation, or rental income. Any investment decision should be made at the buyer's discretion after conducting their own due diligence."
      }
    ]
  }
};