import { User } from "../models/User.js";
import { Note } from "../models/Note.js";

// ✅ Get all users
 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get notes for a specific user
 const getUserNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Restrict a user for 1 day
 const restrictUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const duration = req.body.duration || 1; // in days

    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + duration);

    const user = await User.findByIdAndUpdate(
      userId,
      { restrictedUntil: expireAt },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: `User restricted until ${expireAt}`, user });
  } catch (error) {
    console.error("Error restricting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
    getAllUsers,getUserNotes,restrictUser
}