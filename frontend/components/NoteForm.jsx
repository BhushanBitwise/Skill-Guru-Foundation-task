import { useState } from "react";
import api from "../src/api";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    if (!title.trim() || !content.trim()) return alert("Required");
    await api.post("/notes", { title, content });
    setTitle("");
    setContent("");
    onAdd();
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Note
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full border border-gray-400 rounded-md px-4 py-2 text-base mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        rows={4}
        className="w-full border border-gray-400 rounded-md px-4 py-2 text-base mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={submit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium"
      >
        Add Note
      </button>
    </div>
  );
}