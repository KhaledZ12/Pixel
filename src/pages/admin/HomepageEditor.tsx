import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { HomepageContent } from '@/types/admin';
import { getHomepageContent, updateHomepageContent } from '@/services/adminService';

const HomepageEditor = () => {
  const [content, setContent] = useState<Partial<HomepageContent>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getHomepageContent();
      if (data) setContent(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل محتوى الصفحة الرئيسية',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateHomepageContent(content);
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
        <h2 className="text-3xl font-bold">تحرير الصفحة الرئيسية</h2>
        <p className="text-muted-foreground">عدّل محتوى النصوص في الصفحة الرئيسية</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>قسم البطل (Hero)</CardTitle>
            <CardDescription>العنوان والوصف في أعلى الصفحة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">العنوان الرئيسي</Label>
              <Input
                id="heroTitle"
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">العنوان الفرعي</Label>
              <Textarea
                id="heroSubtitle"
                value={content.heroSubtitle || ''}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">الوصف</Label>
              <Textarea
                id="heroDescription"
                value={content.heroDescription || ''}
                onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                rows={3}
              />
            </div>

          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>قسم من نحن</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">العنوان</Label>
              <Input
                id="aboutTitle"
                value={content.aboutTitle || ''}
                onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">الوصف</Label>
              <Textarea
                id="aboutDescription"
                value={content.aboutDescription || ''}
                onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>عناوين الأقسام</CardTitle>
            <CardDescription>عناوين وتفاصيل كل قسم في الصفحة الرئيسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="servicesTitle">عنوان قسم الخدمات</Label>
                <Input
                  id="servicesTitle"
                  value={content.servicesTitle || ''}
                  onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicesSubtitle">وصف قسم الخدمات</Label>
                <Input
                  id="servicesSubtitle"
                  value={content.servicesSubtitle || ''}
                  onChange={(e) => setContent({ ...content, servicesSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portfolioTitle">عنوان قسم الأعمال</Label>
                <Input
                  id="portfolioTitle"
                  value={content.portfolioTitle || ''}
                  onChange={(e) => setContent({ ...content, portfolioTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioSubtitle">وصف قسم الأعمال</Label>
                <Input
                  id="portfolioSubtitle"
                  value={content.portfolioSubtitle || ''}
                  onChange={(e) => setContent({ ...content, portfolioSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blogTitle">عنوان قسم المدونة</Label>
                <Input
                  id="blogTitle"
                  value={content.blogTitle || ''}
                  onChange={(e) => setContent({ ...content, blogTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blogSubtitle">وصف قسم المدونة</Label>
                <Input
                  id="blogSubtitle"
                  value={content.blogSubtitle || ''}
                  onChange={(e) => setContent({ ...content, blogSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faqTitle">عنوان قسم الأسئلة الشائعة</Label>
                <Input
                  id="faqTitle"
                  value={content.faqTitle || ''}
                  onChange={(e) => setContent({ ...content, faqTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faqSubtitle">وصف قسم الأسئلة الشائعة</Label>
                <Input
                  id="faqSubtitle"
                  value={content.faqSubtitle || ''}
                  onChange={(e) => setContent({ ...content, faqSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="googleAdsTitle">عنوان قسم إعلانات جوجل</Label>
                <Input
                  id="googleAdsTitle"
                  value={content.googleAdsTitle || ''}
                  onChange={(e) => setContent({ ...content, googleAdsTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleAdsSubtitle">وصف قسم إعلانات جوجل</Label>
                <Input
                  id="googleAdsSubtitle"
                  value={content.googleAdsSubtitle || ''}
                  onChange={(e) => setContent({ ...content, googleAdsSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statsTitle">عنوان قسم الإحصائيات</Label>
              <Input
                id="statsTitle"
                value={content.statsTitle || ''}
                onChange={(e) => setContent({ ...content, statsTitle: e.target.value })}
              />
            </div>
          </CardContent>
        </Card> */}

        <Button type="submit" disabled={loading}>
          <Save className="ml-2 h-4 w-4" />
          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </form>
    </div>
  );
};

export default HomepageEditor;
