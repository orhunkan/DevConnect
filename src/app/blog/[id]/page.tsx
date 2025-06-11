import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  await connectToDB();

  const post = await Post.findById(params.id).lean<BlogPost>();

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-zinc-500 mb-2">
        {new Date(post.createdAt).toLocaleDateString("tr-TR")} -{" "}
        {post.tags.join(", ")}
      </div>
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
}
