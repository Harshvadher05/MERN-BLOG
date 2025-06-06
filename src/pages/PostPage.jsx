import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// ✅ Import BounceLoader
import { BounceLoader } from "react-spinners";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mern-blog-833h.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false); // ✅ Turn off loader after fetch
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
        <BounceLoader color="#1e40af" />
      </div>
    );
  }

  if (!postInfo) return "";

  return (
    <div className="post-page max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg p-6">
        <h1 className="text-3xl text-center text-gray-800 mb-2">
          {postInfo.title}
        </h1>
        <time className="text-center block text-gray-600 mb-2">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className="text-center text-gray-700 mb-6 text-sm font-bold">
          by @{postInfo.author.username}
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className="edit-row text-center mb-6">
            <Link
              className="edit-btn inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
              to={`/edit/${postInfo._id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit this post
            </Link>
          </div>
        )}
        <div className="image max-h-[300px] flex overflow-hidden mb-8">
          <img
            className="w-full object-cover object-center"
            src={`https://mern-blog-833h.onrender.com/${postInfo.cover}`}
            alt=""
          />
        </div>
        <div className="content mt-10">
          <article
            className="prose prose-lg prose-blue prose-img:rounded-xl prose-headings:text-gray-800 prose-p:text-gray-700 max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </div>
      </div>
    </div>
  );
}
