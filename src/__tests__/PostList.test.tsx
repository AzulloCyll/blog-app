import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostList from '../components/PostList';
import allPostsData from '../data/posts.json';
import { toPostSummary } from '../lib/posts';
import type { Post } from '../types/post';

const posts = (allPostsData as Post[]).map(toPostSummary);

describe('PostList Component', () => {
  it('renders initial list of posts, search bar, and category filters', () => {
    render(<PostList posts={posts} />);

    // Check search input
    expect(screen.getByPlaceholderText('Szukaj wpisów...')).toBeInTheDocument();

    // Check category filter buttons
    expect(screen.getByRole('button', { name: 'Wszystkie' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Technologia' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Biznes' })).toBeInTheDocument();

    // Check that first few posts from posts.json (Witaj na moim blogu, Rozpoczęcie pracy z Next.js, Współczesny rozwój stron internetowych) are rendered
    expect(screen.getByText('Witaj na moim blogu')).toBeInTheDocument();
    expect(screen.getByText('Rozpoczęcie pracy z Next.js')).toBeInTheDocument();
  });

  it('filters posts based on search input query', () => {
    render(<PostList posts={posts} />);

    const searchInput = screen.getByPlaceholderText('Szukaj wpisów...');

    // Type "Rozpoczęcie"
    fireEvent.change(searchInput, { target: { value: 'Rozpoczęcie' } });

    // "Rozpoczęcie pracy z Next.js" should be in document, but "Witaj na moim blogu" should not
    expect(screen.getByText('Rozpoczęcie pracy z Next.js')).toBeInTheDocument();
    expect(screen.queryByText('Witaj na moim blogu')).not.toBeInTheDocument();
  });

  it('filters posts based on selected category badge', () => {
    render(<PostList posts={posts} />);

    const designButton = screen.getByRole('button', { name: 'Design' });

    // Click "Design" category filter
    fireEvent.click(designButton);

    // "Witaj na moim blogu" (Design) should remain, "Rozpoczęcie pracy z Next.js" (Technology) should be filtered out
    expect(screen.getByText('Witaj na moim blogu')).toBeInTheDocument();
    expect(screen.queryByText('Rozpoczęcie pracy z Next.js')).not.toBeInTheDocument();
  });

  it('shows no posts screen when search query matches nothing', () => {
    render(<PostList posts={posts} />);

    const searchInput = screen.getByPlaceholderText('Szukaj wpisów...');

    // Type a gibberish query
    fireEvent.change(searchInput, { target: { value: 'xyzqwert123' } });

    expect(screen.getByText('Nie znaleziono wpisów')).toBeInTheDocument();
  });

  it('loads more posts when button is clicked', () => {
    render(<PostList posts={posts} />);

    expect(screen.getByRole('button', { name: 'Załaduj więcej wpisów' })).toBeInTheDocument();
    expect(screen.queryByText('Przyszłość AI asystentów kodowania')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Załaduj więcej wpisów' }));

    // Data is local, so the next page of posts appears immediately
    expect(screen.getByText('Przyszłość AI asystentów kodowania')).toBeInTheDocument();

    // Clicking until every post is loaded should eventually remove the button
    let loadMoreButton = screen.queryByRole('button', { name: 'Załaduj więcej wpisów' });
    while (loadMoreButton) {
      fireEvent.click(loadMoreButton);
      loadMoreButton = screen.queryByRole('button', { name: 'Załaduj więcej wpisów' });
    }
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(posts.length);
  });

  it('shows a results count while filtering', () => {
    render(<PostList posts={posts} />);

    const designButton = screen.getByRole('button', { name: 'Design' });
    fireEvent.click(designButton);

    expect(screen.getByText(/Znaleziono \d+ wyni/)).toBeInTheDocument();
  });
});
