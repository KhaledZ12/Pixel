import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { FAQItem } from '@/types/admin';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/services/adminService';

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل الأسئلة الشائعة',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ) return;

    setLoading(true);
    try {
      if (editingFAQ.id) {
        await updateFAQ(editingFAQ.id, editingFAQ);
        toast({ title: 'نجح', description: 'تم تحديث السؤال بنجاح' });
      } else {
        await createFAQ(editingFAQ as Omit<FAQItem, 'id' | 'created_at'>);
        toast({ title: 'نجح', description: 'تم إضافة السؤال بنجاح' });
      }
      await loadFAQs();
      setIsEditing(false);
      setEditingFAQ(null);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ السؤال',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;

    try {
      await deleteFAQ(id);
      toast({ title: 'نجح', description: 'تم حذف السؤال بنجاح' });
      await loadFAQs();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حذف السؤال',
        variant: 'destructive',
      });
    }
  };

  const startEdit = (faq?: FAQItem) => {
    setEditingFAQ(
      faq || {
        question: '',
        answer: '',
        order: faqs.length + 1,
      }
    );
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">إدارة الأسئلة الشائعة</h2>
          <p className="text-muted-foreground">أضف، عدّل، أو احذف الأسئلة</p>
        </div>
        {!isEditing && (
          <Button onClick={() => startEdit()}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة سؤال جديد
          </Button>
        )}
      </div>

      {isEditing && editingFAQ && (
        <Card>
          <CardHeader>
            <CardTitle>{editingFAQ.id ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</CardTitle>
            <CardDescription>املأ جميع الحقول لإضافة أو تعديل السؤال</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">السؤال</Label>
                <Input
                  id="question"
                  value={editingFAQ.question || ''}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">الإجابة</Label>
                <Textarea
                  id="answer"
                  value={editingFAQ.answer || ''}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                  rows={5}
                  required
                />
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
                    setEditingFAQ(null);
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

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(faq)}>
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {faqs.length === 0 && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              لا توجد أسئلة حالياً. ابدأ بإضافة أول سؤال!
            </p>
            <Button onClick={() => startEdit()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة سؤال
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FAQManagement;
