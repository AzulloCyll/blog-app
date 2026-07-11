import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import allPostsData from '@/data/posts.json';
import { isSvgUrl } from '@/lib/image';

interface ContentImage {
  url: string;
  alt: string;
  caption?: string;
  insertAfterParagraph: number;
}

interface Post {
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

const ALL_POSTS = allPostsData as Post[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = ALL_POSTS.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nie znaleziono wpisu</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Szukany wpis nie istnieje.</p>
        <Link href="/" className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          &larr; Powrót do strony głównej
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const initials = post.author.name.split(' ').map((n) => n[0]).join('');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          &larr; Powrót do strony głównej
        </Link>

        {/* Category & Read Time */}
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
            {post.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {post.title}
        </h1>

        {/* Author / Date */}
        <div className="flex items-center space-x-4 pt-2 pb-6 border-b border-gray-100 dark:border-gray-800">
          {post.author.avatarUrl ? (
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-750">
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                className="object-cover"
                unoptimized={isSvgUrl(post.author.avatarUrl)}
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
              {initials}
            </div>
          )}
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </span>
            <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {post.author.role} &bull; {formattedDate}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 relative">
            <Image
              src={post.imageUrl}
              alt={post.coverAlt ?? post.title}
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized={isSvgUrl(post.imageUrl)}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 text-base sm:text-lg leading-relaxed pt-4">
          {post.content.split('\n\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {post.contentImages
                ?.filter((img) => img.insertAfterParagraph === index)
                .map((img, imgIndex) => (
                  <figure key={imgIndex} className="my-8">
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        unoptimized={isSvgUrl(img.url)}
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-3 text-center text-sm italic text-gray-400 dark:text-gray-500">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
            </React.Fragment>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-100 dark:border-gray-800">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-250 dark:border-gray-800 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
