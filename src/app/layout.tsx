import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dziennik Dewelopera",
  description: "Nowoczesny, responsywny blog dzielący się tutorialami, inspiracjami projektowymi i praktykami inżynieryjnymi.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  const isDark = theme === 'dark';

  return (
    <html lang="pl" className={`scroll-smooth${isDark ? ' dark' : ''}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" id="header-logo" className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    Dziennik Dewelopera
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <nav className="hidden md:block">
                    <div className="flex items-baseline space-x-6">
                      <Link href="/" id="header-nav-home" className="text-sm font-semibold text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/30 transition-all">Strona główna</Link>
                      <Link href="/about" id="header-nav-about" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all">O nas</Link>
                      <Link href="/contact" id="header-nav-contact" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all">Kontakt</Link>
                    </div>
                  </nav>

                  {/* Mobile hamburger */}
                  <MobileNav />

                  <div className="pl-2 border-l border-gray-200 dark:border-gray-800">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500 font-medium">
                <p>© {new Date().getFullYear()} Dziennik Dewelopera. Wszelkie prawa zastrzeżone.</p>
                <div className="flex space-x-6">
                  <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Polityka prywatności</Link>
                  <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Warunki korzystania</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}