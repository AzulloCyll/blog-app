import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostList from '../components/PostList';

describe('PostList Component', () => {
  it('renders initial list of posts, search bar, and category filters', () => {
    render(<PostList />);

    // Check search input
    expect(screen.getByPlaceholderText('Search blog posts...')).toBeInTheDocument();

    // Check category filter buttons
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Technology' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Business' })).toBeInTheDocument();

    // Check that first few posts from posts.json (Welcome to my blog, Getting started with Next.js, Modern Web Development) are rendered
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();
    expect(screen.getByText('Getting started with Next.js')).toBeInTheDocument();
  });

  it('filters posts based on search input query', () => {
    render(<PostList />);

    const searchInput = screen.getByPlaceholderText('Search blog posts...');

    // Type "Next.js"
    fireEvent.change(searchInput, { target: { value: 'Next.js' } });

    // "Getting started with Next.js" should be in document, but "Welcome to my blog" should not
    expect(screen.getByText('Getting started with Next.js')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to my blog')).not.toBeInTheDocument();
  });

  it('filters posts based on selected category badge', () => {
    render(<PostList />);

    const designButton = screen.getByRole('button', { name: 'Design' });

    // Click "Design" category filter
    fireEvent.click(designButton);

    // "Welcome to my blog" (Design) should remain, "Getting started with Next.js" (Technology) should be filtered out
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();
    expect(screen.queryByText('Getting started with Next.js')).not.toBeInTheDocument();
  });

  it('shows no posts screen when search query matches nothing', () => {
    render(<PostList />);

    const searchInput = screen.getByPlaceholderText('Search blog posts...');

    // Type a gibberish query
    fireEvent.change(searchInput, { target: { value: 'xyzqwert123' } });

    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });

  it('simulates loading more posts when button is clicked', async () => {
    render(<PostList />);

    const loadMoreButton = screen.getByRole('button', { name: /Load More Posts/i });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    // Button should change state to loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the async mock load to finish (simulated with 800ms setTimeout)
    await waitFor(() => {
      expect(screen.getByText('Mastering Tailwind CSS')).toBeInTheDocument();
    }, { timeout: 1200 });

    // Load more button should disappear after all posts are loaded
    expect(screen.queryByRole('button', { name: /Load More Posts/i })).not.toBeInTheDocument();
  });
});
