import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import AllBlogList from "@/components/AllBlogList";
import { BlogPost } from "@/types/post";

export default async function BlogListPage() {
  await connectToDB();

  const rawPosts = await Post.find().sort({ createdAt: -1 }).lean<BlogPost[]>();

  const posts: BlogPost[] = JSON.parse(JSON.stringify(rawPosts)); // serialize et

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          All Blog Posts
        </h1>

        <AllBlogList posts={posts} />
      </div>
    </div>
  );
}
