import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { useContact } from "@/hooks/useContact";

const GlobalCTA = () => {
    const { contactInfo } = useContact();

    // Fallback contact info
    const phoneNumber = contactInfo?.phone || '01068001154';
    const whatsappNumber = contactInfo?.whatsappNumber || '201068001154';

    return (
        <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px] -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent rounded-full blur-[100px] -translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        ابدأ حملتك على Google بسهولة، ودخل مشروعك يوصل لعملاء أكثر!
                    </h2>
                    <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                        نساعدك على الظهور على الإنترنت والوصول للعملاء المستهدفين وتحقيق أهدافك التسويقية بسهولة. اكتشف الفرق وابدأ اليوم!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Button
                            size="lg"
                            className="gradient-primary shadow-glow text-lg font-bold h-14 px-8 w-full sm:w-auto min-w-[200px]"
                            asChild
                        >
                            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5" />
                                اتصل بنا الآن
                            </a>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-bold h-14 px-8 w-full sm:w-auto min-w-[200px]"
                            asChild
                        >
                            <a href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                واتساب
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalCTA;
