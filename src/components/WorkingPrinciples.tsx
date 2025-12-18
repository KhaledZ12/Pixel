import { Rocket, Target, Coins, Users, Send, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WorkingPrinciples = () => {
  const principles = [
    {
      number: "01",
      icon: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg",
      title: "شريك معتمد لشركة جوجل",
      description: "شركاؤنا مع شركة جوجل تجعلنا خبراء الأمثل لتلبية احتياجاتك، ومساعدتك على تحقيق أهدافك.",
      bgColor: "bg-card"
    },
    {
      number: "02",
      icon: Target,
      title: "استراتيجية التسويق",
      description: "خطة تسويقية مثالية، يتم تنفيذها على تقويم المحتوى الإبداعي والأفكار الفريدة والحملات الإعلانية.",
      bgColor: "bg-card",
      iconColor: "text-primary"
    },
    {
      number: "03",
      icon: Coins,
      title: "تحقيق الأرباح",
      description: "مع بناء علاقتك التجارية. والوصول إلى العديد من العملاء المحتملين. وتحقيق المزيد من الأرباح",
      bgColor: "bg-card",
      iconColor: "text-primary"
    },
    {
      number: "04",
      icon: Users,
      title: "دعم فني متميز",
      description: "نحرص على تقديم دعم فني متميز وشامل بغض استفادة عملك الرقمي",
      bgColor: "bg-card",
      iconColor: "text-primary"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - 3D Illustration */}
          <div className="relative order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-lg">
              {/* Main illustration */}
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop"
                alt="Work Process"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl sm:rounded-3xl"></div>

              {/* Floating CTA Button */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <Button size="lg" className="gradient-primary shadow-glow font-semibold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6" asChild>
                  <Link to="/contact/">
                    <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    احجز خدمتك
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Principles */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="text-center lg:text-right mb-6 sm:mb-8 lg:mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-primary text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">أهم مراحل العمل معنا</h3>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                ليصبح مشروعك <span className="text-primary">بين يديك</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {principles.map((principle, index) => (
                <div
                  key={principle.number}
                  className={`${principle.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-border hover:shadow-lg transition-all duration-300 animate-scale-in group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Number Badge */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary/20">{principle.number}</div>
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${principle.iconColor || 'text-foreground'}`}>
                      {typeof principle.icon === 'string' ? (
                        <img src={principle.icon} alt="Google" className="h-5 sm:h-6 lg:h-8 w-auto" />
                      ) : (
                        <principle.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold mb-1 sm:mb-2 lg:mb-3 group-hover:text-primary transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingPrinciples;
