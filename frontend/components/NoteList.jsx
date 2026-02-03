import { useEffect, useState } from "react";
import api from "../src/api";

export default function NoteList({ refresh }) {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");

      const res =
        q && q.trim()
          ? await api.get(`/notes/search?q=${q}`)
          : await api.get("/notes");

      setNotes(res.data);
    };

    fetchNotes();
    window.addEventListener("popstate", fetchNotes);
    return () => window.removeEventListener("popstate", fetchNotes);
  }, [refresh]);

  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    await api.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  const update = async () => {
    await api.put(`/notes/${editNote._id}`, editNote);
    setEditNote(null);
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  /* ================= EMPTY STATE ================= */
  if (notes.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <h3 className="text-xl font-semibold mb-2">No notes found</h3>
        <p className="text-sm">
          {window.location.search.includes("q")
            ? "Try a different keyword"
            : "Create your first note to get started"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================= NOTES GRID ================= */}
      <div className="max-h-[520px] overflow-y-auto pr-3">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {notes.map((n) => (
            <div
              key={n._id}
              className="
                relative rounded-2xl p-[1px]
                bg-gradient-to-br from-purple-200 via-indigo-200 to-transparent
              "
            >
              <div
                className="
                  h-full rounded-2xl bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)]
                  transition-all duration-300
                "
              >
                {/* HEADER */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {n.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(n.updatedAt || Date.now()).toLocaleDateString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  {/* Accent dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-2"></div>
                </div>

                {/* CONTENT */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 mb-6">
                  {n.content}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {/* EDIT */}
                  <button
                    onClick={() => setEditNote(n)}
                    className="
                      flex-1 py-2.5 rounded-xl text-sm font-medium
                      border border-purple-200
                      text-purple-700
                      bg-purple-50
                      hover:bg-purple-100
                      hover:border-purple-300
                      transition-all
                    "
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => remove(n._id)}
                    className="
                      flex-1 py-2.5 rounded-xl text-sm font-medium
                      bg-gradient-to-r from-purple-600 to-indigo-600
                      text-white
                      hover:from-purple-700 hover:to-indigo-700
                      shadow-md hover:shadow-lg
                      transition-all
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Note
            </h2>

            <input
              value={editNote.title}
              onChange={(e) =>
                setEditNote({ ...editNote, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <textarea
              value={editNote.content}
              onChange={(e) =>
                setEditNote({ ...editNote, content: e.target.value })
              }
              rows={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditNote(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={update}
                className="
                  px-6 py-2.5 rounded-xl
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  text-white
                  hover:from-purple-700 hover:to-indigo-700
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
