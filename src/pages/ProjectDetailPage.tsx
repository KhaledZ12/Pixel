import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Monitor, Smartphone, Award, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects } from "@/services/adminService";
import { Project } from "@/types/admin";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await getProjects();
        const found = projects.find(p => p.slug === slug || p.id === slug);
        setProject(found || null);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg">جاري التحميل...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">المشروع غير موجود</h1>
          <Link to="/portfolio/">
            <Button>
              العودة لمعرض الأعمال
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {project && (
        <Helmet>
          <title>{`${project.title} | أعمال بيكسل`}</title>
          <meta name="description" content={project.description || `تعرف على مشروع ${project.title} من تنفيذ بيكسل للتسويق الإلكتروني.`} />
          <link rel="canonical" href={`https://pixelmarketng.com/portfolio/${project.slug || project.id}/`} />
          <meta property="og:url" content={`https://pixelmarketng.com/portfolio/${project.slug || project.id}/`} />
        </Helmet>
      )}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link to="/portfolio/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة لمعرض الأعمال
          </Link>

          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              {project.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">العملاء</p>
                  <p className="text-lg font-bold">500+</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">التقييم</p>
                  <p className="text-lg font-bold">4.9</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الإنجاز</p>
                  <p className="text-lg font-bold">2024</p>
                </div>
              </div>
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <ExternalLink className="w-5 h-5" />
                  زيارة الموقع
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Screenshots */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="desktop" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-muted">
                  <TabsTrigger value="desktop" className="gap-2">
                    <Monitor className="w-4 h-4" />
                    عرض سطح المكتب
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="gap-2">
                    <Smartphone className="w-4 h-4" />
                    عرض الموبايل
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="desktop" className="mt-0">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border bg-muted animate-scale-in">
                  {project.desktopImage ? (
                    <img
                      src={project.desktopImage}
                      alt={`${project.title} - Desktop`}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                      لا توجد صورة
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="flex justify-center">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border bg-muted animate-scale-in max-w-sm">
                    {project.mobileImage ? (
                      <img
                        src={project.mobileImage}
                        alt={`${project.title} - Mobile`}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="h-96 flex items-center justify-center text-muted-foreground">
                        لا توجد صورة
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">عن المشروع</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <GlobalCTA />

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
