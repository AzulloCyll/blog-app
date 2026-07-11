import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isSvgUrl } from '@/lib/image';

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  date: string;
  category?: string;
  readTime?: string;
  imageUrl?: string;
  coverAlt?: string;
  tags?: string[];
  author?: {
    name: string;
    avatarUrl?: string;
    role?: string;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  content,
  date,
  category = "Technology",
  readTime = "5 min czytania",
  imageUrl,
  coverAlt,
  tags = [],
  author = { name: "Alex Zullo", role: "Author" }
}) => {
  // Format the date into a nicer format
  const formattedDate = new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Simple gradient avatar based on author name initials
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Post Image */}
        {imageUrl && (
          <Link href={`/posts/${id}`}>
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer">
              <Image
                src={imageUrl}
                alt={coverAlt ?? title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={isSvgUrl(imageUrl)}
              />
            </div>
          </Link>
        )}

        <div className="p-6">
          {/* Category & Read Time */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
              {category}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            <Link href={`/posts/${id}`}>
              {title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {content}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Author and Date footer */}
      <div className="p-6 pt-0">
        <div className="pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {author.avatarUrl ? (
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  unoptimized={isSvgUrl(author.avatarUrl)}
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
                {initials}
              </div>
            )}
            <div>
              <span className="block text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">
                {author.name}
              </span>
              <span className="block text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                {author.role}
              </span>
            </div>
          </div>

          <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={date}>
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;