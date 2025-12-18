import { useState, useEffect } from "react";
import { Target, Rocket, Users, Award } from "lucide-react";
import { getAboutContent } from "@/services/adminService";
import { AboutPageContent } from "@/types/admin";

const About = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutContent();
      if (data) setContent(data);
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  };

  const features = [
    {
      icon: Rocket,
      title: "حجز الدومين",
      description: "نساعدك في اختيار وحجز النطاق المناسب لموقعك الإلكتروني"
    },
    {
      icon: Target,
      title: "حجز الاستضافات",
      description: "استضافة موثوقة وسريعة لموقعك مع دعم فني متواصل"
    },
    {
      icon: Users,
      title: "إدارة المتاجر الإلكترونية",
      description: "إدارة شاملة لمتجرك الإلكتروني من المنتجات إلى الطلبات"
    },
    {
      icon: Award,
      title: "أرشفة مواقع (SEO)",
      description: "تحسين محركات البحث لرفع ترتيب موقعك في نتائج البحث"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Visual Side */}
          <div className="relative order-2 lg:order-1 animate-fade-in">
            <div className="relative">
              {/* Google Ads Logo Circle */}
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
                <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
                    
                    {/* Google Ads Visual */}
                    <div className="relative z-10 w-3/4 h-3/4 sm:w-4/5 sm:h-4/5">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <path
                          d="M 100 40 L 140 120 L 100 120 Z"
                          fill="hsl(14 100% 57%)"
                          className="opacity-90"
                        />
                        <circle cx="100" cy="140" r="20" fill="hsl(217 89% 61%)" />
                        <path
                          d="M 60 120 L 100 40 L 100 120 Z"
                          fill="hsl(45 100% 60%)"
                          className="opacity-90"
                        />
                        <circle cx="80" cy="140" r="15" fill="hsl(120 100% 40%)" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 sm:w-24 h-16 sm:h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-20 sm:w-32 h-20 sm:h-32 bg-accent/10 rounded-full blur-2xl"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 lg:-right-8 bg-card border-2 border-primary shadow-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-bounce">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">+15</div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">سنوات خبرة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="space-y-3 sm:space-y-4 text-center lg:text-right">
              <h3 className="text-primary text-base sm:text-lg font-semibold">من نحن</h3>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {content?.title || 'شركة'} <span className="text-primary">بيكسل الرائدة</span> في التجارة الإلكتروني
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {content?.description || 'نحن شركة بيكسل الرائدة للتسويق، لتشاركك استراتيجيات تسويقية إبداعية فريدة تأخذ أعمالك إلى وجهات جديدة مستمدة من فهمنا الحقيقي الحي يحقق لنا إبداع والتكنولوجيا، نشهد خلاصة مشتركة ومهارة تعاملنا. نحن تعتبر بفريق محترف في المحترفين والمختصين وخبراء التسويق.'}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group space-y-2 sm:space-y-3 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-right">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
      </div>
    </section>
  );
};

export default About;
