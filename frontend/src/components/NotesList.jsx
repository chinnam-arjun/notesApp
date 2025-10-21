import React, { useState, useEffect } from "react";
import AddNote from "./AddNote";


const NotesList = ({searchQuery=""}) => {
  const [notes, setNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null); // for viewing full note


  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/notes/", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data);
      } else {
        console.error("Error fetching notes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note handler
  const handleAddNote = async (noteData) => {
    try {
      const res = await fetch("http://localhost:5000/notes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(noteData),
      });
      const created = await res.json();
      if (res.ok) {
        setNotes((prev) => [...prev, created.note]);
      } else {
        alert(created.message || "Error adding note");
      }
    } catch (error) {
      alert("Error adding note");
    }
    setShowAddNote(false);
    setEditNote(null);
  };

  // Edit note handler
  const handleEditNote = async (noteData) => {
    if (editNote) {
      try {
        const res = await fetch(`http://localhost:5000/notes/${editNote._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(noteData),
        });
        const data = await res.json();
        if (res.ok) {
          setNotes((prev) =>
            prev.map((note) => (note._id === editNote._id ? data.note : note))
          );
        } else {
          alert(data.message || "Error updating note");
        }
      } catch (error) {
        alert("Error updating note");
      }
      setEditNote(null);
      setShowAddNote(false);
    }
  };

  // Unified handler for add/
  const handleAddOrEditNote = (noteData) => {
    if (editNote) {
      handleEditNote(noteData);
    } else {
      handleAddNote(noteData);
    }
  };

  // Delete note handler
  const handleDeleteClick = async (note) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await fetch(`http://localhost:5000/notes/${note._id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setNotes((prev) => prev.filter((n) => n._id !== note._id));
          setSelectedNote(null);
        } else {
          alert(data.message || "Error deleting note");
        }
      } catch (error) {
        alert("Error deleting note");
      }
    }
  };

  const filteredNotes = notes.filter(note =>{
    const title = note?.title?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";
    //note.title.toLowerCase().includes(searchQuery.toLowerCase())
    return title.includes(query);
    
  }
  );

  return (
    <div className="relative">
      {showAddNote && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm z-10"></div>
      )}
      <div className={showAddNote ? "filter blur-sm pointer-events-none" : ""}>
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h1 className="text-2xl font-bold">NOTES</h1>
          <button
            type="button"
            className="border rounded-2xl bg-blue-800 text-blue-50 border-blue-600 px-3 py-1 hover:shadow-md"
            onClick={() => {
              setEditNote(null);
              setShowAddNote(true);
            }}
          >
            Add note
          </button>
        </div>
        <div className="p-5">
          {searchQuery ? (
            filteredNotes.length === 0 ? (
              <p className="text-center mt-6 text-gray-500 italic">
                No matching notes found ✨
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredNotes.map((note, index) => (
                  <div
                    key={note._id || index}
                    onClick={() => setSelectedNote(note)}
                    className="group relative border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1"
                  >
                    {/* Note Title */}
                    <h2 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
                      {note.title}
                    </h2>

                    {/* Note Image */}
                    {note.imageuri?.url && (
                      <div className="overflow-hidden rounded-lg mb-3">
                        <img
                          src={note.imageuri.url}
                          alt={note.imageuri.caption || "Note image"}
                          className="w-full h-28 object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}

                    {/* Note Content */}
                    <p className="text-sm text-gray-700 line-clamp-3 flex-1">
                      {note.content}
                    </p>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition text-blue-500 font-medium">
                        View →
                      </span>
                    </div>

                    {/* Floating Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            )
          ) : notes.length === 0 ? (
            <p className="text-center mt-6 text-gray-500 italic">
              No notes yet. Click <span className="font-semibold">“Add Note”</span> to create one 📘
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {notes.map((note, index) => (
                <div
                  key={note._id || index}
                  onClick={() => setSelectedNote(note)}
                  className="group relative border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
                    {note.title}
                  </h2>
                  {note.imageuri?.url && (
                    <div className="overflow-hidden rounded-lg mb-3">
                      <img
                        src={note.imageuri.url}
                        alt={note.imageuri.caption || "Note image"}
                        className="w-full h-28 object-cover transform group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-700 line-clamp-3 flex-1">
                    {note.content}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition text-blue-500 font-medium">
                      View →
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showAddNote && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[350px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowAddNote(false);
                setEditNote(null);
              }}
            >
              &times;
            </button>
            <AddNote onAdd={handleAddOrEditNote} initialData={editNote} />
          </div>
        </div>
      )}
      {/* Modal for viewing full note */}
      {selectedNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-20 backdrop-blur-sm z-30">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedNote(null)}
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-2">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditNote(selectedNote);
                  setShowAddNote(true);
                  setSelectedNote(null);
                }}
              >
                ✏️
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteClick(selectedNote)}
              >
                🗑️
              </span>
            </div>

            <h2 className="font-semibold text-xl mb-2">{selectedNote.title}</h2>
            {selectedNote.imageuri?.url && (
              <img
                src={selectedNote.imageuri.url}
                alt={selectedNote.imageuri.caption || "Note image"}
                className="w-full rounded mb-3"
              />
            )}
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedNote.content}
            </p>
            <span className="text-xs text-gray-400 mt-3 block">
              {new Date(selectedNote.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;



