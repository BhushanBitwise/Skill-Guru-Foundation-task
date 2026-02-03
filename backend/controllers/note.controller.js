const Note = require("../models/Note");

/* CREATE NOTE */
exports.createNote = async (req, res) => {
  let { title, content } = req.body;

  title = title?.trim();
  content = content?.trim();

  if (!title || !content) {
    return res.status(400).json({ message: "Title & content required" });
  }

  const note = await Note.create({ title, content });
  res.status(201).json(note);
};

/* GET ALL NOTES */
exports.getNotes = async (req, res) => {
  const notes = await Note.find().sort({ updated_at: -1 });
  res.json(notes);
};

/* UPDATE NOTE (PARTIAL) */
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  let updates = {};

  if (req.body.title?.trim()) updates.title = req.body.title.trim();
  if (req.body.content?.trim()) updates.content = req.body.content.trim();

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  const note = await Note.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  );

  if (!note) return res.status(404).json({ message: "Note not found" });

  res.json(note);
};

exports.searchNotes = async (req, res) => {
  let { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ message: "Search query required" });
  }

  q = q.trim();
  const regex = new RegExp(q, "i");

  const notes = await Note.find({
    $or: [{ title: regex }, { content: regex }],
  });

  res.json(notes);
};


// DELETE NOTE
exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json({ message: "Note deleted successfully" });
};