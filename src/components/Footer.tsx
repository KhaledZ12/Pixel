import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import partnerBadge from "@/assets/PartnerBadge.png";
import { useContact } from "@/hooks/useContact";

const Footer = () => {
  const { contactInfo } = useContact();

  // Fallback contact information if not loaded yet
  const phoneNumber = contactInfo?.phone || '01068001154';
  const complaintsPhone = '01068001154';
  const whatsappNumber = contactInfo?.whatsappNumber || '201068001154';
  const email = contactInfo?.email || 'info@pixel.com';
  const address = contactInfo?.address || 'المنصورة - مصر';

  const services = [
    "إعلانات Google",
    "تصميم المواقع",
    "تطبيقات الجوال",
    "التسويق الإلكتروني",
    "حجز الاستضافات",
    "حجز الدومين"
  ];

  const links = [
    { label: "من نحن", href: "/about/" },
    { label: "خدماتنا", href: "/services/" },
    { label: "اعمالنا", href: "/portfolio/" },
    { label: "المدونة", href: "/blog/" },
    { label: "تواصل معنا", href: "/contact/" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 relative overflow-hidden" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-secondary/90"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            <Link to="/">
              <img src={logo} alt="PIXEL" className="h-20 sm:h-24 lg:h-28 w-auto" />
            </Link>
            <p className="text-secondary-foreground/80 leading-relaxed text-xs sm:text-sm lg:text-base">
              نقدم حلول روبوجية وتسويقية متنوعة تلبية احتياجاتك. من تصميم مواقع الويب مع خدمات سيو SEO شاملة وصولاً إلى خدمات تسويق إلكتروني متكاملة
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6">خدماتنا</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services/" className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base">
                    <span className="text-primary text-xs">◄</span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-primary text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6">روابط مهمة</h3>
            <ul className="space-y-2 sm:space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base">
                    <span className="text-primary text-xs">◄</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-primary text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6">معلومات قانونية</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/privacy-policy/" className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base">
                  <span className="text-primary text-xs">◄</span>
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use/" className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base">
                  <span className="text-primary text-xs">◄</span>
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
            {/* Google Partner Badge */}
            <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl inline-block mt-4">
              <a href="https://www.google.com/partners/agency?id=1448166512" target="_blank" rel="noopener noreferrer">
                <img
                  src={partnerBadge}
                  alt="Google Partner"
                  className="h-10 sm:h-12 lg:h-16 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6">تواصل معنا</h3>
            <ul className="space-y-3 sm:space-y-4">
              {/* <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="block text-secondary-foreground/80 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base">
                    {phoneNumber}
                  </a>
                  <a href={`tel:${complaintsPhone.replace(/[^\d+]/g, '')}`} className="block text-secondary-foreground/80 hover:text-primary transition-colors text-[10px] sm:text-xs lg:text-sm">
                    للشكاوى: {complaintsPhone}
                  </a>
                </div>
              </li> */}
              <li className="flex items-center gap-2 sm:gap-3">
                <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <a href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base">
                  WhatsApp: +{whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-secondary-foreground/80 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-secondary-foreground/80 text-xs sm:text-sm lg:text-base">
                  {address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-4 sm:pt-6 lg:pt-8 text-center">
          <p className="text-secondary-foreground/60 text-xs sm:text-sm lg:text-base">
            جميع الحقوق محفوظة © 2025 شركة بيكسل للتسويق الإلكتروني
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
