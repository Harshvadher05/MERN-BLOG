# 📝 MERN Blog Application

A full-stack **MERN blog app** where users can register, log in, create, edit, and view blog posts. This app uses **React**, **Node.js**, **Express**, and **MongoDB** with rich text editing powered by **React Quill**.

---

## 🔥 Features

- 👤 **User Authentication**: Register and login functionality.
- 📝 **Create Posts**: Authenticated users can create blog posts.
- ✍️ **Rich Text Editor**: Posts are created using `react-quill` for a beautiful writing experience.
- 📸 **Image Uploads**: Upload a cover image along with your post.
- 🔗 **Link Embedding**: Add links inside your blog content.
- 🗂️ **Post Listing**: View all posts with summary, author, and publish date.
- ✏️ **Edit Access**: Users can edit **only** their own posts.
- 🕵️‍♂️ **Authentication Check**: Protected routes and actions for authenticated users only.

---

## 💻 Tech Stack

| Tech       | Description                  |
|------------|------------------------------|
| MongoDB    | Database                     |
| Express.js | Backend Framework            |
| React      | Frontend Framework           |
| Node.js    | Runtime Environment          |
| React-Quill| Rich Text Editor             |
| TailwindCSS| Frontend Styling             |
| JWT        | Authentication               |

---

## 🌐 Live Link

You can check out the live version of the MERN Blog Application here:

[**Live Demo**](https://mern-blog-1-sssj.onrender.com)

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas (or local instance)
- Vite (or npm create vite@latest)
- Git

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ..
npm install
