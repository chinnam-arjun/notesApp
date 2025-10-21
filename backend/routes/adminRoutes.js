import express from "express";
import {  getAllUsers,getUserNotes,restrictUser } from "../controllers/adminControllers.js";

const router = express.Router();

// ✅ Admin endpoints
router.get("/users", getAllUsers);
router.get("/notes/:userId", getUserNotes);
router.post("/restrict/:userId", restrictUser);

export default router;
