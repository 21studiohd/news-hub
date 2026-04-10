import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { categories, Category } from "@/data/mock-data";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SEOPreview } from "@/components/SEOPreview";
import { MediaLibrary } from "@/components/MediaLibrary";
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
      toast.error("Titulli dhe trupi janë të detyrueshëm.");
      return;
    }
    toast.success("Artikulli u ruajt! (Mock — zëvendëso me Firebase)");
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Krijo Postim</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> Parashiko</Button>
          <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Publiko</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Titulli</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Shkruaj titullin..." className="font-serif text-lg" />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug-i-artikullit" className="font-mono text-sm" />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Përmbledhja</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Përmbledhje e shkurtër..." rows={2} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Kategoria</Label>
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
            <Label htmlFor="image">Imazhi Kryesor</Label>
            <div className="flex gap-2">
              <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL ose zgjidh nga biblioteka..." className="flex-1" />
              <MediaLibrary
                onSelect={(url) => setImageUrl(url)}
                triggerLabel="Biblioteka"
              />
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="rounded-lg overflow-hidden border max-w-sm">
            <img src={imageUrl} alt="Parashikimi" className="w-full h-40 object-cover" />
          </div>
        )}

        <div>
          <Label>Trupi i Artikullit</Label>
          <RichTextEditor content={body} onChange={setBody} />
        </div>

        {/* SEO Section */}
        <div className="border-t pt-6">
          <h2 className="font-serif text-lg font-bold mb-4">Cilësimet SEO</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="seoTitle">Titulli SEO</Label>
              <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Titulli i optimizuar për SEO..." />
            </div>
            <div>
              <Label htmlFor="seoDesc">Meta Përshkrimi</Label>
              <Textarea id="seoDesc" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Përshkrimi meta për motorët e kërkimit..." rows={2} />
            </div>
          </div>
          <SEOPreview title={seoTitle || title} description={seoDescription || excerpt} slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
