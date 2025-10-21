// import React, { useState } from "react";

// const AddNote = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const noteData = {
//       title,
//       content,
//       imageuri: image ? { url: image.name, caption: "Uploaded image" } : null, 
//     };

//     try {
//       const res = await fetch("http://localhost:5000/notes/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(noteData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Note added successfully!");
//         setTitle("");
//         setContent("");
//         setImage(null);
//       } else {
//         alert(data.message || "Error adding note");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="flex justify-center items-center flex-col">
//         <h1 className="text-4xl">ADD NOTE HERE</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-1.5 mt-3.5 border p-3.5 shadow-2xl hover:border-b-4"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border-0 bg-white rounded text-indigo-200 hover:text-black border border-green-400 active:border"
//           />

//           <textarea
//             name="content"
//             placeholder="Description"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="5"
//             className="border-0 bg-white rounded text-indigo-200 hover:text-black border border-green-400 active:border"
//           ></textarea>

//           <input
//             type="file"
//             name="image"
//             onChange={(e) => setImage(e.target.files[0])}
//           />

//           <button
//             type="submit"
//             className="mt-2 border rounded-2xl bg-blue-800 text-blue-50 border-blue-600 p-1.5 hover:shadow-md"
//           >
//             Add Note
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNote;


// AddNote.jsx
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
