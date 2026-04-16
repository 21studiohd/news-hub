import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageIcon, Upload, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { compressImage, fileToDataUrl, formatBytes } from "@/lib/imageCompression";
import { MediaItem, addMediaItem, getStoredMedia, makeMediaId, removeMediaItem } from "@/lib/mediaStore";

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  triggerLabel?: string;
}

export function MediaLibrary({ onSelect, triggerLabel = "Biblioteka e Mediave" }: MediaLibraryProps) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>(getStoredMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = () => setMedia(getStoredMedia());

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    toast.loading(`Po komprimohen ${files.length} imazh${files.length > 1 ? "e" : ""}...`, { id: "lib-upload" });

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} nuk është imazh i vlefshëm.`);
        continue;
      }
      try {
        const compressed = await compressImage(file);
        const dataUrl = await fileToDataUrl(compressed);
        addMediaItem({
          id: makeMediaId(),
          name: file.name,
          url: dataUrl,
          size: compressed.size,
          originalSize: file.size,
          addedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error(err);
        toast.error(`${file.name} dështoi.`);
      }
    }

    refresh();
    setUploading(false);
    toast.success("Imazhet u ruajtën në bibliotekë!", { id: "lib-upload" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    removeMediaItem(id);
    refresh();
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
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) refresh(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button" className="h-8">
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
          <Button onClick={() => fileInputRef.current?.click()} size="sm" disabled={uploading}>
            <Upload className="h-4 w-4 mr-1" /> {uploading ? "Po ngarkohet..." : "Ngarko Imazhe"}
          </Button>
          <span className="text-xs text-muted-foreground">
            {media.length} imazhe · komprimohen automatikisht
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {media.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">Nuk ka imazhe ende.</p>
              <p className="text-xs">Ngarko imazhe nga pajisja ose kamera.</p>
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">{item.name}</p>
                    <p className="text-[9px] text-white/70">
                      {formatBytes(item.size)}
                      {item.originalSize && item.originalSize > item.size && (
                        <> · −{Math.round((1 - item.size / item.originalSize) * 100)}%</>
                      )}
                    </p>
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
