import { Button } from "@/components/ui/button";
import { Send, TrendingUp, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const GoogleAdsCTA = () => {
  const features = [
    {
      title: "SEO",
      description: "تحسين محركات البحث (SEO) والمحتوى لمواقع الويب.",
      icon: "🔍"
    },
    {
      title: "تحليل الأداء",
      description: "تحليل أداء حملتك بشكل دوري لتحديد نقاط القوة والضعف وإجراء التحسينات.",
      icon: "📊"
    },
    {
      title: "تحسين معدل العائد الإعلاني",
      description: "زيادة معدل النقرات (CTR) من خلال تحسين جودة الإعلانات وتحليلات العائد المستهدف.",
      icon: "📈"
    },
    {
      title: "GOOGLE ADS",
      description: "تقديم استراتيجيات فعّالة لزيادة ظهور إعلاناتك وتحريجات التحويل.",
      icon: "📱"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-56 sm:w-96 h-56 sm:h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1 text-center lg:text-right" style={{ animationDelay: '100ms' }}>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                ابدأ حملتك على Google بسهولة، ودخل مشروعك يوصل لمطامع أكثر!
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-secondary-foreground/80 leading-relaxed">
                كيفي تريد تطهر مشروعك على الإنترنت؟ مع Google Ads، تقدر توصل لجمهورك المناسب وتحقق أهدافك التسويقية بسهولة.
              </p>
            </div>

            <Button
              size="lg"
              className="gradient-primary shadow-glow text-base sm:text-lg font-semibold h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
              asChild
            >
              <Link to="/contact/">
                <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                احجز خدمتك
              </Link>
            </Button>

            <p className="text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed hidden sm:block">
              نحن فريق من خبراء التسويق الإلكتروني، نقدم خدمات متكاملة لتعزز حضورك على جوجل ادز وتتمكن لك تحقيق أهدافك التسويقية.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 order-1 lg:order-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-card/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{feature.icon}</div>
                <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1 sm:mb-2 text-primary">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-secondary-foreground/80 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleAdsCTA;
