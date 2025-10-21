import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
        default: "",
    },
    imageuri : {
        url: String,
        caption: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Note = mongoose.model("Note", noteSchema);