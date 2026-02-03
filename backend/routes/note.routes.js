const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  searchNotes,
   deleteNote
} = require("../controllers/note.controller");

const { createNoteLimiter } = require("../middleware/rateLimit");

router.post("/", createNoteLimiter, createNote);

router.get("/search", searchNotes); //  ALWAYS ABOVE :id

router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;