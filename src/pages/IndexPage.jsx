import Post from "../components/Post";
import { useEffect, useState } from "react";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Import BounceLoader
import { BounceLoader } from "react-spinners";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    fetch(`https://mern-blog-833h.onrender.com/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false); // ✅ Set loading to false when data is fetched
      });
    });
  }, []);

  return (
    <>
      {/* ✅ Loader overlay with blur background */}
      {loading && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <BounceLoader color="#1e40af" />
        </div>
      )}

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
