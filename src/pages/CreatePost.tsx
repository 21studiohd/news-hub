import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { categories, Category } from "@/data/mock-data";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SEOPreview } from "@/components/SEOPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Eye } from "lucide-react";

const CreatePost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<Category>("teknologji");
  const [imageUrl, setImageUrl] = useState("");
  const [body, setBody] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(generateSlug(val));
    if (!seoTitle) setSeoTitle(val);
  };

  const handleSave = () => {
    if (!title || !body) {
      toast.error("Title and body are required.");
      return;
    }
    toast.success("Article saved! (Mock — replace with Firebase)");
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Create Post</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> Preview</Button>
          <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Publish</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Headline</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Enter headline..." className="font-serif text-lg" />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" className="font-mono text-sm" />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary..." rows={2} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Featured Image URL</Label>
            <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        <div>
          <Label>Article Body</Label>
          <RichTextEditor content={body} onChange={setBody} />
        </div>

        {/* SEO Section */}
        <div className="border-t pt-6">
          <h2 className="font-serif text-lg font-bold mb-4">SEO Settings</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="SEO optimized title..." />
            </div>
            <div>
              <Label htmlFor="seoDesc">Meta Description</Label>
              <Textarea id="seoDesc" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Meta description for search engines..." rows={2} />
            </div>
          </div>
          <SEOPreview title={seoTitle || title} description={seoDescription || excerpt} slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
