import Link from "next/link";
import LikeButton from "./LikeButton";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  authorEmail: string;
}

export default function PostCard({
  id,
  title,
  content,
  tags,
  createdAt,
  likes,
  comments,
  authorEmail,
}: PostCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <Link href={`/blog/${id}`}>
        <h2 className="text-xl font-bold text-blue-700 hover:underline">{title}</h2>
      </Link>

      <p className="text-gray-700 mt-2 line-clamp-3">{content}</p>

         <p className="text-sm text-zinc-500 mt-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v8z"
            />
          </svg>
          {authorEmail}
        </p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>{new Date(createdAt).toLocaleDateString("tr-TR")}</span>

        <div className="flex items-center gap-3">
          <LikeButton postId={id} initialLikes={likes} likedByMe={false} />

          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V5z" />
            </svg>
            <span className="text-xs font-medium">{comments}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
