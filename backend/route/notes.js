const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middlewar/middleware");
const { body, validationResult } = require("express-validator");

// Get all the notes....

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// Add notes

router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleat 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const notes = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });

    const saveNotes = await notes.save();
    res.json(saveNotes);
  }
);

//Update an existing note  login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  //create aa new object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // find the note and update

  let notes = await Notes.findById(req.params.id);
  if (!notes) {
    res.status(404).json({ errors: "Not found" });
  }
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).json({ errors: "Not Allowed" });
  }

  try {
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(notes);
  } catch (error) {
    res.status(500).send("some error occured");
  }
});

// delete request

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  let notes = await Notes.findById(req.params.id);
  if (!notes) {
    res.status(404).json({ errors: "Not found" });
  }
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).json({ errors: "Not Allowed" });
  }

  try {
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: " Note has been deleted", notes: notes });
  } catch (error) {
    res.status(500).send("some error occured");
  }
});

module.exports = router;
