import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import partnerBadge from "@/assets/PartnerBadge.png";
import { useContact } from "@/hooks/useContact";

const Footer = () => {
  const { contactInfo } = useContact();

  const phoneNumber = contactInfo?.phone || "01068001154";
  const whatsappNumber = contactInfo?.whatsappNumber || "201068001154";
  const email = contactInfo?.email || "info@pixel.com";
  const address = contactInfo?.address || "المنصورة - مصر";

  const services = [
    "إعلانات Google",
    "تصميم المواقع",
    "تطبيقات الجوال",
    "التسويق الإلكتروني",
    "حجز الاستضافات",
    "حجز الدومين",
  ];

  const links = [
    { label: "من نحن", href: "/about/" },
    { label: "خدماتنا", href: "/services/" },
    { label: "اعمالنا", href: "/portfolio/" },
    { label: "المدونة", href: "/blog/" },
    { label: "تواصل معنا", href: "/contact/" },
  ];

  return (
    <footer
      className="relative isolate bg-secondary text-secondary-foreground pt-12 sm:pt-16 lg:pt-20 pb-6 overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497366216548-37526070297c")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay (does NOT block touch) */}
      <div className="absolute inset-0 bg-secondary/90 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Logo & About */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/">
              <img src={logo} alt="PIXEL" className="h-24 w-auto" />
            </Link>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              نقدم حلول روبوجية وتسويقية متنوعة تلبية احتياجاتك من تصميم المواقع
              إلى التسويق الإلكتروني المتكامل.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services/"
                    className="text-secondary-foreground/80 hover:text-primary text-sm"
                  >
                    ◄ {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-primary font-bold mb-4">روابط مهمة</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary text-sm"
                  >
                    ◄ {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Google Partner */}
          <div>
            <h3 className="text-primary font-bold mb-4">معلومات قانونية</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <Link
                  to="/privacy-policy/"
                  className="text-secondary-foreground/80 hover:text-primary text-sm"
                >
                  ◄ سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use/"
                  className="text-secondary-foreground/80 hover:text-primary text-sm"
                >
                  ◄ شروط الاستخدام
                </Link>
              </li>
            </ul>

            {/* Google Partner Badge (Mobile Safe - Full Clickable) */}
            <a
              href="https://www.google.com/partners/agency?id=3139297470"
              rel="nofollow noopener"
              className="bg-white p-3 rounded-xl inline-block hover:shadow-lg transition-shadow"
            >
              <img
                src={partnerBadge}
                alt="Google Partner"
                className="h-12 w-auto block"
              />
            </a>

          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="hover:text-primary"
                >
                  WhatsApp: +{whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-4 text-center text-sm text-secondary-foreground/60">
          جميع الحقوق محفوظة © 2025 شركة بيكسل
        </div>
      </div>
    </footer>
  );
};

export default Footer;
