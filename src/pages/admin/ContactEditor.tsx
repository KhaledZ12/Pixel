import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { ContactPageContent } from '@/types/admin';
import { getContactContent, updateContactContent } from '@/services/adminService';

const ContactEditor = () => {
  const [content, setContent] = useState<Partial<ContactPageContent>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadContent = useCallback(async () => {
    try {
      const data = await getContactContent();
      if (data) setContent(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل محتوى صفحة التواصل',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateContactContent(content);
      toast({ title: 'نجح', description: 'تم تحديث المحتوى بنجاح' });

      // Trigger refresh of contact info across all components
      window.dispatchEvent(new CustomEvent('contactInfoUpdated'));
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ المحتوى',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">تحرير صفحة التواصل</h2>
        <p className="text-muted-foreground">عدّل محتوى ومعلومات التواصل</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>المحتوى الرئيسي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان الرئيسي</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={content.description || ''}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات التواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={content.email || ''}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={content.phone || ''}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">رقم الواتساب</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                value={content.whatsappNumber || ''}
                onChange={(e) => setContent({ ...content, whatsappNumber: e.target.value })}
                placeholder="2010xxxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={content.address || ''}
                onChange={(e) => setContent({ ...content, address: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={loading}>
          <Save className="ml-2 h-4 w-4" />
          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </form>
    </div>
  );
};

export default ContactEditor;
