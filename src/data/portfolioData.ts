export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  turnaround: string;
  features: string[];
  icon: string; // Lucide icon name
  startingPrice: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'thumbnails' | 'social' | 'branding' | 'posters';
  categoryLabel: string;
  image: string;
  client: string;
  niche: string;
  metric: string; // e.g. "+16.4% CTR", "3.2M Views"
  software: string[];
  description: string;
  aspectRatio: '16/9' | '4/3' | '1/1';
  beforeImage?: string; // Optional for CTR comparison
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  duration: string;
  featured?: boolean;
  features: string[];
  excludedFeatures?: string[];
  ctaText: string;
  recommendedFor: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'thumbnails',
    title: 'YouTube Thumbnail Design',
    subtitle: 'High-CTR Psychology & 3D Lighting',
    description: 'Thumbnails engineered to win the click. High dynamic lighting, realistic 3D typography, expressive facial retouching, and proven curiosity hooks that drive views.',
    turnaround: '24–48 Hours',
    features: [
      'Visual hierarchy engineered for high CTR',
      'Advanced face contouring & eye lighting',
      'Custom 3D extruded lettering in Blender/Photoshop',
      'Free A/B testing variations for top creators',
    ],
    icon: 'Youtube',
    startingPrice: '₹999 / $15 per thumb',
    popular: true,
  },
  {
    id: 'instagram',
    title: 'Instagram Post Design',
    subtitle: 'High-Engagement Carousels & Feeds',
    description: 'Sleek, scroll-stopping carousel decks and single-image graphics designed to drive saves, shares, and build a magnetic personal brand aesthetic.',
    turnaround: '24–48 Hours',
    features: [
      'Seamless multi-slide carousel flow',
      'Modern dark & gold luxury typography',
      'Clean infographics & visual breakdowns',
      'Optimized for mobile viewing ratio (4:5 & 1:1)',
    ],
    icon: 'Instagram',
    startingPrice: '₹1,499 / $20 per deck',
  },
  {
    id: 'social-banners',
    title: 'Social Media Banners',
    subtitle: 'Omnichannel Header & Cover Systems',
    description: 'Establish authority from the first second a viewer lands on your profile. Cohesive header graphics tailored for YouTube, Twitter/X, and LinkedIn.',
    turnaround: '48 Hours',
    features: [
      'Pixel-perfect safe zone alignment for all devices',
      'Bold headline & value proposition typography',
      'High-resolution creator cutout integration',
      'Exported in uncompressed 4K formats',
    ],
    icon: 'Layout',
    startingPrice: '₹2,499 / $35 per banner',
  },
  {
    id: 'branding-logos',
    title: 'Logo & Brand Identity',
    subtitle: 'Modern Minimalist & Monogram Systems',
    description: 'Distinguished vector logos and brand marks that look equally striking on a YouTube watermark, luxury business card, or mobile app icon.',
    turnaround: '3–5 Days',
    features: [
      'Custom bespoke vector emblem / monogram',
      'Complete typography & color palette system',
      'Dark & light mode export variations',
      'Full commercial copyright transfer + vector AI/SVG files',
    ],
    icon: 'Crown',
    startingPrice: '₹5,999 / $80 full kit',
    popular: true,
  },
  {
    id: 'posters',
    title: 'Poster & Event Design',
    subtitle: 'Cinematic Visuals & Campaign Posters',
    description: 'High-contrast promotional posters for webinars, music drops, film premieres, and high-impact digital campaigns.',
    turnaround: '48 Hours',
    features: [
      'Cinematic color grading and atmospheric textures',
      'Mastery of negative space & typography hierarchy',
      'Print-ready 300DPI CMYK + Web RGB exports',
      'Custom photo manipulation & compositing',
    ],
    icon: 'Sparkles',
    startingPrice: '₹3,499 / $45 per poster',
  },
  {
    id: 'channel-art',
    title: 'YouTube Channel Art Suite',
    subtitle: 'Complete Creator Visual Rebranding',
    description: 'A complete visual transformation for serious YouTubers: matching channel banner, avatar, watermark, end screens, and thumbnail templates.',
    turnaround: '3 Days',
    features: [
      'Cohesive YouTube Channel Banner (Mobile, Desktop, TV)',
      'Vector Avatar Logo / Creator Cutout Icon',
      'Dynamic End-Screen Outro Templates',
      'Custom Reusable Photoshop Thumbnail Template',
    ],
    icon: 'Tv',
    startingPrice: '₹6,499 / $90 suite',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Billionaire Gold Scandal',
    category: 'thumbnails',
    categoryLabel: 'Documentary Thumbnail',
    image: '/src/assets/images/thumb_documentary_finance_1793822704673.jpg',
    client: 'Apex Finance (840K Subs)',
    niche: 'Business & Geopolitics',
    metric: '18.2% CTR · 2.8M Views',
    software: ['Photoshop', 'Blender', 'Camera Raw'],
    description: 'A viral YouTube documentary thumbnail engineered with glowing gold bullion, holographic stock surge lines, and dramatic rim-lit creator portrait. Achieved 2.8M views in 14 days with an 18.2% average CTR.',
    aspectRatio: '16/9',
  },
  {
    id: 'port-2',
    title: 'Next-Gen Artificial Intelligence',
    category: 'thumbnails',
    categoryLabel: 'Tech Review Thumbnail',
    image: '/src/assets/images/thumb_tech_ai_concept_1793822704883.jpg',
    client: 'CyberCore Tech (1.4M Subs)',
    niche: 'Futuristic Tech & AI',
    metric: '15.7% CTR · 1.9M Views',
    software: ['Photoshop', 'Cinema 4D', 'Lightroom'],
    description: 'Tech thumbnail with a golden holographic neural brain, high-contrast rim lighting, and bold 3D metallic typography reading "AI". Optimized for instant mobile readability on YouTube home feed.',
    aspectRatio: '16/9',
  },
  {
    id: 'port-3',
    title: 'Aman Design Monogram Identity',
    category: 'branding',
    categoryLabel: 'Brand Identity & Logo',
    image: '/src/assets/images/branding_golden_monogram_1793822705025.jpg',
    client: 'Aman Design Brand',
    niche: 'Creative Studio Identity',
    metric: 'Complete Vector System',
    software: ['Illustrator', 'Photoshop', 'InDesign'],
    description: 'Bespoke golden monogram merging the letters A and D into an architectural emblem. Embossed gold foil on deep matte carbon black stock with clean geometric typography.',
    aspectRatio: '4/3',
  },
  {
    id: 'port-4',
    title: 'Creative Agency Studio Workspace',
    category: 'posters',
    categoryLabel: 'Studio Visual Showcase',
    image: '/src/assets/images/hero_aman_design_workspace_1793822703159.jpg',
    client: 'Aman Design Workspace',
    niche: 'Creative Direction & Workspace',
    metric: 'High-Res 4K Production',
    software: ['Photoshop', 'After Effects', 'Lightroom'],
    description: 'Atmospheric creative studio setup showing color-accurate dual monitor workstation, glowing golden ambient illumination, and design-in-progress thumbnail composition.',
    aspectRatio: '16/9',
  },
  {
    id: 'port-5',
    title: '100 Days To Build A Million Dollar Brand',
    category: 'thumbnails',
    categoryLabel: 'Entrepreneurship Thumbnail',
    image: '/src/assets/images/thumb_documentary_finance_1793822704673.jpg',
    client: 'Founder Journey (520K Subs)',
    niche: 'Startups & Hustle',
    metric: '16.9% CTR · 1.1M Views',
    software: ['Photoshop', 'Blender', 'Camera Raw'],
    description: 'High stakes storytelling thumbnail combining golden metric overlays, high key lighting, and curiosity-driven visual contrast.',
    aspectRatio: '16/9',
  },
  {
    id: 'port-6',
    title: 'The Future of Neural Computing',
    category: 'social',
    categoryLabel: 'Instagram Carousel Deck',
    image: '/src/assets/images/thumb_tech_ai_concept_1793822704883.jpg',
    client: 'DeepTech Media',
    niche: 'Instagram Education',
    metric: '+340% Shares & Saves',
    software: ['Photoshop', 'Illustrator', 'Figma'],
    description: '10-slide dark mode Instagram carousel with glowing gold annotations, crisp serif subheads, and infographics explaining generative transformer architectures.',
    aspectRatio: '16/9',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Thumbnail Package',
    tagline: 'Ideal for emerging creators uploading 1–2 times weekly.',
    price: '₹2,499',
    originalPrice: '₹3,499',
    duration: '3 Custom Thumbnails',
    features: [
      '3 High-CTR YouTube Thumbnails',
      '48-Hour Standard Turnaround',
      'Face Retouching & Dynamic Lighting',
      '2 Revisions per design',
      'High-Resolution 1080p Export',
      'Click-Through Rate (CTR) Consultation',
    ],
    excludedFeatures: [
      'A/B Testing Concept Variants',
      'Source PSD Layered Files',
      '24h Priority Turnaround',
    ],
    ctaText: 'Get Basic Package',
    recommendedFor: 'New & growing YouTube creators',
  },
  {
    id: 'professional',
    name: 'Professional Thumbnail Package',
    tagline: 'The #1 choice for serious creators needing reliable viral CTR.',
    price: '₹6,999',
    originalPrice: '₹9,999',
    duration: '10 Custom Thumbnails',
    featured: true,
    features: [
      '10 High-CTR YouTube Thumbnails',
      'Priority 24–36 Hour Delivery',
      'A/B Testing Concept Variants (2 options/video)',
      'Unlimited Revisions until 100% satisfied',
      'Advanced 3D Extruded Lettering & FX',
      'Full PSD Layered Source Files included',
      'Dedicated WhatsApp VIP Direct Communication',
      'Direct competitor thumbnail benchmarking',
    ],
    ctaText: 'Get Professional Package',
    recommendedFor: 'Weekly uploaders & established channels',
  },
  {
    id: 'premium',
    name: 'Premium Design Package',
    tagline: 'Total channel visual overhaul & monthly thumbnail retainer.',
    price: '₹14,999',
    originalPrice: '₹19,999',
    duration: '20 Thumbnails + Channel Art',
    features: [
      '20 High-CTR YouTube Thumbnails',
      'Complete YouTube Channel Art (Banner + Avatar)',
      'Twitter/X Banner + LinkedIn Cover',
      '5 Reusable Instagram Carousel Templates',
      'Ultra-Fast 24-Hour Guaranteed Turnaround',
      'Unlimited Revisions on all deliverables',
      'All Source Files (PSD, AI, Vector)',
      'Monthly CTR audit & performance optimization',
    ],
    ctaText: 'Get Premium Agency Suite',
    recommendedFor: 'Full-time creators, brands & podcasts',
  },
];

export const TESTIMONIALS = [
  {
    quote: "Aman completely transformed our channel's CTR. Our average click-through rate jumped from 6.8% to 14.2% within two weeks of using his thumbnails. He understands YouTube psychology better than anyone.",
    author: "Rohan V.",
    channel: "Apex Finance (840K Subscribers)",
    metric: "+108% CTR Growth",
  },
  {
    quote: "The 3D text work and lighting Aman creates is literally MrBeast-level quality. Fast 24-hour turnaround and he never complains about revisions. Highly recommended!",
    author: "Kabir S.",
    channel: "CyberCore Tech (1.4M Subscribers)",
    metric: "45M+ Lifetime Views",
  },
  {
    quote: "Aman Design handled our complete branding from logo to banners and video thumbnails. The black and gold aesthetic is pure luxury. Worth every single penny.",
    author: "Sneha M.",
    channel: "The Founder Lounge Podcast",
    metric: "Complete Rebrand",
  },
];
