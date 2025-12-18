import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getContactContent, sendContactMessage } from "@/services/adminService";
import { ContactPageContent } from "@/types/admin";

const ContactPage = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getContactContent();
      if (data) setContent(data);
    } catch (error) {
      console.error('Error loading contact content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendContactMessage(formData);

      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "عذراً، حدث خطأ",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{content?.title ? `${content.title} | تواصل مع بيكسل` : 'تواصل معنا | بيكسل للتسويق الإلكتروني'}</title>
        <meta name="description" content="تواصل مع فريق بيكسل الآن. نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك التجارية. اتصل بنا أو راسلنا عبر النموذج." />
        <link rel="canonical" href="https://pixelmarketng.com/contact/" />
        <meta property="og:url" content="https://pixelmarketng.com/contact/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(210,50%,15%)] via-[hsl(210,45%,20%)] to-[hsl(210,40%,25%)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center">
            {content?.title || 'تواصل معنا'}
          </h1>
          {content?.description && (
            <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background -mt-16 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">المبيعات</h3>
              <p className="text-muted-foreground">{content?.phone || '01068001154'}</p>

            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">{content?.email || 'info@pixel.com'}</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">
                <a
                  href="https://maps.app.goo.gl/rNeBQARUwZK9BBCt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {content?.address || 'المنصورة - مصر'}
                </a>
              </h3>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">واتساب</h3>
              <a href={`https://wa.me/${content?.whatsappNumber || '201068001154'}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                {content?.whatsappNumber || '201068001154'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.383333!3d31.033333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAxJzYwLjAiTiAzMcKwMjMnMDAuMCJF!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقعنا على الخريطة"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  ابق على <span className="text-primary">تواصل معنا</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الأسم *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="بريدك الإلكتروني"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="رقم جوالك"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">رسالتك *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا..."
                    required
                    className="min-h-[150px] rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12 h-12 rounded-xl text-lg"
                >
                  إرسال
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
