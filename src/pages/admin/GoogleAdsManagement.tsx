import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { GoogleAdResult } from '@/types/admin';
import { getGoogleAds, createGoogleAd, updateGoogleAd, deleteGoogleAd } from '@/services/adminService';

const GoogleAdsManagement = () => {
  const [ads, setAds] = useState<GoogleAdResult[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAd, setEditingAd] = useState<Partial<GoogleAdResult> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      const data = await getGoogleAds();
      setAds(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل نتائج إعلانات جوجل',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd) return;

    setLoading(true);
    try {
      if (editingAd.id) {
        await updateGoogleAd(editingAd.id, editingAd);
        toast({ title: 'نجح', description: 'تم تحديث النتيجة بنجاح' });
      } else {
        await createGoogleAd(editingAd as Omit<GoogleAdResult, 'id' | 'created_at'>);
        toast({ title: 'نجح', description: 'تم إضافة النتيجة بنجاح' });
      }
      await loadAds();
      setIsEditing(false);
      setEditingAd(null);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ النتيجة',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;

    try {
      await deleteGoogleAd(id);
      toast({ title: 'نجح', description: 'تم حذف النتيجة بنجاح' });
      await loadAds();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حذف النتيجة',
        variant: 'destructive',
      });
    }
  };

  const startEdit = (ad?: GoogleAdResult) => {
    setEditingAd(
      ad || {
        title: '',
        price: '',
        totalCost: '',
        totalClicks: '',
        image: '',
        order: ads.length + 1,
      }
    );
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">إدارة نتائج إعلانات جوجل</h2>
          <p className="text-muted-foreground">أضف أو عدّل أو احذف نتائج الحملات الإعلانية</p>
        </div>
        {!isEditing && (
          <Button onClick={() => startEdit()}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة نتيجة جديدة
          </Button>
        )}
      </div>

      {isEditing && editingAd && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAd.id ? 'تعديل النتيجة' : 'إضافة نتيجة جديدة'}</CardTitle>
            <CardDescription>املأ جميع الحقول لإضافة أو تعديل نتيجة الحملة الإعلانية</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الحملة</Label>
                <Input
                  id="title"
                  value={editingAd.title || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                  placeholder="مثال: حملة استقدام الأول"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">السعر</Label>
                  <Input
                    id="price"
                    value={editingAd.price || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, price: e.target.value })}
                    placeholder="مثال: 140 ريال"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalCost">التكلفة الإجمالية</Label>
                  <Input
                    id="totalCost"
                    value={editingAd.totalCost || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, totalCost: e.target.value })}
                    placeholder="مثال: 57.5k"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalClicks">إجمالي النقرات</Label>
                  <Input
                    id="totalClicks"
                    value={editingAd.totalClicks || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, totalClicks: e.target.value })}
                    placeholder="مثال: 1,250"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">رابط الصورة (URL)</Label>
                <Input
                  id="image"
                  type="url"
                  value={editingAd.image || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {editingAd.image && (
                  <img src={editingAd.image} alt="Preview" className="mt-2 rounded border max-h-48 object-cover" />
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  <Save className="ml-2 h-4 w-4" />
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingAd(null);
                  }}
                >
                  <X className="ml-2 h-4 w-4" />
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <Card key={ad.id}>
            <CardHeader>
              <CardTitle className="text-lg">{ad.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={ad.image}
                alt={ad.title}
                className="rounded border w-full h-48 object-cover"
              />
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">السعر</p>
                  <p className="font-semibold">{ad.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">التكلفة</p>
                  <p className="font-semibold">{ad.totalCost}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">النقرات</p>
                  <p className="font-semibold">{ad.totalClicks}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(ad)}>
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(ad.id)}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ads.length === 0 && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              لا توجد نتائج حالياً. ابدأ بإضافة أول نتيجة!
            </p>
            <Button onClick={() => startEdit()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة نتيجة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleAdsManagement;
