"use client";

import React, { useState, useMemo } from 'react';
import BlogPost from './BlogPost';
import allPostsData from '@/data/posts.json';

interface Post {
  id: number;
  title: string;
  content: string;
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

// Cast imported JSON data to Post type
const ALL_POSTS = allPostsData as Post[];
const PAGE_SIZE = 4;

export default function PostList() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [isLoading, setIsLoading] = useState(false);

  // Categories list derived dynamically
  const categories = ["Wszystkie", "Technologia", "Design", "Biznes"];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  // Wszystkie pasujące posty (bez limitu)
  const allFiltered = useMemo(() => {
    return ALL_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory =
        selectedCategory === "Wszystkie" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const isFiltering = !!(searchQuery || selectedCategory !== "Wszystkie");
  const filteredPosts = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allFiltered.length));
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm space-y-4">
        <div className="relative">
          <label htmlFor="search-posts" className="sr-only">Szukaj wpisów</label>
          <input
            id="search-posts"
            type="text"
            placeholder="Szukaj wpisów..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 pl-10 pr-4 py-2.5 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200"
          />
          <div className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500">
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              title="Wyczyść wyszukiwanie"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Categories Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              category={post.category}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
              coverAlt={post.coverAlt}
              tags={post.tags}
              author={post.author}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-12 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Nie znaleziono wpisów</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Spróbuj zmienić wyszukiwaną frazę lub filtry.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isFiltering && (
        <div className="mt-12 text-center">
          <button
            id="load-more-posts-btn"
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Ładowanie...
              </>
            ) : (
              "Załaduj więcej wpisów"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
