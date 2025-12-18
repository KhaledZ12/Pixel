import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  content: string;
  created_at: string;
}

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <Link to="/blog/">
            <Button>
              العودة للمقالات
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Helmet>
        <title>{article.title} | بيكسل</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image_url} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://pixelmarketng.com/blog/${article.slug}/`} />
        <meta property="og:url" content={`https://pixelmarketng.com/blog/${article.slug}/`} />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link to="/blog/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للمقالات
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(article.created_at)}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      {article.image_url && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-li:text-foreground/90">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-4xl font-bold mt-8 mb-6">{paragraph.substring(2)}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold mt-12 mb-4">{paragraph.substring(3)}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold mt-8 mb-3">{paragraph.substring(4)}</h3>;
              } else if (paragraph.trim()) {
                return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <GlobalCTA />

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
