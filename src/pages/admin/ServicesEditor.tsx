import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { Service } from '@/types/admin';
import { getServices, createService, updateService, deleteService } from '@/services/adminService';

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadServices = useCallback(async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل الخدمات',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    try {
      if (editingService.id) {
        await updateService(editingService.id, editingService);
        toast({ title: 'نجح', description: 'تم تحديث الخدمة بنجاح' });
      } else {
        await createService(editingService as Omit<Service, 'id' | 'created_at'>);
        toast({ title: 'نجح', description: 'تم إضافة الخدمة بنجاح' });
      }
      await loadServices();
      setIsEditing(false);
      setEditingService(null);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ الخدمة',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      await deleteService(id);
      toast({ title: 'نجح', description: 'تم حذف الخدمة بنجاح' });
      await loadServices();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حذف الخدمة',
        variant: 'destructive',
      });
    }
  };

  const startEdit = (service?: Service) => {
    setEditingService(
      service || {
        title: '',
        description: '',
        imageUrl: '',
        category: 'marketing',
        order: services.length + 1,
      }
    );
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">إدارة الخدمات</h2>
          <p className="text-muted-foreground">أضف، عدّل، أو احذف الخدمات</p>
        </div>
        {!isEditing && (
          <Button onClick={() => startEdit()}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة خدمة جديدة
          </Button>
        )}
      </div>

      {isEditing && editingService && (
        <Card>
          <CardHeader>
            <CardTitle>{editingService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</CardTitle>
            <CardDescription>املأ جميع الحقول لإضافة أو تعديل الخدمة</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الخدمة</Label>
                <Input
                  id="title"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف الخدمة</Label>
                <Textarea
                  id="description"
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">نوع الخدمة</Label>
                <Select
                  value={editingService.category || 'marketing'}
                  onValueChange={(value) => setEditingService({ ...editingService, category: value as 'marketing' | 'programming' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">خدمات التسويق</SelectItem>
                    <SelectItem value="programming">خدمات البرمجة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">رابط صورة الخلفية (URL)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={editingService.imageUrl || ''}
                  onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {editingService.imageUrl && (
                  <img src={editingService.imageUrl} alt="Preview" className="mt-2 rounded border max-h-32 object-cover" />
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
                    setEditingService(null);
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
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  service.category === 'marketing' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {service.category === 'marketing' ? 'تسويق' : 'برمجة'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.imageUrl && (
                <img src={service.imageUrl} alt={service.title} className="rounded border w-full h-32 object-cover" />
              )}
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(service)}>
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              لا توجد خدمات حالياً. ابدأ بإضافة أول خدمة!
            </p>
            <Button onClick={() => startEdit()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة خدمة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesEditor;
