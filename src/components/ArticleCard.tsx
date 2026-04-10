import { Link } from "react-router-dom";
import { Article, Category } from "@/data/mock-data";
import { Clock } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const categoryColorMap: Record<Category, string> = {
  politike: "bg-category-politics",
  teknologji: "bg-category-tech",
  jete: "bg-category-lifestyle",
  biznes: "bg-category-business",
  opinion: "bg-category-opinion",
};

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: "default" | "hero" | "compact" }) {
  if (variant === "hero") {
    return (
      <Link to={`/article/${article.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            {article.isBreaking && <span className="breaking-badge mb-3 inline-block">Breaking</span>}
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded text-accent-foreground ${categoryColorMap[article.category]} mb-2`}>
              {article.category}
            </span>
            <h2 className="font-serif text-xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight mb-2">
              {article.title}
            </h2>
            <p className="text-primary-foreground/80 text-sm md:text-base line-clamp-2 max-w-2xl">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-3 text-primary-foreground/60 text-xs">
              <span>{article.author.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-3 py-3 border-b last:border-0">
        <div className="w-20 h-20 rounded overflow-hidden shrink-0">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded text-accent-foreground ${categoryColorMap[article.category]} mb-1`}>
            {article.category}
          </span>
          <h3 className="font-serif text-sm font-semibold leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" />{article.readTime} min
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block animate-slide-in">
      <div className="overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </AspectRatio>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded text-accent-foreground ${categoryColorMap[article.category]}`}>
            {article.category}
          </span>
          {article.isBreaking && <span className="breaking-badge text-[10px]">Breaking</span>}
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1.5 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full object-cover" />
          <span>{article.author.name}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
        </div>
      </div>
    </Link>
  );
}
