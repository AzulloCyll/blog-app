import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.className = '';
  });

  it('renders correctly as a button', () => {
    render(<ThemeToggle initialTheme="light" />);
    const button = screen.getByRole('button', { name: 'Przełącz tryb ciemny' });
    expect(button).toBeInTheDocument();
  });

  it('toggles document class and cookie theme value on click', () => {
    // Initial theme is light by default if not set
    render(<ThemeToggle initialTheme="light" />);
    const button = screen.getByRole('button', { name: 'Przełącz tryb ciemny' });

    // Click to toggle to dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.cookie).toContain('theme=dark');

    // Click again to toggle to light mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.cookie).toContain('theme=light');
  });
});
