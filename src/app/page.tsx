import BlogPost from "./components/BlogPost";
import NavigationMenu from "./components/NavigationMenu";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Welcome to my blog",
      content: "This is the content of my first blog post. I'm excited to share my thoughts with you.",
      date: "2023-06-01"
    },
    {
      id: 2,
      title: "Getting started with Next.js",
      content: "Next.js is a powerful framework for building React applications with server-side rendering and static site generation capabilities.",
      date: "2023-06-05"
    },
    {
      id: 3,
      title: "Modern Web Development",
      content: "The landscape of web development continues to evolve rapidly with new tools and frameworks emerging regularly.",
      date: "2023-06-10"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex">
        {/* Main content area - large central column */}
        <main className="flex-1">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">My Simple Blog</h1>
            <p className="mt-2 text-gray-600">Sharing thoughts and ideas</p>
          </header>
          
          <main>
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPost 
                  key={post.id}
                  title={post.title}
                  content={post.content}
                  date={post.date}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Load More Posts
              </button>
            </div>
          </main>
        </main>

        {/* Sidebar - small column on the right */}
        <aside className="w-64 p-6 bg-white border-l border-gray-200 ml-6">
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

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Menu</h3>
              <div className="px-3 py-2">
                <NavigationMenu />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} My Simple Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}