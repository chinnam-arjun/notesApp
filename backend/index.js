import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import connectDB from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
<<<<<<< HEAD
app.use(cors({
    origin : 'http://98.88.250.4',
    credentials: true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
=======

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://notes-app-frontend-e9xv.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg = "CORS policy does not allow access from this origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
>>>>>>> 3874cd41b382c72b20f7e8457c27ab422efcf442

await connectDB();

app.set("trust proxy", 1); 

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      secure: true,               
      sameSite: "none",           
    },
  })
);

app.use("/auth", userRoutes);
app.use("/notes", noteRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("✅ Notes + ToDo Backend is Running Successfully!");
});

<<<<<<< HEAD
app.listen(PORT, "0.0.0.0" , () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
>>>>>>> 3874cd41b382c72b20f7e8457c27ab422efcf442
