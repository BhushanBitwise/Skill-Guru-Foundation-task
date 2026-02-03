import { useState } from "react";
import api from "../src/api";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      onAdd();
    } catch (error) {
      alert("Failed to create note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-7 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-bold">+</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Note
          </h2>
          <p className="text-gray-600 text-sm">Add your thoughts and ideas</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition placeholder-gray-400"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={submit}
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
            } text-white flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <span className="text-xl">+</span>
                Add Note
              </>
            )}
          </button>
          <p className="text-gray-500 text-sm text-center mt-3">
            Both fields are required
          </p>
        </div>
      </div>
    </div>
  );
}
