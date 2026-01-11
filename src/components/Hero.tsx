import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import partnerBadge from "@/assets/PartnerBadge.png";
import { useContact } from "@/hooks/useContact";
import { Link } from "react-router-dom";

const Hero = () => {
  const { contactInfo } = useContact();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Fallback contact info if loading or unavailable
  const whatsappNumber = contactInfo?.whatsappNumber || '201068001154';

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover sm:object-cover object-[center_20%] transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <source src="https://pixeleg.com/wp-content/uploads/2025/03/34664458-1.mp4" type="video/mp4" />
        </video>


        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10 animate-fade-in">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl">
            بيكسل للتسويق{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 drop-shadow-[0_0_40px_hsl(var(--primary)/0.6)]">
              الإلكتروني
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto drop-shadow-xl px-4">
            في عالمٍ أصبح الإبداع فيه عملة نادرة، تأتي شركة بيكسل للتسويق لتشاركك استراتيجيات تسويقية إبداعية مُبتكرة تأخذ أعمالك إلى وجهات جديدة مستمدة من قيمها الأصيلة.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center pt-4">
            <Button
              size="lg"
              className="gradient-primary shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.7)] hover:scale-105 transition-all duration-300 text-lg sm:text-xl font-bold h-14 sm:h-16 px-8 sm:px-12 w-full sm:w-auto"
              asChild
            >
              <Link to="/contact/#contact-form" className="flex items-center">
                <MessageCircle className="ml-2 h-6 w-6" />
                احصل علي عرض سعر
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white/15 backdrop-blur-lg hover:bg-white/25 text-white border-2 border-white/40 hover:border-white/60 hover:scale-105 transition-all duration-300 text-lg sm:text-xl font-bold h-14 sm:h-16 px-8 sm:px-12 shadow-2xl w-full sm:w-auto"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <svg viewBox="0 0 24 24" className="ml-2 h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                تواصل معنا
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;