import Link from "next/link";
import PostList from "@/components/PostList";
import NavigationMenu from "@/components/NavigationMenu";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          The Developer Journal
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium">
          Sharing thoughts, tutorials, and insights on modern web development, UI/UX design, and AI.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content area */}
        <main className="flex-grow lg:max-w-[calc(100%-18rem)]">
          <PostList />
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-6 sticky top-24">
            {/* Navigation Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <nav className="space-y-1">
                <Link 
                  id="nav-link-home"
                  href="/" 
                  className="flex items-center px-3 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl transition-all"
                >
                  <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
                <Link 
                  id="nav-link-about"
                  href="/about" 
                  className="flex items-center px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                >
                  <svg className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </Link>
                <Link 
                  id="nav-link-contact"
                  href="/contact" 
                  className="flex items-center px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                >
                  <svg className="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Link>
              </nav>
            </div>

            {/* Quick Menu Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Quick Menu
              </h3>
              <div className="pt-1">
                <NavigationMenu />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}