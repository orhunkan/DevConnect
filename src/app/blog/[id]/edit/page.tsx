import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { BlogPost } from "@/types/post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditForm from "./EditForm";
interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/");

  await connectToDB();
  const post = await Post.findById(params.id).lean<BlogPost>();

  if (!post || post.authorEmail !== session.user.email) {
    return redirect("/");
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Yazıyı Düzenle</h1>
      <EditForm post={post} />
    </div>
  );
}
