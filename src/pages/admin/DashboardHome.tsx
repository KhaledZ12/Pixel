import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Image, FileText, HelpCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects, getGoogleAds, getBlogPosts, getFAQs, getServices } from '@/services/adminService';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    googleAds: 0,
    blogPosts: 0,
    faqs: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, googleAds, blogPosts, faqs, services] = await Promise.all([
        getProjects(),
        getGoogleAds(),
        getBlogPosts(),
        getFAQs(),
        getServices(),
      ]);

      setStats({
        projects: projects.length,
        googleAds: googleAds.length,
        blogPosts: blogPosts.length,
        faqs: faqs.length,
        services: services.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'المشاريع',
      value: stats.projects,
      icon: FolderKanban,
      description: 'إجمالي المشاريع',
      link: '/admin/projects/',
      color: 'text-blue-500',
    },
    {
      title: 'نتائج إعلانات جوجل',
      value: stats.googleAds,
      icon: Image,
      description: 'صور النتائج',
      link: '/admin/google-ads/',
      color: 'text-green-500',
    },
    {
      title: 'مقالات المدونة',
      value: stats.blogPosts,
      icon: FileText,
      description: 'المقالات المنشورة',
      link: '/admin/blog/',
      color: 'text-purple-500',
    },
    {
      title: 'الأسئلة الشائعة',
      value: stats.faqs,
      icon: HelpCircle,
      description: 'عدد الأسئلة',
      link: '/admin/faq/',
      color: 'text-orange-500',
    },
    {
      title: 'الخدمات',
      value: stats.services,
      icon: Briefcase,
      description: 'عدد الخدمات',
      link: '/admin/services/',
      color: 'text-teal-500',
    },
  ];

  const quickLinks = [
    { title: 'إضافة مشروع جديد', link: '/admin/projects/', description: 'أضف مشروع جديد إلى المعرض' },
    { title: 'تحديث المحتوى الرئيسي', link: '/admin/homepage/', description: 'عدّل محتوى الصفحة الرئيسية' },
    { title: 'إدارة الخدمات', link: '/admin/services/', description: 'أضف أو عدّل الخدمات' },
    { title: 'كتابة مقال جديد', link: '/admin/blog/', description: 'انشر مقالاً في المدونة' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
        <p className="text-muted-foreground">
          إدارة محتوى الموقع بالكامل من مكان واحد
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-4">روابط سريعة</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {quickLinks.map((link) => (
            <Link key={link.title} to={link.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-base">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
