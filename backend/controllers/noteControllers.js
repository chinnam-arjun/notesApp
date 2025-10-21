import { Note } from '../models/Note.js';
import { User } from '../models/User.js';

// const createNote = async (req, res) => {
//     const { title, content, imageuri } = req.body;
//     const userId = req.session.userId; // || req.headers['userid']

//     if (!userId) {
//         return res.status(401).json({ message: "Unauthorized: Please log in" });
//     }

//     if (!title) {
//         return res.status(400).json({ message: "Title is required" });
//     }

//     try {
//         const newNote = new Note({
//             userId,
//             title,
//             content: content || "",
//             imageuri: imageuri ? { url: imageuri.url, caption: imageuri.caption } : null,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });
//         await newNote.save();
//         res.status(201).json({ message: "Note created successfully", note: newNote });
//     } catch (error) {
//         console.error("Error creating note:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

const createNote = async (req, res) => {
    const { title, content, imageuri } =await req.body;
    const userId =await req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        // ✅ Check restriction
        console.log("userId:", userId);
        console.log("req.body:", req.body);
        const user = await User.findById(userId);
        if (user.restrictedUntil && user.restrictedUntil > new Date()) {
        return res.status(403).json({
            message: `You are restricted from creating notes until ${user.restrictedUntil}`
        });
        }

        const newNote = new Note({
        userId,
        title,
        content: content || "",
        imageuri: imageuri ? { url: imageuri.url, caption: imageuri.caption } : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        });
        await newNote.save();

        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getNotes = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    try {
        const notes = await Note.find({ userId });
        res.status(200).json(notes); // return [] if no notes
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getNoteById = async (req, res) => {
    const userId = req.session.userId;
    const { noteId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    try {
        const note = await Note.findOne({ _id: noteId,userId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateNote = async (req, res) => {
    const userId = req.session.userId;
    const { noteId } = req.params;
    const { title, content, imageuri } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    try {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId },
            {
                $set: {
                    title,
                    content,
                    imageuri: imageuri ? { url: imageuri.url, caption: imageuri.caption } : null,
                    updatedAt: new Date(),
                },
            },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteNote = async (req, res) => {
    const userId = req.session.userId;
    const { noteId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    try {
        const note = await Note.findOneAndDelete({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};
