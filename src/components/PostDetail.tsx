"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { Session } from "next-auth";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { BlogPost } from "@/types/post";
import { Pencil, Trash2 } from "lucide-react";

export default function PostDetail({
  post,
  session,
  isLikedByMe,
}: {
  post: BlogPost;
  session: Session | null;
  isLikedByMe: boolean;
}) {
  const isOwner = session?.user?.email === post.authorEmail;
  const postId =
    typeof post._id === "object" ? post._id.toString() : post._id;

  return (
  <div className="max-w-2xl mx-auto py-10 px-6 text-black bg-gray-100 rounded-xl shadow-md space-y-6 mb-20">
      {/* -------- Başlık / meta -------- */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="text-sm text-zinc-500 mb-2">
          {new Date(post.createdAt).toLocaleDateString("tr-TR")} –{" "}
          {post.tags.join(", ")}
        </div>

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
          {post.authorEmail}
        </p>
      </div>

      {/* -------- İçerik (Markdown) -------- */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* -------- Like -------- */}
      {session?.user && (
        <LikeButton
          postId={postId}
          initialLikes={post.likes?.length || 0}
          likedByMe={isLikedByMe}
        />
      )}

      {/* -------- Owner aksiyonları -------- */}
      {isOwner && (
        <div className="flex gap-4">
          <Link
            href={`/blog/${postId}/edit`}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
          >
            <Pencil className="w-4 h-4" />
            <span>Düzenle</span>
          </Link>

          <div className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm cursor-pointer">
            <Trash2 className="w-4 h-4" />
            <DeleteButton id={postId} />
          </div>
        </div>
      )}

      {/* -------- Yorumlar -------- */}
    <CommentSection postId={postId} userEmail={session?.user?.email ?? undefined} />
    </div>
  );
}
