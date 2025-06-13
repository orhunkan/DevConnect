"use client";

import { BlogPost } from "@/types/post";
import PostCard from "@/components/PostCard";

interface AllBlogListProps {
  posts: BlogPost[];
}

export default function AllBlogList({ posts }: AllBlogListProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No blog posts found.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post._id.toString()}
          id={post._id.toString()}
          title={post.title}
          content={post.content}
          tags={post.tags}
          createdAt={post.createdAt.toString()}
          likes={Array.isArray(post.likes) ? post.likes.length : 0}
          comments={0}
          authorEmail={post.authorEmail}
        />
      ))}
    </div>
  );
}
