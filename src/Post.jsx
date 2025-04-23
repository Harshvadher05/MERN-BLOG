import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Post({
  _id,
  title,
  summary,
  cover,
  // content,
  createdAt,
  author,
}) {
  return (
    <div className="m-4 post bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="image h-48 overflow-hidden">
        <Link to={`/post/${_id}`}>
          <img
            src={`${baseUrl}/` + cover}
            alt=""
            className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
      </div>
      <div className="texts p-6">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-900 transition-colors duration-300 mb-2">
            {title}
          </h2>
        </Link>
        <p className="info flex items-center gap-2 text-sm text-gray-600 mb-3">
          <a className="author font-medium text-gray-800 hover:text-blue-900 transition-colors duration-300">
            {author.username}
          </a>
          <time className="text-gray-500">
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="summary text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
