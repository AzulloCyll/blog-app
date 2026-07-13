import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Masz pytanie, uwagę lub propozycję współpracy? Napisz do Dziennika Dewelopera.',
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Skontaktuj się z nami
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Masz pytanie, uwagę lub propozycję współpracy? Napisz do nas.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
