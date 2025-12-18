import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ExternalLink, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProjects, getGoogleAds } from "@/services/adminService";
import { Project, GoogleAdResult } from "@/types/admin";
import GlobalCTA from "@/components/GlobalCTA";

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [googleAdsResults, setGoogleAdsResults] = useState<GoogleAdResult[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, adsData] = await Promise.all([
          getProjects(),
          getGoogleAds()
        ]);
        setProjects(projectsData);
        setGoogleAdsResults(adsData);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    };
    loadData();
  }, []);

  const gradients = [
    "from-blue-500/20 to-purple-500/20",
    "from-green-500/20 to-teal-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-orange-500/20 to-red-500/20",
    "from-cyan-500/20 to-blue-500/20",
    "from-yellow-500/20 to-orange-500/20",
    "from-indigo-500/20 to-purple-500/20",
    "from-pink-500/20 to-rose-500/20"
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Helmet>
        <title>أعمالنا | مشاريع بيكسل في تصميم المواقع والتسويق</title>
        <meta name="description" content="تصفح معرض أعمال بيكسل المميزة. أكثر من 200 مشروع ناجح في تصميم المواقع، المتاجر الإلكترونية، وحملات التسويق الرقمي." />
        <link rel="canonical" href="https://pixelmarketng.com/portfolio/" />
        <meta property="og:url" content="https://pixelmarketng.com/portfolio/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">أكثر من 200 مشروع ناجح</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              معرض <span className="text-primary">أعمالنا المميزة</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نفخر بتقديم حلول رقمية مبتكرة ساعدت عملاءنا على تحقيق أهدافهم وتنمية أعمالهم
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid - Premium 2-Column Layout */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.slug || project.id}/`}
                className="group"
              >
                <div
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/30 border border-border hover:border-primary transition-all duration-700 animate-fade-in hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Premium Mockup Container */}
                  <div className="relative p-8 bg-gradient-to-br from-muted/50 to-background/50">
                    {/* Decorative Elements */}
                    <div className={`absolute top-4 right-4 w-32 h-32 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full blur-3xl group-hover:opacity-80 transition-opacity duration-700`}></div>
                    <div className="absolute bottom-4 left-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-700"></div>

                    {/* Desktop Mockup Frame */}
                    <div className="relative bg-background rounded-2xl shadow-2xl overflow-hidden border-8 border-foreground/10 group-hover:border-primary/20 transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2">
                      {/* Browser Bar */}
                      <div className="bg-muted/80 border-b border-border px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="flex-1 bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground truncate">
                          {project.title}
                        </div>
                      </div>

                      {/* Screenshot */}
                      <div className="relative overflow-hidden bg-background">
                        <img
                          src={project.desktopImage}
                          alt={project.title}
                          className="w-full h-auto object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                          loading="lazy"
                        />
                        {/* Hover Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-30 transition-opacity duration-700`}></div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-12 left-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                      <div className="bg-background/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-primary/20 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">عرض المشروع</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 bg-card">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Ads Results Section */}
      {googleAdsResults.length > 0 && (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">نتائج حقيقية ومثبتة</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                نتائج <span className="text-primary">إعلانات جوجل</span> المذهلة
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                حققنا نتائج استثنائية لعملائنا من خلال حملات إعلانات جوجل المحترفة والموجهة
              </p>
            </div>

            {/* Results Grid - 2 Columns */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {googleAdsResults.map((ad, index) => (
                <div
                  key={ad.id}
                  className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary transition-all duration-700 animate-fade-in hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container with Premium Styling */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-background/50 p-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-50 group-hover:opacity-70 transition-opacity duration-700`}></div>
                    <div className="relative bg-background rounded-2xl shadow-xl overflow-hidden border-4 border-foreground/5 group-hover:border-primary/10 transition-all duration-700 group-hover:scale-[1.02]">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-1000"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 bg-card">
                    <h3 className="text-xl font-bold mb-6 text-center group-hover:text-primary transition-colors duration-300">
                      {ad.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative group/stat overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-500">
                        <div className="relative">
                          <p className="text-xl font-bold text-primary mb-1">{ad.price}</p>
                          <p className="text-xs text-muted-foreground font-medium">السعر</p>
                        </div>
                      </div>
                      <div className="relative group/stat overflow-hidden bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-500">
                        <div className="relative">
                          <p className="text-xl font-bold text-accent mb-1">{ad.totalCost}</p>
                          <p className="text-xs text-muted-foreground font-medium">التكلفة</p>
                        </div>
                      </div>
                      <div className="relative group/stat overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-500">
                        <div className="relative">
                          <p className="text-xl font-bold text-secondary mb-1">{ad.totalClicks}</p>
                          <p className="text-xs text-muted-foreground font-medium">النقرات</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Highlight */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-3xl p-8 lg:p-12 border border-primary/20 animate-fade-in shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

              <div className="relative grid md:grid-cols-3 gap-8 text-center">
                <div className="group animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">+500K</p>
                  <p className="text-muted-foreground font-medium">إجمالي النقرات</p>
                </div>
                <div className="group animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">98%</p>
                  <p className="text-muted-foreground font-medium">معدل الرضا</p>
                </div>
                <div className="group animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">2,000 ر.س</p>
                  <p className="text-muted-foreground font-medium">متوسط التكلفة</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل تريد مشروعاً مماثلاً؟
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              نحن مستعدون لتحويل رؤيتك إلى واقع رقمي مميز
            </p>
            <Link to="/contact/">
              <Button size="lg" className="text-lg px-8">
                تواصل معنا الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <GlobalCTA />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
