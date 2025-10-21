import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        req.session.userId = newUser._id;
        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        req.session.userId = user._id;
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, username: user.username, email: user.email }
        });
        console.log("User logged in:", user.email);

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const me = async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).select('-password');
            if (!user) {
                return res.json({ loggedIn: false, message: "User not found" });
            }
            return res.json({ loggedIn: true, user });
        } catch (error) {
            return res.status(500).json({ loggedIn: false, message: "Server error" });
        }
    }
    res.json({
        loggedIn: false,
        message: "You are not authenticated"
    });
}

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // ✅ Store complete user info in session
//     req.session.user = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role
//     };

//     console.log("User logged in:", user.email);

//     res.status(200).json({
//       message: "Login successful",
//       user: req.session.user
//     });

//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const me = async (req, res) => {
//   if (req.session.user) {
//     try {
//       const user = await User.findById(req.session.user.id).select("-password");
//       if (!user) {
//         return res.json({ loggedIn: false, message: "User not found" });
//       }
//       return res.json({ loggedIn: true, user });
//     } catch (error) {
//       return res.status(500).json({ loggedIn: false, message: "Server error" });
//     }
//   }

//   res.json({
//     loggedIn: false,
//     message: "You are not authenticated",
//   });
// };


const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
}

export {
    createUser,
    loginUser,
    logoutUser,
    me
}