// src/app/blog/[id]/page.tsx
import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PostDetail from "@/components/PostDetail";
interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  await connectToDB();

  const post = await Post.findById(params.id).lean<BlogPost>();
  if (!post) return notFound();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || "";
  const isLikedByMe = post.likes?.includes(userEmail) || false;

  return (
    <PostDetail
      post={post}
      session={session}
      isLikedByMe={isLikedByMe}
    />
  );
}
