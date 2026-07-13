import { toExcerpt } from '@/lib/text';
import type { Post, PostSummary } from '@/types/post';

export function toPostSummary(post: Post): PostSummary {
  return {
    id: post.id,
    title: post.title,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
    imageUrl: post.imageUrl,
    coverAlt: post.coverAlt,
    tags: post.tags,
    author: post.author,
    excerpt: toExcerpt(post.content),
  };
}
