import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ContactProvider } from "./contexts/ContactContext";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/admin/LoginPage";
import DashboardLayout from "./pages/admin/DashboardLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import GoogleAdsManagement from "./pages/admin/GoogleAdsManagement";
import HomepageEditor from "./pages/admin/HomepageEditor";
import AboutEditor from "./pages/admin/AboutEditor";
import ServicesEditor from "./pages/admin/ServicesEditor";
import BlogManagement from "./pages/admin/BlogManagement";
import FAQManagement from "./pages/admin/FAQManagement";
import ContactEditor from "./pages/admin/ContactEditor";
import ContactMessages from "./pages/admin/ContactMessages";
import FloatingContactButton from "./components/FloatingContactButton";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ContactProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<ArticleDetailPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />


              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="projects" element={<ProjectsManagement />} />
                <Route path="google-ads" element={<GoogleAdsManagement />} />
                <Route path="homepage" element={<HomepageEditor />} />
                <Route path="about" element={<AboutEditor />} />
                <Route path="services" element={<ServicesEditor />} />
                <Route path="blog" element={<BlogManagement />} />
                <Route path="faq" element={<FAQManagement />} />
                <Route path="contact" element={<ContactEditor />} />
                <Route path="contact-messages" element={<ContactMessages />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingContactButton />
          </BrowserRouter>
        </TooltipProvider>
      </ContactProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
