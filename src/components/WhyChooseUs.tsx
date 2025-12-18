import { Users, Lightbulb, TrendingUp } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      number: "01",
      icon: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg",
      title: "شريك معتمر لشركة جوجل",
      description: "شركاؤنا مع شركة جوجل تجعلنا خبراء الأمثل لتلبية احتياجاتك، ومساعدتك على تحقيق أهدافك.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop"
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "استراتيجية التسويق",
      description: "خطة تسويقية مثالية، يتم تنفيذها على تقويم المحتوى الإبداعي والأفكار الفريدة والحملات الإعلانية.",
      iconColor: "text-primary",
      bgColor: "bg-card"
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "تحقيق الأرباح",
      description: "مع بناء علاقتك التجارية، والوصول إلى العديد من العملاء المحتملين، وتحقيق المزيد من الأرباح",
      iconColor: "text-primary",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      number: "04",
      icon: Users,
      title: "دعم فني متميز",
      description: "نحرص على تقديم دعم فني متميز وشامل بغض استفادة عملك الرقمي",
      iconColor: "text-primary",
      bgColor: "bg-card"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h3 className="text-primary text-sm sm:text-base lg:text-lg font-semibold mb-2">لماذا تختارنا ؟</h3>
        </div>

        {/* Reasons Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.number}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl ${
                reason.image ? 'min-h-48 sm:min-h-64 lg:min-h-96' : 'min-h-40 sm:min-h-52 lg:min-h-72 border border-border'
              } ${reason.bgColor || 'bg-background'} hover:shadow-xl transition-all duration-300 animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image if exists */}
              {reason.image && (
                <>
                  <img 
                    src={reason.image}
                    alt={reason.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/70 to-transparent"></div>
                </>
              )}

              {/* Content */}
              <div className={`relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col ${reason.image ? 'text-white' : 'text-foreground'}`}>
                {/* Number and Icon */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 lg:mb-6">
                  <div className={`text-3xl sm:text-4xl lg:text-7xl font-bold ${reason.image ? 'text-white/20' : 'text-primary/20'}`}>
                    {reason.number}
                  </div>
                  <div className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl ${reason.image ? 'bg-white/10 backdrop-blur-sm' : 'bg-primary/10'}`}>
                    {typeof reason.icon === 'string' ? (
                      <img src={reason.icon} alt="Google" className="h-5 sm:h-7 lg:h-10 w-auto" />
                    ) : (
                      <reason.icon className={`h-5 w-5 sm:h-7 sm:w-7 lg:h-10 lg:w-10 ${reason.iconColor || 'text-primary'}`} />
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-auto">
                  <h3 className="text-sm sm:text-lg lg:text-2xl font-bold mb-1 sm:mb-2 lg:mb-3 line-clamp-2">{reason.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none ${reason.image ? 'text-white/90' : 'text-muted-foreground'}`}>
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
