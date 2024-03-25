import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const [notes, setNotes] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem("token")};

  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/note/fetchallnotes`, { method: "GET", headers });
      if (!response.ok) throw new Error("Failed to fetch notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
      props.showAlert("Unable to fetch data", "danger");
    }
  };

  const addNote = async (newNote) => {
    const { title, description, tag } = newNote;
    try {
      const response = await fetch(`${host}/api/note/addnote`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add note");
      }
      const note = await response.json();
      setNotes(oldNotes => [...oldNotes, note]);
      return true;  // Return true when note is successfully added
    } catch (error) {
      console.error(error);
      props.showAlert(`${error}`, "danger");
      return false;  // Return false when there is an error
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update note");
      }
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          notes[index].title = title;
          notes[index].description = description;
          notes[index].tag = tag;
        }
      }
      return true;  // Return true when note is successfully updated
    } catch (error) {
      console.error(error);
      props.showAlert("Unable to update note: "+error.message, "danger");
      return false;  // Return false when there is an error
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error((await response.json()).error || "Failed to delete note");
      }
      setNotes(notes.filter(note => note._id !== id));
      return true;  // Return true when note is successfully deleted
    } catch (error) {
      console.error(error);
      props.showAlert("Unable to delete note: "+error.message, "danger");
      return false;  // Return false when there is an error
    }
  }
  

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
