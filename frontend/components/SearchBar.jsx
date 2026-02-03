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

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search notes..."
        className="w-full text-lg sm:flex-1 border border-gray-400 px-4 py-4 rounded-lg"
      />
      <button
        onClick={search}
        className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-6 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}