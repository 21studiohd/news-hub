// Shared media library store backed by localStorage.
// Will be replaced with Firebase Storage uploads later.

export interface MediaItem {
  id: string;
  name: string;
  url: string; // data URL for now; in Firebase will be download URL
  size: number; // bytes (compressed)
  originalSize?: number;
  addedAt: string;
}

const STORAGE_KEY = "tetova1_media_library";

export function getStoredMedia(): MediaItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveMedia(items: MediaItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to persist media library (storage full?)", e);
  }
}

export function addMediaItem(item: MediaItem) {
  const all = getStoredMedia();
  const updated = [item, ...all];
  saveMedia(updated);
  return updated;
}

export function removeMediaItem(id: string) {
  const updated = getStoredMedia().filter((m) => m.id !== id);
  saveMedia(updated);
  return updated;
}

export function makeMediaId() {
  return `media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
