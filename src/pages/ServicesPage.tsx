import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import { getServices } from "@/services/adminService";
import { Service } from "@/types/admin";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "marketing") return service.category === "marketing";
    if (activeTab === "programming") return service.category === "programming";
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>خدماتنا | بيكسل للتسويق الإلكتروني والبرمجة</title>
        <meta name="description" content="اكتشف خدمات بيكسل المتكاملة في التسويق الإلكتروني، تطوير المواقع، إدارة حسابات التواصل الاجتماعي، وحملات جوجل الإعلانية." />
        <link rel="canonical" href="https://pixelmarketng.com/services/" />
        <meta property="og:url" content="https://pixelmarketng.com/services/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="gradient-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
            خدماتنا
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-primary">خدماتنا الرقمية</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              متخصصون في مجال البرمجيات والتسويق الإلكتروني وتطوير الأعمال
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all" className="text-sm lg:text-base">
                الكل
              </TabsTrigger>
              <TabsTrigger value="marketing" className="text-sm lg:text-base">
                خدمات التسويق
              </TabsTrigger>
              <TabsTrigger value="programming" className="text-sm lg:text-base">
                خدمات البرمجة
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Services Grid */}
          {loading ? (
            <div className="text-center">
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">لا توجد خدمات في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-center">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-center text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <Button
                      className="w-full gradient-primary"
                      size="lg"
                      asChild
                    >
                      <Link to="/contact/#contact-form">
                        <MessageCircle className="ml-2 h-4 w-4" />
                        احصل علي عرض سعر
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              ابدأ حملاتك على Google بسهولة، وحل مشروعك يوصل لعملاء أكثر!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              نساعدك على الظهور على الإنترنت والوصول للعملاء المستهدفين وتحقيق أهدافك التسويقية بسهولة. اكتشف الفرق وابدأ اليوم!
            </p>
            <Button size="lg" variant="secondary" className="shadow-lg" asChild>
              <Link to="/contact/#contact-form">
                <MessageCircle className="ml-2 h-5 w-5" />
                احصل علي عرض سعر
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
