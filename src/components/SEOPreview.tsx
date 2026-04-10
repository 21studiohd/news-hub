import { useState } from "react";
import { Globe, Search } from "lucide-react";

interface SEOPreviewProps {
  title: string;
  description: string;
  slug: string;
}

export function SEOPreview({ title, description, slug }: SEOPreviewProps) {
  const displayUrl = `thedailywire.com/article/${slug || "your-article-slug"}`;
  const displayTitle = title || "Your Article Title";
  const displayDesc = description || "Write a compelling meta description for search engines...";

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center gap-2 mb-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">SEO Preview</span>
      </div>
      <div className="bg-background rounded-md p-4 border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <Globe className="h-3 w-3" />
          <span>{displayUrl}</span>
        </div>
        <h3 className="text-[#1a0dab] text-base font-medium leading-snug line-clamp-1 hover:underline cursor-pointer">
          {displayTitle}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Title: {displayTitle.length}/60 chars
        {displayTitle.length > 60 && <span className="text-destructive ml-1">(too long)</span>}
        <span className="mx-2">·</span>
        Description: {displayDesc.length}/160 chars
        {displayDesc.length > 160 && <span className="text-destructive ml-1">(too long)</span>}
      </div>
    </div>
  );
}
