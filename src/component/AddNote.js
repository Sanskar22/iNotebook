import React from "react";
import { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.description, notes.tag);
    setNotes({
      title: "",
      description: "",
      tag: "",
    })
    props.showAlert("Added successfully", "success")
  };
  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });

  };
  return (
    <div>
      <h3 className="mb-3 mt-4">Add note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            minLength={5} required
            value={notes.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={notes.description}
            minLength={5} required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={notes.tag}
            name="tag"

            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleClick}
          disabled={notes.title.length < 5 || notes.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
