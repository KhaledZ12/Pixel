import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getServices } from "@/services/adminService";
import { Service } from "@/types/admin";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    loadServices();
  }, []);

  const serviceBgColors: string[] = [
    "bg-blue-900", "bg-gray-600", "bg-teal-600", "bg-blue-600", "bg-gray-500", "bg-purple-900"
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            أفضل <span className="text-primary">خدماتنا</span>
          </h2>
        </div>

        {/* Services Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-60 lg:h-80 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 ${serviceBgColors[index % serviceBgColors.length]} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 lg:p-8 text-center text-white">
                <h3 className="text-sm sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 line-clamp-2">{service.title}</h3>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-secondary transition-all text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                  size="sm"
                  asChild
                >
                  <Link to="/contact/">
                    <MessageCircle className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">اطلب خدمتك</span>
                    <span className="sm:hidden">اطلب</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
