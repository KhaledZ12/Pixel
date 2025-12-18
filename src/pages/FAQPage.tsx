import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQs } from "@/services/adminService";
import { FAQItem } from "@/types/admin";

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>الأسئلة الشائعة | إجابات لاستفساراتك عن خدمات بيكسل</title>
        <meta name="description" content="اعثر على إجابات للأسئلة الشائعة حول خدمات التسويق الإلكتروني، تصميم المواقع، وحملات الإعلانات المدفوعة من بيكسل." />
        <link rel="canonical" href="https://pixelmarketng.com/faq/" />
        <meta property="og:url" content="https://pixelmarketng.com/faq/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(210,50%,15%)] via-[hsl(210,45%,20%)] to-[hsl(210,40%,25%)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center">
            الأسئلة الشائعة
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* FAQ Content */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  الأسئلة الشائعة
                </h2>
                <p className="text-muted-foreground">
                  اطلع على على إجابات فورية وموجودة لجميع استفساراتك
                </p>
              </div>

              {loading ? (
                <p className="text-muted-foreground">جاري التحميل...</p>
              ) : faqs.length === 0 ? (
                <p className="text-muted-foreground">لا توجد أسئلة شائعة حالياً</p>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-2xl px-6 hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-right hover:no-underline py-6">
                        <span className="text-lg font-semibold text-primary pr-2">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>

            {/* Illustration */}
            <div className="relative hidden lg:block">
              <div className="sticky top-24">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Rocket Illustration */}
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full w-96 h-96 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>

                    {/* Rocket */}
                    <div className="relative z-10">
                      <svg viewBox="0 0 200 200" className="w-48 h-48">
                        {/* Rocket Body */}
                        <path
                          d="M100 20 L120 100 L100 140 L80 100 Z"
                          fill="hsl(var(--primary))"
                          className="drop-shadow-lg"
                        />
                        {/* Rocket Window */}
                        <circle cx="100" cy="70" r="15" fill="hsl(var(--primary-foreground))" opacity="0.3" />
                        {/* Rocket Fins */}
                        <path d="M80 100 L60 140 L80 130 Z" fill="hsl(var(--accent))" />
                        <path d="M120 100 L140 140 L120 130 Z" fill="hsl(var(--accent))" />
                        {/* Flame */}
                        <path
                          d="M90 140 L85 160 L95 155 L100 170 L105 155 L115 160 L110 140 Z"
                          fill="hsl(var(--primary))"
                          opacity="0.7"
                        />
                      </svg>
                    </div>

                    {/* Floating Stars */}
                    <div className="absolute top-10 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    <div className="absolute top-1/3 left-20 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalCTA />
      <Footer />
    </div>
  );
};

export default FAQPage;
