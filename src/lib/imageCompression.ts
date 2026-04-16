import imageCompression from "browser-image-compression";

export interface CompressOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
}

/**
 * Compress an image file to reduce size before storing/uploading.
 * Defaults target ~0.5MB and max dimension 1920px — good balance for web articles.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const opts = {
    maxSizeMB: options.maxSizeMB ?? 0.5,
    maxWidthOrHeight: options.maxWidthOrHeight ?? 1920,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  try {
    const compressed = await imageCompression(file, opts);
    return compressed;
  } catch (e) {
    console.error("Image compression failed, using original:", e);
    return file;
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
