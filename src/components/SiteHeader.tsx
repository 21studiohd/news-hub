import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Breaking news ticker */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 text-center font-medium tracking-wide">
        <span className="breaking-badge mr-2">LIVE</span>
        Samiti Global i Klimës arrin marrëveshje historike — Mbulimi i plotë →
      </div>

      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Mobile menu */}
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Hap menunë"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Tetova 1" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Kategoritë <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.value} onClick={() => navigate(`/?category=${cat.value}`)}>
                  {cat.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/?category=politike" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Politikë
          </Link>
          <Link to="/?category=teknologji" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Teknologji
          </Link>
          <Link to="/?category=biznes" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Biznes
          </Link>
        </nav>

        {/* Right side - search only, no login */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center border rounded-md px-2 bg-secondary">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kërko artikuj..."
                className="bg-transparent border-0 outline-none px-2 py-1.5 text-sm w-32 md:w-48"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2" aria-label="Kërko">
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background animate-slide-in">
          <nav className="container py-4 flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={`/?category=${cat.value}`}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
