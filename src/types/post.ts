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
