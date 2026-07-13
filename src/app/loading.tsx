export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="mx-auto mb-16 h-10 w-2/3 max-w-md rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-80 rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}
