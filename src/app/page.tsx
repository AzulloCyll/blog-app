import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Dziennik Dewelopera
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium">
          Myśli, tutoriale i spostrzeżenia na temat nowoczesnego web developmentu, projektowania UI/UX i AI.
        </p>
      </div>
      
      <PostList />
    </div>
  );
}