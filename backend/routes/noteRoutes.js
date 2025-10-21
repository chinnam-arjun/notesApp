import express from 'express'

import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from '../controllers/noteControllers.js'

const router = express.Router();

router.post('/',createNote);

router.get('/',getNotes);

router.get('/:noteId',getNoteById);

router.put('/:noteId',updateNote);

router.delete('/:noteId',deleteNote);

export default router;
