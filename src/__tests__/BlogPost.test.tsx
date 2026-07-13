import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from '../components/BlogPost';

describe('BlogPost Component', () => {
  const mockProps = {
    id: 1,
    title: 'Test Post Title',
    excerpt: 'This is the body content of the test post.',
    date: '2023-06-01',
    category: 'Technologia',
    readTime: '5 min czytania',
    imageUrl: '/images/test-image.jpg',
    tags: ['Nextjs', 'Testing'],
    author: {
      name: 'John Test',
      role: 'QA Engineer',
    },
  };

  it('renders all post details correctly', () => {
    render(<BlogPost {...mockProps} />);

    // Check title and content
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('This is the body content of the test post.')).toBeInTheDocument();

    // Check category and read time
    expect(screen.getByText('Technologia')).toBeInTheDocument();
    expect(screen.getByText('5 min czytania')).toBeInTheDocument();

    // Check author details
    expect(screen.getByText('John Test')).toBeInTheDocument();
    expect(screen.getByText('QA Engineer')).toBeInTheDocument();

    // Check date formatting (formatted as 1 cze 2023)
    expect(screen.getByText('1 cze 2023')).toBeInTheDocument();

    // Check tags
    expect(screen.getByText('#Nextjs')).toBeInTheDocument();
    expect(screen.getByText('#Testing')).toBeInTheDocument();

    // Check image — JPG covers go through the next/image optimizer, so the
    // rendered src is the rewritten optimizer URL, not the raw path.
    const image = screen.getByRole('img', { name: 'Test Post Title' });
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain(encodeURIComponent(mockProps.imageUrl));
  });

  it('renders standard initials if avatarUrl is not provided', () => {
    render(<BlogPost {...mockProps} />);
    expect(screen.getByText('JT')).toBeInTheDocument();
  });
});
