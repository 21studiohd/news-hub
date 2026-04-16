import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  AlignLeft, AlignCenter, AlignRight,
  ImageIcon, Link2, Unlink, Undo, Redo,
} from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { MediaLibrary } from "@/components/MediaLibrary";
import { compressImage, fileToDataUrl } from "@/lib/imageCompression";
import { addMediaItem, makeMediaId } from "@/lib/mediaStore";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-accent underline" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Fillo të shkruash artikullin..." }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none p-4 min-h-[400px]",
      },
    },
  });

  if (!editor) return null;

  const insertImageUrl = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  const insertImageFromLibrary = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Skedari nuk është imazh.");
      return;
    }

    toast.loading("Po komprimohet imazhi...", { id: "compress" });
    try {
      const compressed = await compressImage(file);
      const dataUrl = await fileToDataUrl(compressed);

      // Save to media library automatically
      addMediaItem({
        id: makeMediaId(),
        name: file.name,
        url: dataUrl,
        size: compressed.size,
        originalSize: file.size,
        addedAt: new Date().toISOString(),
      });

      editor.chain().focus().setImage({ src: dataUrl }).run();
      toast.success("Imazhi u shtua dhe u ruajt në bibliotekë!", { id: "compress" });
    } catch (err) {
      console.error(err);
      toast.error("Ngarkimi dështoi.", { id: "compress" });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const applyLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    }
    setLinkUrl("");
  };

  const ToolBtn = ({
    onClick, active, title, children, type = "button",
  }: {
    onClick: () => void; active?: boolean; title: string; children: React.ReactNode; type?: "button";
  }) => (
    <Button
      type={type}
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  const Divider = () => <div className="w-px h-6 bg-border mx-1" />;

  return (
    <div className="tiptap-editor border rounded-lg overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-secondary/50 sticky top-0 z-10">
        {/* Text styles */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Trasha (Bold)">
          <Bold className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Pjerrët (Italic)">
          <Italic className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Nënvizuar">
          <UnderlineIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="I prerë">
          <Strikethrough className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        {/* Headings */}
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Titull H1">
          <Heading1 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Nëntitull H2">
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Nëntitull H3">
          <Heading3 className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        {/* Lists & blocks */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Listë me pika">
          <List className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Listë e numëruar">
          <ListOrdered className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Citim">
          <Quote className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Bllok kodi">
          <Code className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Vijë ndarëse">
          <Minus className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        {/* Alignment */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Majtas">
          <AlignLeft className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Qendër">
          <AlignCenter className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Djathtas">
          <AlignRight className="h-4 w-4" />
        </ToolBtn>

        <Divider />

        {/* Link */}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant={editor.isActive("link") ? "default" : "ghost"} size="sm" className="h-8 w-8 p-0" title="Shto Link">
              <Link2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <p className="text-sm font-medium">Shto / Modifiko Link</p>
              <Input
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } }}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={applyLink} className="flex-1">Aplikoji</Button>
                {editor.isActive("link") && (
                  <Button size="sm" variant="outline" onClick={() => editor.chain().focus().unsetLink().run()}>
                    <Unlink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Image: upload + URL + library */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        <ToolBtn onClick={() => fileInputRef.current?.click()} title="Ngarko imazh nga pajisja (komprimohet automatikisht)">
          <ImageIcon className="h-4 w-4" />
        </ToolBtn>

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="h-8 px-2 text-xs" title="Shto imazh nga URL">
              URL
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <p className="text-sm font-medium">Shto imazh nga URL</p>
              <Input
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button size="sm" onClick={insertImageUrl} className="w-full">Shto</Button>
            </div>
          </PopoverContent>
        </Popover>

        <MediaLibrary onSelect={insertImageFromLibrary} triggerLabel="Bibl." />

        <Divider />

        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Zhbëj">
          <Undo className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Ribëj">
          <Redo className="h-4 w-4" />
        </ToolBtn>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
