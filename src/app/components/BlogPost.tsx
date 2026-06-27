import React from 'react';

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, date }) => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{date}</p>
      <p className="mt-3 text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default BlogPost;