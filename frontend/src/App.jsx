import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Notes Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Create • Edit • Delete • Search your notes
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <SearchBar />
        <NoteForm onAdd={() => setRefresh(!refresh)} />
        <NoteList refresh={refresh} />
      </main>
    </div>
  );
}