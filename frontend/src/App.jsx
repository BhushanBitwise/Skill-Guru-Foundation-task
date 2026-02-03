import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Notes Manager
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-sm"></span>
                Create
                <span className="mx-2">•</span>
                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-sm"></span>
                Edit
                <span className="mx-2">•</span>
                <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-600 rounded-full text-sm"></span>
                Delete
                <span className="mx-2">•</span>
                <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 text-green-600 rounded-full text-sm"></span>
                Search
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                Created with BHUSHAN
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <SearchBar />
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - FORM */}
          <div className="lg:col-span-1">
            <NoteForm onAdd={() => setRefresh(!refresh)} />
            
            {/* STATS CARD */}
           
          </div>

          {/* RIGHT COLUMN - NOTES LIST */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">📝</span>
                    Your Notes
                  </h2>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{0}</span> notes
                  </div>
                </div>
              </div>
              
              {/* SCROLLABLE NOTES CONTAINER */}
              <div className="h-[calc(100vh-400px)] overflow-y-auto p-6">
                <NoteList refresh={refresh} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center font-bold">
                NM
              </div>
              <div>
                <p className="font-semibold text-lg">Notes Manager</p>
                <p className="text-gray-400 text-sm">Organize your thoughts efficiently</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-1">Created with ❤️ by</p>
              <p className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                BhushanBitwise
              </p>
              <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
