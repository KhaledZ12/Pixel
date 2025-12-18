import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { BlogPost } from '@/types/admin';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/services/adminService';

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل المقالات',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);
    try {
      if (editingPost.id) {
        await updateBlogPost(editingPost.id, editingPost);
        toast({ title: 'نجح', description: 'تم تحديث المقال بنجاح' });
      } else {
        await createBlogPost(editingPost as Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>);
        toast({ title: 'نجح', description: 'تم إضافة المقال بنجاح' });
      }
      await loadPosts();
      setIsEditing(false);
      setEditingPost(null);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ المقال',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      await deleteBlogPost(id);
      toast({ title: 'نجح', description: 'تم حذف المقال بنجاح' });
      await loadPosts();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حذف المقال',
        variant: 'destructive',
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const startEdit = (post?: BlogPost) => {
    setEditingPost(
      post || {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        published: false,
      }
    );
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">إدارة المدونة</h2>
          <p className="text-muted-foreground">أضف، عدّل، أو احذف مقالات المدونة</p>
        </div>
        {!isEditing && (
          <Button onClick={() => startEdit()}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مقال جديد
          </Button>
        )}
      </div>

      {isEditing && editingPost && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost.id ? 'تعديل المقال' : 'إضافة مقال جديد'}</CardTitle>
            <CardDescription>املأ جميع الحقول لإضافة أو تعديل المقال</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان المقال</Label>
                  <Input
                    id="title"
                    value={editingPost.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditingPost({
                        ...editingPost,
                        title,
                        slug: generateSlug(title),
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">رابط المقال (Slug)</Label>
                  <Input
                    id="slug"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">الكاتب</Label>
                <Input
                  id="author"
                  value={editingPost.author || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">ملخص المقال</Label>
                <Textarea
                  id="excerpt"
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوى المقال</Label>
                <Textarea
                  id="content"
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">رابط صورة المقال (URL)</Label>
                <Input
                  id="image"
                  type="url"
                  value={editingPost.image || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {editingPost.image && (
                  <img src={editingPost.image} alt="Post preview" className="mt-2 rounded border max-h-48 object-cover" />
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="published"
                  checked={editingPost.published || false}
                  onCheckedChange={(checked) =>
                    setEditingPost({ ...editingPost, published: checked as boolean })
                  }
                />
                <Label htmlFor="published" className="cursor-pointer">
                  نشر المقال
                </Label>
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
                    setEditingPost(null);
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
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              {post.published ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  منشور
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                  مسودة
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              {post.image && (
                <img src={post.image} alt={post.title} className="rounded border w-full h-32 object-cover" />
              )}
              <div className="text-xs text-muted-foreground">بواسطة: {post.author}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(post)}>
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              لا توجد مقالات حالياً. ابدأ بكتابة أول مقال!
            </p>
            <Button onClick={() => startEdit()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مقال
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManagement;
