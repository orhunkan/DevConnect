import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeleteButton from "@/components/DeleteButton";
import LikeButton from "@/components/LikeButton";

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
  const isOwner = session?.user?.email === post.authorEmail;
  const userEmail = session?.user?.email || "";
  const isLikedByMe = post.likes?.includes(userEmail) || false;
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-zinc-200 p-12 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold mb-8 text-zinc-900">
          {post.title}
        </h1>

        <p className="text-base text-zinc-600 mb-6">
          {new Date(post.createdAt).toLocaleDateString("tr-TR")} – {post.tags.join(", ")}
        </p>

        <div className="prose prose-lg prose-zinc max-w-none mb-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {session?.user && (
          <div className="mb-8">
            <LikeButton
              postId={params.id}
              initialLikes={post.likes?.length || 0}
              likedByMe={isLikedByMe}
            />
          </div>
        )}

        {isOwner && (
          <div className="flex gap-6 text-base">
            <Link
              href={`/blog/${params.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              ✏️ Yazıyı Düzenle
            </Link>
            <DeleteButton id={params.id} />
          </div>
        )}
      </div>
    </div>
  );

}
