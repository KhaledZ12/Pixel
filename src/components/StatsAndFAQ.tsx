import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Rocket } from "lucide-react";
import { getFAQs } from "@/services/adminService";
import { FAQItem } from "@/types/admin";

const StatsAndFAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      const data = await getFAQs();
      setFaqs(data);
    };
    loadFAQs();
  }, []);

  const stats = [
    { number: "+15", label: "سنوات العمل", color: "text-primary" },
    { number: "+294", label: "المشاريع المنجزة", color: "text-primary" },
    { number: "31", label: "مشاريع تحت الإنجاز", color: "text-primary" },
    { number: "%100", label: "رضا العملاء", color: "text-primary" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-56 sm:w-96 h-56 sm:h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-secondary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* FAQ Section */}
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center lg:text-right">الاسئلة الشائعة</h2>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 text-secondary-foreground/80 text-center lg:text-right">
              أعثر على جميع إجابات قريبة وموجودة لجميع استفساراتك
            </p>

            <Accordion type="single" collapsible className="space-y-2 sm:space-y-3 lg:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-lg sm:rounded-xl px-4 sm:px-6 data-[state=open]:shadow-lg transition-all"
                >
                  <AccordionTrigger className="text-right hover:no-underline py-3 sm:py-4 lg:py-5">
                    <span className="font-semibold text-sm sm:text-base lg:text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary-foreground/80 pb-3 sm:pb-4 lg:pb-5 leading-relaxed text-xs sm:text-sm lg:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Illustration */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Rocket Illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-8 sm:p-12 lg:p-16 border border-border/20">
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full p-6 sm:p-8 lg:p-12 shadow-2xl animate-bounce">
                    <Rocket className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating Stars */}
              <div className="absolute top-6 sm:top-10 -right-4 sm:-right-10 text-2xl sm:text-3xl lg:text-4xl animate-pulse">⭐</div>
              <div className="absolute top-12 sm:top-20 -left-4 sm:-left-10 text-xl sm:text-2xl lg:text-3xl animate-pulse" style={{ animationDelay: '500ms' }}>✨</div>
              <div className="absolute bottom-12 sm:bottom-20 right-4 sm:right-10 text-lg sm:text-xl lg:text-2xl animate-pulse" style={{ animationDelay: '1000ms' }}>⭐</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndFAQ;
