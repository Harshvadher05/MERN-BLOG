import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch(`${baseUrl}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form
      onSubmit={createNewPost}
      className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-blue-800 decoration-blue-400 mb-8">
          Create Your Post
        </h1>
        <div>
          <input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-800"
          />
        </div>
        <div>
          <input
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-800"
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-800"
          />
        </div>
        <div className="bg-gray-800 rounded-md">
          <Editor value={content} onChange={setContent} />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
        >
          Create post
        </button>
      </div>
    </form>
  );
}
