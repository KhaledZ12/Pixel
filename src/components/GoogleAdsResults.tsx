import { useState, useEffect } from "react";
import { getGoogleAds } from "@/services/adminService";
import { GoogleAdResult } from "@/types/admin";
import { TrendingUp, MousePointerClick, DollarSign, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const GoogleAdsResults = () => {
  const [ads, setAds] = useState<GoogleAdResult[]>([]);

  useEffect(() => {
    const loadAds = async () => {
      const data = await getGoogleAds();
      setAds(data);
    };
    loadAds();
  }, []);

  if (ads.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4">
            نتائج <span className="text-primary">حملاتنا الإعلانية</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            نتائج حقيقية لحملاتنا على Google Ads
          </p>
        </div>

        {/* Results Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {ads.map((ad, index) => (
                <CarouselItem key={ad.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div
                    className="group bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-32 sm:h-44 lg:h-56 overflow-hidden">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4">
                        <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white line-clamp-1">{ad.title}</h3>
                      </div>
                    </div>

                    {/* Stats - Simplified on mobile */}
                    <div className="p-2.5 sm:p-4 lg:p-6 space-y-2 sm:space-y-4">
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-4">
                        <div className="flex flex-col items-center p-1.5 sm:p-2 lg:p-3 bg-primary/10 rounded-lg">
                          <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary mb-0.5 sm:mb-2" />
                          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">السعر</span>
                          <span className="text-[10px] sm:text-sm font-bold text-foreground mt-0.5">{ad.price}</span>
                        </div>

                        <div className="flex flex-col items-center p-1.5 sm:p-2 lg:p-3 bg-accent/10 rounded-lg">
                          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent mb-0.5 sm:mb-2" />
                          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">التكلفة</span>
                          <span className="text-[10px] sm:text-sm font-bold text-foreground mt-0.5">{ad.totalCost}</span>
                        </div>

                        <div className="flex flex-col items-center p-1.5 sm:p-2 lg:p-3 bg-secondary/10 rounded-lg">
                          <MousePointerClick className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-secondary mb-0.5 sm:mb-2" />
                          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">النقرات</span>
                          <span className="text-[10px] sm:text-sm font-bold text-foreground mt-0.5">{ad.totalClicks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={cn(
                "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-primary/25 h-10 w-10 md:h-12 md:w-12 rounded-full group z-10"
              )}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </CarouselPrevious>
            <CarouselNext
              className={cn(
                "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-primary/25 h-10 w-10 md:h-12 md:w-12 rounded-full group z-10"
              )}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleAdsResults;
