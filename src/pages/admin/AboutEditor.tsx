import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { AboutPageContent } from '@/types/admin';
import { getAboutContent, updateAboutContent } from '@/services/adminService';

const AboutEditor = () => {
  const [content, setContent] = useState<Partial<AboutPageContent>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutContent();
      if (data) setContent(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل محتوى صفحة من نحن',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateAboutContent(content);
      toast({ title: 'نجح', description: 'تم تحديث المحتوى بنجاح' });
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
        <h2 className="text-3xl font-bold">تحرير صفحة من نحن</h2>
        <p className="text-muted-foreground">عدّل محتوى صفحة من نحن</p>
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
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">صورة الصفحة (URL)</Label>
              <Input
                id="imageUrl"
                type="url"
                value={content.imageUrl || ''}
                onChange={(e) => setContent({ ...content, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              {content.imageUrl && (
                <img src={content.imageUrl} alt="Preview" className="mt-2 rounded border max-h-32 object-cover" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>رؤيتنا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="visionTitle">عنوان الرؤية</Label>
              <Input
                id="visionTitle"
                value={content.visionTitle || ''}
                onChange={(e) => setContent({ ...content, visionTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visionDescription">وصف الرؤية</Label>
              <Textarea
                id="visionDescription"
                value={content.visionDescription || ''}
                onChange={(e) => setContent({ ...content, visionDescription: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>رسالتنا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="missionTitle">عنوان الرسالة</Label>
              <Input
                id="missionTitle"
                value={content.missionTitle || ''}
                onChange={(e) => setContent({ ...content, missionTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="missionDescription">وصف الرسالة</Label>
              <Textarea
                id="missionDescription"
                value={content.missionDescription || ''}
                onChange={(e) => setContent({ ...content, missionDescription: e.target.value })}
                rows={4}
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

export default AboutEditor;
