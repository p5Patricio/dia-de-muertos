export interface GalleryItem {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

export interface Track {
  id: string;
  title: string;
  src: string;
  artist: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  embedUrl: string;
}
