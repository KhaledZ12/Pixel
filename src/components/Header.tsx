import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useContact } from "@/hooks/useContact";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { contactInfo } = useContact();

  // Fallback phone numbers if contact info is not loaded yet
  const phoneNumber = contactInfo?.phone || '01068001154';
  const whatsappNumber = contactInfo?.whatsappNumber || '201068001154';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about/" },
    { label: "خدماتنا", href: "/services/" },
    { label: "اعمالنا", href: "/portfolio/" },
    { label: "الاسئلة الشائعة", href: "/faq/" },
    { label: "المدونة", href: "/blog/" },
    { label: "تواصل معنا", href: "/contact/" },
  ];

  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/98 backdrop-blur-lg shadow-md' : 'bg-background/95 backdrop-blur-md'
      } border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="PIXEL Digital Marketing"
              className="h-16 sm:h-20 lg:h-24 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 text-lg font-bold transition-all duration-300 relative group hover:scale-110 flex flex-col justify-center items-center ${location.pathname === item.href ? 'text-primary' : 'text-primary'
                  }`}
              >
                {item.label}
                <span className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button size="lg" className="gradient-primary shadow-glow font-semibold" asChild>
              <a href={`tel:${phoneNumber}`} className="flex items-center">
                <Phone className="ml-2 h-4 w-4" />
                تواصل معنا
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-muted/50 text-foreground hover:text-primary hover:bg-muted transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
          <nav className="flex flex-col gap-1 pt-4 border-t border-border">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-3.5 text-base font-medium rounded-xl transition-all active:scale-98 ${location.pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              size="lg"
              className="gradient-primary shadow-glow font-semibold mt-4 w-full h-14 text-base"
              asChild
            >
              <a href={`tel:${phoneNumber}`} className="flex items-center justify-center">
                <Phone className="ml-2 h-5 w-5" />
                تواصل معنا
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
