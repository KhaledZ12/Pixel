import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { getBlogPosts } from "@/services/adminService";
import { BlogPost } from "@/types/admin";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data.filter(p => p.published).slice(0, 4));
    };
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4">
            أحدث <span className="text-primary">المقالات</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            تابع آخر الأخبار والمقالات في عالم التسويق الرقمي والتصميم
          </p>
        </div>

        {/* Blog Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
          {posts.map((post, index) => (
            <Link
              to={`/blog/${post.slug}/`}
              key={post.id}
              className="group bg-card border border-border rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-32 sm:h-40 lg:h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Author Badge - Hidden on mobile */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 hidden sm:block">
                  <span className="bg-primary text-primary-foreground px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    {post.author}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">
                {/* Date */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">{formatDate(post.created_at)}</span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm lg:text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt - Hidden on mobile */}
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block">{post.excerpt}</p>

                {/* Read More */}
                <div className="flex items-center gap-1 text-primary font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all">
                  <span className="hidden sm:inline">اقرأ المزيد</span>
                  <span className="sm:hidden">المزيد</span>
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link to="/blog/">
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary w-full sm:w-auto h-12 sm:h-14 text-sm sm:text-base"
            >
              عرض جميع المقالات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
