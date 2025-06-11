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
import DeleteButton from "@/components/DeleteButton"; // ekle

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

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-zinc-500 mb-2">
        {new Date(post.createdAt).toLocaleDateString("tr-TR")} -{" "}
        {post.tags.join(", ")}
      </div>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>

          
      {isOwner && (
        <div className="flex gap-4 mt-6">
          <Link
            href={`/blog/${params.id}/edit`}
            className="text-sm text-blue-400 hover:underline"
          >
            ✏️ Yazıyı Düzenle
          </Link>

          {/* Silme Butonu */}
          <DeleteButton id={params.id} />
        </div>
      )}

    </div>
  );
}
