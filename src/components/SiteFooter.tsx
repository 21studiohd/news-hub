import { Link } from "react-router-dom";
import { categories } from "@/data/mock-data";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-4">
              <img src={logo} alt="Tetova 1" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Duke sjellë gazetari të besueshme që nga 2024. Të pavarur, të guximshëm, dhe gjithmonë të saktë.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-3 text-sm">Seksionet</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <Link to={`/?category=${cat.value}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-3 text-sm">Kompania</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Rreth Nesh</li>
              <li>Karriera</li>
              <li>Kontakt</li>
              <li>Reklamo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-3 text-sm">Ligjore</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Politika e Privatësisë</li>
              <li>Kushtet e Shërbimit</li>
              <li>Politika e Cookies</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-50">
          © 2026 Tetova 1. Të gjitha të drejtat e rezervuara.
        </div>
      </div>
    </footer>
  );
}
