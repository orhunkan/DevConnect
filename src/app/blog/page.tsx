import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Link from "next/link";
import { BlogPost } from "@/types/post";

export default async function BlogListPage() {
  await connectToDB();

  const posts = await Post.find().sort({ createdAt: -1 }).lean<BlogPost[]>(); // ✅ clean type-safe çözüm

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Blog Yazıları</h1>

      {posts.length === 0 && <p>Henüz hiç yazı yok.</p>}

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id} className="bg-zinc-800 p-4 rounded">
            <Link href={`/blog/${post._id}`}>
              <h2 className="text-xl font-semibold text-blue-400 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-zinc-400 mt-1">
              {post.content.slice(0, 100)}...
            </p>
            <div className="mt-2 text-xs text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString("tr-TR")} - {post.tags.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
