import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import PostDetail from "@/components/PostDetail";

interface PageProps {
  params: { id: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  await connectToDB();

  const rawPost = await Post.findById(params.id).lean<BlogPost>();
  if (!rawPost) return notFound();

  const session = (await getServerSession(authOptions)) as Session | null;
  const userEmail = session?.user?.email ?? "";
  const isLikedByMe = rawPost.likes?.includes(userEmail) ?? false;

  const safePost: BlogPost = {
    ...rawPost,
    _id: rawPost._id.toString(),                 // ObjectId → string
    createdAt: rawPost.createdAt.toISOString(),  // Date → string
    updatedAt: rawPost.updatedAt.toISOString(),  // Date → string
  } as unknown as BlogPost; 

  return (
    <PostDetail
      post={safePost}
      session={session}
      isLikedByMe={isLikedByMe}
    />
  );
}
