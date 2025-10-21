import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
// import mongoose from 'mongoose';

import connectDB from './db.js';

import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import folderRoutes from './routes/folderRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

await connectDB();

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',

});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        secure: false,
        httpOnly: true, 
    }
}))

app.use('/auth',userRoutes);
app.use('/notes',noteRoutes);
app.use('/admin',adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});