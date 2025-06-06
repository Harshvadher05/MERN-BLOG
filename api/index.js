const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const uploadMiddleware = multer({ dest: "uploads/" });
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const secret = process.env.secret;

// Middleware
const allowedOrigin = [
  "https://mern-blog-1-sssj.onrender.com",
  "http://localhost:5173",
];
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes
app.use("/api", authRoutes);

// DB connection
mongoose
  .connect(
    "mongodb+srv://harshvadher5114:harshvadher5114@cluster0.nafskz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

// Post creation
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  // const { originalname, path } = req.file;
  // const ext = originalname.split(".").pop();
  // const newPath = path + "." + ext;
  // fs.renameSync(path, newPath);

  // const { token } = req.cookies;
  // jwt.verify(token, secret, {}, async (err, info) => {
  //   if (err) throw err;
  //   const { title, summary, content } = req.body;
  //   const postDoc = await Post.create({
  //     title,
  //     summary,
  //     content,
  //     cover: newPath,
  //     author: info.id,
  //   });
  //   res.json(postDoc);
  // });

  const { path, mimetype } = req.file;
  const fileData = fs.readFileSync(path); // Read binary

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json("Unauthorized");

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: {
        data: fileData,
        contentType: mimetype,
      },
      author: info.id,
    });

    // Optionally delete the file after reading
    fs.unlinkSync(path);

    res.json(postDoc);
  });
});

// Post update
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const ext = originalname.split(".").pop();
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) return res.status(400).json("you are not the author");

    await Post.updateOne(
      { _id: id },
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      }
    );
    res.json(postDoc);
  });
});

// Get posts
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

// Get single post
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
