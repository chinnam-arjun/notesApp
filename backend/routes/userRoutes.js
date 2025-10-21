import express from 'express';
import {createUser,loginUser,logoutUser,me} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup',createUser)
router.post('/signin',loginUser)
router.post('/logout',logoutUser)
router.get('/me',me)

export default router;