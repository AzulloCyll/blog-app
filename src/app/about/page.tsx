import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas',
  description: 'Poznaj misję Dziennika Dewelopera i autora bloga, Alexa Zullo — projektanta UI/UX i inżyniera frontend.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            O Dzienniku Dewelopera
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium">
            Łącząc projektowanie kodu, zasady inżynierii i przepływy pracy z AI.
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <p>
            Witaj w <strong>Dzienniku Dewelopera</strong> — miejscu w sieci poświęconym eksploracji granic nowoczesnej inżynierii oprogramowania. Założony w 2026 roku, ten dziennik jest odzwierciedleniem doświadczeń, lekcji projektowych i wzorców odkrytych podczas budowania skalowalnych systemów webowych.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Nasza misja</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dostarczać wysokiej jakości, praktyczne tutoriale i pogłębione analizy, które pomagają deweloperom doskonalić swój warsztat, rozumieć złożone architektury i być o krok przed zmianami w technologii.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dlaczego nas czytać?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Zero zbędnych słów. Każdy artykuł pisany jest z uwzględnieniem realiów produkcyjnych, zawiera działające fragmenty kodu, estetyczne projekty i skupia się na optymalnym doświadczeniu dewelopera (DX).
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Autor</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm not-prose">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white uppercase tracking-wider shrink-0">
              AZ
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Alex Zullo</h3>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Projektant UI/UX & Inżynier Frontend</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Alex pasjonuje się układami CSS, maszynami stanów, projektowaniem komponentów i tworzeniem przepływów pracy wykorzystujących AI do przyspieszania iteracji w rozwoju oprogramowania.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
