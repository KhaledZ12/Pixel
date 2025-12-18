import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { getProjects } from "@/services/adminService";
import { Project } from "@/types/admin";

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 12);

  return (
    <section id="portfolio" className="relative py-12 sm:py-16 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">نماذج من أعمالنا</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-6">
            مشاريع <span className="text-primary">ملهمة</span> حققنا فيها النجاح
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            استكشف بعض المشاريع التي صممناها بإبداع وشغف
          </p>
        </div>

        {/* Projects Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug || project.id}/`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                  <img
                    src={project.desktopImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Featured Badge - Hidden on mobile */}
                  {project.featured && (
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/90 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-medium border border-border hidden sm:block">
                      مميز
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-primary/90 backdrop-blur-md rounded-full">
                    <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-primary-foreground fill-primary-foreground" />
                    <span className="text-[10px] sm:text-xs font-bold text-primary-foreground">4.9</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-6 space-y-1.5 sm:space-y-3">
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block">{project.description}</p>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-primary font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                      <span className="hidden sm:inline">عرض المشروع</span>
                      <span className="sm:hidden">عرض</span>
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Highlight - Google Ads */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 border border-border/50 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

          <div className="relative text-center space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-background/80 backdrop-blur-md rounded-full border border-border">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">إحصائيات مذهلة</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
              نتائج حقيقية من <span className="text-primary">حملات جوجل</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
              <div className="bg-background/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-scale-in" style={{ animationDelay: '100ms' }}>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">+500K</div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">نقرة محققة</div>
              </div>
              <div className="bg-background/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-scale-in" style={{ animationDelay: '200ms' }}>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">98%</div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">معدل نجاح</div>
              </div>
              <div className="bg-background/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="text-lg sm:text-xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">2,000 ر.س</div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">متوسط التكلفة</div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in">
          <Link to="/portfolio/">
            <Button size="lg" className="gap-2 text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-14 group hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto">
              <span>استعرض جميع الأعمال</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
