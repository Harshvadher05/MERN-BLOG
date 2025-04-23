import Post from "../components/Post";
import { useEffect, useState } from "react";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`https://mern-blog-833h.onrender.com/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
