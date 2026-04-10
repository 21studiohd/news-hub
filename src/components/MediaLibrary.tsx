import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageIcon, Upload, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  addedAt: string;
}

// Mock persistent storage (replace with Firebase Storage later)
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

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  triggerLabel?: string;
}

export function MediaLibrary({ onSelect, triggerLabel = "Biblioteka e Mediave" }: MediaLibraryProps) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>(getStoredMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Reset input
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

  const handleSelect = (item: MediaItem) => {
    if (onSelect) {
      onSelect(item.url);
      setOpen(false);
      toast.success("Imazhi u zgjodh!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <ImageIcon className="h-4 w-4 mr-1" /> {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif">Biblioteka e Mediave</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 py-2">
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
          <span className="text-xs text-muted-foreground">
            {media.length} imazhe në bibliotekë
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {media.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">Nuk ka imazhe ende.</p>
              <p className="text-xs">Ngarko imazhe nga pajisja jote.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative border rounded-lg overflow-hidden bg-secondary/30 aspect-square"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSelect(item)}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">{item.name}</p>
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-white hover:text-white hover:bg-white/20"
                        onClick={(e) => { e.stopPropagation(); handleCopyUrl(item); }}
                      >
                        {copiedId === item.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-white hover:text-destructive hover:bg-white/20"
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
