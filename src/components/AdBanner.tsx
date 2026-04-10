interface AdBannerProps {
  slot: "header" | "sidebar" | "in-article" | "footer";
  className?: string;
}

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  const sizes: Record<string, string> = {
    header: "h-[90px] max-w-[728px]",
    sidebar: "h-[250px] w-full max-w-[300px]",
    "in-article": "h-[90px] max-w-[728px]",
    footer: "h-[90px] max-w-[728px]",
  };

  return (
    <div className={`flex items-center justify-center mx-auto ${sizes[slot]} ${className}`}>
      <div className="w-full h-full border-2 border-dashed border-muted-foreground/20 rounded-lg flex flex-col items-center justify-center bg-secondary/30">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">
          Reklamë
        </span>
        <span className="text-[9px] text-muted-foreground/30 mt-0.5">
          {slot === "header" ? "728×90" : slot === "sidebar" ? "300×250" : "728×90"}
        </span>
      </div>
    </div>
  );
}
