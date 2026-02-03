import { useEffect, useState } from "react";
import api from "../src/api";

export default function NoteList({ refresh }) {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

useEffect(() => {
  const fetchNotes = async () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    if (q && q.trim()) {
      const res = await api.get(`/notes/search?q=${q}`);
      setNotes(res.data);
    } else {
      const res = await api.get("/notes");
      setNotes(res.data);
    }
  };

  fetchNotes();
  window.addEventListener("popstate", fetchNotes);

  return () => window.removeEventListener("popstate", fetchNotes);
}, [refresh]);

  const remove = async (id) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  const update = async () => {
    await api.put(`/notes/${editNote._id}`, editNote);
    setEditNote(null);
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((n) => (
          <div
            key={n._id}
            className="bg-gray-50 border border-gray-300 rounded-lg p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {n.title}
            </h3>

            <p className="text-gray-700 mb-4">
              {n.content}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setEditNote(n)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => remove(n._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Edit Note
            </h2>

            <input
              value={editNote.title}
              onChange={(e) =>
                setEditNote({ ...editNote, title: e.target.value })
              }
              className="w-full border px-4 py-2 mb-3"
            />

            <textarea
              value={editNote.content}
              onChange={(e) =>
                setEditNote({ ...editNote, content: e.target.value })
              }
              rows={4}
              className="w-full border px-4 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditNote(null)}>
                Cancel
              </button>
              <button
                onClick={update}
                className="bg-green-600 text-white px-4 py-2 rounded"
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