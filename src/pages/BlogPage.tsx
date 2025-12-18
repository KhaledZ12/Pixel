import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { getBlogPosts } from "@/services/adminService";
import { BlogPost } from "@/types/admin";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getBlogPosts(true); // Only published posts
      setPosts(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>المدونة | مقالات ونصائح بيكسل في التسويق الإلكتروني</title>
        <meta name="description" content="اقرأ أحدث المقالات في مجال التسويق الإلكتروني، تحسين محركات البحث SEO، وتطوير الأعمال." />
        <link rel="canonical" href="https://pixelmarketng.com/blog/" />
        <meta property="og:url" content="https://pixelmarketng.com/blog/" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(210,50%,15%)] via-[hsl(210,45%,20%)] to-[hsl(210,40%,25%)] py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center">
            المدونة
          </h1>
        </div>
      </section>

      {loading ? (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        </section>
      ) : posts.length === 0 ? (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground">لا توجد مقالات حالياً</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          {posts.length > 0 && (
            <section className="py-20 bg-background">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={posts[0].image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"}
                        alt={posts[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                        مقال مميز
                      </span>
                      <h2 className="text-3xl font-bold mb-4">
                        {posts[0].title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(posts[0].created_at)}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {posts[0].excerpt}
                      </p>
                      <Link to={`/blog/${posts[0].slug}/`}>
                        <Button variant="default" size="lg">
                          اقرأ المزيد
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          {posts.length > 1 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.slice(1).map((post) => (
                    <article
                      key={post.id}
                      className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <Link to={`/blog/${post.slug}/`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-semibold"
                          >
                            اقرأ المزيد
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <GlobalCTA />
      <Footer />
    </div>
  );
};

export default BlogPage;
