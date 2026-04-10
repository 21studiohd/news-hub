import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Copy, Check, ImageIcon, Search } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  addedAt: string;
}

const STORAGE_KEY = "tetova1_media_library";

function getStoredMedia(): MediaItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMedia(items: MediaItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const MediaLibraryPage = () => {
  const [media, setMedia] = useState<MediaItem[]>(getStoredMedia);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = search
    ? media.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    : media;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} nuk është imazh i vlefshëm.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newItem: MediaItem = {
          id: `media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          url: reader.result as string,
          addedAt: new Date().toISOString(),
        };
        setMedia((prev) => {
          const updated = [newItem, ...prev];
          saveMedia(updated);
          return updated;
        });
        toast.success(`${file.name} u ngarkua me sukses!`);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    setMedia((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveMedia(updated);
      return updated;
    });
    toast.success("Imazhi u fshi.");
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("URL u kopjua!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Biblioteka e Mediave</h1>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button onClick={() => fileInputRef.current?.click()} size="sm">
            <Upload className="h-4 w-4 mr-1" /> Ngarko Imazhe
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kërko imazhe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">{media.length} imazhe</span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Nuk ka imazhe ende</p>
          <p className="text-sm">Ngarko imazhe nga pajisja jote për t'i përdorur në artikuj.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative border rounded-lg overflow-hidden bg-secondary/30 aspect-square"
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate mb-1">{item.name}</p>
                <p className="text-[10px] text-white/60">
                  {new Date(item.addedAt).toLocaleDateString("sq-AL")}
                </p>
                <div className="flex gap-1 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-white hover:text-white hover:bg-white/20 text-xs"
                    onClick={() => handleCopyUrl(item)}
                  >
                    {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Kopjo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-white hover:text-destructive hover:bg-white/20 text-xs"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Fshi
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibraryPage;
