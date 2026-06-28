import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            About The Dev Journal
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium">
            Bridging the gap between code design, engineering principles, and AI workflows.
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <p>
            Welcome to <strong>The Developer Journal</strong>, a curated corner of the internet dedicated to explore the frontiers of modern software engineering. Founded in 2023, this journal is a reflection of experiences, design lessons, and software patterns discovered during building scalable web systems.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                To provide high-quality, practical tutorials and deep dives that help developers raise their craft, understand complex architectures, and stay ahead in the rapidly shifting tech stack.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Why Read Us?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No fluff. Every article is written with real-world context, functional code snippets, beautiful design aesthetics, and a focus on optimal developer experience (DX).
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">The Author</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm not-prose">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white uppercase tracking-wider shrink-0">
              AZ
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Alex Zullo</h3>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">UI/UX Designer & Frontend Engineer</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Alex is passionate about CSS layouts, state machines, component design, and creating workflows that leverage AI to accelerate software iteration times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
