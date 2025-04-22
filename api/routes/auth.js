const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken." });
    }
    // Hash password and save user
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    // Check password
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Create JWT token
    const token = jwt.sign({ username, id: user._id }, secret, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        id: user._id,
        username,
      });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
});

// Profile
router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json(info);
  });
});

// Logout
router.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    })
    .json("ok");
});

module.exports = router;
