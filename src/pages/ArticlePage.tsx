import { useParams, Link } from "react-router-dom";
import { mockArticles } from "@/data/mock-data";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdBanner } from "@/components/AdBanner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArticleCard } from "@/components/ArticleCard";
import { Clock, Share2, Facebook, Twitter, Link2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold mb-2">Artikulli nuk u gjet</h1>
            <Link to="/" className="text-accent hover:underline">← Kthehu në Ballina</Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-3xl mx-auto mt-6 mb-12 px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Kthehu
          </Link>

          <div className="mb-6">
            {article.isBreaking && <span className="breaking-badge mb-3 inline-block">E Fundit</span>}
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <span className="font-medium text-foreground">{article.author.name}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span>{new Date(article.publishedAt).toLocaleDateString("sq-AL", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min lexim</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden mb-8">
            <AspectRatio ratio={16 / 9}>
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </AspectRatio>
          </div>

          {/* Ad Banner - In Article */}
          <div className="mb-8">
            <AdBanner slot="in-article" />
          </div>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }} />

          {/* Share buttons */}
          <div className="border-t border-b py-4 my-8 flex items-center gap-3">
            <span className="text-sm font-medium flex items-center gap-1"><Share2 className="h-4 w-4" /> Ndaj</span>
            <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`, '_blank')}>
              <Twitter className="h-4 w-4 mr-1" /> Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}>
              <Facebook className="h-4 w-4 mr-1" /> Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(shareUrl); toast.success("Linku u kopjua!"); }}>
              <Link2 className="h-4 w-4 mr-1" /> Kopjo
            </Button>
          </div>

          {/* Ad Banner - Bottom of article */}
          <div className="mb-8">
            <AdBanner slot="footer" />
          </div>
        </article>

        {/* Related */}
        {relatedArticles.length > 0 && (
          <section className="container mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Më shumë nga {article.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
