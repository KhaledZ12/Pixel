import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { Project } from '@/types/admin';
import { getProjects, createProject, updateProject, deleteProject } from '@/services/adminService';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل المشاريع',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);
    try {
      if (editingProject.id) {
        await updateProject(editingProject.id, editingProject);
        toast({ title: 'نجح', description: 'تم تحديث المشروع بنجاح' });
      } else {
        await createProject(editingProject as Omit<Project, 'id' | 'created_at'>);
        toast({ title: 'نجح', description: 'تم إضافة المشروع بنجاح' });
      }
      await loadProjects();
      setIsEditing(false);
      setEditingProject(null);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حفظ المشروع',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;

    try {
      await deleteProject(id);
      toast({ title: 'نجح', description: 'تم حذف المشروع بنجاح' });
      await loadProjects();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل حذف المشروع',
        variant: 'destructive',
      });
    }
  };

  const startEdit = (project?: Project) => {
    setEditingProject(
      project || {
        title: '',
        description: '',
        link: '',
        desktopImage: '',
        mobileImage: '',
        slug: '',
        featured: false,
        order: projects.length + 1,
      }
    );
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">إدارة المشاريع</h2>
          <p className="text-muted-foreground">أضف، عدّل، أو احذف المشاريع</p>
        </div>
        {!isEditing && (
          <Button onClick={() => startEdit()}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مشروع جديد
          </Button>
        )}
      </div>

      {isEditing && editingProject && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProject.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</CardTitle>
            <CardDescription>املأ جميع الحقول لإضافة أو تعديل المشروع</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان المشروع</Label>
                  <Input
                    id="title"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">الرابط المختصر (Slug)</Label>
                  <Input
                    id="slug"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="my-project"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">رابط المشروع</Label>
                <Input
                  id="link"
                  type="url"
                  value={editingProject.link || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المشروع</Label>
                <Textarea
                  id="description"
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="desktopImage">رابط صورة سطح المكتب (URL)</Label>
                  <Input
                    id="desktopImage"
                    type="url"
                    value={editingProject.desktopImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, desktopImage: e.target.value })}
                    placeholder="https://example.com/desktop-image.jpg"
                    required
                  />
                  {editingProject.desktopImage && (
                    <img src={editingProject.desktopImage} alt="Desktop preview" className="mt-2 rounded border max-h-32 object-cover" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileImage">رابط صورة الهاتف (URL)</Label>
                  <Input
                    id="mobileImage"
                    type="url"
                    value={editingProject.mobileImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, mobileImage: e.target.value })}
                    placeholder="https://example.com/mobile-image.jpg"
                    required
                  />
                  {editingProject.mobileImage && (
                    <img src={editingProject.mobileImage} alt="Mobile preview" className="mt-2 rounded border max-h-32 object-cover" />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="featured"
                  checked={editingProject.featured || false}
                  onCheckedChange={(checked) =>
                    setEditingProject({ ...editingProject, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  مشروع مميز (يظهر في الصفحة الرئيسية)
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
                    setEditingProject(null);
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
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              {project.featured && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  مميز
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              {project.desktopImage && (
                <img src={project.desktopImage} alt={project.title} className="rounded border w-full h-32 object-cover" />
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              لا توجد مشاريع حالياً. ابدأ بإضافة مشروعك الأول!
            </p>
            <Button onClick={() => startEdit()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مشروع
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsManagement;
