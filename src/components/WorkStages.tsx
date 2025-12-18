import { Rocket, Network, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import workStagesIllustration from "@/assets/work-stages-illustration.png";

const WorkStages = () => {
  const stages = [
    {
      icon: Network,
      title: "إبداع",
      description: "في الإبداع أصله فكرة .. نستلهم أفكارنا من الإبداعية من بيئتنا المحلية ومتطلباتها بعقول عالمية"
    },
    {
      icon: Rocket,
      title: "ابتكار",
      description: "ونسعى دائماً لتقديم حلول تسويقية فريدة وجديدة. نحن نعزز ثقافة الإبداع ونشجع الأفكار المبتكرة"
    },
    {
      icon: Users,
      title: "الجودة",
      description: "جودة أعمالنا تتحدث عنا حيث نسعى دائماً لتقديم أفضل النتائج لعملائنا سواء في مجال التسويق الرقمي أو الإعلانات."
    },
    {
      icon: Layers,
      title: "فريق مميز",
      description: "فريق متخصص لعمل الحملات والإعلانات التمير والإبداع هو شعارنا فنحن دائما في تقدم إلى الأمام"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary mb-2 sm:mb-4">
            أهم مراحل العمل معنا
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary">
            ليصبح مشروعك بين يديك
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Illustration */}
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <img
                src={workStagesIllustration}
                alt="مراحل العمل"
                className="w-full h-auto"
                loading="lazy"
              />
              <Button
                className="absolute bottom-4 sm:bottom-8 right-1/2 translate-x-1/2 gradient-primary shadow-glow text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6"
                size="lg"
                asChild
              >
                <Link to="/contact/">
                  احجز خدمتك
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stages Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className="group bg-card p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in border border-border/50 hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stage.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkStages;
