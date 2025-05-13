import { useState } from "react";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Import BounceLoader
import { BounceLoader } from "react-spinners";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  async function register(ev) {
    ev.preventDefault();
    setLoading(true); // ✅ Show loader on submit
    try {
      const response = await fetch(`https://mern-blog-833h.onrender.com/api/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false); // ✅ Hide loader after response

      if (response.ok) {
        alert(data.message || "Registration successful");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      setLoading(false); // ✅ Ensure loader hides on error
      alert("An error occurred during registration");
    }
  }

  return (
    <>
      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <BounceLoader color="#1e40af" />
        </div>
      )}

      <form
        className="max-w-md mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg"
        onSubmit={register}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register
        </h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
        />
        <button className="w-full px-4 py-3 text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition duration-200 font-medium">
          Register
        </button>
      </form>
    </>
  );
}
