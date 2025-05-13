import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Import BounceLoader
import { BounceLoader } from "react-spinners";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    setLoading(true); // ✅ Show loader on form submit
    try {
      const response = await fetch(`https://mern-blog-833h.onrender.com/api/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false); // ✅ Hide loader after response

      if (response.ok) {
        setUserInfo(data);
        setRedirect(true);
      } else {
        alert(data.message || "Wrong credentials");
      }
    } catch (err) {
      setLoading(false); // ✅ Ensure loader is hidden on error
      alert("An error occurred during login");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
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
        onSubmit={login}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
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
          Login
        </button>
      </form>
    </>
  );
}
