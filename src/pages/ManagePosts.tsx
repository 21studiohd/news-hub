import { mockArticles } from "@/data/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenSquare, Trash2, Eye } from "lucide-react";

const ManagePosts = () => {
  const { user, isSuperadmin } = useAuth();

  const articles = isSuperadmin
    ? mockArticles
    : mockArticles.filter((a) => a.author.id === user?.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Manage Posts</h1>
        <Link to="/admin/create">
          <Button size="sm"><PenSquare className="h-4 w-4 mr-1" /> New Post</Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Author</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t hover:bg-secondary/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {article.isBreaking && <Badge variant="destructive" className="text-[10px]">Breaking</Badge>}
                      <span className="font-medium line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="p-3 capitalize hidden md:table-cell text-muted-foreground">{article.category}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{article.author.name}</td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/article/${article.slug}`}>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="sm"><PenSquare className="h-4 w-4" /></Button>
                      {isSuperadmin && (
                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
