// Admin Data Models

export interface Admin {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  desktopImage?: string;
  mobileImage?: string;
  slug?: string;
  featured?: boolean;
  order?: number;
  created_at?: string;
}

export interface GoogleAdResult {
  id: string;
  title: string;
  price: string;
  totalCost: string;
  totalClicks: string;
  image: string;
  order?: number;
  created_at?: string;
}

export interface HomepageContent {
  id?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroBackgroundImage?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  portfolioTitle?: string;
  portfolioSubtitle?: string;
  blogTitle?: string;
  blogSubtitle?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  googleAdsTitle?: string;
  googleAdsSubtitle?: string;
  statsTitle?: string;
  updated_at?: string;
}

export interface AboutPageContent {
  id?: string;
  title?: string;
  description?: string;
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
  imageUrl?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: 'marketing' | 'programming';
  order?: number;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
  created_at?: string;
}

export interface ContactPageContent {
  id?: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  whatsappNumber?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
  created_at: string;
}
