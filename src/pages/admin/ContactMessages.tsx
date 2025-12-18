import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getContactMessages, deleteContactMessage } from "@/services/adminService";
import { ContactMessage } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const ContactMessages = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await getContactMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error loading messages:', error);
            toast({
                title: "خطأ في تحميل الرسائل",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;

        setDeletingId(id);
        try {
            await deleteContactMessage(id);
            setMessages(messages.filter(m => m.id !== id));
            toast({
                title: "تم حذف الرسالة بنجاح",
            });
        } catch (error) {
            console.error('Error deleting message:', error);
            toast({
                title: "خطأ في حذف الرسالة",
                variant: "destructive"
            });
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">رسائل التواصل</h2>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                    {messages.length} رسالة
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-muted-foreground">لا توجد رسائل جديدة</h3>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-primary">{message.name}</h3>
                                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                            {format(new Date(message.created_at), "d MMMM yyyy - h:mm a", { locale: ar })}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            <a href={`mailto:${message.email}`} className="hover:text-primary transition-colors">
                                                {message.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            <a href={`tel:${message.phone}`} className="hover:text-primary transition-colors">
                                                {message.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                        {message.message}
                                    </div>
                                </div>

                                <div className="flex md:flex-col justify-end gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(message.id)}
                                        disabled={deletingId === message.id}
                                        title="حذف الرسالة"
                                    >
                                        {deletingId === message.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
