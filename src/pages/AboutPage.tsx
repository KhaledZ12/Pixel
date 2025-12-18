import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { Button } from "@/components/ui/button";
import { getAboutContent, getServices } from "@/services/adminService";
import { AboutPageContent, Service } from "@/types/admin";

const AboutPage = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [aboutData, servicesData] = await Promise.all([
        getAboutContent(),
        getServices(),
      ]);
      if (aboutData) setContent(aboutData);
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  };

  const stats = [
    { number: "+15", label: "سنوات العمل", color: "text-primary" },
    { number: "+294", label: "المشاريع المنجزة", color: "text-primary" },
    { number: "31", label: "مشاريع تحت الإنجاز", color: "text-primary" },
    { number: "%100", label: "رضا العملاء", color: "text-primary" },
  ];

  const serviceColors = [
    "from-orange-500 to-orange-600",
    "from-purple-500 to-purple-600",
    "from-red-500 to-red-600",
    "from-teal-500 to-teal-600",
  ];

  const serviceIcons = ["💬", "📢", "👨‍💼", "🛒"];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{content?.title ? `${content.title} | بيكسل` : 'من نحن | بيكسل للتسويق الإلكتروني'}</title>
        <meta name="description" content={content?.description || 'تعرف على شركة بيكسل، الرائدة في مجال التسويق الإلكتروني وتصميم المواقع في مصر والوطن العربي. نساعدك في بناء حضور رقمي قوي.'} />
        <link rel="canonical" href="https://pixelmarketng.com/about/" />
        <meta property="og:url" content="https://pixelmarketng.com/about/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(210,50%,15%)] via-[hsl(210,45%,20%)] to-[hsl(210,40%,25%)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center">
            من نحن
          </h1>
        </div>
      </section>


      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                {content?.title || 'شركة'} <span className="text-primary">بيكسل الرائدة</span> في التجارة الإلكتروني
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.description || 'نحن شركة بيكسل الرائدة للتسويق، لتشاركك استراتيجيات تسويقية إبداعية فريدة تأخذ أعمالك إلى وجهات جديدة مستمدة من فهمنا الحقيقي الحي يحقق لنا إبداع والتكنولوجيا، نشهد خلاصة مشتركة ومهارة تعاملنا. نحن تعتبر بفريق محترف في المحترفين والمختصين وخبراء التسويق.'}
              </p>
            </div>

            {/* Image with Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12">
                <img
                  src={content?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"}
                  alt="فريق العمل"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-primary text-primary-foreground rounded-full w-24 h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center shadow-xl">
                  <span className="text-2xl lg:text-3xl font-bold">+15</span>
                  <span className="text-xs lg:text-sm">سنة خبرة</span>
                </div>
              </div>
              {/* Decorative Google Ads Logo */}
              <div className="absolute -top-4 -left-4 lg:-top-8 lg:-left-8 w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full shadow-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 lg:w-12 lg:h-12">
                  <path fill="#FBBC04" d="M12 2L2 19.5h20L12 2z" />
                  <circle fill="#4285F4" cx="12" cy="18" r="6" />
                  <circle fill="#34A853" cx="6" cy="18" r="3" />
                  <circle fill="#EA4335" cx="18" cy="18" r="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mt-20">
            {/* Vision Section */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-3xl border border-primary/10 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary">رؤيتنا</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.visionDescription || 'نسعى في أفضل شركة تسويق الكتروني أن نكون الشريك الرقمي المثالي لكل الشركات والمؤسسات التي تهدف إلى النجاح والتوسع في السوق الإلكتروني، وذلك من خلال تقديم حلول تسويقية مبتكرة وفعالة، تساعد عملائنا في بناء علامات تجارية قوية وزيادة عوائدهم عبر الإنترنت'}
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-gradient-to-br from-accent/5 to-transparent p-8 rounded-3xl border border-accent/10 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-accent">رسالتنا</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.missionDescription || 'تمكين الشركات من النجاح في العالم الرقمي من خلال تقديم خدمات تسويقية متكاملة وحلول إبداعية تلبي احتياجات كل عميل وتساعده على تحقيق أهدافه. نحن نؤمن بقوة التسويق الرقمي في تحويل الأعمال وتحقيق النمو المستدام'}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              كل ما تحتاجه <span className="text-primary">لتبدأ تجارتك الإلكترونية</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.length > 0 ? services.slice(0, 4).map((service, index) => (
              <div
                key={service.id}
                className={`bg-gradient-to-br ${serviceColors[index % serviceColors.length]} text-white p-8 rounded-3xl hover:scale-105 transition-transform duration-300 shadow-lg`}
              >
                <div className="text-5xl mb-4">{serviceIcons[index % serviceIcons.length]}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/90 leading-relaxed">{service.description}</p>
              </div>
            )) : (
              <>
                {[
                  { title: "تصميم مواقع", description: "نقدم لك موقع تصريحي شخصي أو لمنتجك باعلى دقة", icon: "💬" },
                  { title: "إعلانات ممولة", description: "نقدم خدمة الإعلانات الممولة على السوشيال ميديا", icon: "📢" },
                  { title: "سوشيال ميديا", description: "اجعل متجرك وصفحات موقعك صفحات احترافية", icon: "👨‍💼" },
                  { title: "متجر إلكتروني", description: "منصة تجارة إلكترونية لذيذة تتناسب مع منتجاتك", icon: "🛒" }
                ].map((service, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${serviceColors[index]} text-white p-8 rounded-3xl hover:scale-105 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/90 leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            شركاء <span className="text-primary">النجاح</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70 hover:opacity-100 transition-opacity">
            {["Google", "SnapChat", "TikTok", "WooCommerce", "WordPress", "PHP", "Google Partner"].map((partner, i) => (
              <div key={i} className="text-2xl font-bold text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
