// Admin Service Functions with Supabase
import { supabase } from '@/integrations/supabase/client';
import {
  Project,
  GoogleAdResult,
  HomepageContent,
  AboutPageContent,
  Service,
  BlogPost,
  FAQItem,
  ContactPageContent,
  ContactMessage,
} from '@/types/admin';

// ============================================
// PROJECTS
// ============================================
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  return (data || []).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    link: p.link,
    desktopImage: p.desktop_image,
    mobileImage: p.mobile_image,
    slug: p.slug,
    featured: p.featured || false,
    order: p.display_order,
    created_at: p.created_at,
  }));
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: project.title,
      description: project.description,
      link: project.link || '',
      desktop_image: project.desktopImage || '',
      mobile_image: project.mobileImage || '',
      slug: project.slug || project.title.toLowerCase().replace(/\s+/g, '-'),
      featured: project.featured || false,
      display_order: project.order || 0,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    link: data.link,
    desktopImage: data.desktop_image,
    mobileImage: data.mobile_image,
    slug: data.slug,
    featured: data.featured || false,
    order: data.display_order,
    created_at: data.created_at,
  };
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  const updateData: Record<string, unknown> = {};
  if (project.title !== undefined) updateData.title = project.title;
  if (project.description !== undefined) updateData.description = project.description;
  if (project.link !== undefined) updateData.link = project.link;
  if (project.desktopImage !== undefined) updateData.desktop_image = project.desktopImage;
  if (project.mobileImage !== undefined) updateData.mobile_image = project.mobileImage;
  if (project.slug !== undefined) updateData.slug = project.slug;
  if (project.featured !== undefined) updateData.featured = project.featured;
  if (project.order !== undefined) updateData.display_order = project.order;

  const { error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
};

// ============================================
// GOOGLE ADS
// ============================================
export const getGoogleAds = async (): Promise<GoogleAdResult[]> => {
  const { data, error } = await supabase
    .from('google_ads_results')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  return (data || []).map(ad => ({
    id: ad.id,
    title: ad.title,
    price: ad.price,
    totalCost: ad.total_cost,
    totalClicks: ad.total_clicks,
    image: ad.image,
    order: ad.display_order,
    created_at: ad.created_at,
  }));
};

export const createGoogleAd = async (ad: Omit<GoogleAdResult, 'id' | 'created_at'>): Promise<GoogleAdResult> => {
  const { data, error } = await supabase
    .from('google_ads_results')
    .insert({
      title: ad.title,
      price: ad.price || '',
      total_cost: ad.totalCost || '',
      total_clicks: ad.totalClicks || '',
      image: ad.image || '',
      display_order: ad.order || 0,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    price: data.price,
    totalCost: data.total_cost,
    totalClicks: data.total_clicks,
    image: data.image,
    order: data.display_order,
    created_at: data.created_at,
  };
};

export const updateGoogleAd = async (id: string, ad: Partial<GoogleAdResult>): Promise<void> => {
  const updateData: Record<string, unknown> = {};
  if (ad.title !== undefined) updateData.title = ad.title;
  if (ad.price !== undefined) updateData.price = ad.price;
  if (ad.totalCost !== undefined) updateData.total_cost = ad.totalCost;
  if (ad.totalClicks !== undefined) updateData.total_clicks = ad.totalClicks;
  if (ad.image !== undefined) updateData.image = ad.image;
  if (ad.order !== undefined) updateData.display_order = ad.order;

  const { error } = await supabase
    .from('google_ads_results')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteGoogleAd = async (id: string): Promise<void> => {
  const { error } = await supabase.from('google_ads_results').delete().eq('id', id);
  if (error) throw error;
};

// ============================================
// SERVICES
// ============================================
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  return (data || []).map(s => ({
    id: s.id,
    title: s.title,
    description: s.description,
    imageUrl: s.image_url,
    category: s.category as 'marketing' | 'programming' || 'marketing',
    order: s.display_order,
    created_at: s.created_at,
  }));
};

export const createService = async (service: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert({
      title: service.title,
      description: service.description,
      image_url: service.imageUrl || '',
      category: service.category || 'marketing',
      display_order: service.order || 0,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
    category: data.category as 'marketing' | 'programming' || 'marketing',
    order: data.display_order,
    created_at: data.created_at,
  };
};

export const updateService = async (id: string, service: Partial<Service>): Promise<void> => {
  const updateData: Record<string, unknown> = {};
  if (service.title !== undefined) updateData.title = service.title;
  if (service.description !== undefined) updateData.description = service.description;
  if (service.imageUrl !== undefined) updateData.image_url = service.imageUrl;
  if (service.category !== undefined) updateData.category = service.category;
  if (service.order !== undefined) updateData.display_order = service.order;

  const { error } = await supabase
    .from('services')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
};

// ============================================
// BLOG POSTS
// ============================================
export const getBlogPosts = async (publishedOnly = false): Promise<BlogPost[]> => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data || []).map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    image: p.image_url,
    author: 'فريق بيكسل',
    published: p.published,
    created_at: p.created_at,
    updated_at: p.updated_at,
  }));
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-'),
      excerpt: post.excerpt || '',
      content: post.content || '',
      image_url: post.image || '',
      published: post.published ?? false,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    image: data.image_url,
    author: 'فريق بيكسل',
    published: data.published,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
  const updateData: Record<string, unknown> = {};
  if (post.title !== undefined) updateData.title = post.title;
  if (post.slug !== undefined) updateData.slug = post.slug;
  if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
  if (post.content !== undefined) updateData.content = post.content;
  if (post.image !== undefined) updateData.image_url = post.image;
  if (post.published !== undefined) updateData.published = post.published;

  const { error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
};

// ============================================
// FAQ
// ============================================
export const getFAQs = async (): Promise<FAQItem[]> => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  return (data || []).map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    order: f.display_order,
    created_at: f.created_at,
  }));
};

export const sendContactMessage = async (message: { name: string; email: string; phone: string; message: string; service?: string }) => {
  const { error } = await supabase
    .from('contact_messages' as any)
    .insert([
      {
        name: message.name,
        email: message.email,
        phone: message.phone,
        message: message.message,
        service: message.service || ''
      }
    ]);


  if (error) throw error;
};

export const createFAQ = async (faq: Omit<FAQItem, 'id' | 'created_at'>): Promise<FAQItem> => {
  const { data, error } = await supabase
    .from('faqs')
    .insert({
      question: faq.question,
      answer: faq.answer,
      display_order: faq.order || 0,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    question: data.question,
    answer: data.answer,
    order: data.display_order,
    created_at: data.created_at,
  };
};

export const updateFAQ = async (id: string, faq: Partial<FAQItem>): Promise<void> => {
  const updateData: Record<string, unknown> = {};
  if (faq.question !== undefined) updateData.question = faq.question;
  if (faq.answer !== undefined) updateData.answer = faq.answer;
  if (faq.order !== undefined) updateData.display_order = faq.order;

  const { error } = await supabase
    .from('faqs')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw error;
};

// ============================================
// HOMEPAGE CONTENT
// ============================================
export const getHomepageContent = async (): Promise<HomepageContent | null> => {
  const { data, error } = await supabase
    .from('homepage_content')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    heroDescription: data.hero_description,
    heroButtonText: data.hero_button_text,
    heroButtonLink: data.hero_button_link,
    heroBackgroundImage: data.hero_background_image,
    aboutTitle: data.about_title,
    aboutDescription: data.about_description,
    servicesTitle: data.services_title,
    servicesSubtitle: data.services_subtitle,
    portfolioTitle: data.portfolio_title,
    portfolioSubtitle: data.portfolio_subtitle,
    blogTitle: data.blog_title,
    blogSubtitle: data.blog_subtitle,
    faqTitle: data.faq_title,
    faqSubtitle: data.faq_subtitle,
    googleAdsTitle: data.google_ads_title,
    googleAdsSubtitle: data.google_ads_subtitle,
    updated_at: data.updated_at,
  };
};

export const updateHomepageContent = async (content: Partial<HomepageContent>): Promise<void> => {
  const { data: existing } = await supabase
    .from('homepage_content')
    .select('id')
    .limit(1)
    .maybeSingle();

  const updateData: Record<string, unknown> = {};
  if (content.heroTitle !== undefined) updateData.hero_title = content.heroTitle;
  if (content.heroSubtitle !== undefined) updateData.hero_subtitle = content.heroSubtitle;
  if (content.heroDescription !== undefined) updateData.hero_description = content.heroDescription;
  if (content.heroButtonText !== undefined) updateData.hero_button_text = content.heroButtonText;
  if (content.heroButtonLink !== undefined) updateData.hero_button_link = content.heroButtonLink;
  if (content.heroBackgroundImage !== undefined) updateData.hero_background_image = content.heroBackgroundImage;
  if (content.aboutTitle !== undefined) updateData.about_title = content.aboutTitle;
  if (content.aboutDescription !== undefined) updateData.about_description = content.aboutDescription;
  if (content.servicesTitle !== undefined) updateData.services_title = content.servicesTitle;
  if (content.servicesSubtitle !== undefined) updateData.services_subtitle = content.servicesSubtitle;
  if (content.portfolioTitle !== undefined) updateData.portfolio_title = content.portfolioTitle;
  if (content.portfolioSubtitle !== undefined) updateData.portfolio_subtitle = content.portfolioSubtitle;
  if (content.blogTitle !== undefined) updateData.blog_title = content.blogTitle;
  if (content.blogSubtitle !== undefined) updateData.blog_subtitle = content.blogSubtitle;
  if (content.faqTitle !== undefined) updateData.faq_title = content.faqTitle;
  if (content.faqSubtitle !== undefined) updateData.faq_subtitle = content.faqSubtitle;
  if (content.googleAdsTitle !== undefined) updateData.google_ads_title = content.googleAdsTitle;
  if (content.googleAdsSubtitle !== undefined) updateData.google_ads_subtitle = content.googleAdsSubtitle;

  if (existing) {
    const { error } = await supabase
      .from('homepage_content')
      .update(updateData)
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('homepage_content')
      .insert(updateData);
    if (error) throw error;
  }
};

// ============================================
// ABOUT CONTENT
// ============================================
export const getAboutContent = async (): Promise<AboutPageContent | null> => {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    visionTitle: data.vision_title,
    visionDescription: data.vision_description,
    missionTitle: data.mission_title,
    missionDescription: data.mission_description,
    imageUrl: data.image_url,
    updated_at: data.updated_at,
  };
};

export const updateAboutContent = async (content: Partial<AboutPageContent>): Promise<void> => {
  const { data: existing } = await supabase
    .from('about_content')
    .select('id')
    .limit(1)
    .maybeSingle();

  const updateData: Record<string, unknown> = {};
  if (content.title !== undefined) updateData.title = content.title;
  if (content.description !== undefined) updateData.description = content.description;
  if (content.visionTitle !== undefined) updateData.vision_title = content.visionTitle;
  if (content.visionDescription !== undefined) updateData.vision_description = content.visionDescription;
  if (content.missionTitle !== undefined) updateData.mission_title = content.missionTitle;
  if (content.missionDescription !== undefined) updateData.mission_description = content.missionDescription;
  if (content.imageUrl !== undefined) updateData.image_url = content.imageUrl;

  if (existing) {
    const { error } = await supabase
      .from('about_content')
      .update(updateData)
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('about_content')
      .insert(updateData);
    if (error) throw error;
  }
};


export const getContactContent = async (): Promise<ContactPageContent | null> => {
  const { data, error } = await supabase
    .from('contact_content')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    email: data.email,
    phone: data.phone,
    whatsappNumber: data.whatsapp,
    address: data.address,
    updated_at: data.updated_at,
  };
};

export const updateContactContent = async (content: Partial<ContactPageContent>): Promise<void> => {
  const { data: existing } = await supabase
    .from('contact_content')
    .select('id')
    .limit(1)
    .maybeSingle();

  const updateData: Record<string, unknown> = {};
  if (content.title !== undefined) updateData.title = content.title;
  if (content.description !== undefined) updateData.description = content.description;
  if (content.email !== undefined) updateData.email = content.email;
  if (content.phone !== undefined) updateData.phone = content.phone;
  if (content.whatsappNumber !== undefined) updateData.whatsapp = content.whatsappNumber;
  if (content.address !== undefined) updateData.address = content.address;

  if (existing) {
    const { error } = await supabase
      .from('contact_content')
      .update(updateData)
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('contact_content')
      .insert(updateData);
    if (error) throw error;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages' as any)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((m: any) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    message: m.message,
    service: m.service,
    created_at: m.created_at,
  }));
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages' as any)
    .delete()
    .eq('id', id);

  if (error) throw error;
};
