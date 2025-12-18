-- Create homepage_content table
CREATE TABLE public.homepage_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT '',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_description TEXT NOT NULL DEFAULT '',
  hero_button_text TEXT NOT NULL DEFAULT '',
  hero_button_link TEXT NOT NULL DEFAULT '',
  hero_background_image TEXT NOT NULL DEFAULT '',
  about_title TEXT NOT NULL DEFAULT '',
  about_description TEXT NOT NULL DEFAULT '',
  services_title TEXT NOT NULL DEFAULT '',
  services_subtitle TEXT NOT NULL DEFAULT '',
  portfolio_title TEXT NOT NULL DEFAULT '',
  portfolio_subtitle TEXT NOT NULL DEFAULT '',
  blog_title TEXT NOT NULL DEFAULT '',
  blog_subtitle TEXT NOT NULL DEFAULT '',
  faq_title TEXT NOT NULL DEFAULT '',
  faq_subtitle TEXT NOT NULL DEFAULT '',
  google_ads_title TEXT NOT NULL DEFAULT '',
  google_ads_subtitle TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_content table
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  vision_title TEXT NOT NULL DEFAULT '',
  vision_description TEXT NOT NULL DEFAULT '',
  mission_title TEXT NOT NULL DEFAULT '',
  mission_description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_content table
CREATE TABLE public.contact_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  desktop_image TEXT NOT NULL DEFAULT '',
  mobile_image TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faqs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create google_ads_results table
CREATE TABLE public.google_ads_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '',
  total_cost TEXT NOT NULL DEFAULT '',
  total_clicks TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_ads_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create has_role function for checking admin access
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Public read policies for frontend display
CREATE POLICY "Public can read homepage content" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "Public can read about content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Public can read contact content" ON public.contact_content FOR SELECT USING (true);
CREATE POLICY "Public can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can read published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can read google ads results" ON public.google_ads_results FOR SELECT USING (true);

-- Admin policies for full CRUD
CREATE POLICY "Admins can manage homepage content" ON public.homepage_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage about content" ON public.about_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage contact content" ON public.contact_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage google ads results" ON public.google_ads_results FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can read user roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Insert default content
INSERT INTO public.homepage_content (hero_title, hero_subtitle, hero_description, hero_button_text, hero_button_link, about_title, about_description, services_title, services_subtitle, portfolio_title, portfolio_subtitle, blog_title, blog_subtitle, faq_title, faq_subtitle, google_ads_title, google_ads_subtitle)
VALUES (
  'نحول أفكارك إلى واقع رقمي',
  'شريكك في النجاح الرقمي',
  'نقدم حلولاً رقمية متكاملة تساعد عملك على النمو والتميز في السوق السعودي',
  'تواصل معنا',
  '/contact',
  'من نحن',
  'بكسل هي وكالة تسويق رقمي سعودية متخصصة في تقديم حلول رقمية متكاملة',
  'خدماتنا',
  'نقدم مجموعة متكاملة من الخدمات الرقمية',
  'أعمالنا',
  'نماذج من المشاريع التي نفخر بها',
  'المدونة',
  'أحدث المقالات والنصائح',
  'الأسئلة الشائعة',
  'إجابات على أكثر الأسئلة شيوعاً',
  'نتائج إعلانات جوجل',
  'نتائج حقيقية من حملاتنا الإعلانية'
);

INSERT INTO public.about_content (title, description, vision_title, vision_description, mission_title, mission_description)
VALUES (
  'من نحن',
  'بكسل هي وكالة تسويق رقمي سعودية رائدة، تأسست برؤية طموحة لتقديم حلول رقمية مبتكرة تساعد الشركات على النمو والتميز.',
  'رؤيتنا',
  'أن نكون الشريك الرقمي الأول للشركات السعودية في رحلة تحولها الرقمي.',
  'مهمتنا',
  'تقديم حلول رقمية متكاملة وعالية الجودة تساعد عملاءنا على تحقيق أهدافهم.'
);

INSERT INTO public.contact_content (title, description, email, phone, whatsapp, address)
VALUES (
  'تواصل معنا',
  'نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.',
  'info@pixel.sa',
  '+966 50 000 0000',
  '+966 50 000 0000',
  'الرياض، المملكة العربية السعودية'
);

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_homepage_content_updated_at BEFORE UPDATE ON public.homepage_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_content_updated_at BEFORE UPDATE ON public.contact_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_google_ads_results_updated_at BEFORE UPDATE ON public.google_ads_results FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();