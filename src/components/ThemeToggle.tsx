"use client";

import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  initialTheme: 'light' | 'dark';
}

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  // Theme is already known server-side from the cookie (see layout.tsx), so
  // we render the correct icon immediately instead of a loading placeholder.
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setTheme(next);
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 text-gray-600 dark:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      aria-label="Przełącz tryb ciemny"
      title={theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
}
