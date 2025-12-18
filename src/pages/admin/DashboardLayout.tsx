import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Home,
  Info,
  Briefcase,
  FileText,
  HelpCircle,
  Mail,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login/');
  };

  const navItems = [
    { to: '/admin/', icon: LayoutDashboard, label: 'الرئيسية', end: true },
    { to: '/admin/projects/', icon: FolderKanban, label: 'المشاريع' },
    { to: '/admin/google-ads/', icon: Image, label: 'نتائج إعلانات جوجل' },
    { to: '/admin/homepage/', icon: Home, label: 'محتوى الصفحة الرئيسية' },
    { to: '/admin/about/', icon: Info, label: 'صفحة من نحن' },
    { to: '/admin/services/', icon: Briefcase, label: 'الخدمات' },
    { to: '/admin/blog/', icon: FileText, label: 'المدونة' },
    { to: '/admin/faq/', icon: HelpCircle, label: 'الأسئلة الشائعة' },
    { to: '/admin/contact-messages/', icon: Mail, label: 'رسائل التواصل' },
    { to: '/admin/contact/', icon: Mail, label: 'إعدادات صفحة التواصل' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>لوحة التحكم | بيكسل</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 right-0 z-40 w-64 border-l bg-background transition-transform duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
