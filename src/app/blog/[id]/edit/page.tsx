import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import EditPostForm from "@/components/EditPostForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: PageProps) {
  await connectToDB();

  const post = await Post.findById(params.id).lean<BlogPost>();

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <EditPostForm
        id={params.id}
        initialTitle={post.title}
        initialContent={post.content}
        initialTags={post.tags}
      />
    </div>
  );
}
