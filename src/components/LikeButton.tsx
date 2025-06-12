"use client";

import { useState } from "react";

export default function LikeButton({
  postId,
  initialLikes,
  likedByMe,
}: {
  postId: string;
  initialLikes: number;
  likedByMe: boolean;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(likedByMe);

  const toggleLike = async () => {
    const res = await fetch(`/api/blog/${postId}/like`, { method: "POST" });
    if (!res.ok) return;

    const data = await res.json();
    setLikes(data.likes);
    setLiked(data.liked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition ${
        liked
          ? "bg-pink-200 text-pink-700 hover:bg-pink-300"
          : "bg-pink-100 text-pink-600 hover:bg-pink-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
        className="w-4 h-4"
      >
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
      <span className="text-xs font-medium">{likes}</span>
    </button>
  );
}
