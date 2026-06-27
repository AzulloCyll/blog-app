import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "A simple blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto flex">
            {/* Main content - large central column */}
            <main className="flex-1 p-6">
              {children}
            </main>
            
            {/* Sidebar - small column on the right */}
            <aside className="w-64 p-6 bg-white border-l border-gray-200">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                <nav className="space-y-2">
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">Home</a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">About</a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">Contact</a>
                </nav>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="block px-3 py-1 text-gray-600 hover:text-blue-600">Technology</a></li>
                    <li><a href="#" className="block px-3 py-1 text-gray-600 hover:text-blue-600">Design</a></li>
                    <li><a href="#" className="block px-3 py-1 text-gray-600 hover:text-blue-600">Business</a></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}