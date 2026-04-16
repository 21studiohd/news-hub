import { useSearchParams } from "react-router-dom";
import { mockArticles, categories, Category } from "@/data/mock-data";
import { ArticleCard } from "@/components/ArticleCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";


const Index = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") as Category | null;

  const breakingArticles = mockArticles.filter((a) => a.isBreaking);
  const filteredArticles = activeCategory
    ? mockArticles.filter((a) => a.category === activeCategory)
    : mockArticles;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero / Breaking News */}
        {!activeCategory && breakingArticles.length > 0 && (
          <section className="container mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ArticleCard article={breakingArticles[0]} variant="hero" />
              </div>
              <div className="flex flex-col gap-0">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2 px-1">
                  Lajmet Kryesore
                </h3>
                {mockArticles.slice(1, 5).map((a) => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category filter bar */}
        <section className="container mt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <a
              href="/"
              className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                !activeCategory ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Të gjitha
            </a>
            {categories.map((cat) => (
              <a
                key={cat.value}
                href={`/?category=${cat.value}`}
                className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                  activeCategory === cat.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </section>

        {/* Article Grid */}
        <section className="container mt-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles
              .filter((a) => activeCategory || !a.isBreaking)
              .slice(0, 3)
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        </section>

        {/* More articles */}
        <section className="container mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles
              .filter((a) => activeCategory || !a.isBreaking)
              .slice(3)
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
