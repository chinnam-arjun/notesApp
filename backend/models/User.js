// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
//     createdAt:{
//         type: Date,
//         default: Date.now,
//     },
//     isAdmin:{
//         type: Boolean,
//         default: false,
//     },
//     isRestricted:{
//         type: Boolean,
//         default: false,
//     }
// }, {timestamps: true});

// export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    restrictedUntil: { type: Date, default: null }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
