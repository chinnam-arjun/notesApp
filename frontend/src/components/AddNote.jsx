import React, { useState, useEffect } from "react";

const AddNote = ({ onAdd, initialData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState("");

  // Populate fields if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImageUri(initialData.imageuri?.url || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = {
      title,
      content,
      imageuri: imageUri ? { url: imageUri } : undefined,
    };
    onAdd(noteData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-2">
        {initialData ? "Edit Note" : "Add Note"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUri}
        onChange={(e) => setImageUri(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {initialData ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default AddNote;
