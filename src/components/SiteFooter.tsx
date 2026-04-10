import { Link } from "react-router-dom";
import { categories } from "@/data/mock-data";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="font-serif text-xl font-bold">The Daily</span>
              <span className="font-serif text-xl font-bold opacity-70">Wire</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Delivering trusted journalism since 2024. Independent, fearless, and always accurate.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-3 text-sm">Sections</h4>
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
            <h4 className="font-serif font-bold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Advertise</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-50">
          © 2026 The Daily Wire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
