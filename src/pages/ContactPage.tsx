import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import emailjs from '@emailjs/browser';
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
    message: "",
    service: [] as string[]
  });

  useEffect(() => {
    loadContent();
    // Initialize EmailJS
    emailjs.init("hxjFPdVkIxNDBaixa");
    console.log("EmailJS Initialized");
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
      const serviceString = formData.service.join('، ');

      // 1. Send to Database
      await sendContactMessage({
        ...formData,
        service: serviceString
      });

      // 2. Send Email via EmailJS
      // You need to create an account at https://www.emailjs.com/
      // 1. Create a Service (e.g., Gmail)
      // 2. Create a Template. In the "To Email" field of the template, put: kalebyawy@gmail.com
      // 3. Add these variables to your template: {{from_name}}, {{from_email}}, {{phone}}, {{message}}, {{service}}
      // 4. Get your keys from Account > API Keys and replace the values below:

      const SERVICE_ID = "service_m8w9umo";
      const TEMPLATE_ID = "template_3xgki9a";
      const PUBLIC_KEY = "hxjFPdVkIxNDBaixa";

      try {
        console.log("Attempting to send email via EmailJS...", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
        const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          to_name: "Admin",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: serviceString,
        }, PUBLIC_KEY);
        console.log("EmailJS Success:", result.text);
      } catch (emailError: any) {
        console.error("EmailJS Failed:", emailError);
        const errorMessage = emailError?.text || emailError?.message || "Unknown error";
        toast({
          title: "فشل إرسال البريد الإلكتروني",
          description: `تم حفظ الرسالة في النظام، ولكن فشل إرسال الإشعار البريدي. السبب: ${errorMessage}. تأكد من إيقاف مانع الإعلانات (AdBlock) إذا كان يعمل.`,
          variant: "destructive"
        });
      }

      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });

      setFormData({ name: "", email: "", phone: "", message: "", service: [] });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "عذراً، حدث خطأ",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => {
      const services = prev.service.includes(serviceId)
        ? prev.service.filter(s => s !== serviceId)
        : [...prev.service, serviceId];
      return { ...prev, service: services };
    });
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
                  href="https://maps.app.goo.gl/FKYm5y9DPBWkdSPG7?g_st=ipc"
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

      {/* Contact Form */}
      <section id="contact-form" className="py-12 lg:py-20 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                ابق على <span className="text-primary">تواصل معنا</span>
              </h2>
              <p className="text-muted-foreground text-base">
                نحن هنا لمساعدتك في بناء مشروعك الرقمي القادم. املأ النموذج أدناه وسنتصل بك قريباً.
              </p>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm">الأسم الكامل <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك"
                      required
                      className="h-10 rounded-lg bg-background/50 border-input/50 focus:bg-background transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">البريد الإلكتروني <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      className="h-10 rounded-lg bg-background/50 border-input/50 focus:bg-background transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm">رقم الجوال <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05xxxxxxxx"
                    required
                    className="h-10 rounded-lg bg-background/50 border-input/50 focus:bg-background transition-all duration-300 text-right"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm">نوع الخدمة المطلوبة <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "تصميم موقع", label: "تصميم مواقع", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
                      { id: "إنشاء حملة اعلانية علي جوجل", label: "إعلانات جوجل", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" /><path d="m17.657 6.343-4.243 4.243" /></svg> },
                      { id: "ادارة صفحات سوشيال ميديا", label: "سوشيال ميديا", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                      { id: "تصميم متجر الكتروني", label: "متاجر إلكترونية", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> },
                      { id: "تحسين محركات البحث SEO", label: "تحسين SEO", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
                      { id: "اخري", label: "خدمة أخرى", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg> }
                    ].map((service) => (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`
                          cursor-pointer relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                          ${formData.service.includes(service.id)
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border/50 bg-card hover:border-primary/50 hover:bg-accent/50'}
                        `}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0
                          ${formData.service.includes(service.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                        `}>
                          {service.icon}
                        </div>
                        <span className={`font-medium text-xs sm:text-sm ${formData.service.includes(service.id) ? 'text-primary' : 'text-foreground'}`}>
                          {service.label}
                        </span>
                        {formData.service.includes(service.id) && (
                          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm">تفاصيل المشروع <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="أخبرنا المزيد عن مشروعك وأهدافك..."
                    required
                    className="min-h-[100px] rounded-lg resize-none bg-background/50 border-input/50 focus:bg-background transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-11 rounded-xl text-base font-bold shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  إرسال الطلب
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.6!2d31.2605534!3d30.7144435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c184693b7ddb%3A0x722af595773b9705!2zYml4ZWwgRm9yIEUtTWFya2V0aW5n!5e0!3m2!1sen!2seg!4v1705000000000!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعنا على الخريطة"
              className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
