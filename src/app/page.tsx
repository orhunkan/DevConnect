import PostCard from "@/components/PostCard";
import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";

export default async function Home() {
  await connectToDB();

  const posts = await Post.find().sort({ createdAt: -1 }).lean<BlogPost[]>();

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-2xl h-[80vh] overflow-y-auto bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Son Paylaşılan Postlar</h1>

        {posts.length === 0 && (
          <p className="text-gray-500 text-sm">Henüz hiç post yok.</p>
        )}

        {posts.map((post) => (
          <PostCard
            key={post._id?.toString()}
            id={post._id?.toString() ?? ""}
            title={post.title}
            content={post.content}
            tags={post.tags}
            createdAt={post.createdAt?.toString() ?? ""}
            likes={post.likes?.length || 0}
            comments={0}
            authorEmail={post.authorEmail}
          />
        ))}
      </div>
    </div>
  );
}
