import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");

  const search = () => {
    if (!q.trim()) {
      // empty search = reset list
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new Event("popstate"));
      return;
    }

    const encoded = encodeURIComponent(q.trim());
    window.history.pushState({}, "", `?q=${encoded}`);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search notes by title or content..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={search}
            className="flex-1 sm:flex-none bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-black text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            Search
          </button>
          
          {q && (
            <button
              onClick={() => {
                setQ("");
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new Event("popstate"));
              }}
              className="flex-1 sm:flex-none bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>↻</span>
              Clear
            </button>
          )}
        </div>
      </div>
      
      {/* <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-gray-600 text-sm">Try searching for:</span>
        {['meeting', 'ideas', 'todo', 'reminder', 'project'].map((tag) => (
          <button
            key={tag}
            onClick={() => setQ(tag)}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-lg hover:bg-indigo-100 transition"
          >
            {tag}
          </button>
        ))}
      </div> */}
    </div>
  );
}
