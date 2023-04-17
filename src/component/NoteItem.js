import React from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";


export default function NoteItem(props) {
  const { notes, updateNote } = props;
  const context = useContext(NoteContext);
  const { deletNote } = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-centre">
            <h5 className="card-title"> {notes.title}</h5>
            <div>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(notes);

                }}
              ></i>
              <i
                className="fa-solid fa-trash-can mx-2"
                onClick={() => {
                  deletNote(notes._id);
                  props.showAlert("Deleted successfully", "success")
                }}
              ></i>
            </div>
          </div>

          <p className="card-text"> {notes.description}</p>
        </div>
      </div>
    </div>
  );
}
