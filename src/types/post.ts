export interface ContentImage {
  url: string;
  alt: string;
  caption?: string;
  insertAfterParagraph: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  contentImages?: ContentImage[];
  date: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  coverAlt?: string;
  tags?: string[];
  author: {
    name: string;
    avatarUrl?: string;
    role: string;
  };
}

// Lightweight card-level summary — omits full article content/images so the
// client list bundle doesn't ship every post's full text.
export type PostSummary = Omit<Post, 'content' | 'contentImages'> & {
  excerpt: string;
};
